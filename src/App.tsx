import { useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Boxes,
  ClipboardList,
  Info,
  Plus,
  Diamond,
  Layers3,
  Sparkles,
  ShieldCheck,
  PackagePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/product-form";
import { ProductList } from "@/components/product-list";
import {
  initialProducts,
  categories as productCategories,
  type Product,
  type ProductInput,
  formatCode,
} from "@/data/products";
import { buildProductsCsv } from "@/lib/product-csv";
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
  const categoryCount = new Set(products.map((p) => p.categoria)).size;
  const sessionCount = products.length - initialProducts.length;

  function registerProduct(input: ProductInput) {
    const codigo = nextCode.current++;
    setProducts((current) => [...current, { ...input, codigo }]);
    setLastAdded(codigo);
  }

  function focusForm() {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    formSection.current?.scrollIntoView({
      behavior: reduce ? "instant" : "smooth",
      block: "start",
    });
    document.getElementById("descripcion")?.focus({ preventScroll: true });
  }

  function exportProducts() {
    const url = URL.createObjectURL(
      new Blob([buildProductsCsv(products)], {
        type: "text/csv;charset=utf-8",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "catalogo-bodega.csv";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return (
    <div className="app-frame">
      <a href="#contenido" className="skip-link">
        Ir al contenido
      </a>
      <aside className="sidebar">
        <a className="brand" href="#contenido" aria-label="Bodega, inicio">
          <span className="brand-symbol">
            <Diamond size={24} strokeWidth={1.7} />
          </span>
          <span>
            bodega<span className="brand-period">.</span>
            <small>Atelier de productos</small>
          </span>
        </a>
        <div className="workspace">
          <span className="workspace-monogram">B</span>
          <div>
            <strong>
              Mi catálogo <i />
            </strong>
            <span>Espacio de práctica</span>
          </div>
        </div>
        <nav aria-label="Navegación principal">
          <a className="nav-item active" href="#catalogo" aria-current="page">
            <Boxes size={17} />
            Productos<span>{products.length}</span>
          </a>
          <button className="nav-item" onClick={focusForm}>
            <Plus size={17} />
            Registrar producto
          </button>
          <a className="nav-item" href="#categorias">
            <Layers3 size={17} />
            Categorías
          </a>
          <a
            className="nav-item"
            href="https://github.com/David-Quispe/LAB10-JMIRANDA"
            target="_blank"
            rel="noreferrer"
          >
            <ClipboardList size={17} />
            Código y pruebas
            <ArrowUpRight size={13} />
          </a>
        </nav>
        <div className="sidebar-bottom">
          <ShieldCheck size={18} />
          <div>
            <strong>Memoria de sesión</strong>
            <span>Sin persistencia ni servidor externo.</span>
          </div>
        </div>
      </aside>
      <div className="workspace-main">
        <div className="topbar">
          <div className="breadcrumb">
            <span className="atelier-name">
              <Sparkles size={14} />
              Atelier
            </span>
            <span>Mi catálogo</span>
            <span className="breadcrumb-current">Productos</span>
          </div>
          <span className="session-status">
            <span />
            Sesión local
          </span>
        </div>
        <main className="sheet" id="contenido">
          <header className="hero-block">
            <div className="page-heading">
              <div>
                <p className="hero-label">
                  <Sparkles size={13} />
                  Tu catálogo, con otra mirada
                </p>
                <h1>
                  Gestión de <em>productos</em>
                </h1>
                <p className="hero-description">
                  Cada producto en su lugar. Consulta, organiza y da forma a tu
                  catálogo desde un mismo espacio.
                </p>
              </div>
              <div className="heading-actions">
                <Button
                  variant="outline"
                  className="export-button"
                  onClick={exportProducts}
                >
                  <ArrowDownToLine size={16} />
                  Exportar CSV
                </Button>
                <Button className="new-product-button" onClick={focusForm}>
                  <Plus size={17} />
                  Nuevo producto
                </Button>
              </div>
            </div>
            <div className="session-note">
              <Info size={19} aria-hidden="true" />
              <p>
                <strong>Un espacio para practicar.</strong> Los productos se
                guardan solo durante esta sesión. Al recargar, vuelves a los
                cinco ejemplos iniciales.
              </p>
            </div>
          </header>
          <div className="catalog-summary" aria-label="Resumen del catálogo">
            <div className="summary-card">
              <div className="summary-top">
                <span>Productos en catálogo</span>
                <Boxes size={18} />
              </div>
              <strong key={products.length} className="count-value">
                {products.length.toString().padStart(2, "0")}
              </strong>
              <div className="summary-rule" />
              <p>
                {initialProducts.length} ejemplos iniciales · {sessionCount}{" "}
                nuevos
              </p>
            </div>
            <div className="summary-card category-summary">
              <div className="summary-top">
                <span>Categorías presentes</span>
                <Layers3 size={18} />
              </div>
              <strong className="count-value">
                {categoryCount.toString().padStart(2, "0")}
              </strong>
              <div className="category-distribution" aria-hidden="true">
                {productCategories.map((category) => (
                  <span
                    key={category}
                    data-category={category}
                    style={{
                      flex: products.filter((p) => p.categoria === category)
                        .length,
                    }}
                  />
                ))}
              </div>
              <p>Bebidas, Abarrotes y Limpieza</p>
            </div>
            <div className="summary-card">
              <div className="summary-top">
                <span>Nuevos en esta sesión</span>
                <PackagePlus size={18} />
              </div>
              <strong key={sessionCount} className="count-value">
                {sessionCount.toString().padStart(2, "0")}
              </strong>
              <div className="summary-rule session-rule" />
              <p>
                {lastAdded
                  ? `Último registro: ${formatCode(lastAdded)}`
                  : "Tu próximo producto empieza aquí."}
              </p>
            </div>
          </div>
          <div className="content-grid">
            <ProductList
              key={lastAdded ?? "initial"}
              products={products}
              lastAdded={lastAdded}
            />
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
