import { test, expect, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

const rows = (page: Page) => page.locator("tbody tr");
const description = (page: Page) =>
  page.getByLabel("Descripción", { exact: true });
const price = (page: Page) => page.getByLabel("Precio de venta");
const category = (page: Page) => page.getByLabel("Categoría", { exact: true });
const submit = (page: Page) =>
  page
    .locator("#registro")
    .getByRole("button", { name: "Registrar producto", exact: true });
async function register(
  page: Page,
  name: string,
  amount = "4.50",
  group = "Abarrotes",
) {
  await description(page).fill(name);
  await price(page).fill(amount);
  await category(page).selectOption(group);
  await submit(page).click();
}

test.describe("Registro y límites válidos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  for (const [label, name, amount, group] of [
    ["mínimo de tres caracteres", "Pan", "1.00", "Abarrotes"],
    ["acentos y eñe", "Piña y café orgánico", "5.50", "Abarrotes"],
    ["espacios exteriores", "   Leche fresca   ", "4.20", "Bebidas"],
    ["precio mínimo monetario", "Sobre de sal", "0.01", "Abarrotes"],
    [
      "precio máximo permitido",
      "Producto de demostración",
      "999999.99",
      "Limpieza",
    ],
    ["precio entero", "Jugo de naranja", "7", "Bebidas"],
    ["un decimal", "Detergente líquido", "8.5", "Limpieza"],
    ["120 caracteres", "Producto ".padEnd(120, "a"), "3.50", "Abarrotes"],
  ]) {
    test(`R01 acepta ${label}`, async ({ page }) => {
      await register(page, name, amount, group);
      await expect(rows(page)).toHaveCount(6);
      await expect(rows(page).last()).toContainText(name.trim());
      await expect(rows(page).last()).toContainText(group);
      await expect(page.getByRole("status")).toBeVisible();
    });
  }
  for (const group of ["Bebidas", "Abarrotes", "Limpieza"]) {
    test(`R02 actualiza el contador de ${group}`, async ({ page }) => {
      const before = group === "Limpieza" ? 1 : 2;
      await register(page, `Producto ${group}`, "2.50", group);
      await expect(
        page.getByRole("button", {
          name: `${group} ${before + 1}`,
          exact: true,
        }),
      ).toBeVisible();
    });
  }
  test("R03 diez registros consecutivos conservan códigos únicos y datos iniciales", async ({
    page,
  }) => {
    for (let i = 0; i < 10; i++)
      await register(page, `Producto consecutivo ${i + 1}`);
    await expect(rows(page)).toHaveCount(15);
    const codes = await page.locator("td.product-code").allTextContents();
    expect(new Set(codes).size).toBe(15);
    expect(codes.at(-1)).toBe("PRD-0015");
    await expect(rows(page).first()).toContainText("Coca Cola 500 ml");
    await expect(page.locator(".catalog-summary")).toContainText("10");
  });
  test("R04 las etiquetas HTML se muestran como texto sin ejecutar scripts", async ({
    page,
  }) => {
    const dialogs: string[] = [];
    page.on("dialog", (d) => {
      dialogs.push(d.message());
      void d.dismiss();
    });
    await register(page, "<img src=x onerror=alert(1)>");
    await expect(rows(page).last()).toContainText(
      "<img src=x onerror=alert(1)>",
    );
    await expect(rows(page).last().locator("img")).toHaveCount(0);
    expect(dialogs).toEqual([]);
  });
  test("R05 Enter envía el formulario y conserva el precio con dos decimales", async ({
    page,
  }) => {
    await description(page).fill("Producto con teclado");
    await category(page).selectOption("Bebidas");
    await price(page).fill("3.5");
    await price(page).press("Enter");
    await expect(rows(page)).toHaveCount(6);
    await expect(rows(page).last()).toContainText("3.50");
  });
});

test.describe("Validación y recuperación", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  for (const amount of ["1.234", "1000000"]) {
    test(`V01 rechaza el precio fuera de formato ${amount}`, async ({
      page,
    }) => {
      await register(page, "Producto inválido", amount);
      await expect(page.getByRole("alert")).toContainText("hasta 2 decimales");
      await expect(rows(page)).toHaveCount(5);
    });
  }
  test("V02 dirige el foco al precio si solo el precio está mal", async ({
    page,
  }) => {
    await register(page, "Producto de prueba", "-2");
    await expect(price(page)).toBeFocused();
  });
  test("V03 dirige el foco a la categoría si solo falta la categoría", async ({
    page,
  }) => {
    await register(page, "Producto de prueba", "2.50", "");
    await expect(category(page)).toBeFocused();
  });
  test("V04 corregir un campo retira solo su error", async ({ page }) => {
    await submit(page).click();
    await expect(page.getByRole("alert")).toHaveCount(3);
    await description(page).fill("Producto corregido");
    await expect(page.getByRole("alert")).toHaveCount(2);
    await expect(description(page)).toHaveAttribute("aria-invalid", "false");
  });
  test("V05 corregir datos inválidos permite el registro sin consumir códigos", async ({
    page,
  }) => {
    await submit(page).click();
    await register(page, "Producto corregido");
    await expect(rows(page)).toHaveCount(6);
    await expect(rows(page).last()).toContainText("PRD-0006");
    await expect(page.getByRole("alert")).toHaveCount(0);
  });
  test("V06 editar después de un éxito retira la confirmación anterior", async ({
    page,
  }) => {
    await register(page, "Producto registrado");
    await expect(page.getByRole("status")).toBeVisible();
    await description(page).fill("Siguiente");
    await expect(page.getByRole("status")).toHaveCount(0);
  });
  test("V07 Limpiar después de un éxito conserva los productos", async ({
    page,
  }) => {
    await register(page, "Producto registrado");
    await page.getByRole("button", { name: "Limpiar", exact: true }).click();
    await expect(page.getByRole("status")).toHaveCount(0);
    await expect(rows(page)).toHaveCount(6);
    await expect(description(page)).toBeFocused();
  });
  test("V08 un error conserva los campos válidos para corregirlo", async ({
    page,
  }) => {
    await register(page, "Conservar descripción", "0", "Limpieza");
    await expect(description(page)).toHaveValue("Conservar descripción");
    await expect(category(page)).toHaveValue("Limpieza");
  });
  test("V09 no se puede superar el límite de 120 caracteres en el campo", async ({
    page,
  }) => {
    await description(page).fill("a".repeat(130));
    await expect(description(page)).toHaveValue("a".repeat(120));
  });
});

test.describe("Consulta y consistencia", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  for (const [query, expected, count] of [
    ["PRD-0003", "Arroz Costeño", 1],
    ["COCA COLA", "Coca Cola", 1],
    ["  agua  ", "Agua San Luis", 1],
    ["limpieza", "Lavavajilla", 1],
  ] as const) {
    test(`C01 búsqueda de ${query}`, async ({ page }) => {
      await page.getByLabel("Buscar productos").fill(query);
      await expect(rows(page)).toHaveCount(count);
      await expect(rows(page)).toContainText(expected);
    });
  }
  test("C02 borrar la búsqueda restituye la lista completa", async ({
    page,
  }) => {
    await page.getByLabel("Buscar productos").fill("Agua");
    await page.getByRole("button", { name: "Borrar búsqueda" }).click();
    await expect(rows(page)).toHaveCount(5);
    await expect(page.getByLabel("Buscar productos")).toHaveValue("");
  });
  test("C03 categoría y búsqueda se combinan, y el vacío permite recuperar", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Bebidas 2", exact: true }).click();
    await page.getByLabel("Buscar productos").fill("Arroz");
    await expect(page.getByText("No encontramos productos")).toBeVisible();
    await page
      .getByRole("button", { name: "Limpiar filtros", exact: true })
      .first()
      .click();
    await expect(rows(page)).toHaveCount(5);
    await page.screenshot({
      path: "evidencias/13-filtros-recuperados.png",
      fullPage: true,
    });
  });
  test("C04 el tercer clic en Precio recupera el orden inicial", async ({
    page,
  }) => {
    for (let i = 0; i < 3; i++)
      await page.getByRole("button", { name: "Ordenar por precio" }).click();
    await expect(rows(page).first()).toContainText("PRD-0001");
    await expect(page.locator("th[aria-sort]")).toHaveAttribute(
      "aria-sort",
      "none",
    );
  });
  test("C05 los filtros no cambian los contadores globales", async ({
    page,
  }) => {
    const before = await page.locator(".catalog-summary").innerText();
    await page.getByRole("button", { name: "Limpieza 1", exact: true }).click();
    await expect(rows(page)).toHaveCount(1);
    expect(await page.locator(".catalog-summary").innerText()).toBe(before);
  });
  test("C06 registrar con filtros activos muestra la nueva fila y limpia filtros", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Bebidas 2", exact: true }).click();
    await page.getByLabel("Buscar productos").fill("Agua");
    await register(page, "Jabón de manos", "3.00", "Limpieza");
    await expect(rows(page)).toHaveCount(6);
    await expect(rows(page).last()).toContainText("Jabón de manos");
    await expect(page.getByLabel("Buscar productos")).toHaveValue("");
  });
  test("C07 una fila recién registrada tiene una sola etiqueta Nuevo", async ({
    page,
  }) => {
    await register(page, "Producto uno");
    await register(page, "Producto dos");
    await expect(page.locator(".new-label")).toHaveCount(1);
    await expect(rows(page).last()).toContainText("Nuevo");
  });
});

test.describe("Exportación accesibilidad y presentación", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("E01 CSV incluye productos nuevos aunque haya un filtro activo", async ({
    page,
  }) => {
    await register(page, "Producto exportado");
    await page.getByRole("button", { name: "Bebidas 2", exact: true }).click();
    const wait = page.waitForEvent("download");
    await page.getByRole("button", { name: "Exportar CSV" }).click();
    const d = await wait;
    const csv = await readFile((await d.path())!, "utf8");
    expect(csv.split("\r\n")).toHaveLength(7);
    expect(csv).toContain("Producto exportado");
  });
  test("E02 el encabezado Nuevo producto enfoca el formulario", async ({
    page,
  }) => {
    await page
      .getByRole("button", { name: "Nuevo producto", exact: true })
      .click();
    await expect(description(page)).toBeFocused();
  });
  test("E03 el enlace de salto funciona con teclado", async ({ page }) => {
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Ir al contenido" }),
    ).toBeFocused();
    await page.keyboard.press("Enter");
    expect(new URL(page.url()).hash).toBe("#contenido");
  });
  test("E04 todos los campos obligatorios tienen etiquetas y ayudas accesibles", async ({
    page,
  }) => {
    for (const field of [description(page), price(page), category(page)])
      await expect(field).toHaveAttribute("required", "");
    await submit(page).click();
    for (const field of [description(page), price(page), category(page)]) {
      await expect(field).toHaveAttribute("aria-invalid", "true");
      expect(await field.getAttribute("aria-describedby")).toMatch(/error$/);
    }
  });
  test("E05 preferencia de movimiento reducido suprime la animación sin bloquear el registro", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await register(page, "Sin animación");
    await expect(rows(page)).toHaveCount(6);
    expect(
      await page
        .locator(".recent-row")
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("none");
    expect(
      await page
        .locator(".success-message")
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("none");
  });
  test("E06 tema oscuro y fuentes solicitadas se cargan localmente", async ({
    page,
  }) => {
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page
        .locator("body")
        .evaluate((el) => getComputedStyle(el).colorScheme),
    ).toBe("dark");
    expect(
      await page
        .locator("h1")
        .evaluate((el) => getComputedStyle(el).fontFamily),
    ).toContain("Space Grotesk");
    expect(
      await page
        .locator("body")
        .evaluate((el) => getComputedStyle(el).fontFamily),
    ).toContain("Manrope");
  });
  for (const width of [320, 375, 1024, 1920]) {
    test(`E07 sin desbordamiento de página a ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(
        page.getByRole("heading", { name: "Gestión de productos" }),
      ).toBeVisible();
    });
  }
  test("E08 la tabla móvil permite consultar las columnas que quedan fuera de vista", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    const container = page.locator('[data-slot="table-container"]');
    expect(
      await container.evaluate((el) => el.scrollWidth > el.clientWidth),
    ).toBe(true);
    await container.evaluate((el) => {
      el.scrollLeft = el.scrollWidth;
    });
    expect(await container.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
  });
  test("E09 nueva fila y confirmación tienen animación corta sin bucles", async ({
    page,
  }) => {
    await register(page, "Registro animado");
    const row = await page
      .locator(".recent-row")
      .evaluate((el) => ({
        name: getComputedStyle(el).animationName,
        iterations: getComputedStyle(el).animationIterationCount,
      }));
    expect(row.name).toBe("ledger-entry");
    expect(row.iterations).toBe("1");
    await expect(page.getByRole("status")).toBeVisible();
  });
});
