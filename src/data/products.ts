export const categories = ["Bebidas", "Abarrotes", "Limpieza"] as const;
export type Category = (typeof categories)[number];
export interface Product {
  codigo: number;
  descripcion: string;
  precio: number;
  categoria: Category;
}
export type ProductInput = Omit<Product, "codigo">;
export const initialProducts: Product[] = [
  {
    codigo: 1,
    descripcion: "Coca Cola 500 ml",
    precio: 3.5,
    categoria: "Bebidas",
  },
  {
    codigo: 2,
    descripcion: "Agua San Luis 625 ml",
    precio: 2,
    categoria: "Bebidas",
  },
  {
    codigo: 3,
    descripcion: "Arroz Costeño 1 kg",
    precio: 5.2,
    categoria: "Abarrotes",
  },
  {
    codigo: 4,
    descripcion: "Aceite Primor 900 ml",
    precio: 9.9,
    categoria: "Abarrotes",
  },
  {
    codigo: 5,
    descripcion: "Lavavajilla Sapolio 360 g",
    precio: 4.8,
    categoria: "Limpieza",
  },
];
export const formatCode = (code: number) =>
  `PRD-${String(code).padStart(4, "0")}`;
export const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(price);
