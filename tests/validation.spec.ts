import { test, expect } from "@playwright/test";
import { validateProduct } from "../src/lib/product-validation";
import { buildProductsCsv } from "../src/lib/product-csv";
import { initialProducts } from "../src/data/products";

test.describe("Reglas de validación aisladas", () => {
  const base = {
    descripcion: "Producto válido",
    precio: "2.50",
    categoria: "Bebidas",
  };
  for (const [label, value] of [
    ["vacío", ""],
    ["cero", "0"],
    ["negativo", "-0.01"],
    ["no numérico", "abc"],
    ["infinito", "Infinity"],
    ["NaN", "NaN"],
    ["solo espacios", "   "],
    ["tres decimales", "1.001"],
    ["sobre el máximo", "1000000"],
    ["notación exponencial", "1e3"],
    ["coma decimal", "1,50"],
  ]) {
    test(`U01 precio ${label} se rechaza`, () => {
      expect(validateProduct({ ...base, precio: value })).toHaveProperty(
        "precio",
      );
    });
  }
  for (const [label, value] of [
    ["tres caracteres", "Pan"],
    ["Unicode", "Café"],
    ["espacios exteriores", "  Pan  "],
    ["longitud máxima", "a".repeat(120)],
  ]) {
    test(`U02 descripción válida ${label}`, () => {
      expect(validateProduct({ ...base, descripcion: value })).toEqual({});
    });
  }
  for (const [label, value] of [
    ["vacía", ""],
    ["dos caracteres", "ab"],
    ["solo espacios", "  "],
    ["sobre 120", "a".repeat(121)],
  ]) {
    test(`U03 descripción inválida ${label}`, () => {
      expect(validateProduct({ ...base, descripcion: value })).toHaveProperty(
        "descripcion",
      );
    });
  }
  for (const value of ["", "Electrónica", "bebidas"]) {
    test(`U04 categoría no permitida ${JSON.stringify(value)}`, () => {
      expect(validateProduct({ ...base, categoria: value })).toHaveProperty(
        "categoria",
      );
    });
  }
  test("U05 tres errores independientes se devuelven juntos", () => {
    expect(
      Object.keys(
        validateProduct({ descripcion: "", precio: "", categoria: "" }),
      ),
    ).toHaveLength(3);
  });
  test("U06 validar no modifica el objeto original", () => {
    const fields = { ...base };
    validateProduct(fields);
    expect(fields).toEqual(base);
  });
});
test.describe("CSV y datos iniciales", () => {
  test("U07 cinco ejemplos con códigos únicos y precios positivos", () => {
    expect(initialProducts).toHaveLength(5);
    expect(new Set(initialProducts.map((p) => p.codigo)).size).toBe(5);
    expect(initialProducts.every((p) => p.precio > 0)).toBe(true);
  });
  test("U08 CSV conserva comas y escapa comillas en la descripción", () => {
    const csv = buildProductsCsv([
      { ...initialProducts[0], descripcion: 'Arroz, marca "Especial"' },
    ]);
    expect(csv).toContain('"Arroz, marca ""Especial"""');
  });
  for (const value of ["=2+2", "+SUM(1,2)", "-2+3", "@SUM(1,2)"]) {
    test(`U09 neutraliza fórmula CSV ${value}`, () => {
      const csv = buildProductsCsv([
        { ...initialProducts[0], descripcion: value },
      ]);
      expect(csv).toContain(`"'${value}"`);
    });
  }
  test("U10 lista vacía exporta solo encabezados y marca UTF8", () => {
    const csv = buildProductsCsv([]);
    expect(csv.charCodeAt(0)).toBe(0xfeff);
    expect(csv.split("\r\n")).toHaveLength(1);
    expect(csv).toContain("Descripción");
  });
});
