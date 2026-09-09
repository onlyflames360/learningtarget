const SAVE_KEY = "code-quest-progreso";
const KEYS = ["a", "b", "c"];
const VIDAS_MAX = 3;
const XP_ACIERTO = 100;

const MUNDOS = NIVELES.concat([{ ...JEFE_FINAL, esJefe: true }]);

let progreso = cargarProgreso();
let mundoActual = null;
let preguntaIndex = 0;
let vidas = VIDAS_MAX;
let combo = 0;
let mejorCombo = 0;
let resueltaActual = false;
let derrotado = false;

const app = document.getElementById("app");
const hudXp = document.getElementById("hudXp");
const hudNiveles = document.getElementById("hudNiveles");

function cargarProgreso() {
  try {
    const guardado = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (guardado && typeof guardado === "object") {
      return { estrellas: guardado.estrellas || {}, xp: guardado.xp || 0 };
    }
  } catch (e) {}
  return { estrellas: {}, xp: 0 };
}

function guardarProgreso() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(progreso));
  } catch (e) {}
}

function nivelCompletado(id) {
  return Boolean(progreso.estrellas[id]);
}

function estaDesbloqueado(indice) {
  if (indice === 0) return true;
  const mundo = MUNDOS[indice];
  if (mundo.esJefe) {
    // El jefe final solo aparece cuando todos los mundos normales están superados
    return NIVELES.every((n) => nivelCompletado(n.id));
  }
  return nivelCompletado(MUNDOS[indice - 1].id);
}

function actualizarHud() {
  hudXp.textContent = progreso.xp;
  const completados = MUNDOS.filter((m) => nivelCompletado(m.id)).length;
  hudNiveles.textContent = completados + "/" + MUNDOS.length;
}

// ---------- Mapa de niveles ----------
function renderMapa() {
  mundoActual = null;
  actualizarHud();

  const mapa = document.createElement("div");
  mapa.className = "map";

  MUNDOS.forEach((mundo, i) => {
    const desbloqueado = estaDesbloqueado(i);
    const completado = nivelCompletado(mundo.id);
    const estrellas = progreso.estrellas[mundo.id] || 0;

    const nodo = document.createElement("button");
    nodo.type = "button";
    nodo.className =
      "level-node" +
      (desbloqueado ? "" : " locked") +
      (completado ? " completed" : "") +
      (mundo.esJefe ? " boss" : "");
    nodo.disabled = !desbloqueado;

    const meta = mundo.esJefe
      ? "JEFE FINAL · " + mundo.preguntas.length + " decisiones · " + mundo.tema
      : mundo.tema + " · " + mundo.preguntas.length + " retos";

    nodo.innerHTML = `
      <span class="node-emoji">${desbloqueado ? mundo.emoji : "❔"}</span>
      <span class="node-body">
        <p class="node-name">${mundo.esJefe ? "👑 " : "Nivel " + (i + 1) + " · "}${mundo.nombre}</p>
        <p class="node-meta">${desbloqueado ? meta : "Supera el nivel anterior para desbloquearlo"}</p>
      </span>
      ${
        desbloqueado
          ? `<span class="node-stars">${"★".repeat(estrellas)}${"☆".repeat(3 - estrellas)}</span>`
          : '<span class="node-lock">🔒</span>'
      }
    `;

    nodo.addEventListener("click", () => {
      if (desbloqueado) empezarMundo(i);
    });
    mapa.appendChild(nodo);
  });

  app.innerHTML = "";
  app.appendChild(mapa);

  const tip = document.createElement("p");
  tip.className = "tip-bar";
  tip.innerHTML =
    "Responde con <kbd>a</kbd> <kbd>b</kbd> <kbd>c</kbd> y avanza con <kbd>Enter</kbd>. Fallar solo cuesta un corazón: la pregunta sigue ahí hasta que la resuelvas.";
  app.appendChild(tip);
}

// ---------- Batalla ----------
function empezarMundo(indice) {
  mundoActual = MUNDOS[indice];
  preguntaIndex = 0;
  vidas = VIDAS_MAX;
  combo = 0;
  mejorCombo = 0;
  renderPregunta();
}

function renderPregunta() {
  const mundo = mundoActual;
  resueltaActual = false;
  derrotado = false;

  if (preguntaIndex >= mundo.preguntas.length) {
    completarMundo();
    return;
  }

  const pregunta = mundo.preguntas[preguntaIndex];
  const hpRestante = Math.round(
    ((mundo.preguntas.length - preguntaIndex) / mundo.preguntas.length) * 100,
  );

  app.innerHTML = `
    <section class="battle" id="battle">
      <div class="battle-top">
        <div class="enemy">
          <div class="enemy-avatar ${mundo.esJefe ? "boss-avatar" : ""}" id="enemyAvatar">${mundo.enemigoEmoji}</div>
          <div class="enemy-info">
            <p class="enemy-name">${mundo.enemigo}</p>
            <div class="hp-track">
              <div class="hp-fill ${mundo.esJefe ? "boss-hp" : ""}" id="hpFill" style="width:${hpRestante}%"></div>
            </div>
          </div>
        </div>
        <div class="player-stats">
          <span class="hearts" id="hearts"></span>
          <span class="combo" id="combo">COMBO x${combo}</span>
        </div>
      </div>

      <p class="question-counter">${mundo.esJefe ? "Decisión" : "Reto"} ${preguntaIndex + 1} de ${mundo.preguntas.length} · ${mundo.nombre}</p>
      <p class="question">${pregunta.pregunta}</p>
      <div class="answers" id="answers"></div>
      <div class="explain" id="explain"></div>
      <div class="next-wrap" id="nextWrap">
        <button class="btn btn-ghost" id="backBtn" type="button">← Volver al mapa</button>
        <button class="btn ${mundo.esJefe ? "btn-gold" : "btn-primary"}" id="nextBtn" type="button">
          ${preguntaIndex === mundo.preguntas.length - 1 ? "Rematar ⚡" : "Siguiente golpe →"}
        </button>
      </div>
    </section>
  `;

  pintarVidas();

  const answers = document.getElementById("answers");
  const orden = mezclar(
    pregunta.opciones.map((texto, i) => ({ texto, correcta: i === pregunta.correcta })),
  );

  orden.forEach((opcion, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer";
    btn.innerHTML = `<span class="key">${KEYS[i]}</span><span>${opcion.texto}</span>`;
    btn.addEventListener("click", (ev) => elegir(btn, opcion, pregunta, ev));
    answers.appendChild(btn);
  });

  document.getElementById("nextBtn").addEventListener("click", siguientePregunta);
  document.getElementById("backBtn").addEventListener("click", renderMapa);
}

function pintarVidas() {
  const el = document.getElementById("hearts");
  if (!el) return;
  let html = "";
  for (let i = 0; i < VIDAS_MAX; i++) {
    html += `<span class="${i < vidas ? "" : "heart-lost"}">❤️</span>`;
  }
  el.innerHTML = html;
}

function elegir(btn, opcion, pregunta, ev) {
  if (resueltaActual || derrotado) return;

  if (opcion.correcta) {
    resueltaActual = true;
    combo++;
    mejorCombo = Math.max(mejorCombo, combo);
    progreso.xp += XP_ACIERTO + (combo - 1) * 25;
    guardarProgreso();
    actualizarHud();

    btn.classList.add("correct");
    [...document.querySelectorAll(".answer")].forEach((b) => (b.disabled = true));

    golpearEnemigo();
    lanzarXp(ev, "+" + (XP_ACIERTO + (combo - 1) * 25) + " XP");
    confeti(18);

    const comboEl = document.getElementById("combo");
    comboEl.textContent = "COMBO x" + combo;
    comboEl.classList.add("pop");
    setTimeout(() => comboEl.classList.remove("pop"), 450);

    const explain = document.getElementById("explain");
    explain.innerHTML = "<strong>💡 " + pregunta.explicacion + "</strong>";
    explain.classList.add("show");
    document.getElementById("nextWrap").classList.add("show");
  } else {
    combo = 0;
    vidas--;
    btn.classList.add("wrong");
    btn.disabled = true;
    pintarVidas();
    document.getElementById("combo").textContent = "COMBO x0";

    const battle = document.getElementById("battle");
    battle.classList.add("shake");
    setTimeout(() => battle.classList.remove("shake"), 420);

    if (vidas <= 0) {
      // Bloquea cualquier interacción mientras entra la pantalla de derrota
      derrotado = true;
      [...document.querySelectorAll(".answer")].forEach((b) => (b.disabled = true));
      setTimeout(sinVidas, 600);
    }
  }
}

function golpearEnemigo() {
  const avatar = document.getElementById("enemyAvatar");
  avatar.classList.add("hit");
  setTimeout(() => avatar.classList.remove("hit"), 450);

  const hp = document.getElementById("hpFill");
  const restante =
    ((mundoActual.preguntas.length - preguntaIndex - 1) /
      mundoActual.preguntas.length) *
    100;
  hp.style.width = Math.max(0, restante) + "%";
}

function siguientePregunta() {
  if (!resueltaActual || derrotado) return;
  preguntaIndex++;
  renderPregunta();
}

function sinVidas() {
  app.innerHTML = `
    <section class="battle">
      <div class="result">
        <div class="result-emoji">💥</div>
        <h2>¡Casi lo tenías!</h2>
        <p>
          Te quedaste sin corazones en <strong>${mundoActual.nombre}</strong>.
          No pasa nada: fallar es parte de aprender a decidir. Vuelve a
          intentarlo, ahora ya sabes por dónde van los tiros.
        </p>
        <div class="result-actions">
          <button class="btn btn-primary" id="retryBtn" type="button">Reintentar nivel 🔁</button>
          <button class="btn btn-ghost" id="mapBtn" type="button">Volver al mapa</button>
        </div>
      </div>
    </section>
  `;
  document
    .getElementById("retryBtn")
    .addEventListener("click", () => empezarMundo(MUNDOS.indexOf(mundoActual)));
  document.getElementById("mapBtn").addEventListener("click", renderMapa);
}

function completarMundo() {
  const estrellas = Math.max(1, vidas);
  const previas = progreso.estrellas[mundoActual.id] || 0;
  progreso.estrellas[mundoActual.id] = Math.max(previas, estrellas);
  guardarProgreso();
  actualizarHud();
  confeti(90);

  if (mundoActual.esJefe) {
    renderVictoriaFinal(estrellas);
    return;
  }

  const indice = MUNDOS.indexOf(mundoActual);
  const siguiente = MUNDOS[indice + 1];
  const jefeDesbloqueado =
    siguiente && siguiente.esJefe && NIVELES.every((n) => nivelCompletado(n.id));

  app.innerHTML = `
    <section class="battle">
      <div class="result">
        <div class="result-emoji">${mundoActual.emoji}</div>
        <h2>¡${mundoActual.enemigo} derrotado!</h2>
        <div class="stars-big">${"★".repeat(estrellas)}${"☆".repeat(3 - estrellas)}</div>
        <p>
          Mejor combo: <strong>x${mejorCombo}</strong> · XP total:
          <strong>${progreso.xp}</strong><br />
          ${
            jefeDesbloqueado
              ? "🔓 Has desbloqueado <strong>EL JEFE FINAL</strong>. Prepárate: ahí se junta todo."
              : siguiente
                ? "Siguiente parada: <strong>" + siguiente.nombre + "</strong>"
                : ""
          }
        </p>
        <div class="result-actions">
          ${
            siguiente
              ? `<button class="btn ${jefeDesbloqueado ? "btn-gold" : "btn-primary"}" id="nextLevelBtn" type="button">${jefeDesbloqueado ? "Enfrentar al jefe ☠️" : "Siguiente nivel →"}</button>`
              : ""
          }
          <button class="btn btn-ghost" id="mapBtn" type="button">Ver el mapa</button>
        </div>
      </div>
    </section>
  `;

  const nextLevelBtn = document.getElementById("nextLevelBtn");
  if (nextLevelBtn) {
    nextLevelBtn.addEventListener("click", () => empezarMundo(indice + 1));
  }
  document.getElementById("mapBtn").addEventListener("click", renderMapa);
}

function renderVictoriaFinal(estrellas) {
  setTimeout(() => confeti(90), 400);
  setTimeout(() => confeti(90), 900);

  app.innerHTML = `
    <section class="battle">
      <div class="result">
        <div class="result-emoji">🏆</div>
        <h2>¡El Bug Definitivo ha caído!</h2>
        <div class="stars-big">${"★".repeat(estrellas)}${"☆".repeat(3 - estrellas)}</div>
        <p>
          Has recorrido las variables, los bucles, las funciones, el DOM, las
          clases y, al final, has diseñado una app entera tomando decisiones
          tú solo. XP final: <strong>${progreso.xp}</strong>.
        </p>

        <div class="victory-card">
          <h3>Lo que acabas de entrenar</h3>
          <ul>
            <li><strong>Reconocer el patrón:</strong> ante un problema, ya sabes si pide un bucle, una función, una clase o un evento.</li>
            <li><strong>Empezar por el estado:</strong> qué datos cambian antes de escribir una sola línea.</li>
            <li><strong>Detectar casos límite:</strong> qué pasa si está vacío, si no existe, si el usuario hace algo raro.</li>
            <li><strong>No bloquearte:</strong> la sintaxis exacta se busca en 10 segundos; saber qué herramienta necesitas es lo que no se improvisa.</li>
          </ul>
        </div>

        <div class="result-actions">
          <a class="btn btn-gold" href="proyectos.html">Construir una app de verdad 🚀</a>
          <a class="btn btn-primary" href="entrenador.html">Entrenar con mi propio problema 🧠</a>
          <button class="btn btn-ghost" id="mapBtn" type="button">Volver al mapa</button>
        </div>
      </div>
    </section>
  `;
  document.getElementById("mapBtn").addEventListener("click", renderMapa);
}

// ---------- Efectos ----------
function lanzarXp(ev, texto) {
  const el = document.createElement("div");
  el.className = "floating-xp";
  el.textContent = texto;
  el.style.left = (ev ? ev.clientX : window.innerWidth / 2) - 30 + "px";
  el.style.top = (ev ? ev.clientY : window.innerHeight / 2) - 20 + "px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

function confeti(cantidad) {
  const colores = ["#22d3ee", "#f472b6", "#a78bfa", "#a3e635", "#fbbf24"];
  for (let i = 0; i < cantidad; i++) {
    const pieza = document.createElement("div");
    pieza.className = "confetti";
    pieza.style.left = Math.random() * 100 + "vw";
    pieza.style.top = "-20px";
    pieza.style.background = colores[Math.floor(Math.random() * colores.length)];
    pieza.style.animationDelay = Math.random() * 0.5 + "s";
    pieza.style.animationDuration = 1.8 + Math.random() * 1.2 + "s";
    document.body.appendChild(pieza);
    setTimeout(() => pieza.remove(), 3400);
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

// ---------- Teclado ----------
document.addEventListener("keydown", (e) => {
  if (!mundoActual) return;
  const tecla = e.key.toLowerCase();
  if (!resueltaActual && KEYS.includes(tecla)) {
    const opciones = document.querySelectorAll(".answer");
    const idx = KEYS.indexOf(tecla);
    if (opciones[idx]) opciones[idx].click();
  } else if (resueltaActual && tecla === "enter") {
    siguientePregunta();
  }
});

// ---------- Reinicio ----------
document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("¿Borrar todo tu progreso del juego y empezar de cero?")) return;
  progreso = { estrellas: {}, xp: 0 };
  guardarProgreso();
  renderMapa();
});

renderMapa();
