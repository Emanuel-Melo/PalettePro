# PalettePro

PalettePro es una aplicación web para generar paletas de color aleatorias con un estilo visual moderno, una interfaz interactiva y un fondo animado con efecto de fluido. Permite explorar combinaciones de colores, elegir el formato de salida y copiar cada código de color al portapapeles con un solo clic.

## Demo

https://palette--pro.vercel.app/ 

## Descripción

La idea principal del proyecto es ofrecer una herramienta ligera, visualmente atractiva y fácil de usar para crear combinaciones cromáticas útiles para diseño, branding, mockups o inspiración creativa. La app combina HTML, CSS y JavaScript puro, junto con una simulación de fluidos en WebGL para darle un toque distintivo a la experiencia.

## Características principales

- Generación aleatoria de colores en formato HEX y HSL.
- Selección de 6, 8 o 9 colores por paleta.
- Tarjetas de color con vista de muestra y valores HEX, RGB y HSL.
- Copia de un color al hacer clic en cualquier parte de su tarjeta, con confirmación temporal mediante un icono de verificación.
- Indicador animado de desplazamiento en la pantalla principal, con contorno multicolor; desaparece al comenzar a hacer scroll.
- Feedback visual al crear una nueva combinación.
- Menú desplegable personalizado para elegir la cantidad de colores.
- Toggle animado para cambiar entre HEX y HSL.
- Botón principal con efecto líquido reactivo al movimiento del cursor.
- Fondo de pantalla con simulación de fluido arcoíris y partículas de tinta.
- Interfaz responsive adaptada para escritorio, tablet y móvil.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript vanilla
- WebGL
- GLSL shaders
- Canvas 2D para efectos complementarios

No se usan librerías externas para la lógica principal ni para la simulación del fondo.

## Estructura del proyecto

```text
ProyectoM1_EmanuelFlórez/
├── index.html
├── README.md
├── css/
│   ├── components.css
│   ├── responsive.css
│   ├── style.css
│   └── variables.css
├── js/
│   ├── app.js
│   ├── button-liquid.js
│   ├── clipboard.js
│   ├── color.js
│   ├── config.js
│   ├── fluid.js
│   ├── loader.js
│   ├── palette.js
│   ├── script.js
│   └── store.js
├── docs/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── Documentacion/
│   └── capturas/
└── .git/
```

### Archivos clave

- [index.html](index.html): estructura principal de la interfaz.
- [js/app.js](js/app.js): inicializa la aplicación, conecta los controles y genera paletas.
- [js/color.js](js/color.js): genera colores y calcula sus equivalencias HEX, RGB y HSL.
- [js/palette.js](js/palette.js): renderiza las tarjetas, administra el selector y copia los colores con feedback visual.
- [js/clipboard.js](js/clipboard.js): gestiona la copia al portapapeles.
- [js/fluid.js](js/fluid.js): simulación visual del fondo con WebGL y efecto de fluido.
- [js/button-liquid.js](js/button-liquid.js): efecto líquido reactivo del botón principal.
- [css/style.css](css/style.css): estilos globales, fondo y pantalla de carga.
- [css/components.css](css/components.css): estilos del hero, tarjetas, indicador de scroll, controles y botones.
- [css/responsive.css](css/responsive.css): ajustes para pantallas pequeñas.

La página principal usa los módulos de `js/` cargados desde `index.html`. `js/script.js` y los archivos de `docs/` conservan una versión anterior de la interfaz.

## Instalación y ejecución local

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
```

2. Accede a la carpeta del proyecto:

```bash
cd ProyectoM1_EmanuelFlórez
```

3. Abre el archivo `index.html` en tu navegador, o usa una extensión como Live Server en VS Code para ejecutarlo en un entorno local.

> Se recomienda usar un navegador moderno con soporte para WebGL.

## Cómo usar la app

1. Elige la cantidad de colores con el menú desplegable.
2. Selecciona el formato: HEX o HSL.
3. Haz clic en el botón principal para generar una nueva paleta.
4. Consulta los valores HEX, RGB y HSL de cada tarjeta.
5. Presiona cualquier parte de una tarjeta para copiar el código; el icono de copia se convierte brevemente en una marca de verificación.
6. Usa el indicador con flecha de la pantalla inicial para bajar al generador. Desaparece al comenzar a desplazarte.
7. Explora la experiencia visual del fondo líquido mientras te desplazas por la página.

## Personalización del efecto de fluido

En [js/fluid.js](js/fluid.js) hay una configuración central llamada `fluidConfig` que permite ajustar la sensación del fondo animado:

```js
const fluidConfig = {
    enabled: true,
    resolutionScale: 0.55,
    velocityDissipation: 0.985,
    mouseForce: 2.4,
    splatRadius: 0.001,
    pressureIterations: 12,
    trailSeconds: 2
};
```

### Parámetros principales

- `enabled`: activa o desactiva la simulación.
- `resolutionScale`: ajusta la calidad visual y el rendimiento.
- `velocityDissipation`: controla la duración del movimiento del líquido.
- `mouseForce`: modifica la intensidad del empuje generado por el cursor.
- `splatRadius`: define el tamaño de la tinta inyectada.
- `pressureIterations`: aumenta o reduce la precisión del flujo.
- `trailSeconds`: controla la duración de la estela de color.

## Decisiones técnicas

- Se utiliza Flexbox para estructurar la interfaz y las muestras de color.
- Los estilos reutilizables están centralizados en variables CSS.
- La experiencia visual se apoya en una simulación GPU con WebGL para mantener un rendimiento más fluido.
- El fondo de fluido no añade nodos DOM por cada movimiento, lo que ayuda a mantener una interfaz ligera.
- El diseño preserva el contenido principal por encima del canvas mediante capas y `z-index`.

## Capturas

![Vista principal de PalettePro](Documentacion/capturas/PalettePro1.png)

![Vista responsive de PalettePro](Documentacion/capturas/PalettePro2.png)

## Mejoras futuras

- Bloquear colores individuales dentro de la paleta.
- Guardar paletas favoritas en localStorage.
- Exportar combinaciones en formatos JSON o PNG.
- Añadir controles visuales para ajustar la intensidad del fluido.
- Implementar fallback para navegadores sin soporte WebGL.

## Licencia

Este proyecto se entrega como trabajo de desarrollo web personal y puede adaptarse o reutilizarse libremente con fines educativos o demostrativos.
