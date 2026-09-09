# Tarjetas de aprender

Sitio estático de estudio de JavaScript, dividido en 8 páginas:

- `index.html` — tarjetas de repaso (flip pregunta/respuesta) generadas a
  partir de los 160+ métodos/conceptos de `metodos.html` y los 6 pasos de
  `pensar.html`. Filtros: Todos / JavaScript / Python / Cómo pensar, más una
  cuadrícula debajo para saltar a cualquier tarjeta.
- `metodos.html` — quiz rápido a/b/c con más de 160 métodos y conceptos de JS
  y Python, agrupados por categoría y ordenados por frecuencia de uso real:
  Variables, Arrays y objetos, Bucles, Funciones, Clases y constructores, DOM,
  Eventos, Texto, Conversión, Matemáticas, Promesas, Fetch y CRUD completo
  primero; Objetos del navegador, Módulos ES6 y TypeScript básico (lo menos
  usado) al final.
- `ejercicios.html` — quiz a/b/c por cada proyecto de `proyectos.html` (30
  preguntas en total), ordenadas de fácil a nivel senior dentro de cada tema.
  El progreso por tema se guarda en `localStorage`.
- `constructor.html` — "Construye el código": eliges a, b o c en cada paso y
  la línea correcta se añade en vivo a un panel de código, hasta terminar un
  programa completo y funcional. Ejercicios centrados en variables, bucles +
  arrays, funciones + arrays, clases y constructores, y selectores DOM +
  eventos.
- `pensar.html` — guía de método en 6 pasos para planificar un ejercicio
  antes de programarlo, más preguntas guía para cada proyecto.
- `entrenador.html` — entrenador interactivo de descomposición: describes tu
  problema, lo divides en piezas pequeñas y, si te atascas en una, un
  asistente te hace las preguntas guía (qué tienes, qué necesitas, qué pasa
  antes/después, qué entra/sale, qué puedes ignorar) sin darte código ni
  soluciones. Detecta cuando una pieza mezcla varias decisiones a la vez y
  ofrece dividirla. Todo se guarda en `localStorage`.
- `carpetas.html` — cómo organizar las carpetas de un proyecto, ordenado por
  frecuencia de uso: las estructuras más usadas siempre visibles arriba, y
  los casos especiales (bundlers, tests, backend, TypeScript...) aparte, más
  abajo, en acordeones plegados.
- `proyectos.html` — las 9 apps pequeñas a construir (objetivo final del
  recorrido), con explicación, código de ejemplo, pasos y desafíos extra.

Cada página tiene su CSS en `css/<pagina>.css` y su lógica en
`js/<pagina>.js` (los bancos de preguntas/proyectos viven en
`js/*-data.js`). El modo oscuro es compartido por todas las páginas desde
`js/theme.js`.

## Cómo usarla localmente

1. Abre la carpeta del proyecto.
2. Haz doble clic en `index.html` o sirve la carpeta con un servidor local.
3. Si quieres usar un servidor local:

```bash
python -m http.server 8000
```

Y luego abre:

```text
http://localhost:8000
```

## Subir a GitHub

1. Crea un repositorio en GitHub.
2. Conecta este proyecto al repositorio.
3. Haz push de todos los archivos.

```bash
git init
git add .
git commit -m "Primera versión"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git push -u origin main
```

## Publicarla en Vercel

1. Ve a https://vercel.com
2. Importa el repositorio de GitHub.
3. En la configuración de despliegue usa la opción de proyecto estático.
4. Vercel detectará automáticamente `index.html`.
5. Haz deploy.

La app quedará disponible en una URL tipo:

```text
https://tu-proyecto.vercel.app
```

## Nota

No requiere compilación ni dependencias. Es compatible con la publicación estática más simple de GitHub Pages o Vercel.
