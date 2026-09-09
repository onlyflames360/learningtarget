const KEYS = ["a", "b", "c"];
let retoIndex = 0;
let retoResuelto = false;

function escapar(texto) {
  return String(texto).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---------- Por qué TypeScript ----------
function renderPorque() {
  document.getElementById("porque").innerHTML = `
    <div class="comparativa">
      <div class="lado lado-js">
        <span class="lado-etiqueta">JavaScript</span>
        <pre><code>${escapar(TS_PORQUE.js)}</code></pre>
      </div>
      <div class="lado lado-ts">
        <span class="lado-etiqueta">TypeScript</span>
        <pre><code>${escapar(TS_PORQUE.ts)}</code></pre>
      </div>
    </div>
    <p class="idea-clave">💡 ${escapar(TS_PORQUE.idea)}</p>
  `;
}

// ---------- Niveles ----------
function renderNiveles() {
  const cont = document.getElementById("niveles");

  TS_NIVELES.forEach((nivel) => {
    const seccion = document.createElement("section");
    seccion.className = "nivel";

    seccion.innerHTML = `
      <div class="nivel-cabecera">
        <span class="nivel-badge">${nivel.nivel}</span>
        <div>
          <h3 class="nivel-titulo">${nivel.titulo}</h3>
          <p class="nivel-nota">${escapar(nivel.nota)}</p>
        </div>
      </div>
    `;

    const lista = document.createElement("div");
    lista.className = "conceptos";

    nivel.conceptos.forEach((concepto) => {
      const card = document.createElement("article");
      card.className = "concepto";

      const cabecera = document.createElement("button");
      cabecera.type = "button";
      cabecera.className = "concepto-cabecera";
      cabecera.innerHTML = `
        <span class="concepto-texto">
          <span class="concepto-nombre">${escapar(concepto.nombre)}</span>
          <span class="concepto-clave">${escapar(concepto.clave)}</span>
        </span>
        <span class="chevron">⌄</span>
      `;
      cabecera.addEventListener("click", () => card.classList.toggle("open"));

      const cuerpo = document.createElement("div");
      cuerpo.className = "concepto-cuerpo";
      cuerpo.innerHTML = `
        <div class="bloque">
          <h4>El problema que resuelve</h4>
          <p>${escapar(concepto.problema)}</p>
        </div>
        <div class="comparativa">
          <div class="lado lado-js">
            <span class="lado-etiqueta">JavaScript</span>
            <pre><code>${escapar(concepto.js)}</code></pre>
          </div>
          <div class="lado lado-ts">
            <span class="lado-etiqueta">TypeScript</span>
            <pre><code>${escapar(concepto.ts)}</code></pre>
          </div>
        </div>
        <div class="bloque">
          <h4>Qué está pasando</h4>
          <p>${escapar(concepto.explica)}</p>
        </div>
        ${
          concepto.error
            ? `<div class="error-compilador">
                 <p class="error-msg"><code>${escapar(concepto.error.mensaje)}</code></p>
                 <p class="error-trad"><strong>Traducción:</strong> ${escapar(concepto.error.traduccion)}</p>
               </div>`
            : ""
        }
      `;

      card.appendChild(cabecera);
      card.appendChild(cuerpo);
      lista.appendChild(card);
    });

    seccion.appendChild(lista);
    cont.appendChild(seccion);
  });
}

// ---------- Errores del compilador ----------
function renderErrores() {
  document.getElementById("errores").innerHTML = TS_ERRORES.map(
    (e) => `
    <article class="error-card">
      <div class="error-card-top">
        <span class="error-codigo">TS${escapar(e.codigo)}</span>
        <code class="error-mensaje">${escapar(e.mensaje)}</code>
      </div>
      <p class="error-traduccion">${escapar(e.traduccion)}</p>
      <pre class="error-ejemplo"><code>${escapar(e.ejemplo)}</code></pre>
    </article>`,
  ).join("");
}

// ---------- Cómo empezar ----------
function renderEmpezar() {
  document.getElementById("empezar").innerHTML = TS_EMPEZAR.map(
    (p, i) => `
    <div class="paso">
      <span class="paso-num">${i + 1}</span>
      <div class="paso-body">
        <p class="paso-titulo">${escapar(p.paso)}</p>
        <code class="paso-comando">${escapar(p.detalle)}</code>
        <p class="paso-nota">${escapar(p.nota)}</p>
      </div>
    </div>`,
  ).join("");

  document.getElementById("reglasOro").innerHTML = TS_REGLAS_ORO.map(
    (r) => `<li>${escapar(r)}</li>`,
  ).join("");
}

// ---------- Ejercicio interactivo ----------
function renderReto() {
  const cont = document.getElementById("reto");
  retoResuelto = false;

  if (retoIndex >= TS_RETOS.length) {
    cont.innerHTML = `
      <div class="reto-final">
        <p class="reto-final-emoji">🛡️</p>
        <h3>Ya sabes tipar lo esencial</h3>
        <p>
          Anotar parámetros, describir objetos, marcar lo opcional, estrechar
          uniones y tratar el DOM con su null incluido: con eso cubres la
          mayoría del TypeScript que se escribe a diario. El resto lo
          reconocerás cuando aparezca.
        </p>
        <button class="btn-primario" id="repetirReto" type="button">Repetir el ejercicio 🔁</button>
      </div>
    `;
    document.getElementById("repetirReto").addEventListener("click", () => {
      retoIndex = 0;
      renderReto();
    });
    return;
  }

  const reto = TS_RETOS[retoIndex];
  cont.innerHTML = `
    <p class="reto-contador">Ejercicio ${retoIndex + 1} de ${TS_RETOS.length}</p>
    <p class="reto-contexto">${escapar(reto.contexto)}</p>
    <pre class="reto-codigo"><code>${escapar(reto.codigo)}</code></pre>
    <p class="reto-pregunta">${escapar(reto.pregunta)}</p>
    <div class="reto-opciones" id="retoOpciones"></div>
    <div class="reto-explicacion" id="retoExplicacion"></div>
    <button class="btn-primario reto-siguiente" id="retoSiguiente" type="button">Siguiente →</button>
  `;

  const opciones = document.getElementById("retoOpciones");
  const orden = mezclar(
    reto.opciones.map((texto, i) => ({ texto, correcta: i === reto.correcta })),
  );

  orden.forEach((opcion, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "reto-opcion";
    btn.innerHTML = `<span class="reto-key">${KEYS[i]}</span><code>${escapar(opcion.texto)}</code>`;
    btn.addEventListener("click", () => elegirReto(btn, opcion, reto, opciones));
    opciones.appendChild(btn);
  });

  document.getElementById("retoSiguiente").addEventListener("click", () => {
    if (!retoResuelto) return;
    retoIndex++;
    renderReto();
  });
}

function elegirReto(btn, opcion, reto, contenedor) {
  if (retoResuelto) return;

  if (opcion.correcta) {
    retoResuelto = true;
    btn.classList.add("acierto");
    [...contenedor.children].forEach((b) => (b.disabled = true));

    const exp = document.getElementById("retoExplicacion");
    exp.innerHTML = "💡 " + escapar(reto.explicacion);
    exp.classList.add("show");
    document.getElementById("retoSiguiente").classList.add("show");
  } else {
    btn.classList.add("fallo");
    btn.disabled = true;
  }
}

function mezclar(arr) {
  const copia = arr.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

renderPorque();
renderNiveles();
renderErrores();
renderEmpezar();
renderReto();
