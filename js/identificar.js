const KEYS = ["a", "b", "c"];
let retoIndex = 0;
let retoResuelto = false;

function escapar(texto) {
  return String(texto).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---------- Regla de los paréntesis ----------
function renderRegla() {
  const cont = document.getElementById("regla");
  const bloque = (datos, clase) => `
    <div class="regla-lado ${clase}">
      <h3>${datos.titulo}</h3>
      <p class="regla-def">${datos.definicion}</p>
      <ul class="regla-ejemplos">
        ${datos.ejemplos.map((e) => `<li><code>${escapar(e)}</code></li>`).join("")}
      </ul>
      <p class="regla-truco">⚠️ ${datos.truco}</p>
    </div>
  `;
  cont.innerHTML =
    bloque(REGLA_PARENTESIS.propiedad, "es-propiedad") +
    bloque(REGLA_PARENTESIS.metodo, "es-metodo");
}

// ---------- Los tres símbolos ----------
function renderSimbolos() {
  const cont = document.getElementById("simbolos");
  cont.innerHTML = SIMBOLOS.map(
    (s) => `
    <article class="simbolo">
      <div class="simbolo-cabecera">
        <span class="simbolo-signo">${escapar(s.simbolo)}</span>
        <div class="simbolo-titulo">
          <span class="simbolo-nombre">${s.emoji} ${escapar(s.nombre)}</span>
          <span class="simbolo-pregunta">«${escapar(s.pregunta)}»</span>
        </div>
      </div>

      <ul class="simbolo-usos">
        ${s.usos
          .map(
            (u) => `
          <li>
            <span class="uso-que">${escapar(u.que)}</span>
            <code class="uso-ej">${escapar(u.ej)}</code>
            ${u.nota ? `<span class="uso-nota">${escapar(u.nota)}</span>` : ""}
          </li>`,
          )
          .join("")}
      </ul>

      <p class="simbolo-truco"><strong>Truco:</strong> ${escapar(s.truco)}</p>
    </article>`,
  ).join("");

  document.getElementById("simbolosExtra").innerHTML = SIMBOLOS_EXTRA.map(
    (s) => `
    <div class="extra">
      <code class="extra-signo">${escapar(s.simbolo)}</code>
      <div>
        <p class="extra-significa">${escapar(s.significa)}</p>
        <code class="extra-ej">${escapar(s.ej)}</code>
      </div>
    </div>`,
  ).join("");
}

// ---------- Familias (la tabla) ----------
function renderFamilias() {
  const cont = document.getElementById("familias");
  FAMILIAS.forEach((familia) => {
    const card = document.createElement("article");
    card.className = "familia";

    const cabecera = document.createElement("button");
    cabecera.type = "button";
    cabecera.className = "familia-cabecera";
    cabecera.innerHTML = `
      <span class="familia-emoji">${familia.emoji}</span>
      <span class="familia-texto">
        <span class="familia-nombre">${familia.nombre}</span>
        <span class="familia-resumen">${escapar(familia.resumen)}</span>
      </span>
      <span class="familia-chips">${familia.ejemplos
        .slice(0, 3)
        .map((e) => `<code>${escapar(e)}</code>`)
        .join("")}</span>
      <span class="chevron">⌄</span>
    `;
    cabecera.addEventListener("click", () => card.classList.toggle("open"));

    const cuerpo = document.createElement("div");
    cuerpo.className = "familia-cuerpo";
    cuerpo.innerHTML = `
      <div class="bloque">
        <h4>Todos los ejemplos</h4>
        <p class="lista-codigo">${familia.ejemplos.map((e) => `<code>${escapar(e)}</code>`).join("")}</p>
      </div>
      <div class="bloque">
        <h4>Cómo lo reconoces</h4>
        <p>${escapar(familia.comoSaber)}</p>
      </div>
      <div class="bloque">
        <h4>En código</h4>
        <pre><code>${escapar(familia.ejemplo)}</code></pre>
      </div>
      <div class="bloque aviso">
        <h4>Ojo con esto</h4>
        <p>${escapar(familia.cuidado)}</p>
      </div>
    `;

    card.appendChild(cabecera);
    card.appendChild(cuerpo);
    cont.appendChild(card);
  });
}

// ---------- Consejos ----------
function renderSenales() {
  const cont = document.getElementById("senales");
  cont.innerHTML = SENALES.map(
    (s) => `
    <div class="senal">
      <p class="senal-titulo">${escapar(s.senal)}</p>
      <p class="senal-significa">${escapar(s.significa)}</p>
      <code class="senal-ejemplo">${escapar(s.ejemplo)}</code>
    </div>`,
  ).join("");
}

// ---------- Errores (sección aparte) ----------
function renderErrores() {
  const cont = document.getElementById("errores");
  ERRORES_CLASICOS.forEach((error) => {
    const item = document.createElement("article");
    item.className = "error-item";

    const cabecera = document.createElement("button");
    cabecera.type = "button";
    cabecera.className = "error-cabecera";
    cabecera.innerHTML = `<code>${escapar(error.sintoma)}</code><span class="chevron">⌄</span>`;
    cabecera.addEventListener("click", () => item.classList.toggle("open"));

    const cuerpo = document.createElement("div");
    cuerpo.className = "error-cuerpo";
    cuerpo.innerHTML = `
      <p><strong>Qué pasó:</strong> ${escapar(error.causa)}</p>
      <p><strong>Cómo se arregla:</strong> ${escapar(error.arreglo)}</p>
    `;

    item.appendChild(cabecera);
    item.appendChild(cuerpo);
    cont.appendChild(item);
  });
}

// ---------- Identificador interactivo ----------
function renderReto() {
  const cont = document.getElementById("reto");
  retoResuelto = false;

  if (retoIndex >= RETOS_IDENTIFICAR.length) {
    cont.innerHTML = `
      <div class="reto-final">
        <p class="reto-final-emoji">🎯</p>
        <h3>Ya sabes leer cualquier línea</h3>
        <p>
          Ante algo que no has visto nunca, tienes tres preguntas:
          ¿lleva paréntesis?, ¿qué hay a la izquierda del punto? y ¿qué
          símbolo es y qué hay justo antes? Con eso lo colocas, aunque no
          sepas todavía qué hace exactamente.
        </p>
        <button class="btn-primario" id="repetirReto" type="button">Repetir el entrenamiento 🔁</button>
      </div>
    `;
    document.getElementById("repetirReto").addEventListener("click", () => {
      retoIndex = 0;
      renderReto();
    });
    return;
  }

  const reto = RETOS_IDENTIFICAR[retoIndex];
  cont.innerHTML = `
    <p class="reto-contador">Reto ${retoIndex + 1} de ${RETOS_IDENTIFICAR.length}</p>
    <pre class="reto-codigo"><code>${escapar(reto.codigo)}</code></pre>
    <p class="reto-pregunta">${reto.pregunta}</p>
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
    btn.innerHTML = `<span class="reto-key">${KEYS[i]}</span><span>${escapar(opcion.texto)}</span>`;
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
    // Bloqueado hasta acertar, como en el resto de la app
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

renderRegla();
renderSimbolos();
renderFamilias();
renderSenales();
renderErrores();
renderReto();
