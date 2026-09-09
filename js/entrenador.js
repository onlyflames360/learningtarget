const ESTADO_KEY = "entrenador-estado";

let estado = cargarEstado();
let modal = null; // { piezaId, paso, preguntas }

function cargarEstado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(ESTADO_KEY));
    if (guardado && Array.isArray(guardado.piezas)) return guardado;
  } catch (e) {}
  return { problema: "", piezas: [] };
}

function guardarEstado() {
  try {
    localStorage.setItem(ESTADO_KEY, JSON.stringify(estado));
  } catch (e) {}
}

function crearPieza(nombre) {
  return {
    id: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
    nombre: nombre || "",
    tengo: "",
    necesito: "",
    antes: "",
    despues: "",
    entradaSalida: "",
    ignorar: "",
    microDecision: "",
    estado: "abierta", // abierta | bloqueada | resuelta
    open: true,
  };
}

// ---------- Heurística: "estás resolviendo demasiado a la vez" ----------
const CONECTORES = [
  " y ",
  " y también ",
  " además ",
  " también ",
  " luego ",
  " después ",
  " mientras ",
  " a la vez ",
  " al mismo tiempo ",
  ", ",
];

function detectarSobrecarga(texto) {
  if (!texto) return 0;
  const plano = " " + texto.toLowerCase() + " ";
  let cuenta = 0;
  CONECTORES.forEach((c) => {
    cuenta += plano.split(c).length - 1;
  });
  return cuenta;
}

function renderAvisoSobrecarga(texto, contenedorId, onDividir) {
  const box = document.getElementById(contenedorId);
  const cuenta = detectarSobrecarga(texto);
  if (cuenta >= 2) {
    box.classList.add("show");
    box.innerHTML =
      "Esto suena a más de una decisión a la vez (detecté " +
      cuenta +
      ' conectores como "y", "también" o comas). ¿Cuál es la pieza más pequeña de todas las que mencionas? <br><button type="button">Dividir en dos piezas</button>';
    box.querySelector("button").addEventListener("click", onDividir);
  } else {
    box.classList.remove("show");
    box.innerHTML = "";
  }
}

// ---------- Pistas de flujo mental ----------
function renderPistasFlujo(texto) {
  const cont = document.getElementById("flowHints");
  cont.innerHTML = "";
  const encontradas = PISTAS_FLUJO.filter((p) => p.patron.test(texto || ""));
  if (encontradas.length === 0) {
    cont.classList.remove("show");
    return;
  }
  cont.classList.add("show");
  encontradas.forEach((p) => {
    const div = document.createElement("div");
    div.className = "flow-hint";
    div.innerHTML =
      "<strong>" +
      p.etiqueta +
      "</strong><ul>" +
      p.preguntas.map((q) => "<li>" + q + "</li>").join("") +
      "</ul>";
    cont.appendChild(div);
  });
}

// ---------- Sección: problema general ----------
function initProblema() {
  const textarea = document.getElementById("problemaInput");
  textarea.value = estado.problema;
  renderPistasFlujo(estado.problema);
  renderAvisoSobrecarga(estado.problema, "problemaAviso", () => {
    dividirTextoEnDosPiezas(estado.problema);
  });

  textarea.addEventListener("input", () => {
    estado.problema = textarea.value;
    guardarEstado();
    renderPistasFlujo(estado.problema);
    renderAvisoSobrecarga(estado.problema, "problemaAviso", () => {
      dividirTextoEnDosPiezas(estado.problema);
    });
  });
}

function dividirTextoEnDosPiezas(texto) {
  estado.piezas.push(crearPieza("Primera parte de: " + (texto || "tu problema").slice(0, 40)));
  estado.piezas.push(crearPieza("Segunda parte de: " + (texto || "tu problema").slice(0, 40)));
  guardarEstado();
  renderPiezas();
}

// ---------- Sección: piezas ----------
function renderPiezas() {
  const cont = document.getElementById("piezasList");
  cont.innerHTML = "";

  if (estado.piezas.length === 0) {
    cont.innerHTML =
      '<div class="empty-state">Todavía no has dividido nada. Añade la primera pieza: la más pequeña que se te ocurra.</div>';
    return;
  }

  estado.piezas.forEach((pieza) => cont.appendChild(renderPiezaCard(pieza)));
}

function renderPiezaCard(pieza) {
  const card = document.createElement("article");
  card.className = "piece-card" + (pieza.open ? " open" : "");

  const header = document.createElement("button");
  header.type = "button";
  header.className = "piece-header";
  header.innerHTML =
    '<span class="piece-name">' +
    (pieza.nombre || "(sin nombre todavía)") +
    '</span><span class="piece-status ' +
    pieza.estado +
    '">' +
    (pieza.estado === "abierta"
      ? "En progreso"
      : pieza.estado === "bloqueada"
        ? "Bloqueada"
        : "Resuelta") +
    '</span><span class="piece-chevron">⌄</span>';
  header.addEventListener("click", () => {
    pieza.open = !pieza.open;
    guardarEstado();
    renderPiezas();
  });

  const body = document.createElement("div");
  body.className = "piece-body";

  const nombreField = document.createElement("div");
  nombreField.className = "field";
  nombreField.innerHTML = '<label>Nombre de la pieza</label>';
  const nombreInput = document.createElement("input");
  nombreInput.type = "text";
  nombreInput.value = pieza.nombre;
  nombreInput.placeholder = "Ej: leer el valor del input";
  nombreInput.addEventListener("input", () => {
    pieza.nombre = nombreInput.value;
    guardarEstado();
    header.querySelector(".piece-name").textContent =
      pieza.nombre || "(sin nombre todavía)";
    renderAvisoSobrecarga(pieza.nombre, "aviso-" + pieza.id, () => {
      dividirPieza(pieza.id);
    });
  });
  nombreField.appendChild(nombreInput);

  const avisoDiv = document.createElement("div");
  avisoDiv.className = "hint-warning";
  avisoDiv.id = "aviso-" + pieza.id;

  const camposSimples = [
    ["tengo", "Qué información tienes"],
    ["necesito", "Qué información necesitas"],
    ["antes", "Qué ocurre justo antes"],
    ["despues", "Qué ocurre justo después"],
  ];

  const dosCol = document.createElement("div");
  dosCol.className = "two-col-fields";
  camposSimples.forEach(([campo, etiqueta]) => {
    dosCol.appendChild(crearCampoTextarea(pieza, campo, etiqueta));
  });

  const entradaSalidaField = crearCampoTextarea(
    pieza,
    "entradaSalida",
    "Qué datos entran y qué datos salen de esta pieza",
  );
  const ignorarField = crearCampoTextarea(
    pieza,
    "ignorar",
    "Qué puedes ignorar temporalmente",
  );

  body.appendChild(nombreField);
  body.appendChild(avisoDiv);
  body.appendChild(dosCol);
  body.appendChild(entradaSalidaField);
  body.appendChild(ignorarField);

  if (pieza.microDecision) {
    const micro = document.createElement("div");
    micro.className = "micro-decision";
    micro.innerHTML =
      "<strong>Decisión más pequeña anotada:</strong><br>" + pieza.microDecision;
    body.appendChild(micro);
  }

  const acciones = document.createElement("div");
  acciones.className = "piece-actions";

  const btnAtascado = document.createElement("button");
  btnAtascado.type = "button";
  btnAtascado.className = "btn primary";
  btnAtascado.textContent = "Estoy atascado en esta pieza";
  btnAtascado.addEventListener("click", () => abrirModalAtasco(pieza.id));

  const btnResuelta = document.createElement("button");
  btnResuelta.type = "button";
  btnResuelta.className = "btn secondary";
  btnResuelta.textContent =
    pieza.estado === "resuelta" ? "Marcada como resuelta ✓" : "Marcar como resuelta";
  btnResuelta.addEventListener("click", () => {
    pieza.estado = pieza.estado === "resuelta" ? "abierta" : "resuelta";
    guardarEstado();
    renderPiezas();
  });

  const btnDividir = document.createElement("button");
  btnDividir.type = "button";
  btnDividir.className = "btn ghost";
  btnDividir.textContent = "Dividir en dos piezas";
  btnDividir.addEventListener("click", () => dividirPieza(pieza.id));

  const btnEliminar = document.createElement("button");
  btnEliminar.type = "button";
  btnEliminar.className = "btn danger";
  btnEliminar.textContent = "Eliminar";
  btnEliminar.addEventListener("click", () => {
    estado.piezas = estado.piezas.filter((p) => p.id !== pieza.id);
    guardarEstado();
    renderPiezas();
  });

  acciones.appendChild(btnAtascado);
  acciones.appendChild(btnResuelta);
  acciones.appendChild(btnDividir);
  acciones.appendChild(btnEliminar);
  body.appendChild(acciones);

  card.appendChild(header);
  card.appendChild(body);

  // Aplica el aviso de sobrecarga ya guardado, si lo hubiera, tras insertar en el DOM.
  requestAnimationFrame(() => {
    renderAvisoSobrecarga(pieza.nombre, "aviso-" + pieza.id, () => {
      dividirPieza(pieza.id);
    });
  });

  return card;
}

function crearCampoTextarea(pieza, campo, etiqueta) {
  const div = document.createElement("div");
  div.className = "field";
  const label = document.createElement("label");
  label.textContent = etiqueta;
  const textarea = document.createElement("textarea");
  textarea.value = pieza[campo] || "";
  textarea.addEventListener("input", () => {
    pieza[campo] = textarea.value;
    guardarEstado();
  });
  div.appendChild(label);
  div.appendChild(textarea);
  return div;
}

function dividirPieza(id) {
  const pieza = estado.piezas.find((p) => p.id === id);
  if (!pieza) return;
  const base = pieza.nombre || "esta pieza";
  estado.piezas.push(crearPieza("Parte 1 de: " + base));
  estado.piezas.push(crearPieza("Parte 2 de: " + base));
  estado.piezas = estado.piezas.filter((p) => p.id !== id);
  guardarEstado();
  renderPiezas();
}

// ---------- Modal socrático (cuando el usuario está atascado) ----------
function abrirModalAtasco(piezaId) {
  const pieza = estado.piezas.find((p) => p.id === piezaId);
  if (!pieza) return;
  pieza.estado = "bloqueada";
  guardarEstado();
  renderPiezas();

  modal = { piezaId, paso: 0, secuencia: PREGUNTAS_ATASCO.concat([PREGUNTA_MICRODECISION]) };
  renderModal();
  document.getElementById("modalOverlay").classList.add("show");
}

function cerrarModal() {
  document.getElementById("modalOverlay").classList.remove("show");
  modal = null;
}

function renderModal() {
  if (!modal) return;
  const pieza = estado.piezas.find((p) => p.id === modal.piezaId);
  const pregunta = modal.secuencia[modal.paso];

  document.getElementById("modalStep").textContent =
    "Pregunta " + (modal.paso + 1) + " de " + modal.secuencia.length;
  document.getElementById("modalTitulo").textContent = pregunta.titulo;
  document.getElementById("modalAyuda").textContent = pregunta.ayuda;

  const textarea = document.getElementById("modalRespuesta");
  textarea.value = pieza[pregunta.campo] || "";
  textarea.oninput = () => {
    pieza[pregunta.campo] = textarea.value;
    guardarEstado();
  };
  textarea.focus();

  document.getElementById("modalAnterior").disabled = modal.paso === 0;
  document.getElementById("modalSiguiente").textContent =
    modal.paso === modal.secuencia.length - 1 ? "Terminar" : "Siguiente";
}

function initModal() {
  document.getElementById("modalAnterior").addEventListener("click", () => {
    if (!modal || modal.paso === 0) return;
    modal.paso--;
    renderModal();
  });

  document.getElementById("modalSiguiente").addEventListener("click", () => {
    if (!modal) return;
    if (modal.paso < modal.secuencia.length - 1) {
      modal.paso++;
      renderModal();
      return;
    }
    // Última pregunta respondida: si escribió una micro-decisión, desbloquea la pieza.
    const pieza = estado.piezas.find((p) => p.id === modal.piezaId);
    if (pieza && pieza.microDecision && pieza.microDecision.trim() !== "") {
      pieza.estado = "abierta";
    }
    guardarEstado();
    renderPiezas();
    cerrarModal();
  });

  document.getElementById("modalCerrar").addEventListener("click", cerrarModal);
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") cerrarModal();
  });
}

// ---------- Añadir pieza / reiniciar ----------
function initAcciones() {
  document.getElementById("addPieceBtn").addEventListener("click", () => {
    estado.piezas.push(crearPieza(""));
    guardarEstado();
    renderPiezas();
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    if (!confirm("¿Borrar el problema y todas las piezas guardadas?")) return;
    estado = { problema: "", piezas: [] };
    guardarEstado();
    document.getElementById("problemaInput").value = "";
    renderPistasFlujo("");
    renderAvisoSobrecarga("", "problemaAviso", () => {});
    renderPiezas();
  });
}

initProblema();
initAcciones();
initModal();
renderPiezas();
