import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import {
  categories,
  formatCode,
  formatPrice,
  type Product,
} from "@/data/products";
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function ProductList({
  products,
  lastAdded,
}: {
  products: Product[];
  lastAdded: number | null;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc" | null>(null);
  const visible = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        (category === "Todas" || p.categoria === category) &&
        normalize(
          `${p.descripcion} ${formatCode(p.codigo)} ${p.categoria}`,
        ).includes(normalize(query.trim())),
    );
    return priceOrder
      ? [...filtered].sort((a, b) =>
          priceOrder === "asc" ? a.precio - b.precio : b.precio - a.precio,
        )
      : filtered;
  }, [products, query, category, priceOrder]);
  function clearFilters() {
    setQuery("");
    setCategory("Todas");
    setPriceOrder(null);
  }
  return (
    <section
      id="catalogo"
      className="catalog-panel"
      aria-labelledby="catalog-title"
    >
      <div className="list-heading">
        <h2 id="catalog-title">Catálogo de productos</h2>
        <span>{products.length} en total</span>
      </div>
      <div className="category-filters" aria-label="Filtrar por categoría">
        {["Todas", ...categories].map((name) => (
          <button
            key={name}
            onClick={() => setCategory(name)}
            aria-pressed={category === name}
            className={
              category === name ? "category-filter selected" : "category-filter"
            }
          >
            {name}
            <span>
              {name === "Todas"
                ? products.length
                : products.filter((p) => p.categoria === name).length}
            </span>
          </button>
        ))}
      </div>
      <div className="search-row">
        <div className="search-input">
          <Search size={17} aria-hidden="true" />
          <Input
            aria-label="Buscar productos"
            placeholder="Buscar por nombre o código..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              aria-label="Borrar búsqueda"
              className="clear-search"
              onClick={() => setQuery("")}
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>
      <Table>
        <TableCaption className="sr-only">
          Productos simulados disponibles durante la sesión actual
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead
              className="text-right"
              aria-sort={
                priceOrder === "asc"
                  ? "ascending"
                  : priceOrder === "desc"
                    ? "descending"
                    : "none"
              }
            >
              <button
                className="sort-button"
                onClick={() =>
                  setPriceOrder((current) =>
                    current === null
                      ? "asc"
                      : current === "asc"
                        ? "desc"
                        : null,
                  )
                }
                aria-label="Ordenar por precio"
              >
                Precio{" "}
                {priceOrder === "asc" ? (
                  <ArrowUp size={13} />
                ) : priceOrder === "desc" ? (
                  <ArrowDown size={13} />
                ) : (
                  <ArrowUpDown size={13} />
                )}
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.length ? (
            visible.map((p) => (
              <TableRow
                key={p.codigo}
                className={lastAdded === p.codigo ? "recent-row" : ""}
              >
                <TableCell className="product-code">
                  {formatCode(p.codigo)}
                </TableCell>
                <TableCell className="product-description">
                  {p.descripcion}
                  {lastAdded === p.codigo && (
                    <span className="new-label">Nuevo</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="category-label">{p.categoria}</span>
                </TableCell>
                <TableCell className="product-price">
                  {formatPrice(p.precio)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="empty-state">
                <strong>No encontramos productos</strong>
                <p>Prueba con otro nombre o categoría.</p>
                <Button variant="link" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="list-footer">
        <span>
          Mostrando {visible.length} de {products.length} productos
        </span>
        {(query || category !== "Todas") && (
          <button onClick={clearFilters}>Limpiar filtros</button>
        )}
      </div>
    </section>
  );
}
