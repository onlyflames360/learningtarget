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

// ---------------------------------------------------------------------------
// Instalación de herramientas: qué se instala, de cuántas formas y cuál elegir.
// Ordenado por frecuencia de uso real, igual que las estructuras de arriba.
// ---------------------------------------------------------------------------

// Lo que hay que entender ANTES de copiar cualquier comando de instalación
const FORMAS_INSTALAR = [
  {
    forma: "npm install paquete",
    apodo: "Local (dependencia)",
    que: "Lo descarga dentro de node_modules/ de ESTE proyecto y lo apunta en package.json. Es lo normal para todo lo que el proyecto necesita para funcionar.",
    ej: "npm install express\n# package.json → \"dependencies\": { \"express\": \"^4.19.2\" }",
  },
  {
    forma: "npm install -D paquete",
    apodo: "Local, solo para desarrollar",
    que: "Igual que el anterior, pero se guarda en devDependencies: herramientas que usas mientras programas (Vite, Sass, ESLint) y que NO hacen falta en el servidor final.",
    ej: "npm install -D sass vite\n# package.json → \"devDependencies\": { \"sass\": ..., \"vite\": ... }",
  },
  {
    forma: "npm install -g paquete",
    apodo: "Global (en todo el ordenador)",
    que: "Lo instala una vez para todo el sistema, no para un proyecto. Solo para programas de línea de comandos que usas en cualquier carpeta (vercel, nodemon, http-server).",
    ej: "npm install -g vercel\nvercel --version   # ya funciona desde cualquier sitio",
  },
  {
    forma: "npx paquete",
    apodo: "Ejecutar sin instalar",
    que: "Descarga el paquete, lo ejecuta y lo tira. Perfecto para cosas que usas una vez (crear un proyecto, generar una configuración) y para no llenar el sistema de instalaciones globales.",
    ej: "npx serve .          # levanta un servidor sin instalar nada\nnpx tsc --init       # genera tsconfig.json y se acabó",
  },
  {
    forma: "<script src=\"...cdn...\">",
    apodo: "Por CDN, sin Node",
    que: "Enlazas la librería desde internet en el HTML. Sin instalación, sin package.json y sin compilar: ideal para practicar o para una página suelta. No vale para herramientas que compilan (Vite, Sass, TypeScript).",
    ej: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css">',
  },
];

// La misma orden en los cuatro gestores de paquetes que te vas a encontrar
const GESTORES = [
  ["Instalar todo lo del package.json", "npm install", "pnpm install", "yarn", "bun install"],
  ["Añadir una dependencia", "npm install axios", "pnpm add axios", "yarn add axios", "bun add axios"],
  ["Añadir solo para desarrollo", "npm install -D vite", "pnpm add -D vite", "yarn add -D vite", "bun add -d vite"],
  ["Quitar una dependencia", "npm uninstall axios", "pnpm remove axios", "yarn remove axios", "bun remove axios"],
  ["Ejecutar un script", "npm run dev", "pnpm dev", "yarn dev", "bun run dev"],
  ["Ejecutar sin instalar", "npx vite", "pnpm dlx vite", "yarn dlx vite", "bunx vite"],
];

const HERRAMIENTAS = [
  {
    nombre: "Node y npm",
    frecuencia: "Imprescindible",
    para: "Node ejecuta JavaScript fuera del navegador; npm es su gestor de paquetes. Todo lo demás de esta lista se instala CON npm, así que esto va primero.",
    formas: [
      {
        titulo: "Comprobar si ya lo tienes",
        comandos: "node -v    # → v22.11.0\nnpm -v     # → 10.9.0",
        cuando: "Si los dos responden con un número, ya está: no instales nada más.",
      },
      {
        titulo: "Instalarlo (la forma recomendada)",
        comandos:
          "# Windows\nwinget install OpenJS.NodeJS.LTS\n\n# macOS\nbrew install node\n\n# Linux (Debian/Ubuntu) con nvm, para poder cambiar de versión\ncurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash\nnvm install --lts",
        cuando: "Elige siempre la versión LTS. nvm es lo que usa la mayoría porque permite tener varias versiones y cambiar por proyecto.",
      },
      {
        titulo: "Arrancar un proyecto desde cero",
        comandos:
          'mkdir mi-proyecto && cd mi-proyecto\nnpm init -y            # crea package.json sin preguntar nada\nnpm pkg set type="module"   # para poder usar import/export',
        cuando: "Cuando no usas ninguna plantilla y quieres empezar con las manos vacías.",
      },
    ],
    arbol:
      "mi-proyecto/\n├── package.json        (qué es el proyecto y qué necesita)\n├── package-lock.json   (versiones exactas: SÍ se sube al repo)\n└── node_modules/       (lo descargado: NUNCA se sube al repo)",
    ojo: "node_modules/ pesa cientos de megas y se regenera con npm install: va siempre en .gitignore. package-lock.json, en cambio, sí se sube: es lo que garantiza que a todos les instale lo mismo.",
  },
  {
    nombre: "Vite",
    frecuencia: "La más usada para empezar un proyecto",
    para: "Levanta un servidor de desarrollo instantáneo (ves los cambios al guardar) y empaqueta el proyecto para producción. Es la herramienta con la que hoy se crean casi todos los proyectos de front.",
    formas: [
      {
        titulo: "Crear el proyecto (lo habitual)",
        comandos:
          "npm create vite@latest mi-app\n# te pregunta framework y lenguaje\n\ncd mi-app\nnpm install\nnpm run dev        # → http://localhost:5173",
        cuando: "Siempre que empieces algo nuevo. No hace falta instalar Vite antes: create lo trae.",
      },
      {
        titulo: "Sin preguntas, eligiendo la plantilla a mano",
        comandos:
          "npm create vite@latest mi-app -- --template vanilla\n# otras: vanilla-ts · react · react-ts · vue · svelte · preact\n\n# con pnpm / yarn / bun\npnpm create vite mi-app --template react-ts\nbun create vite mi-app --template svelte",
        cuando: "Cuando ya sabes lo que quieres. Ojo al `--` de npm: separa sus opciones de las de create-vite.",
      },
      {
        titulo: "Añadir Vite a un proyecto que ya existe",
        comandos:
          'npm install -D vite\nnpm pkg set scripts.dev="vite"\nnpm pkg set scripts.build="vite build"\nnpm pkg set scripts.preview="vite preview"',
        cuando: "Cuando ya tienes HTML y JS escritos y solo quieres el servidor y el empaquetado.",
      },
      {
        titulo: "Los tres comandos del día a día",
        comandos:
          "npm run dev        # desarrollo, recarga al guardar\nnpm run build      # genera dist/ listo para publicar\nnpm run preview    # sirve dist/ para comprobarlo antes de subir",
        cuando: "dev mientras programas, build antes de desplegar, preview para asegurarte de que lo construido funciona.",
      },
    ],
    arbol:
      "mi-app/\n├── index.html          ← ¡en la raíz, no dentro de public/!\n├── package.json\n├── vite.config.js\n├── public/             (se copia tal cual: favicon, robots.txt)\n├── src/\n│   ├── main.js         (punto de entrada)\n│   └── style.css\n└── dist/               (lo genera build: no se edita ni se sube)",
    ojo: "En Vite el index.html es el punto de entrada y vive en la RAÍZ, no en public/. Y las rutas a imágenes de src/ se escriben con import o con /ruta desde public/, no con ../../assets/.",
  },
  {
    nombre: "Sass (SCSS)",
    frecuencia: "Muy usada",
    para: "CSS con variables, anidamiento, mixins y archivos partidos en trozos. Escribes .scss y algo lo convierte en el .css que entiende el navegador.",
    formas: [
      {
        titulo: "Con Vite: instalar y ya está",
        comandos:
          'npm install -D sass\n\n# renombra style.css → style.scss y en main.js:\nimport "./style.scss";',
        cuando: "Si usas Vite, esto es todo. No hay que configurar nada más: Vite detecta sass y compila solo.",
      },
      {
        titulo: "Sin Vite: el compilador en modo vigilante",
        comandos:
          "npm install -D sass\nnpx sass scss/main.scss css/style.css --watch\n\n# toda una carpeta de golpe:\nnpx sass scss:css --watch",
        cuando: "Proyectos de HTML+CSS sueltos, como este sitio. --watch recompila cada vez que guardas.",
      },
      {
        titulo: "Dejarlo apuntado como script",
        comandos:
          'npm pkg set scripts.css="sass scss/main.scss css/style.css --watch"\nnpm pkg set scripts.build:css="sass scss/main.scss css/style.css --style=compressed --no-source-map"\n\nnpm run css',
        cuando: "Siempre que el comando tenga más de dos palabras: así no hay que recordarlo ni copiarlo cada vez.",
      },
      {
        titulo: "Otras dos formas que verás por ahí",
        comandos:
          "npm install -g sass        # global, para usarlo en cualquier carpeta\nsass --watch scss:css\n\n# Extensión de VS Code: \"Live Sass Compiler\" (sin tocar la terminal)",
        cuando: "La global va bien si haces muchos proyectos pequeños; la extensión, si prefieres no abrir la terminal.",
      },
    ],
    arbol:
      "scss/\n├── main.scss           (el único que se compila: importa el resto)\n├── _variables.scss     (colores, tamaños)\n├── _mixins.scss\n├── base/_reset.scss\n└── componentes/_boton.scss\n\ncss/\n└── style.css           (generado: no se toca a mano)",
    ojo: "Los archivos que empiezan por guion bajo (_variables.scss) son parciales: NO generan su propio .css, solo se importan desde main.scss con @use \"variables\". Y @import está descatalogado: hoy se usa @use y @forward.",
  },
  {
    nombre: "TypeScript",
    frecuencia: "Muy usada",
    para: "JavaScript con tipos: te avisa de los errores mientras escribes, antes de ejecutar nada.",
    formas: [
      {
        titulo: "En un proyecto nuevo con Vite",
        comandos: "npm create vite@latest mi-app -- --template vanilla-ts\n# o react-ts, vue-ts...",
        cuando: "Lo más cómodo: la plantilla ya trae el tsconfig.json puesto.",
      },
      {
        titulo: "Añadirlo a un proyecto existente",
        comandos:
          "npm install -D typescript\nnpx tsc --init          # crea tsconfig.json\nnpx tsc --watch         # compila .ts → .js al guardar",
        cuando: "Cuando ya tienes JavaScript escrito y quieres ir pasándolo a .ts poco a poco.",
      },
      {
        titulo: "Solo para comprobar tipos, sin generar archivos",
        comandos: 'npm pkg set scripts.check="tsc --noEmit"\nnpm run check',
        cuando: "Con Vite, quien compila es Vite; tsc se queda solo como revisor. Es lo que se pone en el CI.",
      },
    ],
    ojo: "En tsconfig.json, activa \"strict\": true desde el primer día. Empezar sin strict y activarlo después es mucho más trabajo que empezar con él.",
  },
  {
    nombre: "Tailwind CSS",
    frecuencia: "Muy usada",
    para: "Estilos escribiendo clases en el HTML (flex, p-4, text-lg) en vez de escribir CSS aparte.",
    formas: [
      {
        titulo: "Con Vite (versión 4, la actual)",
        comandos:
          'npm install -D tailwindcss @tailwindcss/vite\n\n// vite.config.js\nimport tailwindcss from "@tailwindcss/vite";\nexport default { plugins: [tailwindcss()] };\n\n/* style.css */\n@import "tailwindcss";',
        cuando: "Proyectos nuevos. En la v4 ya no hace falta tailwind.config.js ni PostCSS.",
      },
      {
        titulo: "Para probar en un HTML suelto",
        comandos: '<script src="https://cdn.tailwindcss.com"></script>',
        cuando: "Solo para practicar o para un ejemplo rápido: el CDN trae TODAS las clases y pesa mucho.",
      },
    ],
    ojo: "Si sigues un tutorial y te pide npx tailwindcss init -p, es de la versión 3: en la 4 ese comando ya no existe y la configuración se hace en el propio CSS.",
  },
  {
    nombre: "ESLint y Prettier",
    frecuencia: "Muy usada en equipo",
    para: "ESLint caza errores y malas prácticas; Prettier formatea el código siempre igual para que nadie discuta por los espacios.",
    formas: [
      {
        titulo: "ESLint, con su asistente",
        comandos: "npm init @eslint/config@latest\n# te pregunta el tipo de proyecto y crea eslint.config.js\n\nnpx eslint .",
        cuando: "Una vez por proyecto. El asistente instala lo que haga falta según lo que contestes.",
      },
      {
        titulo: "Prettier",
        comandos:
          'npm install -D prettier\nnpx prettier . --write        # formatea todo\nnpx prettier . --check        # solo avisa, no toca (para el CI)',
        cuando: "Siempre. Y actívalo en el editor con \"formatear al guardar\" para olvidarte de él.",
      },
    ],
    ojo: "No configures reglas de formato en ESLint: se pisan con Prettier. ESLint para errores, Prettier para el aspecto.",
  },
  {
    nombre: "Un servidor local para HTML suelto",
    frecuencia: "Muy usada al practicar",
    para: "Abrir el HTML con doble clic (file://) rompe fetch, los módulos y localStorage. Con un servidor local, la página se comporta como en internet.",
    formas: [
      {
        titulo: "Sin instalar nada",
        comandos:
          "npx serve .              # → http://localhost:3000\nnpx live-server          # además recarga al guardar\n\n# si tienes Python instalado:\npython -m http.server 8000",
        cuando: "Lo más rápido para un proyecto de HTML+CSS+JS sin build, como este sitio.",
      },
      {
        titulo: "Desde VS Code",
        comandos: "Extensión \"Live Server\" → botón \"Go Live\" abajo a la derecha",
        cuando: "Si no quieres tocar la terminal mientras practicas.",
      },
    ],
    ojo: "Si ves errores de CORS o un fetch que falla sin motivo, mira la barra del navegador: si pone file:///, ese es el problema.",
  },
  {
    nombre: "Express (backend)",
    frecuencia: "La más usada del lado servidor",
    para: "Montar una API o un servidor propio con Node en unas pocas líneas.",
    formas: [
      {
        titulo: "Instalación y arranque",
        comandos:
          'mkdir api && cd api\nnpm init -y\nnpm pkg set type="module"\nnpm install express\nnpm pkg set scripts.dev="node --watch server.js"\n\nnpm run dev',
        cuando: "Express va en dependencies (no en -D): el servidor lo necesita para funcionar.",
      },
      {
        titulo: "El servidor mínimo",
        comandos:
          'import express from "express";\nconst app = express();\napp.use(express.json());\n\napp.get("/api/tareas", (req, res) => res.json([]));\n\napp.listen(3000, () => console.log("http://localhost:3000"));',
        cuando: "Con esto ya responde. express.json() es lo que hace que req.body exista en los POST.",
      },
    ],
    arbol:
      "api/\n├── server.js\n├── rutas/\n│   └── tareas.js\n├── .env            (claves y contraseñas: va en .gitignore)\n└── package.json",
    ojo: "node --watch (integrado en Node 18+) reinicia solo al guardar: ya no hace falta instalar nodemon.",
  },
  {
    nombre: "Vitest (pruebas)",
    frecuencia: "Usada cuando el proyecto crece",
    para: "Escribir pruebas que se ejecutan solas y avisan si rompes algo que antes funcionaba.",
    formas: [
      {
        titulo: "Instalación",
        comandos:
          'npm install -D vitest\nnpm pkg set scripts.test="vitest"\nnpm test',
        cuando: "Si el proyecto usa Vite, Vitest es la opción natural: comparte configuración.",
      },
      {
        titulo: "Una prueba",
        comandos:
          '// suma.test.js\nimport { expect, test } from "vitest";\nimport { suma } from "./suma.js";\n\ntest("suma dos números", () => {\n  expect(suma(2, 3)).toBe(5);\n});',
        cuando: "El archivo acaba en .test.js y vive al lado del archivo que prueba, o en tests/.",
      },
    ],
    ojo: "Una prueba que necesita internet o una base de datos real no es una prueba unitaria: tarda, falla sola y acaba desactivada.",
  },
  {
    nombre: "Desplegar: Vercel",
    frecuencia: "Muy usada para publicar",
    para: "Subir el proyecto a internet con dominio y HTTPS. Para sitios estáticos y para apps con build.",
    formas: [
      {
        titulo: "Desde la terminal",
        comandos:
          "npm install -g vercel\nvercel               # primera vez: te pregunta y crea el proyecto\nvercel --prod        # despliegue definitivo",
        cuando: "Para publicar en un minuto sin salir del editor.",
      },
      {
        titulo: "Conectando el repositorio",
        comandos:
          "# En vercel.com: New Project → importar el repo de GitHub\n# Cada git push despliega solo, sin tocar nada más",
        cuando: "Lo habitual en cuanto el proyecto está en GitHub. Es como está publicado este sitio.",
      },
    ],
    ojo: "Si el proyecto no tiene build (HTML suelto), no pongas comando de construcción: Vercel sirve los archivos tal cual.",
  },
  {
    nombre: "Bootstrap y librerías de CSS",
    frecuencia: "Usada en proyectos rápidos",
    para: "Componentes ya hechos (botones, formularios, menús) sin escribir el CSS.",
    formas: [
      {
        titulo: "Por CDN (sin Node)",
        comandos:
          '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>',
        cuando: "Una página suelta, una demo o una práctica. Cero instalación.",
      },
      {
        titulo: "Con npm (proyectos con build)",
        comandos:
          'npm install bootstrap\n\n// main.js\nimport "bootstrap/dist/css/bootstrap.min.css";\nimport "bootstrap";',
        cuando: "Cuando ya usas Vite: así entra solo lo que usas y funciona sin internet.",
      },
    ],
    ojo: "Fija la versión en el CDN (bootstrap@5.3.3). Un enlace sin versión puede cambiar bajo tus pies y romperte el diseño un martes cualquiera.",
  },
];
