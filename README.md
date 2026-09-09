# Tarjetas de aprender

Sitio estático de estudio de JavaScript, dividido en 13 páginas:

- `index.html` — tarjetas de repaso (flip pregunta/respuesta) generadas a
  partir de los 182 métodos/conceptos de `metodos.html` y los 6 pasos de
  `pensar.html`. Filtros: Todos / JavaScript / TypeScript / Python / Cómo pensar, más una
  cuadrícula debajo para saltar a cualquier tarjeta.
- `metodos.html` — quiz rápido a/b/c con 182 métodos y conceptos de JS, TypeScript
  y Python, agrupados por categoría y ordenados por frecuencia de uso real:
  Variables, Arrays y objetos, Bucles, Funciones, Clases y constructores, DOM,
  Eventos, Texto, Conversión, Matemáticas, Promesas, Fetch y CRUD completo
  primero; Objetos del navegador, Módulos ES6 y TypeScript básico (lo menos
  usado) al final.
- `buscar.html` — **buscador por intención**: escribes lo que quieres hacer
  con tus palabras ("cambiar número a texto", "contador de letras", "guardar
  datos aunque cierre el navegador") y te dice cuál es la herramienta que
  buscas, qué es exactamente y un ejemplo de uso. Indexa 68 intenciones
  curadas + los 160 métodos de `metodos-data.js`. Sin query muestra un
  resumen de todo lo que contiene.
- `identificar.html` — **¿qué estoy viendo?**: enseña a clasificar cualquier
  línea con dos preguntas (¿lleva paréntesis? ¿qué hay a la izquierda del
  punto?) en lugar de memorizar listas. Cubre las cinco familias
  (propiedades, métodos de array/string/DOM/objetos), consejos de
  reconocimiento al vuelo, 10 retos interactivos y, aparte, los errores
  clásicos que delatan cada confusión.
- `typescript.html` — **TypeScript** con el mismo enfoque: por frecuencia de
  uso real (3 niveles, lo menos usado aparte), cada concepto empezando por
  el problema que resuelve y con el JS al lado; sección dedicada a
  **descifrar los errores del compilador** (TS2322, TS2339, TS18047...), 6
  ejercicios de tipado y una guía de arranque con reglas de oro.
- `practicas.html` — **buenas prácticas** de escritura de código, pensadas
  para leerse rápido: cada regla es una línea, con el porqué y el ❌/✅ en
  código al lado. 8 temas (funciones, nombres, listas, condicionales, DOM,
  eventos, asincronía y organización) con 38 prácticas, un checklist de 9
  puntos que resume todo y la receta de 10 pasos para convertir código
  repetido en una función. Un interruptor deja ver solo las 24 esenciales
  o las 38 completas, y recuerda la preferencia.
- `ejercicios.html` — quiz a/b/c por cada proyecto de `proyectos.html` (30
  preguntas en total), ordenadas de fácil a nivel senior dentro de cada tema.
  El progreso por tema se guarda en `localStorage`.
- `constructor.html` — "Construye el código": eliges a, b o c en cada paso y
  la línea correcta se añade en vivo a un panel de código, hasta terminar un
  programa completo y funcional. Ejercicios centrados en variables, bucles +
  arrays, funciones + arrays, clases y constructores, y selectores DOM +
  eventos.
- `juego.html` — **Code Quest**: videojuego por niveles con tema arcade
  (neón, combos, corazones, confeti). 5 mundos temáticos con su monstruo
  (Variables, Bucles, Funciones, DOM/Eventos, Clases) y un **jefe final**
  donde diseñas una app entera tomando decisiones. Las preguntas no son de
  sintaxis: entrenan reconocer qué herramienta pide cada situación, para
  que ante un ejercicio nuevo no te quedes en blanco. Progreso, estrellas y
  XP en `localStorage`.
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
