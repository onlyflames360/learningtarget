// La lógica del quiz. Los datos (DATA, CATEGORIES, LANGS) viven en js/metodos-data.js,
// que también reutiliza el buscador de buscar.html.

// ---------- Estado ----------
let langFilter = "JavaScript";
let catFilter = "Variables";
let queue = [];
let pos = 0;
let total = 0;
let correctCount = 0;
let attempts = 0;
let streak = 0;
let answered = false;

const KEYS = ["a", "b", "c"];

function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function filteredPool() {
  return DATA.filter((item) => {
    const langOk = langFilter === "Los dos" || item.lang === langFilter;
    const catOk = catFilter === "Todas" || item.cat === catFilter;
    return langOk && catOk;
  });
}

function startRound() {
  const pool = shuffle(filteredPool());
  queue = pool.map((item, i) => ({ ...item, uid: i + "-" + Date.now() }));
  pos = 0;
  total = queue.length;
  correctCount = 0;
  attempts = 0;
  streak = 0;
  answered = false;
  renderCard();
  updateStats();
}

function updateStats() {
  document.getElementById("statAciertos").textContent =
    correctCount + "/" + attempts;
  document.getElementById("statRacha").textContent = streak;
  document.getElementById("statPos").textContent =
    Math.min(pos + 1, total) + " DE " + total;
  const pct = total ? Math.round((pos / total) * 100) : 0;
  document.getElementById("progressFill").style.width = pct + "%";
}

function renderCard() {
  const cardArea = document.getElementById("cardArea");
  cardArea.innerHTML = "";

  if (total === 0) {
    cardArea.innerHTML =
      '<div class="round-done"><h2>No hay métodos con estos filtros</h2><p>Prueba a cambiar el idioma o la categoría.</p></div>';
    return;
  }

  if (pos >= total) {
    cardArea.innerHTML =
      '<div class="round-done"><h2>Ronda completada</h2><p>' +
      correctCount +
      " aciertos de " +
      attempts +
      ' intentos.</p><button class="pill active" id="restartBtn" type="button">Repetir ronda</button></div>';
    document
      .getElementById("restartBtn")
      .addEventListener("click", startRound);
    return;
  }

  const item = queue[pos];
  answered = false;

  const hintCode = document.getElementById("hintCode");
  hintCode.textContent = item.example;
  hintCode.classList.remove("show");
  document.getElementById("hintToggle").textContent =
    "💡 Ver código de ejemplo (sin responder, solo para deducirlo)";

  const optionsOrder = shuffle(
    item.options.map((text, i) => ({ text, isCorrect: i === item.correct })),
  );

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="badges">
      <span class="badge lang">${item.lang}</span>
      <span class="badge">${item.cat.toUpperCase()}</span>
    </div>
    <p class="method-name">${item.method}</p>
    <p class="ask">¿Qué hace?</p>
    <div class="options"></div>
    <div class="example-box" id="exampleBox"></div>
    <button class="next-btn" id="nextBtn" type="button">Seguir →</button>
  `;

  const optionsEl = card.querySelector(".options");
  optionsOrder.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.innerHTML = `<span class="key">${KEYS[i]}</span><span>${opt.text}</span>`;
    btn.addEventListener("click", () => selectOption(btn, opt, item, optionsEl));
    optionsEl.appendChild(btn);
  });

  card.querySelector("#nextBtn").addEventListener("click", nextCard);

  cardArea.appendChild(card);
  updateStats();
}

function selectOption(btn, opt, item, optionsEl) {
  if (answered) return;
  answered = true;
  attempts++;

  if (opt.isCorrect) {
    correctCount++;
    streak++;
    btn.classList.add("correct");
  } else {
    streak = 0;
    btn.classList.add("incorrect");
    [...optionsEl.children].forEach((child, i) => {
      if (child.textContent.trim() === item.options[item.correct]) {
        child.classList.add("correct");
      }
    });
    // Falla: vuelve a salir al final de la ronda
    queue.push({ ...item, uid: item.uid + "-retry-" + Date.now() });
    total = queue.length;
  }

  [...optionsEl.children].forEach((child) => (child.disabled = true));

  const exampleBox = document.getElementById("exampleBox");
  exampleBox.textContent = item.example;
  exampleBox.classList.add("show");

  document.getElementById("nextBtn").classList.add("show");

  updateStats();
}

function nextCard() {
  if (!answered) return;
  pos++;
  renderCard();
}

// ---------- Filtros ----------
function renderFilters() {
  const langEl = document.getElementById("langFilters");
  langEl.innerHTML = "";
  LANGS.forEach((lang) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pill" + (lang === langFilter ? " active" : "");
    btn.textContent = lang;
    btn.addEventListener("click", () => {
      langFilter = lang;
      renderFilters();
      startRound();
    });
    langEl.appendChild(btn);
  });

  const catEl = document.getElementById("catFilters");
  catEl.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pill" + (cat === catFilter ? " active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      catFilter = cat;
      renderFilters();
      startRound();
    });
    catEl.appendChild(btn);
  });
}

// ---------- Teclado ----------
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

// ---------- Avanzar con clic en la tarjeta tras responder ----------
document.getElementById("cardArea").addEventListener("click", (e) => {
  if (answered && e.target.closest(".example-box")) {
    nextCard();
  }
});

document.getElementById("hintToggle").addEventListener("click", () => {
  const hintCode = document.getElementById("hintCode");
  const hintToggle = document.getElementById("hintToggle");
  const showing = hintCode.classList.toggle("show");
  hintToggle.textContent = showing
    ? "🙈 Ocultar código de ejemplo"
    : "💡 Ver código de ejemplo (sin responder, solo para deducirlo)";
});

renderFilters();
startRound();
