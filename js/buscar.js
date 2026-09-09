// Buscador por intención: escribes lo que quieres hacer y te dice qué necesitas.
// Fuentes: INTENCIONES (js/buscar-data.js) + los 160 métodos de js/metodos-data.js.

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
    .replace(/[^a-z0-9\s.()_]/g, " ")
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
    py: item.py,
    que: item.que,
    ejemplo: item.ej,
    campoTitulo: normalizar(item.q),
    campoClaves: normalizar(item.k),
    campoHerramienta: normalizar(item.js + " " + (item.py || "")),
    campoQue: normalizar(item.que),
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
    py: item.lang === "Python" ? item.method : null,
    que: descripcion,
    ejemplo: item.example,
    campoTitulo: normalizar(item.method),
    campoClaves: normalizar(item.cat + " " + item.lang),
    campoHerramienta: normalizar(item.method),
    campoQue: normalizar(descripcion + " " + item.example),
  });
});

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

// ---------- Render ----------
const input = document.getElementById("buscadorInput");
const resultados = document.getElementById("resultados");
const chips = document.getElementById("chips");

function escapar(texto) {
  return String(texto).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function tarjetaHerramienta(entrada, esPrincipal) {
  const herramientas = [];
  if (entrada.js) herramientas.push({ lang: "JavaScript", valor: entrada.js });
  if (entrada.py) herramientas.push({ lang: "Python", valor: entrada.py });

  return `
    <article class="resultado ${esPrincipal ? "principal" : ""}">
      ${esPrincipal ? '<p class="veredicto">👉 Esto es lo que buscas</p>' : ""}
      <div class="res-cabecera">
        <p class="res-intencion">${escapar(entrada.intencion)}</p>
        <span class="res-cat">${escapar(entrada.categoria)}</span>
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

      ${
        entrada.ejemplo
          ? `<pre class="res-ejemplo"><code>${escapar(entrada.ejemplo)}</code></pre>`
          : ""
      }
    </article>
  `;
}

function renderPortada() {
  const porCategoria = {};
  INTENCIONES.forEach((i) => {
    porCategoria[i.cat] = (porCategoria[i.cat] || 0) + 1;
  });
  const metodosPorCat = {};
  DATA.forEach((d) => {
    metodosPorCat[d.cat] = (metodosPorCat[d.cat] || 0) + 1;
  });

  const categorias = Object.keys(metodosPorCat).sort(
    (a, b) => (porCategoria[b] || 0) - (porCategoria[a] || 0),
  );

  resultados.innerHTML = `
    <section class="portada">
      <h2 class="portada-titulo">Qué contiene este buscador</h2>
      <p class="portada-sub">
        ${INTENCIONES.length} formas de decir "quiero hacer esto" y
        ${DATA.length} métodos y conceptos indexados. Escribe con tus
        palabras — sin tecnicismos — y te digo cuál es la herramienta que
        necesitas, qué es exactamente y cómo se usa.
      </p>
      <div class="portada-grid">
        ${categorias
          .map(
            (cat) => `
          <div class="portada-cat">
            <span class="portada-cat-nombre">${escapar(cat)}</span>
            <span class="portada-cat-num">${metodosPorCat[cat]} métodos${
              porCategoria[cat] ? " · " + porCategoria[cat] + " atajos" : ""
            }</span>
          </div>`,
          )
          .join("")}
      </div>
    </section>
  `;
}

function render(consulta) {
  if (!normalizar(consulta)) {
    renderPortada();
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

function renderChips() {
  chips.innerHTML = EJEMPLOS_RAPIDOS.map(
    (ej) => `<button class="chip" type="button">${escapar(ej)}</button>`,
  ).join("");
  [...chips.children].forEach((btn) => {
    btn.addEventListener("click", () => {
      input.value = btn.textContent;
      render(input.value);
      input.focus();
    });
  });
}

let temporizador = null;
input.addEventListener("input", () => {
  clearTimeout(temporizador);
  temporizador = setTimeout(() => render(input.value), 140);
});

document.getElementById("limpiarBtn").addEventListener("click", () => {
  input.value = "";
  render("");
  input.focus();
});

renderChips();
render("");
