import { test, expect, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

const rows = (page: Page) => page.locator("tbody tr");
async function fillProduct(
  page: Page,
  name = "Galletas de avena 150 g",
  price = "4.50",
  category = "Abarrotes",
) {
  await page.getByLabel("Descripción", { exact: true }).fill(name);
  await page.getByLabel("Precio de venta").fill(price);
  await page.getByLabel("Categoría", { exact: true }).selectOption(category);
}
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(rows(page)).toHaveCount(5);
});

test("P01 muestra los cinco productos iniciales con todos sus campos", async ({
  page,
}) => {
  await expect(
    page.getByRole("heading", { name: "Gestión de productos" }),
  ).toBeVisible();
  await expect(rows(page).first()).toContainText("Coca Cola 500 ml");
  await expect(rows(page).last()).toContainText("PRD-0005");
  await expect(page.locator("thead")).toContainText("Categoría");
  await page.screenshot({
    path: "evidencias/01-catalogo-inicial.png",
    fullPage: true,
  });
});
test("P02 registra datos válidos, limpia formulario y confirma", async ({
  page,
}) => {
  await fillProduct(page);
  await page
    .locator("#registro").getByRole("button", { name: "Registrar producto", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "se registró correctamente",
  );
  await expect(page.getByLabel("Descripción", { exact: true })).toHaveValue("");
  await expect(page.getByLabel("Precio de venta")).toHaveValue("");
  await expect(page.getByLabel("Categoría", { exact: true })).toHaveValue("");
  await expect(rows(page)).toHaveCount(6);
  await page.screenshot({
    path: "evidencias/02-registro-exitoso.png",
    fullPage: true,
  });
});
test("P03 actualiza tabla sin recargar y genera códigos únicos consecutivos", async ({
  page,
}) => {
  let navigations = 0;
  page.on("framenavigated", () => navigations++);
  for (const name of ["Galletas de avena", "Yogur natural"]) {
    await fillProduct(page, name);
    await page
      .locator("#registro").getByRole("button", { name: "Registrar producto", exact: true })
      .click();
  }
  await expect(rows(page)).toHaveCount(7);
  await expect(rows(page).nth(5)).toContainText("PRD-0006");
  await expect(rows(page).nth(6)).toContainText("PRD-0007");
  expect(navigations).toBe(0);
});
for (const name of ["", "ab", "   "]) {
  test(`P04 rechaza descripción ${JSON.stringify(name)}`, async ({ page }) => {
    await fillProduct(page, name);
    await page
      .locator("#registro").getByRole("button", { name: "Registrar producto", exact: true })
      .click();
    await expect(page.getByRole("alert")).toContainText(
      "al menos 3 caracteres",
    );
    await expect(rows(page)).toHaveCount(5);
  });
}
for (const price of ["", "0", "-1"]) {
  test(`P05 rechaza precio ${JSON.stringify(price)}`, async ({ page }) => {
    await fillProduct(page, "Producto de prueba", price);
    await page
      .locator("#registro").getByRole("button", { name: "Registrar producto", exact: true })
      .click();
    await expect(page.getByRole("alert")).toContainText(
      price ? "mayor que cero" : "Ingresa el precio",
    );
    await expect(rows(page)).toHaveCount(5);
  });
}
test("P06 rechaza registro sin categoría", async ({ page }) => {
  await fillProduct(page, "Producto de prueba", "5.50", "");
  await page
    .locator("#registro").getByRole("button", { name: "Registrar producto", exact: true })
    .click();
  await expect(page.getByRole("alert")).toHaveText("Selecciona una categoría.");
  await expect(rows(page)).toHaveCount(5);
});
test("P07 Limpiar restablece campos y mensajes", async ({ page }) => {
  await fillProduct(page, "Borrador", "-1");
  await page
    .locator("#registro").getByRole("button", { name: "Registrar producto", exact: true })
    .click();
  await expect(page.getByRole("alert")).toBeVisible();
  await page.getByRole("button", { name: "Limpiar", exact: true }).click();
  await expect(page.getByLabel("Descripción", { exact: true })).toHaveValue("");
  await expect(page.getByLabel("Precio de venta")).toHaveValue("");
  await expect(page.getByLabel("Categoría", { exact: true })).toHaveValue("");
  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(rows(page)).toHaveCount(5);
});
test("P08 muestra validaciones y dirige foco al primer campo incorrecto", async ({
  page,
}) => {
  await page
    .locator("#registro").getByRole("button", { name: "Registrar producto", exact: true })
    .click();
  await expect(page.getByRole("alert")).toHaveCount(3);
  await expect(page.getByLabel("Descripción", { exact: true })).toBeFocused();
  await page.screenshot({
    path: "evidencias/03-validacion-campos.png",
    fullPage: true,
  });
});
test("P09 recargar recupera los ejemplos y descarta cambios temporales", async ({
  page,
}) => {
  await fillProduct(page);
  await page
    .locator("#registro").getByRole("button", { name: "Registrar producto", exact: true })
    .click();
  await expect(rows(page)).toHaveCount(6);
  await page.reload();
  await expect(rows(page)).toHaveCount(5);
  await expect(
    page.getByText("Galletas de avena 150 g", { exact: true }),
  ).toHaveCount(0);
});
test("P10 buscar, filtrar y restablecer funciona sin alterar el catálogo", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Bebidas 2", exact: true }).click();
  await expect(rows(page)).toHaveCount(2);
  await page.getByRole("button", { name: "Todas 5", exact: true }).click();
  await page.getByLabel("Buscar productos").fill("costeno");
  await expect(rows(page)).toHaveCount(1);
  await expect(rows(page)).toContainText("Arroz Costeño");
  await page.screenshot({ path: "evidencias/04-busqueda.png", fullPage: true });
  await page.getByLabel("Buscar productos").fill("inexistente");
  await expect(page.getByText("No encontramos productos")).toBeVisible();
  await page
    .getByRole("button", { name: "Limpiar filtros", exact: true })
    .first()
    .click();
  await expect(rows(page)).toHaveCount(5);
});
test("P11 ordena por precio ascendente y descendente", async ({ page }) => {
  await page.getByRole("button", { name: "Ordenar por precio" }).click();
  await expect(rows(page).first()).toContainText("Agua San Luis");
  await page.getByRole("button", { name: "Ordenar por precio" }).click();
  await expect(rows(page).first()).toContainText("Aceite Primor");
});
test("P12 exporta los productos actuales en CSV", async ({ page }) => {
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exportar CSV" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("catalogo-bodega.csv");
  const path = await download.path();
  const csv = await readFile(path!, "utf8");
  expect(csv.split("\r\n")).toHaveLength(6);
  expect(csv).toContain("Arroz Costeño 1 kg");
});
for (const width of [390, 768]) {
  test(`P13 interfaz adaptable a ${width}px y registro operativo`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await fillProduct(page, "Producto móvil");
    await page
      .locator("#registro").getByRole("button", { name: "Registrar producto", exact: true })
      .click();
    await expect(page.getByRole("status")).toContainText(
      "se registró correctamente",
    );
    await expect(rows(page)).toHaveCount(6);
    await page.screenshot({
      path: `evidencias/05-responsive-${width}.png`,
      fullPage: true,
    });
  });
}
test("P14 funciona sin API ni servicios externos y sin errores de consola", async ({
  page,
}) => {
  const errors: string[] = [];
  const externalRequests: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (
      !r.url().startsWith("http://127.0.0.1:5173") &&
      !r.url().startsWith("ws://127.0.0.1:5173")
    )
      externalRequests.push(r.url());
  });
  await page.reload();
  await fillProduct(page, "Producto local");
  await page
    .locator("#registro").getByRole("button", { name: "Registrar producto", exact: true })
    .click();
  await expect(rows(page)).toHaveCount(6);
  expect(errors).toEqual([]);
  expect(externalRequests).toEqual([]);
});

