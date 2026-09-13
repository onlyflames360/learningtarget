// Buscador por intención: escribes lo que quieres hacer y te dice qué necesitas.
// Fuentes: INTENCIONES (js/buscar-data.js) + los métodos de js/metodos-data.js.
//
// Dos caminos para llegar a lo mismo:
//   1. Escribir en la caja de búsqueda.
//   2. Pulsar una categoría de la portada, que abre todo lo que hay dentro.

const EJEMPLOS_RAPIDOS = [
  "cambiar número a texto",
  "contador de letras",
  "guardar datos aunque cierre el navegador",
  "repetir algo 10 veces",
  "filtrar una lista",
  "al pulsar un botón",
  "pedir datos a una API",
  "quitar espacios",
  "número al azar",
  "ordenar una lista",
  "esperar a que termine algo",
  "quitar duplicados",
  "copiar un objeto sin tocar el original",
  "esperar unos segundos",
  "sumar los números de una lista",
  "redondear un número",
  "qué tipo de dato es",
  "leer lo que escribió el usuario",
];

const PALABRAS_VACIAS = new Set([
  "que", "de", "la", "el", "los", "las", "un", "una", "unos", "unas", "en",
  "por", "para", "con", "sin", "como", "cual", "cuales", "es", "son", "y", "o",
  "a", "al", "del", "se", "su", "mi", "me", "lo", "hacer", "quiero", "necesito",
  "puedo", "como", "algo", "cosa", "sirve", "usar", "uso",
]);

function normalizar(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    // Se conservan los símbolos: así se puede buscar "=>", "?." o "[ ]" tal cual
    .replace(/[^a-z0-9\s.()_?!=<>%&|+\-*/[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizar(texto) {
  return normalizar(texto)
    .split(" ")
    .filter((p) => p.length > 1 && !PALABRAS_VACIAS.has(p));
}

// ---------- Índice ----------
const INDICE = [];

INTENCIONES.forEach((item) => {
  INDICE.push({
    tipo: "intencion",
    intencion: item.q,
    categoria: item.cat,
    js: item.js,
    ts: item.ts || null,
    py: item.py,
    que: item.que,
    ejemplo: item.ej,
    ejemploPro: item.pro || null,
    porQue: item.porQue || null,
    campoTitulo: normalizar(item.q),
    campoClaves: normalizar(item.k),
    campoHerramienta: normalizar(
      (item.js || "") + " " + (item.ts || "") + " " + (item.py || ""),
    ),
    campoQue: normalizar(item.que + " " + (item.pro || "")),
  });
});

DATA.forEach((item) => {
  const descripcion = item.options[item.correct];
  INDICE.push({
    tipo: "metodo",
    intencion: descripcion,
    categoria: item.cat,
    lang: item.lang,
    js: item.lang === "JavaScript" ? item.method : null,
    ts: item.lang === "TypeScript" ? item.method : null,
    py: item.lang === "Python" ? item.method : null,
    que: descripcion,
    ejemplo: item.example,
    campoTitulo: normalizar(item.method),
    campoClaves: normalizar(item.cat + " " + item.lang),
    campoHerramienta: normalizar(item.method),
    campoQue: normalizar(descripcion + " " + item.example),
  });
});

// Recuento por categoría: cuántos métodos y cuántos atajos tiene cada una.
// Se calcula una vez y sirve para la portada y para la cabecera de cada categoría.
const CATEGORIAS = (() => {
  const mapa = new Map();
  const anotar = (cat, clave) => {
    if (!mapa.has(cat)) mapa.set(cat, { cat, metodos: 0, atajos: 0, senior: 0 });
    mapa.get(cat)[clave]++;
  };
  DATA.forEach((d) => anotar(d.cat, "metodos"));
  INTENCIONES.forEach((i) => {
    anotar(i.cat, "atajos");
    if (i.pro) anotar(i.cat, "senior");
  });
  return [...mapa.values()].sort(
    (a, b) => b.atajos - a.atajos || b.metodos - a.metodos,
  );
})();

const CON_SENIOR = INTENCIONES.filter((i) => i.pro).length;

// ¿Aparecen todas las palabras en el mismo orden que las escribió el usuario?
// Es lo que distingue "cambiar número a texto" de "cambiar texto a número".
function mismoOrden(campo, palabras) {
  if (palabras.length < 2) return false;
  let desde = 0;
  for (const palabra of palabras) {
    const i = campo.indexOf(palabra, desde);
    if (i === -1) return false;
    desde = i + palabra.length;
  }
  return true;
}

function puntuar(entrada, consulta, palabras) {
  let puntos = 0;

  if (mismoOrden(entrada.campoTitulo, palabras)) puntos += 60;
  if (entrada.campoTitulo.includes(consulta)) puntos += 120;
  if (entrada.campoClaves.includes(consulta)) puntos += 70;
  if (entrada.campoHerramienta.includes(consulta)) puntos += 90;
  if (entrada.campoQue.includes(consulta)) puntos += 25;

  palabras.forEach((palabra) => {
    if (entrada.campoTitulo.includes(palabra)) puntos += 14;
    if (entrada.campoClaves.includes(palabra)) puntos += 10;
    if (entrada.campoHerramienta.includes(palabra)) puntos += 8;
    if (entrada.campoQue.includes(palabra)) puntos += 4;
  });

  // Las intenciones curadas pesan más: están escritas en el idioma del que busca
  if (entrada.tipo === "intencion" && puntos > 0) puntos += 30;

  return puntos;
}

function buscar(consultaCruda) {
  const consulta = normalizar(consultaCruda);
  const palabras = tokenizar(consultaCruda);
  if (!consulta) return [];

  return INDICE.map((entrada) => ({ entrada, puntos: puntuar(entrada, consulta, palabras) }))
    .filter((r) => r.puntos > 0)
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, 12)
    .map((r) => r.entrada);
}

// ---------- Memoria entre visitas ----------
// Se recuerdan la última búsqueda y la última categoría abierta, para volver
// justo a donde lo dejaste.
const BUSQUEDA_KEY = "buscar-ultima";
const CATEGORIA_KEY = "buscar-categoria";

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
const chips = document.getElementById("chips");

// Qué categoría está abierta ahora mismo ("" = ninguna, se ve la portada)
let categoriaAbierta = "";

function escapar(texto) {
  return String(texto).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Un mismo concepto puede existir en varios lenguajes: se listan los que haya
function herramientasDe(entrada) {
  return [
    entrada.js ? { lang: "JavaScript", valor: entrada.js } : null,
    entrada.ts ? { lang: "TypeScript", valor: entrada.ts } : null,
    entrada.py ? { lang: "Python", valor: entrada.py } : null,
  ].filter(Boolean);
}

// La etiqueta de categoría también es un botón: lleva a todo lo de ese tema
function etiquetaCategoria(cat) {
  return `<button class="res-cat" type="button" data-cat="${escapar(cat)}">${escapar(cat)}</button>`;
}

// Los ejemplos se muestran en dos niveles cuando hay versión avanzada:
// primero el simple (junior) y debajo, bien marcado, el de producción (senior).
function bloqueEjemplos(entrada) {
  if (!entrada.ejemplo) return "";

  const junior = `<pre class="res-ejemplo"><code>${escapar(entrada.ejemplo)}</code></pre>`;
  if (!entrada.ejemploPro) return junior;

  return `
    <p class="nivel nivel-junior">
      <span class="nivel-etiqueta">Junior</span>
      <span class="nivel-pie">lo primero que funciona</span>
    </p>
    ${junior}

    <div class="bloque-senior">
      <p class="nivel nivel-senior">
        <span class="nivel-etiqueta">Senior</span>
        <span class="nivel-pie">cómo se escribe en producción</span>
      </p>
      <pre class="res-ejemplo"><code>${escapar(entrada.ejemploPro)}</code></pre>
      ${
        entrada.porQue
          ? `<p class="por-que"><strong>Por qué:</strong> ${escapar(entrada.porQue)}</p>`
          : ""
      }
    </div>
  `;
}

function tarjetaHerramienta(entrada, esPrincipal) {
  const herramientas = herramientasDe(entrada);

  return `
    <article class="resultado ${esPrincipal ? "principal" : ""}">
      ${esPrincipal ? '<p class="veredicto">👉 Esto es lo que buscas</p>' : ""}
      <div class="res-cabecera">
        <p class="res-intencion">${escapar(entrada.intencion)}</p>
        ${etiquetaCategoria(entrada.categoria)}
      </div>

      <div class="res-herramientas">
        ${herramientas
          .map(
            (h) => `
          <div class="herramienta">
            <span class="herramienta-lang">${h.lang}</span>
            <code class="herramienta-valor">${escapar(h.valor)}</code>
          </div>`,
          )
          .join("")}
      </div>

      <p class="res-que"><strong>Qué es:</strong> ${escapar(entrada.que)}</p>

      ${bloqueEjemplos(entrada)}
    </article>
  `;
}

// Tarjeta compacta para los métodos de una categoría: como van muchos seguidos,
// se aprietan más que las tarjetas de resultado.
function tarjetaMetodo(entrada) {
  const herramienta = herramientasDe(entrada)[0];

  return `
    <article class="metodo">
      <div class="metodo-cabecera">
        <code class="metodo-nombre">${escapar(
          herramienta ? herramienta.valor : entrada.intencion,
        )}</code>
        ${herramienta ? `<span class="metodo-lang">${herramienta.lang}</span>` : ""}
      </div>
      <p class="metodo-que">${escapar(entrada.que)}</p>
      ${bloqueEjemplos(entrada)}
    </article>
  `;
}

function renderPortada() {
  resultados.innerHTML = `
    <section class="portada">
      <h2 class="portada-titulo">Qué contiene este buscador</h2>
      <p class="portada-sub">
        ${INTENCIONES.length} formas de decir "quiero hacer esto" y
        ${DATA.length} métodos y conceptos indexados. Escribe con tus
        palabras — sin tecnicismos — y te digo cuál es la herramienta que
        necesitas, qué es exactamente y cómo se usa.
      </p>
      <p class="portada-sub">
        ${CON_SENIOR} de esos atajos traen además la
        <strong>versión senior</strong>: el mismo problema resuelto como se
        escribe en producción, con el porqué al lado.
      </p>
      <p class="portada-hint">
        O pulsa una categoría y verás de golpe todo lo que tiene dentro 👇
      </p>
      <div class="portada-grid">
        ${CATEGORIAS.map(
          (c) => `
          <button class="portada-cat" type="button" data-cat="${escapar(c.cat)}">
            <span class="portada-cat-texto">
              <span class="portada-cat-nombre">${escapar(c.cat)}</span>
              <span class="portada-cat-num">${c.metodos} métodos${
                c.atajos ? " · " + c.atajos + " atajos" : ""
              }${c.senior ? " · " + c.senior + " senior" : ""}</span>
            </span>
            <span class="portada-cat-ir">Ver →</span>
          </button>`,
        ).join("")}
      </div>
    </section>
  `;
}

function renderCategoria(cat) {
  const info = CATEGORIAS.find((c) => c.cat === cat);
  // Si la categoría guardada ya no existe, se vuelve a la portada sin ruido
  if (!info) {
    categoriaAbierta = "";
    guardar(CATEGORIA_KEY, "");
    renderPortada();
    return;
  }

  const atajos = INDICE.filter((e) => e.tipo === "intencion" && e.categoria === cat);
  const metodos = INDICE.filter((e) => e.tipo === "metodo" && e.categoria === cat);

  // Los métodos se agrupan por lenguaje para no mezclar dos sintaxis de golpe
  const porLenguaje = ["JavaScript", "TypeScript", "Python"]
    .map((lang) => ({ lang, lista: metodos.filter((m) => m.lang === lang) }))
    .filter((g) => g.lista.length);

  const volver = `<button class="volver-btn" type="button" data-volver="1">← Todas las categorías</button>`;

  resultados.innerHTML = `
    <section class="categoria">
      <div class="cat-cabecera">
        ${volver}
        <h2 class="cat-titulo">${escapar(cat)}</h2>
        <p class="cat-resumen">
          ${info.metodos} método${info.metodos === 1 ? "" : "s"}${
            info.atajos ? ` · ${info.atajos} atajo${info.atajos === 1 ? "" : "s"}` : ""
          }${info.senior ? ` · ${info.senior} con versión senior` : ""}
        </p>
      </div>

      ${
        atajos.length
          ? `<p class="cat-seccion">Lo que puedes querer hacer</p>` +
            atajos.map((e) => tarjetaHerramienta(e, false)).join("")
          : ""
      }

      ${porLenguaje
        .map(
          (g) => `
        <p class="cat-seccion">${g.lang} · ${g.lista.length} método${
          g.lista.length === 1 ? "" : "s"
        }</p>
        <div class="metodos-lista">
          ${g.lista.map(tarjetaMetodo).join("")}
        </div>`,
        )
        .join("")}

      <div class="cat-pie">${volver}</div>
    </section>
  `;
}

function render(consulta) {
  if (!normalizar(consulta)) {
    if (categoriaAbierta) renderCategoria(categoriaAbierta);
    else renderPortada();
    return;
  }

  const encontrados = buscar(consulta);

  if (encontrados.length === 0) {
    resultados.innerHTML = `
      <section class="sin-resultados">
        <p class="sin-emoji">🔍</p>
        <h2>No encuentro nada para "${escapar(consulta)}"</h2>
        <p>
          Prueba a decirlo de otra forma, con el verbo de lo que quieres
          conseguir: "contar", "guardar", "buscar", "repetir", "convertir",
          "mostrar", "borrar"...
        </p>
      </section>
    `;
    return;
  }

  const cabecera = `
    <p class="contador-resultados">
      ${encontrados.length} resultado${encontrados.length === 1 ? "" : "s"} para
      <strong>"${escapar(consulta)}"</strong>
    </p>
  `;

  const otros = encontrados.slice(1);
  resultados.innerHTML =
    cabecera +
    tarjetaHerramienta(encontrados[0], true) +
    (otros.length
      ? `<p class="tambien">También te puede servir</p>` +
        otros.map((e) => tarjetaHerramienta(e, false)).join("")
      : "");
}

// ---------- Moverse entre portada, categoría y búsqueda ----------
function abrirCategoria(cat) {
  categoriaAbierta = cat;
  guardar(CATEGORIA_KEY, cat);
  // Abrir una categoría cancela la búsqueda: son dos caminos distintos
  input.value = "";
  guardar(BUSQUEDA_KEY, "");
  renderCategoria(cat);
  resultados.scrollIntoView({ behavior: "smooth", block: "start" });
}

function cerrarCategoria() {
  categoriaAbierta = "";
  guardar(CATEGORIA_KEY, "");
  renderPortada();
  resultados.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Un solo listener para toda la zona de resultados: las tarjetas se repintan
// enteras cada vez, así que enganchar los botones uno a uno no serviría.
resultados.addEventListener("click", (e) => {
  const aCategoria = e.target.closest("[data-cat]");
  if (aCategoria) {
    abrirCategoria(aCategoria.dataset.cat);
    return;
  }
  if (e.target.closest("[data-volver]")) cerrarCategoria();
});

function renderChips() {
  chips.innerHTML = EJEMPLOS_RAPIDOS.map(
    (ej) => `<button class="chip" type="button">${escapar(ej)}</button>`,
  ).join("");
  [...chips.children].forEach((btn) => {
    btn.addEventListener("click", () => {
      input.value = btn.textContent;
      categoriaAbierta = "";
      guardar(CATEGORIA_KEY, "");
      render(input.value);
      guardar(BUSQUEDA_KEY, input.value);
      input.focus();
    });
  });
}

let temporizador = null;
input.addEventListener("input", () => {
  clearTimeout(temporizador);
  temporizador = setTimeout(() => {
    // Escribir manda: si había una categoría abierta, se cierra
    if (normalizar(input.value) && categoriaAbierta) {
      categoriaAbierta = "";
      guardar(CATEGORIA_KEY, "");
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
  render("");
  input.focus();
});

renderChips();
input.value = recuperar(BUSQUEDA_KEY);
// La búsqueda guardada manda sobre la categoría guardada: es lo último que se hizo
categoriaAbierta = input.value ? "" : recuperar(CATEGORIA_KEY);
render(input.value);
