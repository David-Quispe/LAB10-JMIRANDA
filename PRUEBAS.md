# Pruebas de Bodega Atelier

Ejecución real del 26/10/2026: **96 aprobadas, 0 fallidas, 0 omitidas**, en 82.3 segundos. Hay 65 pruebas de interfaz en Edge y 31 pruebas aisladas. Este registro no sustituye una nueva ejecución después de cambiar el código.

## Reproducir

Ejecutar `npm ci`, `npm test`, `npm run lint` y `npm run build`. Playwright inicia Vite si no hay una instancia disponible. Se usa Microsoft Edge instalado. `npm run test:report` abre el informe HTML de la última ejecución; `npm run test:summary` resume el JSON de evidencia conservado.

## Alcance y aislamiento

Cada caso de interfaz comienza con una página nueva y los cinco ejemplos. Se prueban las ocho situaciones obligatorias, entradas límite, diez altas consecutivas, recuperación tras errores, búsqueda combinada, exportación, teclado, anchuras de 320 a 1920 px y movimiento reducido. Las pruebas aisladas verifican validación sin mutar los campos, contenido del CSV y protección contra fórmulas. No se utilizan base de datos, API ni almacenamiento local.

La aprobación refleja las aserciones descritas a continuación; no equivale a certificar accesibilidad completa con lector de pantalla ni compatibilidad con todos los navegadores.

## Casos y resultados

### 01. R01 acepta mínimo de tres caracteres

**Comprobación:** Aceptar el valor límite indicado; agregar la sexta fila y mostrar confirmación.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:44` · 1409 ms.

### 02. R01 acepta acentos y eñe

**Comprobación:** Aceptar el valor límite indicado; agregar la sexta fila y mostrar confirmación.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:44` · 1172 ms.

### 03. R01 acepta espacios exteriores

**Comprobación:** Aceptar el valor límite indicado; agregar la sexta fila y mostrar confirmación.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:44` · 1154 ms.

### 04. R01 acepta precio mínimo monetario

**Comprobación:** Aceptar el valor límite indicado; agregar la sexta fila y mostrar confirmación.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:44` · 1185 ms.

### 05. R01 acepta precio máximo permitido

**Comprobación:** Aceptar el valor límite indicado; agregar la sexta fila y mostrar confirmación.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:44` · 1120 ms.

### 06. R01 acepta precio entero

**Comprobación:** Aceptar el valor límite indicado; agregar la sexta fila y mostrar confirmación.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:44` · 1171 ms.

### 07. R01 acepta un decimal

**Comprobación:** Aceptar el valor límite indicado; agregar la sexta fila y mostrar confirmación.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:44` · 1063 ms.

### 08. R01 acepta 120 caracteres

**Comprobación:** Aceptar el valor límite indicado; agregar la sexta fila y mostrar confirmación.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:44` · 1130 ms.

### 09. R02 actualiza el contador de Bebidas

**Comprobación:** Incrementar solo el contador de la categoría registrada, junto al total global.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:53` · 1227 ms.

### 10. R02 actualiza el contador de Abarrotes

**Comprobación:** Incrementar solo el contador de la categoría registrada, junto al total global.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:53` · 1097 ms.

### 11. R02 actualiza el contador de Limpieza

**Comprobación:** Incrementar solo el contador de la categoría registrada, junto al total global.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:53` · 1111 ms.

### 12. R03 diez registros consecutivos conservan códigos únicos y datos iniciales

**Comprobación:** Registrar diez productos: quince filas, quince códigos distintos y último código 15.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:64` · 2518 ms.

### 13. R04 las etiquetas HTML se muestran como texto sin ejecutar scripts

**Comprobación:** Mostrar HTML como texto; no crear imágenes ni ejecutar cuadros de diálogo.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:76` · 1109 ms.

### 14. R05 Enter envía el formulario y conserva el precio con dos decimales

**Comprobación:** Enviar con Enter desde el precio, obtener seis filas y mostrar 3.50.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:91` · 1188 ms.

### 15. V01 rechaza el precio fuera de formato 1.234

**Comprobación:** Rechazar formato excesivo o precio superior al máximo; no agregar filas.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:108` · 1142 ms.

### 16. V01 rechaza el precio fuera de formato 1000000

**Comprobación:** Rechazar formato excesivo o precio superior al máximo; no agregar filas.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:108` · 1105 ms.

### 17. V02 dirige el foco al precio si solo el precio está mal

**Comprobación:** Con descripción y categoría válidas, enfocar precio si contiene -2.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:116` · 1114 ms.

### 18. V03 dirige el foco a la categoría si solo falta la categoría

**Comprobación:** Con descripción y precio válidos, enfocar la categoría vacía.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:122` · 1085 ms.

### 19. V04 corregir un campo retira solo su error

**Comprobación:** Tras tres errores, corregir descripción retira solo ese error y su aria-invalid.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:128` · 998 ms.

### 20. V05 corregir datos inválidos permite el registro sin consumir códigos

**Comprobación:** Corregir un envío vacío permite registrar con código 6, sin saltos ni errores.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:135` · 1202 ms.

### 21. V06 editar después de un éxito retira la confirmación anterior

**Comprobación:** Editar un campo retira la confirmación antigua para evitar un éxito engañoso.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:144` · 1215 ms.

### 22. V07 Limpiar después de un éxito conserva los productos

**Comprobación:** Limpiar tras registrar conserva seis filas, retira la confirmación y enfoca descripción.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:152` · 1202 ms.

### 23. V08 un error conserva los campos válidos para corregirlo

**Comprobación:** Un error de precio conserva descripción y categoría para facilitar su corrección.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:161` · 1021 ms.

### 24. V09 no se puede superar el límite de 120 caracteres en el campo

**Comprobación:** El campo impide introducir más de 120 caracteres.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:168` · 995 ms.

### 25. C01 búsqueda de PRD-0003

**Comprobación:** Encontrar la fila esperada por código, mayúsculas, espacios o categoría.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:186` · 1166 ms.

### 26. C01 búsqueda de COCA COLA

**Comprobación:** Encontrar la fila esperada por código, mayúsculas, espacios o categoría.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:186` · 1022 ms.

### 27. C01 búsqueda de   agua  

**Comprobación:** Encontrar la fila esperada por código, mayúsculas, espacios o categoría.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:186` · 1087 ms.

### 28. C01 búsqueda de limpieza

**Comprobación:** Encontrar la fila esperada por código, mayúsculas, espacios o categoría.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:186` · 965 ms.

### 29. C02 borrar la búsqueda restituye la lista completa

**Comprobación:** El botón de borrar deja la consulta vacía y recupera las cinco filas.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:192` · 984 ms.

### 30. C03 categoría y búsqueda se combinan, y el vacío permite recuperar

**Comprobación:** Mostrar vacío al cruzar Bebidas y Arroz; Limpiar filtros recupera todo.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:200` · 1771 ms.

### 31. C04 el tercer clic en Precio recupera el orden inicial

**Comprobación:** El tercer clic restituye el orden de códigos original y aria-sort none.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:216` · 1164 ms.

### 32. C05 los filtros no cambian los contadores globales

**Comprobación:** Filtrar a Limpieza deja una fila y mantiene los totales globales.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:227` · 1047 ms.

### 33. C06 registrar con filtros activos muestra la nueva fila y limpia filtros

**Comprobación:** Registrar Limpieza desde filtro de Bebidas elimina filtros y muestra la sexta fila.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:235` · 1263 ms.

### 34. C07 una fila recién registrada tiene una sola etiqueta Nuevo

**Comprobación:** Solo la última fila registrada conserva la etiqueta Nuevo.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:245` · 1394 ms.

### 35. E01 CSV incluye productos nuevos aunque haya un filtro activo

**Comprobación:** Exportar las seis filas reales, aun cuando un filtro muestre solo dos.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:259` · 1743 ms.

### 36. E02 el encabezado Nuevo producto enfoca el formulario

**Comprobación:** El botón Nuevo producto dirige el foco a la descripción del formulario.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:271` · 1086 ms.

### 37. E03 el enlace de salto funciona con teclado

**Comprobación:** Tab enfoca el enlace de salto y Enter lleva al contenido principal.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:279` · 1144 ms.

### 38. E04 todos los campos obligatorios tienen etiquetas y ayudas accesibles

**Comprobación:** Campos etiquetados como obligatorios y errores relacionados mediante aria-describedby.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:287` · 1193 ms.

### 39. E05 preferencia de movimiento reducido suprime la animación sin bloquear el registro

**Comprobación:** Con movimiento reducido, registrar con éxito y suprimir animaciones de fila y mensaje.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:298` · 1161 ms.

### 40. E06 tema oscuro y fuentes solicitadas se cargan localmente

**Comprobación:** Usar color-scheme dark, Space Grotesk en título y Manrope en cuerpo.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:315` · 1016 ms.

### 41. E07 sin desbordamiento de página a 320px

**Comprobación:** La anchura total de la página no supera la ventana en el tamaño indicado.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:336` · 859 ms.

### 42. E07 sin desbordamiento de página a 375px

**Comprobación:** La anchura total de la página no supera la ventana en el tamaño indicado.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:336` · 874 ms.

### 43. E07 sin desbordamiento de página a 1024px

**Comprobación:** La anchura total de la página no supera la ventana en el tamaño indicado.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:336` · 941 ms.

### 44. E07 sin desbordamiento de página a 1920px

**Comprobación:** La anchura total de la página no supera la ventana en el tamaño indicado.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:336` · 1007 ms.

### 45. E08 la tabla móvil permite consultar las columnas que quedan fuera de vista

**Comprobación:** Desplazar horizontalmente la tabla móvil dentro de su propio contenedor.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:348` · 918 ms.

### 46. E09 nueva fila y confirmación tienen animación corta sin bucles

**Comprobación:** La animación ledger-entry se ejecuta una sola vez y la confirmación es visible.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `extended.spec.ts:361` · 1170 ms.

### 47. P01 muestra los cinco productos iniciales con todos sus campos

**Comprobación:** Verificar cinco filas, código, descripción, precio, categoría y título de la pantalla.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:20` · 1352 ms.

### 48. P02 registra datos válidos, limpia formulario y confirma

**Comprobación:** Registrar el producto, confirmar la operación, vaciar campos y obtener seis filas.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:34` · 1500 ms.

### 49. P03 actualiza tabla sin recargar y genera códigos únicos consecutivos

**Comprobación:** Obtener códigos 6 y 7 sin duplicados y sin navegación de página.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:53` · 1361 ms.

### 50. P04 rechaza descripción ""

**Comprobación:** Rechazar la descripción indicada; mostrar su error y conservar cinco filas.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:70` · 1106 ms.

### 51. P04 rechaza descripción "ab"

**Comprobación:** Rechazar la descripción indicada; mostrar su error y conservar cinco filas.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:70` · 1151 ms.

### 52. P04 rechaza descripción "   "

**Comprobación:** Rechazar la descripción indicada; mostrar su error y conservar cinco filas.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:70` · 1219 ms.

### 53. P05 rechaza precio ""

**Comprobación:** Rechazar el precio indicado; mostrar su error y conservar cinco filas.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:82` · 1059 ms.

### 54. P05 rechaza precio "0"

**Comprobación:** Rechazar el precio indicado; mostrar su error y conservar cinco filas.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:82` · 1126 ms.

### 55. P05 rechaza precio "-1"

**Comprobación:** Rechazar el precio indicado; mostrar su error y conservar cinco filas.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:82` · 1087 ms.

### 56. P06 rechaza registro sin categoría

**Comprobación:** Impedir el alta sin categoría y mostrar la ayuda correspondiente.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:93` · 1097 ms.

### 57. P07 Limpiar restablece campos y mensajes

**Comprobación:** Vaciar campos y errores al limpiar, sin modificar los cinco productos.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:101` · 1193 ms.

### 58. P08 muestra validaciones y dirige foco al primer campo incorrecto

**Comprobación:** Mostrar los tres errores y dirigir el foco a la descripción.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:114` · 1303 ms.

### 59. P09 recargar recupera los ejemplos y descarta cambios temporales

**Comprobación:** Volver a cinco ejemplos al recargar y descartar el registro temporal.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:127` · 1405 ms.

### 60. P10 buscar, filtrar y restablecer funciona sin alterar el catálogo

**Comprobación:** Combinar consulta y categoría; recuperar el listado ante una búsqueda sin resultados.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:141` · 1617 ms.

### 61. P11 ordena por precio ascendente y descendente

**Comprobación:** Ordenar por precio: Agua primero en ascendente y Aceite primero en descendente.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:159` · 1121 ms.

### 62. P12 exporta los productos actuales en CSV

**Comprobación:** Descargar CSV con nombre correcto, encabezados y las cinco filas iniciales.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:165` · 1281 ms.

### 63. P13 interfaz adaptable a 390px y registro operativo

**Comprobación:** Registrar un producto en el tamaño indicado sin desbordar la página.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:176` · 2019 ms.

### 64. P13 interfaz adaptable a 768px y registro operativo

**Comprobación:** Registrar un producto en el tamaño indicado sin desbordar la página.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:176` · 1377 ms.

### 65. P14 funciona sin API ni servicios externos y sin errores de consola

**Comprobación:** Registrar sin llamadas a API, solicitudes externas ni errores JavaScript.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `products.spec.ts:199` · 1779 ms.

### 66. U01 precio vacío se rechaza

**Comprobación:** La función de validación devuelve error de precio para la entrada indicada.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:25` · 2 ms.

### 67. U01 precio cero se rechaza

**Comprobación:** La función de validación devuelve error de precio para la entrada indicada.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:25` · 0 ms.

### 68. U01 precio negativo se rechaza

**Comprobación:** La función de validación devuelve error de precio para la entrada indicada.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:25` · 0 ms.

### 69. U01 precio no numérico se rechaza

**Comprobación:** La función de validación devuelve error de precio para la entrada indicada.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:25` · 0 ms.

### 70. U01 precio infinito se rechaza

**Comprobación:** La función de validación devuelve error de precio para la entrada indicada.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:25` · 0 ms.

### 71. U01 precio NaN se rechaza

**Comprobación:** La función de validación devuelve error de precio para la entrada indicada.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:25` · 0 ms.

### 72. U01 precio solo espacios se rechaza

**Comprobación:** La función de validación devuelve error de precio para la entrada indicada.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:25` · 1 ms.

### 73. U01 precio tres decimales se rechaza

**Comprobación:** La función de validación devuelve error de precio para la entrada indicada.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:25` · 0 ms.

### 74. U01 precio sobre el máximo se rechaza

**Comprobación:** La función de validación devuelve error de precio para la entrada indicada.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:25` · 1 ms.

### 75. U01 precio notación exponencial se rechaza

**Comprobación:** La función de validación devuelve error de precio para la entrada indicada.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:25` · 0 ms.

### 76. U01 precio coma decimal se rechaza

**Comprobación:** La función de validación devuelve error de precio para la entrada indicada.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:25` · 0 ms.

### 77. U02 descripción válida tres caracteres

**Comprobación:** La función acepta la descripción indicada con los otros datos válidos.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:37` · 1 ms.

### 78. U02 descripción válida Unicode

**Comprobación:** La función acepta la descripción indicada con los otros datos válidos.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:37` · 0 ms.

### 79. U02 descripción válida espacios exteriores

**Comprobación:** La función acepta la descripción indicada con los otros datos válidos.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:37` · 0 ms.

### 80. U02 descripción válida longitud máxima

**Comprobación:** La función acepta la descripción indicada con los otros datos válidos.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:37` · 0 ms.

### 81. U03 descripción inválida vacía

**Comprobación:** La función devuelve error de descripción para el caso inválido indicado.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:47` · 1 ms.

### 82. U03 descripción inválida dos caracteres

**Comprobación:** La función devuelve error de descripción para el caso inválido indicado.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:47` · 2 ms.

### 83. U03 descripción inválida solo espacios

**Comprobación:** La función devuelve error de descripción para el caso inválido indicado.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:47` · 1 ms.

### 84. U03 descripción inválida sobre 120

**Comprobación:** La función devuelve error de descripción para el caso inválido indicado.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:47` · 2 ms.

### 85. U04 categoría no permitida ""

**Comprobación:** Rechazar categoría vacía, desconocida o con capitalización no permitida.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:54` · 2 ms.

### 86. U04 categoría no permitida "Electrónica"

**Comprobación:** Rechazar categoría vacía, desconocida o con capitalización no permitida.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:54` · 1 ms.

### 87. U04 categoría no permitida "bebidas"

**Comprobación:** Rechazar categoría vacía, desconocida o con capitalización no permitida.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:54` · 3 ms.

### 88. U05 tres errores independientes se devuelven juntos

**Comprobación:** Devolver simultáneamente tres errores independientes para el formulario vacío.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:60` · 1 ms.

### 89. U06 validar no modifica el objeto original

**Comprobación:** Validar sin mutar el objeto de campos recibido.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:67` · 1 ms.

### 90. U07 cinco ejemplos con códigos únicos y precios positivos

**Comprobación:** Mantener cinco ejemplos con códigos distintos y precios positivos.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:74` · 2 ms.

### 91. U08 CSV conserva comas y escapa comillas en la descripción

**Comprobación:** Conservar comas y duplicar correctamente las comillas dentro del CSV.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:79` · 1 ms.

### 92. U09 neutraliza fórmula CSV =2+2

**Comprobación:** Anteponer un apóstrofo a una descripción que podría ejecutarse como fórmula.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:86` · 1 ms.

### 93. U09 neutraliza fórmula CSV +SUM(1,2)

**Comprobación:** Anteponer un apóstrofo a una descripción que podría ejecutarse como fórmula.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:86` · 1 ms.

### 94. U09 neutraliza fórmula CSV -2+3

**Comprobación:** Anteponer un apóstrofo a una descripción que podría ejecutarse como fórmula.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:86` · 1 ms.

### 95. U09 neutraliza fórmula CSV @SUM(1,2)

**Comprobación:** Anteponer un apóstrofo a una descripción que podría ejecutarse como fórmula.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:86` · 1 ms.

### 96. U10 lista vacía exporta solo encabezados y marca UTF8

**Comprobación:** Exportar solo encabezados para lista vacía y conservar marca UTF8.

**Resultado observado:** aprobado; todas sus aserciones se cumplieron. `validation.spec.ts:93` · 2 ms.
