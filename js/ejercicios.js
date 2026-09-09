const PROGRESO_KEY = "ejercicios-progreso";
const KEYS = ["a", "b", "c"];
const ORDEN_DIFICULTAD = { Fácil: 0, Medio: 1, Avanzado: 2, Senior: 3 };

let topicFilter = TOPICS[0];
let queue = [];
let pos = 0;
let total = 0;
let correctCount = 0;
let attempts = 0;
let answered = false;

function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function cargarProgreso() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESO_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function marcarTopicCompletado(topic) {
  const progreso = cargarProgreso();
  progreso[topic] = true;
  try {
    localStorage.setItem(PROGRESO_KEY, JSON.stringify(progreso));
  } catch (e) {}
}

function preguntasDe(topic) {
  // Ordenadas de fácil a senior: no se mezclan, hay que superarlas en orden.
  return EJERCICIOS.filter((item) => item.topic === topic).sort(
    (a, b) => ORDEN_DIFICULTAD[a.dificultad] - ORDEN_DIFICULTAD[b.dificultad],
  );
}

function startRound() {
  const pool = preguntasDe(topicFilter);
  queue = pool.map((item, i) => ({ ...item, uid: i + "-" + Date.now() }));
  pos = 0;
  total = queue.length;
  correctCount = 0;
  attempts = 0;
  answered = false;
  renderCard();
  updateStats();
}

function updateStats() {
  document.getElementById("statAciertos").textContent =
    correctCount + "/" + attempts;
  document.getElementById("statPos").textContent =
    Math.min(pos + 1, total) + " DE " + total;
  const pct = total ? Math.round((pos / total) * 100) : 0;
  document.getElementById("progressFill").style.width = pct + "%";
}

function renderCard() {
  const cardArea = document.getElementById("cardArea");
  cardArea.innerHTML = "";

  if (pos >= total) {
    marcarTopicCompletado(topicFilter);
    renderFilters();
    cardArea.innerHTML =
      '<div class="round-done"><h2>Tema completado</h2><p>' +
      correctCount +
      " aciertos de " +
      attempts +
      ' intentos en "' +
      topicFilter +
      '".</p><button class="btn-restart" id="restartBtn" type="button">Repetir tema</button></div>';
    document
      .getElementById("restartBtn")
      .addEventListener("click", startRound);
    return;
  }

  const item = queue[pos];
  answered = false;

  const optionsOrder = shuffle(
    item.opciones.map((text, i) => ({ text, isCorrect: i === item.correcta })),
  );

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="badges">
      <span class="badge diff-${item.dificultad}">${item.dificultad}</span>
      <span class="badge">${item.topic}</span>
    </div>
    <p class="pregunta">${item.pregunta}</p>
    <div class="options"></div>
    <div class="explain-box" id="explainBox"></div>
    <button class="next-btn" id="nextBtn" type="button">Seguir →</button>
  `;

  const optionsEl = card.querySelector(".options");
  optionsOrder.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.innerHTML = `<span class="key">${KEYS[i]})</span><span>${opt.text}</span>`;
    btn.addEventListener("click", () => selectOption(btn, opt, item, optionsEl));
    optionsEl.appendChild(btn);
  });

  card.querySelector("#nextBtn").addEventListener("click", nextCard);

  cardArea.appendChild(card);
  updateStats();
}

function selectOption(btn, opt, item, optionsEl) {
  if (answered) return; // ya se acertó: esta pregunta queda bloqueada hasta "Seguir"
  attempts++;

  if (opt.isCorrect) {
    answered = true;
    correctCount++;
    btn.classList.add("correct");
    [...optionsEl.children].forEach((child) => (child.disabled = true));

    const explainBox = document.getElementById("explainBox");
    explainBox.textContent = item.explicacion;
    explainBox.classList.add("show");

    document.getElementById("nextBtn").classList.add("show");
  } else {
    // Falla: se bloquea solo esa opción, hay que seguir intentando en la misma pregunta
    btn.classList.add("incorrect");
    btn.disabled = true;
  }

  updateStats();
}

function nextCard() {
  if (!answered) return;
  pos++;
  renderCard();
}

function renderFilters() {
  const progreso = cargarProgreso();
  const el = document.getElementById("topicFilters");
  el.innerHTML = "";
  TOPICS.forEach((topic) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "topic-pill" + (topic === topicFilter ? " active" : "");
    btn.innerHTML =
      (progreso[topic] ? '<span class="check">✓</span>' : "") +
      "<span>" +
      topic +
      "</span>";
    btn.addEventListener("click", () => {
      topicFilter = topic;
      renderFilters();
      startRound();
    });
    el.appendChild(btn);
  });
}

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (!answered && KEYS.includes(key)) {
    const idx = KEYS.indexOf(key);
    const options = document.querySelectorAll(".option");
    if (options[idx]) options[idx].click();
  } else if (answered && key === "enter") {
    nextCard();
  }
});

document.getElementById("cardArea").addEventListener("click", (e) => {
  if (answered && e.target.closest(".explain-box")) {
    nextCard();
  }
});

renderFilters();
startRound();
