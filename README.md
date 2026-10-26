# Bodega — Gestión de productos

Prototipo del Laboratorio 10 de Desarrollo de Aplicaciones Empresariales. Autor: David Josue Quispe Ayamamani, grupo D.

## Ejecutar

Requiere Node.js 22.12+ o 24 y npm.

```powershell
cd C:\reactLab10\tarea-productos
npm ci
npm run dev
```

Abrir http://127.0.0.1:5173. No requiere Django, API, base de datos ni servicios externos. Las fuentes también se incluyen en el proyecto mediante paquetes npm. Los productos nuevos existen únicamente en memoria y se descartan al recargar.

## Tecnologías

React 19 con componentes funcionales, TypeScript, Vite 8, Tailwind CSS 4 y componentes reales de shadcn/ui (Button, Input, Label, Card, Table y NativeSelect). Los componentes se generaron con la CLI de shadcn y se personalizaron. Iconos de Lucide; tipografía Space Grotesk y Manrope; Cormorant Garamond para énfasis cursivos e IBM Plex Mono para códigos.

## Funciones

- Cinco productos iniciales en tres categorías, con código, descripción y precio en soles.
- Registro con descripción de al menos tres caracteres, precio positivo y categoría obligatoria.
- Código numérico único generado con un contador `useRef`, mostrado como PRD-0006.
- Actualización inmediata de la tabla con `useState`, sin recargar ni modificar directamente el DOM de la tabla.
- Limpiar campos y mensajes; validaciones por campo, foco al primer error y confirmación accesible.
- Búsqueda por descripción, código o categoría, insensible a tildes; filtros y ordenamiento por precio.
- Exportación CSV de todos los productos de la sesión, opcional y manual.
- Interfaz adaptable; la tabla mantiene sus campos y se desplaza dentro de su contenedor en móvil.

## Estructura

- `src/App.tsx`: estado compartido, generación de códigos, composición y CSV.
- `src/data/products.ts`: tipos, cinco ejemplos, categorías y formato de moneda.
- `src/components/product-form.tsx`: campos controlados, eventos, limpieza y confirmación.
- `src/components/product-list.tsx`: tabla, búsqueda, filtros y ordenamiento.
- `src/lib/product-validation.ts`: reglas de validación.
- `src/components/ui/`: componentes generados por shadcn/ui.
- `src/index.css` y `src/App.css`: Tailwind, fuentes y estilos adaptables.
- `tests/products.spec.ts`: 19 casos de requisitos obligatorios.
- `tests/extended.spec.ts`: 46 casos adicionales de interfaz, filtros, límites, teclado y animación.
- `tests/validation.spec.ts`: 31 casos aislados de validación y CSV.
- `src/lib/product-csv.ts`: exportación CSV con neutralización de fórmulas.
- `scripts/resumen-pruebas.mjs`: resumen del resultado real guardado; ejecutar npm run test:summary.

## Verificación

```powershell
npm run lint
npm run build
npm test
npm run test:report
```

Las pruebas usan Microsoft Edge instalado. En equipos que no lo tengan, instalar el navegador de Playwright y cambiar `channel` en `playwright.config.ts` según el navegador disponible.

Se verificaron 96 casos (65 de interfaz y 31 unitarios): los ocho escenarios obligatorios y variantes de entradas vacías, espacios, precio cero/negativo; códigos únicos, recarga temporal, búsqueda, filtros, orden, CSV, móvil, tableta y ausencia de llamadas a una API. Resultados: 96 aprobadas, 0 fallidas, 0 omitidas. Evidencias en `evidencias/`.

## Creación y configuración

```powershell
cd C:\reactLab10
npm create vite@latest tarea-productos -- --template react-ts
cd tarea-productos
npm install
npm install tailwindcss @tailwindcss/vite lucide-react @fontsource/ibm-plex-sans @fontsource/ibm-plex-mono
npm install -D @types/node @playwright/test
npx shadcn@latest init -d -y
npx shadcn@latest add input label card table native-select badge -y
```

Se configuraron el alias `@/` y el plugin de Tailwind en Vite. `baseUrl` se omitió porque TypeScript 6 ya lo marca como obsoleto; los alias usan rutas relativas. La tarea se creó en una carpeta independiente para conservar el laboratorio anterior con Django.

## Referencias consultadas

- [Shopify: búsqueda y filtros de productos](https://help.shopify.com/en/manual/products/searching-filtering): búsqueda y categorías cerca de la tabla.
- [shadcn/ui Tasks](https://ui.shadcn.com/examples/tasks): tabla, filtros y controles compactos.
- [shadcn/ui para Vite](https://ui.shadcn.com/docs/installation/vite): instalación y alias.
- [Tailwind CSS con Vite](https://tailwindcss.com/docs/installation/using-vite): integración oficial.
- [React useState](https://react.dev/reference/react/useState): estado y actualizaciones.

Diseño propio llamado Bodega, ahora Bodega Atelier, siguiendo las referencias oscuras y doradas aportadas por el usuario. Incluye contadores animados (280 ms), confirmación animada (280 ms), resaltado de nueva fila (950 ms) y respeto a prefers-reduced-motion. No se copió código de productos comerciales ni se utilizaron servicios de pago.
