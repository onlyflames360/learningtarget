function renderReglas() {
  const ul = document.getElementById("reglasList");
  REGLAS_GENERALES.forEach((regla) => {
    const li = document.createElement("li");
    li.textContent = regla;
    ul.appendChild(li);
  });
}

function renderPrincipales() {
  const cont = document.getElementById("estructurasPrincipales");
  ESTRUCTURAS_PRINCIPALES.forEach((e) => {
    const card = document.createElement("article");
    card.className = "structure-card";
    card.innerHTML = `
      <div class="structure-header">
        <h3>${e.titulo}</h3>
        <span class="freq-badge">${e.frecuencia}</span>
      </div>
      <pre class="tree">${e.arbol}</pre>
      <p>${e.explicacion}</p>
    `;
    cont.appendChild(card);
  });
}

function renderSecundarias() {
  const cont = document.getElementById("estructurasSecundarias");
  ESTRUCTURAS_SECUNDARIAS.forEach((e) => {
    const acc = document.createElement("article");
    acc.className = "secondary-accordion";

    const summary = document.createElement("button");
    summary.type = "button";
    summary.className = "secondary-summary";
    summary.innerHTML = `<span>${e.titulo}</span><span class="chevron">⌄</span>`;
    summary.addEventListener("click", () => acc.classList.toggle("open"));

    const body = document.createElement("div");
    body.className = "secondary-body";
    body.innerHTML = `<pre class="tree">${e.arbol}</pre><p>${e.explicacion}</p>`;

    acc.appendChild(summary);
    acc.appendChild(body);
    cont.appendChild(acc);
  });
}

renderReglas();
renderPrincipales();
renderSecundarias();

// ---------------------------------------------------------------------------
// Instalación de herramientas
// ---------------------------------------------------------------------------

// Los ejemplos llevan HTML dentro (<script src=...>), así que hay que escapar
function escapar(texto) {
  return String(texto).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderFormas() {
  const cont = document.getElementById("formasInstalar");
  if (!cont) return;

  cont.innerHTML = FORMAS_INSTALAR.map(
    (f) => `
    <article class="forma-card">
      <span class="forma-apodo">${escapar(f.apodo)}</span>
      <code class="forma-comando">${escapar(f.forma)}</code>
      <p class="forma-que">${escapar(f.que)}</p>
      <pre class="consola"><code>${escapar(f.ej)}</code></pre>
    </article>`,
  ).join("");
}

function renderGestores() {
  const cont = document.getElementById("tablaGestores");
  if (!cont) return;

  const filas = GESTORES.map(
    ([que, ...comandos]) => `
      <tr>
        <th scope="row">${escapar(que)}</th>
        ${comandos.map((c) => `<td><code>${escapar(c)}</code></td>`).join("")}
      </tr>`,
  ).join("");

  cont.innerHTML = `
    <table class="gestores">
      <thead>
        <tr><th scope="col">Lo que quieres hacer</th><th scope="col">npm</th>
        <th scope="col">pnpm</th><th scope="col">yarn</th><th scope="col">bun</th></tr>
      </thead>
      <tbody>${filas}</tbody>
    </table>
  `;
}

function renderHerramientas() {
  const cont = document.getElementById("herramientas");
  if (!cont) return;

  HERRAMIENTAS.forEach((h, i) => {
    const card = document.createElement("article");
    // La primera va abierta: así se ve de qué va la sección sin tener que pulsar
    card.className = "herramienta-card" + (i === 0 ? " open" : "");

    const cabecera = document.createElement("button");
    cabecera.type = "button";
    cabecera.className = "herramienta-summary";
    cabecera.innerHTML = `
      <span class="herramienta-titulo">
        <span class="herramienta-nombre">${escapar(h.nombre)}</span>
        <span class="herramienta-para">${escapar(h.para)}</span>
      </span>
      <span class="herramienta-derecha">
        <span class="freq-badge">${escapar(h.frecuencia)}</span>
        <span class="chevron">⌄</span>
      </span>
    `;
    cabecera.addEventListener("click", () => card.classList.toggle("open"));

    const cuerpo = document.createElement("div");
    cuerpo.className = "herramienta-body";
    cuerpo.innerHTML = `
      ${h.formas
        .map(
          (f) => `
        <div class="forma">
          <p class="forma-titulo">${escapar(f.titulo)}</p>
          <pre class="consola"><code>${escapar(f.comandos)}</code></pre>
          <p class="forma-cuando"><strong>Cuándo:</strong> ${escapar(f.cuando)}</p>
        </div>`,
        )
        .join("")}

      ${
        h.arbol
          ? `<p class="forma-titulo">Cómo queda la carpeta</p>
             <pre class="tree">${escapar(h.arbol)}</pre>`
          : ""
      }

      ${h.ojo ? `<p class="ojo"><strong>Ojo:</strong> ${escapar(h.ojo)}</p>` : ""}
    `;

    card.append(cabecera, cuerpo);
    cont.appendChild(card);
  });
}

renderFormas();
renderGestores();
renderHerramientas();
