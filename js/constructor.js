const PROGRESO_KEY = "constructor-progreso";
const KEYS = ["a", "b", "c"];

let programaActual = null;
let pasoIndex = 0;
let lineasCodigo = [];
let answered = false;

const programGrid = document.getElementById("programGrid");
const quizPanel = document.getElementById("quizPanel");
const codeOutput = document.getElementById("codeOutput");

function cargarProgreso() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESO_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function marcarCompletado(id) {
  const progreso = cargarProgreso();
  progreso[id] = true;
  try {
    localStorage.setItem(PROGRESO_KEY, JSON.stringify(progreso));
  } catch (e) {}
}

function renderProgramList() {
  const progreso = cargarProgreso();
  programGrid.innerHTML = "";
  PROGRAMAS.forEach((programa) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className =
      "program-card" + (programaActual === programa ? " active" : "");
    btn.innerHTML = `
      <span class="p-title">${progreso[programa.id] ? '<span class="p-check">✓</span>' : ""}${programa.titulo}</span>
      <span class="p-desc">${programa.descripcion}</span>
    `;
    btn.addEventListener("click", () => seleccionarPrograma(programa));
    programGrid.appendChild(btn);
  });
}

function seleccionarPrograma(programa) {
  programaActual = programa;
  pasoIndex = 0;
  lineasCodigo = [];
  answered = false;
  renderProgramList();
  renderCodigo();
  renderPaso();
}

function renderCodigo(resaltarUltima) {
  if (lineasCodigo.length === 0) {
    codeOutput.textContent = "// El código aparecerá aquí, línea a línea, según vayas respondiendo.";
    return;
  }
  if (!resaltarUltima) {
    codeOutput.textContent = lineasCodigo.join("\n");
    return;
  }
  codeOutput.innerHTML = "";
  lineasCodigo.forEach((linea, i) => {
    const span = document.createElement("span");
    if (i === lineasCodigo.length - 1) span.className = "line-new";
    span.textContent = linea + (i < lineasCodigo.length - 1 ? "\n" : "");
    codeOutput.appendChild(span);
  });
}

function renderPaso() {
  if (!programaActual) {
    quizPanel.innerHTML =
      '<div class="done-banner"><h2 style="color:var(--muted)">Elige un ejercicio arriba</h2><p style="color:var(--muted)">Cada uno construye, paso a paso, un pequeño programa completo.</p></div>';
    return;
  }

  if (pasoIndex >= programaActual.pasos.length) {
    marcarCompletado(programaActual.id);
    renderProgramList();
    quizPanel.innerHTML = `
      <div class="done-banner">
        <h2>✅ Código completo</h2>
        <p>Has terminado "${programaActual.titulo}". Revisa el resultado en el panel de código y prueba a escribirlo tú mismo desde cero.</p>
        <button class="restart-btn" id="restartBtn" type="button">Repetir este ejercicio</button>
      </div>
    `;
    document
      .getElementById("restartBtn")
      .addEventListener("click", () => seleccionarPrograma(programaActual));
    return;
  }

  const paso = programaActual.pasos[pasoIndex];
  answered = false;

  const opcionesOrden = shuffle(
    paso.opciones.map((texto, i) => ({ texto, esCorrecta: i === paso.correcta })),
  );

  quizPanel.innerHTML = `
    <div class="step-progress">Paso ${pasoIndex + 1} de ${programaActual.pasos.length} · ${programaActual.titulo}</div>
    <p class="pregunta">${paso.pregunta}</p>
    <div class="options"></div>
    <div class="explain-box" id="explainBox"></div>
    <button class="continue-btn" id="continueBtn" type="button">Añadir esta línea y continuar →</button>
  `;

  const optionsEl = quizPanel.querySelector(".options");
  opcionesOrden.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.innerHTML = `<span class="key">${KEYS[i]})</span><span>${escapeHtml(opt.texto)}</span>`;
    btn.addEventListener("click", () => elegirOpcion(btn, opt, paso, optionsEl));
    optionsEl.appendChild(btn);
  });
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function elegirOpcion(btn, opt, paso, optionsEl) {
  if (answered) return;
  answered = true;

  if (opt.esCorrecta) {
    btn.classList.add("correct");
  } else {
    btn.classList.add("incorrect");
    [...optionsEl.children].forEach((child) => {
      if (child.textContent.trim().endsWith(paso.opciones[paso.correcta])) {
        child.classList.add("correct");
      }
    });
  }

  [...optionsEl.children].forEach((child) => (child.disabled = true));

  const explainBox = document.getElementById("explainBox");
  explainBox.textContent = paso.explicacion;
  explainBox.classList.add("show");

  document.getElementById("continueBtn").classList.add("show");
}

function continuarPaso() {
  const paso = programaActual.pasos[pasoIndex];
  lineasCodigo.push(paso.linea);
  renderCodigo(true);
  pasoIndex++;
  renderPaso();
}

function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "continueBtn") {
    continuarPaso();
  }
});

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (!programaActual) return;
  if (!answered && KEYS.includes(key)) {
    const idx = KEYS.indexOf(key);
    const options = document.querySelectorAll(".option");
    if (options[idx]) options[idx].click();
  } else if (answered && key === "enter") {
    continuarPaso();
  }
});

renderProgramList();
renderCodigo();
renderPaso();
