// Estructuras de carpetas ordenadas por frecuencia de uso real.
// ESTRUCTURAS_PRINCIPALES: lo que se usa en casi todos los proyectos pequeños/medianos.
// ESTRUCTURAS_SECUNDARIAS: casos especiales, solo cuando el proyecto crece o usa herramientas extra.

const REGLAS_GENERALES = [
  "Un archivo, una responsabilidad: si un .js hace demasiadas cosas distintas, es momento de dividirlo.",
  "Agrupa por tipo de archivo (css/, js/) cuando el proyecto es pequeño; agrupa por función o tema cuando crece.",
  "Nombres de carpeta y archivo en minúsculas, sin espacios ni tildes (usa guiones: lista-tareas.js).",
  "Lo que se genera automáticamente (dist/, build/, node_modules/) nunca se edita a mano ni se sube al repositorio.",
  "README.md siempre en la raíz del proyecto: es lo primero que lee cualquiera que lo abra.",
];

const ESTRUCTURAS_PRINCIPALES = [
  {
    titulo: "Proyecto de una sola página",
    frecuencia: "La más usada",
    arbol:
      "mi-proyecto/\n├── index.html\n├── css/\n│   └── style.css\n├── js/\n│   └── main.js\n└── README.md",
    explicacion:
      "La estructura mínima para casi cualquier página web: el HTML en la raíz, los estilos en css/ y la lógica en js/. Es exactamente la que usa este mismo sitio para cada una de sus páginas.",
  },
  {
    titulo: "Proyecto con varias páginas",
    frecuencia: "Muy usada",
    arbol:
      "mi-proyecto/\n├── index.html\n├── otra-pagina.html\n├── css/\n│   ├── index.css\n│   └── otra-pagina.css\n├── js/\n│   ├── theme.js\n│   ├── index.js\n│   └── otra-pagina.js\n└── README.md",
    explicacion:
      "Cada página tiene su propio .css y su propio .js, con el mismo nombre para encontrarlos rápido. Lo que comparten todas las páginas (como el modo oscuro) va en un archivo aparte, como theme.js, para no repetirlo en cada una.",
  },
  {
    titulo: "Separar los datos de la lógica",
    frecuencia: "Muy usada cuando el JS crece",
    arbol:
      "js/\n├── pagina-data.js   (los datos: arrays, objetos)\n└── pagina.js        (la lógica: qué hace la interfaz con esos datos)",
    explicacion:
      "En cuanto un archivo .js mezcla 'qué información hay' con 'qué hace la pantalla con ella', conviene separarlos en dos archivos. Así puedes cambiar los datos sin tocar la lógica, y al revés.",
  },
];

const ESTRUCTURAS_SECUNDARIAS = [
  {
    titulo: "assets/ para imágenes y recursos",
    arbol: "assets/\n├── images/\n├── icons/\n└── fonts/",
    explicacion:
      "Cuando un proyecto tiene bastantes imágenes, iconos o tipografías propias, se agrupan en assets/ en vez de mezclarlas sueltas en la raíz.",
  },
  {
    titulo: "src/ y public/ (proyectos con bundler: Vite, React, Webpack...)",
    arbol:
      "mi-proyecto/\n├── src/       (código fuente, se transforma antes de publicarse)\n├── public/    (archivos que se copian tal cual, sin tocar)\n└── dist/      (salida generada automáticamente, no se edita ni se sube)",
    explicacion:
      "Solo aparece cuando el proyecto usa una herramienta de compilación. src/ es donde escribes código, dist/ o build/ es lo que esa herramienta genera para producción: nunca se edita a mano.",
  },
  {
    titulo: "tests/ para pruebas automáticas",
    arbol: "tests/\n├── calculadora.test.js\n└── lista.test.js",
    explicacion:
      "Cuando un proyecto empieza a tener pruebas automáticas, se agrupan en tests/ (o junto a cada archivo, según la herramienta que uses).",
  },
  {
    titulo: "client/ y server/ (frontend + backend en el mismo repositorio)",
    arbol: "mi-proyecto/\n├── client/    (todo el frontend)\n└── server/    (la API o el backend)",
    explicacion:
      "Se usa cuando un mismo proyecto incluye tanto la parte visual como un servidor propio. Mantenerlos en carpetas separadas evita mezclar código de navegador con código de servidor.",
  },
  {
    titulo: "Archivos de configuración en la raíz",
    arbol: "mi-proyecto/\n├── .gitignore\n├── package.json\n├── .eslintrc\n└── vercel.json",
    explicacion:
      "Los archivos que configuran herramientas (control de versiones, dependencias, formato de código, despliegue) casi siempre van sueltos en la raíz, nunca dentro de una subcarpeta.",
  },
  {
    titulo: "docs/ y scripts/",
    arbol: "mi-proyecto/\n├── docs/      (documentación extensa)\n└── scripts/   (scripts de construcción o despliegue)",
    explicacion:
      "Poco frecuentes en proyectos pequeños. Aparecen cuando la documentación no cabe en un solo README o cuando hay tareas repetitivas que conviene automatizar con scripts propios.",
  },
];
