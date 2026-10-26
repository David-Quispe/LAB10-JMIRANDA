import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { categories, type Category, type ProductInput } from "@/data/products";
import {
  validateProduct,
  type FormErrors,
  type ProductFields,
} from "@/lib/product-validation";

const emptyForm: ProductFields = { descripcion: "", precio: "", categoria: "" };

export function ProductForm({
  onRegister,
}: {
  onRegister: (product: ProductInput) => void;
}) {
  const [fields, setFields] = useState<ProductFields>({ ...emptyForm });
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmation, setConfirmation] = useState("");
  const descriptionInput = useRef<HTMLInputElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);
  const categoryInput = useRef<HTMLSelectElement>(null);

  function updateField(name: keyof ProductFields, value: string) {
    setFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setConfirmation("");
  }
  function resetForm() {
    setFields({ ...emptyForm });
    setErrors({});
    setConfirmation("");
    descriptionInput.current?.focus();
  }
  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateProduct(fields);
    setErrors(validation);
    if (Object.keys(validation).length) {
      if (validation.descripcion) descriptionInput.current?.focus();
      else if (validation.precio) priceInput.current?.focus();
      else categoryInput.current?.focus();
      return;
    }
    const descripcion = fields.descripcion.trim();
    onRegister({
      descripcion,
      precio: Number(fields.precio),
      categoria: fields.categoria as Category,
    });
    setFields({ ...emptyForm });
    setConfirmation(`“${descripcion}” se registró correctamente.`);
    descriptionInput.current?.focus();
  }
  return (
    <Card className="form-card shadow-none">
      <CardHeader>
        <p className="form-eyebrow">Registro de catálogo</p>
        <CardTitle id="form-title">Nuevo producto</CardTitle>
        <CardDescription>
          Completa los datos para sumarlo al catálogo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitForm} noValidate>
          <p className="required-note">Todos los campos son obligatorios.</p>
          <div className="field-group">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              ref={descriptionInput}
              id="descripcion"
              name="descripcion"
              placeholder="Ej. Galletas de avena 150 g"
              value={fields.descripcion}
              onChange={(e) => updateField("descripcion", e.target.value)}
              aria-invalid={!!errors.descripcion}
              aria-describedby={
                errors.descripcion ? "descripcion-error" : "descripcion-help"
              }
              maxLength={120}
              autoComplete="off"
              required
            />
            {errors.descripcion ? (
              <p className="field-error" id="descripcion-error" role="alert">
                {errors.descripcion}
              </p>
            ) : (
              <p className="field-help" id="descripcion-help">
                Mínimo 3 caracteres.
              </p>
            )}
          </div>
          <div className="field-group">
            <Label htmlFor="precio">Precio de venta</Label>
            <div className="price-input">
              <span aria-hidden="true">S/</span>
              <Input
                ref={priceInput}
                id="precio"
                name="precio"
                type="number"
                inputMode="decimal"
                min="0.01"
                max="999999.99"
                step="0.01"
                placeholder="0.00"
                value={fields.precio}
                onChange={(e) => updateField("precio", e.target.value)}
                aria-invalid={!!errors.precio}
                aria-describedby={
                  errors.precio ? "precio-error" : "precio-help"
                }
                required
              />
            </div>
            {errors.precio ? (
              <p className="field-error" id="precio-error" role="alert">
                {errors.precio}
              </p>
            ) : (
              <p className="field-help" id="precio-help">
                En soles, mayor que cero.
              </p>
            )}
          </div>
          <div className="field-group">
            <Label htmlFor="categoria">Categoría</Label>
            <NativeSelect
              ref={categoryInput}
              id="categoria"
              name="categoria"
              value={fields.categoria}
              onChange={(e) => updateField("categoria", e.target.value)}
              aria-invalid={!!errors.categoria}
              aria-describedby={
                errors.categoria ? "categoria-error" : undefined
              }
              required
            >
              <NativeSelectOption value="">
                Selecciona una categoría
              </NativeSelectOption>
              {categories.map((category) => (
                <NativeSelectOption key={category} value={category}>
                  {category}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {errors.categoria && (
              <p className="field-error" id="categoria-error" role="alert">
                {errors.categoria}
              </p>
            )}
          </div>
          <div className="form-actions">
            <Button type="submit" className="register-button">
              <Plus size={16} />
              Registrar producto
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              <RotateCcw size={15} />
              Limpiar
            </Button>
          </div>
          <p className="auto-code-note">El código se genera automáticamente.</p>
          {confirmation && (
            <div className="success-message" role="status">
              <CheckCircle2 size={18} />
              <p>{confirmation}</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
