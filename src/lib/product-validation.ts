import { categories } from "@/data/products";
export interface ProductFields {
  descripcion: string;
  precio: string;
  categoria: string;
}
export type FormErrors = Partial<Record<keyof ProductFields, string>>;
export function validateProduct(fields: ProductFields): FormErrors {
  const errors: FormErrors = {};
  if (Array.from(fields.descripcion.trim()).length < 3)
    errors.descripcion = "Escribe una descripción de al menos 3 caracteres.";
  if (Array.from(fields.descripcion.trim()).length > 120)
    errors.descripcion = "La descripción admite hasta 120 caracteres.";
  if (!fields.precio.trim()) errors.precio = "Ingresa el precio de venta.";
  else if (
    !Number.isFinite(Number(fields.precio)) ||
    Number(fields.precio) <= 0
  )
    errors.precio = "El precio debe ser un número mayor que cero.";
  else if (
    !/^\d+(\.\d{1,2})?$/.test(fields.precio) ||
    Number(fields.precio) > 999999.99
  )
    errors.precio = "Usa hasta 2 decimales y un máximo de S/ 999,999.99.";
  if (!categories.some((category) => category === fields.categoria))
    errors.categoria = "Selecciona una categoría.";
  return errors;
}
