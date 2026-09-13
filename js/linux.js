// Buscador de comandos de terminal.
// Los datos viven en js/linux-data.js: COMANDOS, IDEAS_BASE y ATAJOS.
//
// Dos formas de llegar a un comando:
//   1. Escribiendo lo que quieres hacer ("borrar carpeta", "puerto ocupado").
//   2. Pulsando una categoría, que los muestra todos.

const PALABRAS_VACIAS = new Set([
  "que", "de", "la", "el", "los", "las", "un", "una", "en", "por", "para",
  "con", "sin", "como", "es", "y", "o", "a", "al", "del", "se", "su", "mi",
  "me", "lo", "hacer", "quiero", "necesito", "puedo", "algo", "cosa", "usar",
  "uso", "comando", "terminal", "linux",
]);

function normalizar(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    // Se conservan los símbolos: así se puede buscar "|", ">>", "&&" o "2>"
    .replace(/[^a-z0-9\s.()_?!=<>%&|+\-*/[\]{}$:~#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizar(texto) {
  return normalizar(texto)
    .split(" ")
    .filter((p) => p.length > 1 && !PALABRAS_VACIAS.has(p));
}

// ---------- Índice ----------
const INDICE = COMANDOS.map((c) => ({
  ...c,
  campoCmd: normalizar(c.cmd),
  campoClaves: normalizar(c.k),
  // La categoría va aparte y pesa poco: "Crear y borrar" no puede hacer que
  // mkdir puntúe igual que rm cuando alguien busca "borrar"
  campoCat: normalizar(c.cat),
  campoQue: normalizar(c.que + " " + c.ej),
}));

const CATEGORIAS = (() => {
  const mapa = new Map();
  COMANDOS.forEach((c) => mapa.set(c.cat, (mapa.get(c.cat) || 0) + 1));
  return [...mapa.entries()].map(([cat, n]) => ({ cat, n }));
})();

function puntuar(entrada, consulta, palabras) {
  let puntos = 0;

  if (entrada.campoCmd === consulta) puntos += 200;
  if (entrada.campoCmd.includes(consulta)) puntos += 110;
  if (entrada.campoClaves.includes(consulta)) puntos += 70;
  if (entrada.campoCat.includes(consulta)) puntos += 30;
  if (entrada.campoQue.includes(consulta)) puntos += 25;

  palabras.forEach((palabra) => {
    if (entrada.campoCmd.includes(palabra)) puntos += 16;
    if (entrada.campoClaves.includes(palabra)) puntos += 11;
    if (entrada.campoCat.includes(palabra)) puntos += 5;
    if (entrada.campoQue.includes(palabra)) puntos += 4;
  });

  return puntos;
}

function buscar(consultaCruda) {
  const consulta = normalizar(consultaCruda);
  const palabras = tokenizar(consultaCruda);
  if (!consulta) return [];

  return INDICE.map((entrada) => ({ entrada, puntos: puntuar(entrada, consulta, palabras) }))
    .filter((r) => r.puntos > 0)
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, 14)
    .map((r) => r.entrada);
}

// ---------- Memoria entre visitas ----------
const BUSQUEDA_KEY = "linux-ultima";
const CATEGORIA_KEY = "linux-categoria";

function guardar(clave, texto) {
  try {
    localStorage.setItem(clave, texto);
  } catch (e) {}
}

function recuperar(clave) {
  try {
    return localStorage.getItem(clave) || "";
  } catch (e) {
    return "";
  }
}

const input = document.getElementById("buscadorInput");
const resultados = document.getElementById("resultados");
const cats = document.getElementById("cats");

let categoriaAbierta = "";

function escapar(texto) {
  return String(texto).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---------- Render ----------
function tarjeta(c) {
  return `
    <article class="comando ${c.peligro ? "peligroso" : ""}">
      <div class="comando-cabecera">
        <code class="comando-nombre">${escapar(c.cmd)}</code>
        <span class="comando-cat">${escapar(c.cat)}</span>
      </div>

      <p class="comando-que">${escapar(c.que)}</p>

      <p class="etiqueta-ejemplo">Ejemplo</p>
      <pre class="consola"><code>${escapar(c.ej)}</code></pre>

      ${
        c.win && c.win !== "—"
          ? `<p class="comando-win"><strong>En Windows:</strong> <code>${escapar(c.win)}</code></p>`
          : ""
      }

      ${c.aviso ? `<p class="aviso">⚠️ ${escapar(c.aviso)}</p>` : ""}
    </article>
  `;
}

function renderIdeas() {
  document.getElementById("ideasBase").innerHTML = `
    <h2>Lo que hay que entender antes de empezar</h2>
    <div class="ideas-grid">
      ${IDEAS_BASE.map(
        (i) => `
        <article class="idea">
          <h3>${escapar(i.titulo)}</h3>
          <p>${escapar(i.texto)}</p>
        </article>`,
      ).join("")}
    </div>
  `;
}

function renderCats() {
  cats.innerHTML = CATEGORIAS.map(
    (c) => `
    <button class="cat-btn ${c.cat === categoriaAbierta ? "activa" : ""}"
            type="button" data-cat="${escapar(c.cat)}">
      ${escapar(c.cat)} <span class="cat-num">${c.n}</span>
    </button>`,
  ).join("");
}

function renderTodo() {
  resultados.innerHTML = `
    <p class="contador">
      ${COMANDOS.length} comandos, agrupados por para qué sirven. Pulsa una
      categoría de arriba para quedarte solo con los suyos.
    </p>
    ${CATEGORIAS.map(
      (c) => `
      <h2 class="grupo-titulo">${escapar(c.cat)} <span>${c.n}</span></h2>
      <div class="comandos">
        ${COMANDOS.filter((x) => x.cat === c.cat).map(tarjeta).join("")}
      </div>`,
    ).join("")}
  `;
}

function renderCategoria(cat) {
  const lista = COMANDOS.filter((c) => c.cat === cat);
  if (!lista.length) {
    categoriaAbierta = "";
    renderTodo();
    return;
  }

  resultados.innerHTML = `
    <p class="contador">
      ${lista.length} comando${lista.length === 1 ? "" : "s"} de
      <strong>${escapar(cat)}</strong> ·
      <button class="enlace-btn" type="button" data-todo="1">ver todos</button>
    </p>
    <div class="comandos">${lista.map(tarjeta).join("")}</div>
  `;
}

function render(consulta) {
  if (!normalizar(consulta)) {
    if (categoriaAbierta) renderCategoria(categoriaAbierta);
    else renderTodo();
    return;
  }

  const encontrados = buscar(consulta);

  if (!encontrados.length) {
    resultados.innerHTML = `
      <section class="sin-resultados">
        <p class="sin-emoji">🐧</p>
        <h2>No encuentro ningún comando para "${escapar(consulta)}"</h2>
        <p>
          Prueba con el verbo de lo que quieres conseguir: "borrar", "copiar",
          "buscar", "ver", "instalar", "conectar", "permisos", "espacio".
        </p>
      </section>
    `;
    return;
  }

  resultados.innerHTML = `
    <p class="contador">
      ${encontrados.length} comando${encontrados.length === 1 ? "" : "s"} para
      <strong>"${escapar(consulta)}"</strong>
    </p>
    <div class="comandos">${encontrados.map(tarjeta).join("")}</div>
  `;
}

// ---------- Interacción ----------
function abrirCategoria(cat) {
  categoriaAbierta = categoriaAbierta === cat ? "" : cat;
  guardar(CATEGORIA_KEY, categoriaAbierta);
  input.value = "";
  guardar(BUSQUEDA_KEY, "");
  renderCats();
  if (categoriaAbierta) renderCategoria(categoriaAbierta);
  else renderTodo();
  resultados.scrollIntoView({ behavior: "smooth", block: "start" });
}

cats.addEventListener("click", (e) => {
  const boton = e.target.closest("[data-cat]");
  if (boton) abrirCategoria(boton.dataset.cat);
});

resultados.addEventListener("click", (e) => {
  if (e.target.closest("[data-todo]")) {
    categoriaAbierta = "";
    guardar(CATEGORIA_KEY, "");
    renderCats();
    renderTodo();
  }
});

let temporizador = null;
input.addEventListener("input", () => {
  clearTimeout(temporizador);
  temporizador = setTimeout(() => {
    // Escribir manda: si había una categoría abierta, se cierra
    if (normalizar(input.value) && categoriaAbierta) {
      categoriaAbierta = "";
      guardar(CATEGORIA_KEY, "");
      renderCats();
    }
    render(input.value);
    guardar(BUSQUEDA_KEY, input.value);
  }, 140);
});

document.getElementById("limpiarBtn").addEventListener("click", () => {
  input.value = "";
  categoriaAbierta = "";
  guardar(BUSQUEDA_KEY, "");
  guardar(CATEGORIA_KEY, "");
  renderCats();
  render("");
  input.focus();
});

function renderAtajos() {
  document.getElementById("atajosGrid").innerHTML = ATAJOS.map(
    ([tecla, que]) => `
    <div class="atajo">
      <kbd>${escapar(tecla)}</kbd>
      <span>${escapar(que)}</span>
    </div>`,
  ).join("");
}

renderIdeas();
input.value = recuperar(BUSQUEDA_KEY);
// La búsqueda guardada manda sobre la categoría: es lo último que se hizo
categoriaAbierta = input.value ? "" : recuperar(CATEGORIA_KEY);
renderCats();
render(input.value);
renderAtajos();
