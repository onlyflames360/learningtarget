// `cards`, `cardsMetodos`, `cardsPensar` y `FILTROS_LANG` vienen de js/index-data.js
// (métodos de metodos.html + pasos de pensar.html)

const ESTADO_KEY = "index-tarjetas";

let langFilter = "Todos";
let deck = cards.slice(); // subconjunto activo según el filtro, navegable con Anterior/Siguiente
let currentIndex = 0;
let flipped = false;
const learned = new Set(); // guarda referencias a objetos de `cards`, no índices

const card = document.getElementById("card");
const frontText = document.getElementById("frontText");
const backText = document.getElementById("backText");
const currentIndexEl = document.getElementById("currentIndex");
const totalCardsEl = document.getElementById("totalCards");
const progressLabel = document.getElementById("progressLabel");
const learnedCount = document.getElementById("learnedCount");
const gridMetodos = document.getElementById("gridMetodos");
const gridPensar = document.getElementById("gridPensar");
const langFiltersEl = document.getElementById("langFilters");

function aplicarFiltro() {
  deck =
    langFilter === "Todos"
      ? cards.slice()
      : cards.filter((c) => c.lang === langFilter);
  currentIndex = 0;
  flipped = false;
  renderFilters();
  renderCard();
}

function renderFilters() {
  langFiltersEl.innerHTML = "";
  FILTROS_LANG.forEach((lang) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lang-pill" + (lang === langFilter ? " active" : "");
    btn.textContent = lang;
    btn.addEventListener("click", () => {
      langFilter = lang;
      aplicarFiltro();
    });
    langFiltersEl.appendChild(btn);
  });
}

function updateProgress() {
  const total = deck.length;
  const learnedTotal = learned.size;
  const percent = total ? Math.round((learnedTotal / cards.length) * 100) : 0;
  currentIndexEl.textContent = total ? String(currentIndex + 1) : "0";
  totalCardsEl.textContent = String(total);
  progressLabel.textContent = percent + "% aprendido";
  learnedCount.textContent = learnedTotal + " aprendidas";
}

function renderCard() {
  if (deck.length === 0) {
    frontText.textContent = "No hay tarjetas con este filtro.";
    backText.textContent = "Prueba a elegir otro filtro arriba.";
    updateProgress();
    renderGrids();
    return;
  }
  const cardData = deck[currentIndex];
  frontText.textContent = cardData.question;
  backText.textContent = cardData.answer;
  card.classList.toggle("flipped", flipped);
  card.setAttribute(
    "aria-label",
    "Tarjeta de estudio: " + cardData.question + ". " + cardData.answer,
  );
  updateProgress();
  renderGrids();
  guardarEstado();
}

function goToIndex(index) {
  if (deck.length === 0) return;
  currentIndex = (index + deck.length) % deck.length;
  flipped = false;
  renderCard();
}

function jumpToCard(cardData) {
  if (cardData.lang !== langFilter && langFilter !== "Todos") {
    langFilter = cardData.lang;
  }
  deck =
    langFilter === "Todos"
      ? cards.slice()
      : cards.filter((c) => c.lang === langFilter);
  const index = deck.indexOf(cardData);
  currentIndex = index === -1 ? 0 : index;
  flipped = false;
  renderFilters();
  renderCard();
  card.scrollIntoView({ behavior: "smooth", block: "center" });
}

function toggleFlip() {
  flipped = !flipped;
  card.classList.toggle("flipped", flipped);
}

function shuffleCards() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  currentIndex = 0;
  flipped = false;
  renderCard();
}

function toggleLearned() {
  if (deck.length === 0) return;
  const cardData = deck[currentIndex];
  if (learned.has(cardData)) {
    learned.delete(cardData);
  } else {
    learned.add(cardData);
  }
  updateProgress();
  renderGrids();
  guardarEstado();
}

function renderMiniGrid(container, list) {
  container.innerHTML = "";
  list.forEach((cardData) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className =
      "mini-card" + (deck[currentIndex] === cardData ? " active" : "");
    btn.innerHTML =
      "<span>" +
      cardData.question +
      "</span>" +
      (learned.has(cardData) ? '<span class="mini-check">✓</span>' : "");
    btn.addEventListener("click", () => jumpToCard(cardData));
    container.appendChild(btn);
  });
}

function renderGrids() {
  renderMiniGrid(gridMetodos, cardsMetodos);
  renderMiniGrid(gridPensar, cardsPensar);
}

// ---------- Recordar dónde te quedaste ----------
// Se guarda la pregunta de la tarjeta, no su posición: el botón Mezclar
// cambia el orden, así que un número dejaría de señalar a la misma tarjeta.
function guardarEstado() {
  try {
    localStorage.setItem(
      ESTADO_KEY,
      JSON.stringify({
        lang: langFilter,
        pregunta: deck.length ? deck[currentIndex].question : null,
        aprendidas: [...learned].map((c) => c.question),
      }),
    );
  } catch (e) {}
}

function recuperarEstado() {
  let guardado = {};
  try {
    guardado = JSON.parse(localStorage.getItem(ESTADO_KEY)) || {};
  } catch (e) {}

  if (FILTROS_LANG.includes(guardado.lang)) langFilter = guardado.lang;

  deck =
    langFilter === "Todos"
      ? cards.slice()
      : cards.filter((c) => c.lang === langFilter);

  // Las aprendidas se guardan como texto y aquí se vuelven a atar a sus objetos
  const porPregunta = new Map(cards.map((c) => [c.question, c]));
  (guardado.aprendidas || []).forEach((pregunta) => {
    const cardData = porPregunta.get(pregunta);
    if (cardData) learned.add(cardData);
  });

  const indice = deck.findIndex((c) => c.question === guardado.pregunta);
  currentIndex = indice === -1 ? 0 : indice;
}

document.getElementById("flipBtn").addEventListener("click", toggleFlip);
document
  .getElementById("prevBtn")
  .addEventListener("click", () => goToIndex(currentIndex - 1));
document
  .getElementById("nextBtn")
  .addEventListener("click", () => goToIndex(currentIndex + 1));
document
  .getElementById("shuffleBtn")
  .addEventListener("click", shuffleCards);
document
  .getElementById("learnedBtn")
  .addEventListener("click", toggleLearned);
document.getElementById("card").addEventListener("click", toggleFlip);
document.getElementById("card").addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleFlip();
  }
  if (event.key === "ArrowRight") {
    goToIndex(currentIndex + 1);
  }
  if (event.key === "ArrowLeft") {
    goToIndex(currentIndex - 1);
  }
});

recuperarEstado();
renderFilters();
renderCard();
