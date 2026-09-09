const FILTRO_KEY = "practicas-solo-esencial";
let soloEsencial = cargarPreferencia();

function cargarPreferencia() {
  try {
    return localStorage.getItem(FILTRO_KEY) !== "false";
  } catch (e) {
    return true;
  }
}

function guardarPreferencia() {
  try {
    localStorage.setItem(FILTRO_KEY, String(soloEsencial));
  } catch (e) {}
}

function escapar(texto) {
  return String(texto).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---------- Checklist rápido ----------
function renderChecklist() {
  document.getElementById("checklist").innerHTML = CHECKLIST.map(
    (linea) => `<li>${escapar(linea)}</li>`,
  ).join("");
}

// ---------- Temas ----------
function renderTemas() {
  const cont = document.getElementById("temas");
  cont.innerHTML = "";

  TEMAS_PRACTICAS.forEach((tema, indice) => {
    const visibles = tema.practicas.filter((p) => !soloEsencial || p.nivel === "esencial");
    const ocultas = tema.practicas.length - visibles.length;

    const card = document.createElement("section");
    card.className = "tema" + (indice === 0 ? " open" : "");

    const cabecera = document.createElement("button");
    cabecera.type = "button";
    cabecera.className = "tema-cabecera";
    cabecera.innerHTML = `
      <span class="tema-emoji">${tema.emoji}</span>
      <span class="tema-texto">
        <span class="tema-nombre">${escapar(tema.nombre)}</span>
        <span class="tema-resumen">${escapar(tema.resumen)}</span>
      </span>
      <span class="tema-conteo">${visibles.length}</span>
      <span class="chevron">⌄</span>
    `;
    cabecera.addEventListener("click", () => card.classList.toggle("open"));

    const cuerpo = document.createElement("div");
    cuerpo.className = "tema-cuerpo";

    cuerpo.innerHTML = `
      <div class="porque">
        <h4>Por qué importa</h4>
        <ul>${tema.porque.map((p) => `<li>${p}</li>`).join("")}</ul>
      </div>
      ${
        tema.id === "funciones"
          ? `<div class="receta">
               <h4>🍳 Receta: convertir código repetido en una función</h4>
               <ol>${COMO_HACER_FUNCION.map((p) => `<li>${escapar(p)}</li>`).join("")}</ol>
             </div>`
          : ""
      }
      ${visibles.map(tarjetaPractica).join("")}
      ${
        ocultas > 0
          ? `<p class="ocultas">+ ${ocultas} matiz${ocultas === 1 ? "" : "es"} más ·
             activa "Ver todo" arriba para verlos</p>`
          : ""
      }
    `;

    card.appendChild(cabecera);
    card.appendChild(cuerpo);
    cont.appendChild(card);
  });
}

function tarjetaPractica(p) {
  return `
    <article class="practica">
      <div class="practica-top">
        <p class="practica-regla">${escapar(p.regla)}</p>
        ${p.nivel === "extra" ? '<span class="etiqueta-extra">matiz</span>' : ""}
      </div>
      <p class="practica-porque">${escapar(p.porque)}</p>
      <div class="comparativa">
        <div class="lado lado-mal">
          <span class="lado-etiqueta">❌ Así no</span>
          <pre><code>${escapar(p.mal)}</code></pre>
        </div>
        <div class="lado lado-bien">
          <span class="lado-etiqueta">✅ Así sí</span>
          <pre><code>${escapar(p.bien)}</code></pre>
        </div>
      </div>
    </article>
  `;
}

// ---------- Interruptor esencial / todo ----------
function renderInterruptor() {
  const btn = document.getElementById("filtroBtn");
  const total = TEMAS_PRACTICAS.reduce((n, t) => n + t.practicas.length, 0);
  const esenciales = TEMAS_PRACTICAS.reduce(
    (n, t) => n + t.practicas.filter((p) => p.nivel === "esencial").length,
    0,
  );

  btn.textContent = soloEsencial
    ? `⚡ Solo lo esencial (${esenciales}) · pulsa para ver las ${total}`
    : `📚 Viendo las ${total} · pulsa para dejar solo las ${esenciales} esenciales`;
  btn.classList.toggle("activo", soloEsencial);
}

document.getElementById("filtroBtn").addEventListener("click", () => {
  soloEsencial = !soloEsencial;
  guardarPreferencia();
  renderInterruptor();
  renderTemas();
});

renderChecklist();
renderInterruptor();
renderTemas();
