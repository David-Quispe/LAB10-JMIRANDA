# Dirección visual de Bodega Atelier

Referencia explícita: dos imágenes aportadas por el usuario el 26 de octubre de 2026. Reemplazan el estilo claro anterior por un panel oscuro con dorado #D4AF37, verde #065F46, base #080C14, encabezados Space Grotesk y cuerpo Manrope. Se conserva el énfasis serif cursivo del título y de las secciones visto en la primera imagen, con Cormorant Garamond. IBM Plex Mono se limita a códigos.

La referencia del usuario gobierna los degradados suaves, bordes dorados, tarjetas de resumen y título grande. Las alertas automáticas de diseño sobre esas decisiones son excepciones intencionales, no defectos funcionales. No se utilizan métricas inventadas ni se afirma una conexión a un servidor: todos los contadores salen de los productos del estado.

Movimiento: 280 ms para contadores y confirmación, 950 ms de color en la nueva fila, transiciones de controles de 160 ms. Cada animación termina; no hay bucles ni esperas artificiales. prefers-reduced-motion suprime los desplazamientos y animaciones preservando los mensajes y el resaltado estático.

Composición: navegación lateral en escritorio, cabecera y acciones, tres tarjetas calculadas, catálogo con filtros y formulario lateral. Bajo 760 px las secciones se apilan. La tabla desplaza sus columnas dentro de su contenedor y conserva visibles los códigos.
