import type { Product } from "@/data/products";

export function buildProductsCsv(products: Product[]) {
  const cell = (value: string | number) => {
    let text = String(value);
    // Evita que una descripción se interprete como fórmula al abrir el CSV.
    if (typeof value === "string" && /^[=+\-@\t\r]/.test(text))
      text = "'" + text;
    return `"${text.replaceAll('"', '""')}"`;
  };
  const rows = [
    ["Código", "Descripción", "Precio", "Categoría"],
    ...products.map((p) => [
      p.codigo,
      p.descripcion,
      p.precio.toFixed(2),
      p.categoria,
    ]),
  ];
  return "\uFEFF" + rows.map((row) => row.map(cell).join(",")).join("\r\n");
}
