import { useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Boxes,
  ClipboardList,
  Info,
  Plus,
  ShoppingBasket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/product-form";
import { ProductList } from "@/components/product-list";
import {
  initialProducts,
  type Product,
  type ProductInput,
} from "@/data/products";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState<Product[]>(() =>
    initialProducts.map((p) => ({ ...p })),
  );
  const [lastAdded, setLastAdded] = useState<number | null>(null);
  const nextCode = useRef(
    Math.max(...initialProducts.map((p) => p.codigo)) + 1,
  );
  const formSection = useRef<HTMLElement>(null);
  const categories = new Set(products.map((p) => p.categoria)).size;

  function registerProduct(input: ProductInput) {
    const codigo = nextCode.current++;
    setProducts((current) => [...current, { ...input, codigo }]);
    setLastAdded(codigo);
  }

  function focusForm() {
    formSection.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("descripcion")?.focus({ preventScroll: true });
  }

  function exportProducts() {
    const cell = (value: string | number) =>
      `"${String(value).replaceAll('"', '""')}"`;
    const rows = [
      ["Código", "Descripción", "Precio", "Categoría"],
      ...products.map((p) => [
        p.codigo,
        p.descripcion,
        p.precio.toFixed(2),
        p.categoria,
      ]),
    ];
    const url = URL.createObjectURL(
      new Blob(
        ["\uFEFF" + rows.map((row) => row.map(cell).join(",")).join("\r\n")],
        { type: "text/csv;charset=utf-8" },
      ),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "catalogo-bodega.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="app-frame">
      <a href="#contenido" className="skip-link">
        Ir al contenido
      </a>
      <aside className="sidebar">
        <a className="brand" href="#contenido" aria-label="Bodega, inicio">
          <ShoppingBasket size={26} strokeWidth={1.7} />
          <span>
            bodega<span className="brand-period">.</span>
          </span>
        </a>
        <div className="workspace">
          <span className="workspace-monogram">B</span>
          <div>
            <strong>Mi catálogo</strong>
            <span>Espacio de práctica</span>
          </div>
        </div>
        <nav aria-label="Navegación principal">
          <a className="nav-item active" href="#catalogo" aria-current="page">
            <Boxes size={18} />
            Productos<span>{products.length}</span>
          </a>
          <button className="nav-item" onClick={focusForm}>
            <Plus size={18} />
            Registrar producto
          </button>
        </nav>
        <div className="sidebar-bottom">
          <ClipboardList size={18} />
          <div>
            <strong>Laboratorio 10</strong>
            <span>Componentes y eventos</span>
          </div>
        </div>
      </aside>
      <div className="workspace-main">
        <div className="topbar">
          <span>
            Mi catálogo <span className="breadcrumb-divider">/</span>{" "}
            <strong>Productos</strong>
          </span>
          <span className="session-status">
            <span />
            Sesión local
          </span>
        </div>
        <main className="sheet" id="contenido">
          <header className="page-heading">
            <div>
              <h1>Gestión de productos</h1>
              <p>Todo tu catálogo, en un solo lugar.</p>
            </div>
            <Button
              variant="outline"
              className="export-button"
              onClick={exportProducts}
            >
              <ArrowDownToLine size={16} />
              Exportar CSV
            </Button>
          </header>
          <div className="session-note">
            <Info size={17} aria-hidden="true" />
            <p>
              <strong>Un espacio para practicar.</strong> Los productos se
              guardan solo durante esta sesión. Al recargar, vuelves a los cinco
              ejemplos iniciales.
            </p>
          </div>
          <div className="catalog-summary" aria-label="Resumen del catálogo">
            <div>
              <span>Productos en catálogo</span>
              <strong>{products.length.toString().padStart(2, "0")}</strong>
            </div>
            <div>
              <span>Categorías presentes</span>
              <strong>{categories.toString().padStart(2, "0")}</strong>
            </div>
            <div>
              <span>Agregados en esta sesión</span>
              <strong className={products.length > 5 ? "positive-number" : ""}>
                {(products.length - 5).toString().padStart(2, "0")}
              </strong>
            </div>
          </div>
          <div className="content-grid">
            <ProductList products={products} lastAdded={lastAdded} />
            <section
              ref={formSection}
              id="registro"
              aria-labelledby="form-title"
            >
              <ProductForm onRegister={registerProduct} />
            </section>
          </div>
          <footer className="page-footer">
            <span>
              <span className="footer-dot" />
              Datos de ejemplo · Sin almacenamiento permanente
            </span>
            <a
              href="https://github.com/David-Quispe/LAB10-JMIRANDA"
              target="_blank"
              rel="noreferrer"
            >
              Ver proyecto
              <ArrowUpRight size={14} />
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
