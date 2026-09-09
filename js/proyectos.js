function validarColeccion() {
  const totalProyectos = temas.reduce(
    (acc, t) => acc + t.proyectos.length,
    0,
  );
  let camposFaltantes = 0;
  temas.forEach((t) => {
    t.proyectos.forEach((p) => {
      REQUIRED_FIELDS.forEach((campo) => {
        const valor = p[campo];
        const vacio =
          valor === undefined ||
          valor === null ||
          valor === "" ||
          (Array.isArray(valor) && valor.length === 0);
        if (vacio) camposFaltantes++;
      });
    });
  });
  return { totalProyectos, camposFaltantes };
}

function estrellas(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function crearSeccion(titulo, contenidoHTML) {
  const div = document.createElement("div");
  div.className = "section";
  div.innerHTML = `<h4>${titulo}</h4>${contenidoHTML}`;
  return div;
}

function listaHTML(items) {
  return "<ul>" + items.map((i) => `<li>${i}</li>`).join("") + "</ul>";
}

function pasosHTML(items) {
  return "<ol>" + items.map((i) => `<li>${i}</li>`).join("") + "</ol>";
}

function renderProyecto(p) {
  const card = document.createElement("article");
  card.className = "proj-card";

  const summary = document.createElement("button");
  summary.type = "button";
  summary.className = "proj-summary";
  summary.innerHTML = `
    <div class="proj-summary-left">
      <p class="proj-title">${p.titulo}</p>
      <div class="badges">
        <span class="badge level-${p.nivel}">${p.nivel}</span>
        <span class="badge">${p.categoria}</span>
        <span class="badge">${p.tiempoEstimado}</span>
      </div>
      <div class="stars" title="Nivel visual de dificultad">${estrellas(p.nivelVisual)}</div>
    </div>
    <span class="chevron">⌄</span>
  `;

  const body = document.createElement("div");
  body.className = "proj-body";

  body.appendChild(crearSeccion("Objetivo", `<p>${p.objetivo}</p>`));

  const dosCol = document.createElement("div");
  dosCol.className = "two-col";
  dosCol.appendChild(
    crearSeccion("Explicación simple", `<p>${p.explicacionSimple}</p>`),
  );
  dosCol.appendChild(
    crearSeccion(
      "Explicación técnica",
      `<p>${p.explicacionTecnica}</p>`,
    ),
  );
  body.appendChild(dosCol);

  body.appendChild(
    crearSeccion("Conceptos que se practican", listaHTML(p.conceptos)),
  );
  body.appendChild(
    crearSeccion(
      "Requisitos previos",
      listaHTML(p.requisitosPrevios),
    ),
  );
  body.appendChild(
    crearSeccion(
      "Código de ejemplo",
      `<pre><code>${p.codigoEjemplo
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")}</code></pre>`,
    ),
  );
  body.appendChild(crearSeccion("Pasos a realizar", pasosHTML(p.pasos)));
  body.appendChild(
    crearSeccion("Pistas de implementación", listaHTML(p.pistas)),
  );
  body.appendChild(
    crearSeccion("Errores comunes", listaHTML(p.erroresComunes)),
  );
  body.appendChild(
    crearSeccion("Resultado esperado", `<p>${p.resultadoEsperado}</p>`),
  );
  body.appendChild(
    crearSeccion("Desafío extra", listaHTML(p.desafioExtra)),
  );
  body.appendChild(
    crearSeccion(
      "Habilidades adquiridas",
      listaHTML(p.habilidadesAdquiridas),
    ),
  );

  const metaGrid = document.createElement("div");
  metaGrid.className = "meta-grid";
  metaGrid.innerHTML = `
    <div class="meta-item"><span>Nivel</span>${p.nivel}</div>
    <div class="meta-item"><span>Nivel visual</span>${estrellas(p.nivelVisual)}</div>
    <div class="meta-item"><span>Tiempo estimado</span>${p.tiempoEstimado}</div>
    <div class="meta-item"><span>Tecnologías</span>${p.tecnologias.join(", ")}</div>
  `;
  body.appendChild(metaGrid);

  const next = document.createElement("div");
  next.className = "next-proj";
  next.textContent = "Siguiente proyecto recomendado: " + p.siguienteProyecto;
  body.appendChild(next);

  card.appendChild(summary);
  card.appendChild(body);

  summary.addEventListener("click", () => {
    card.classList.toggle("open");
  });

  return card;
}

function render() {
  const themesEl = document.getElementById("themes");
  temas.forEach((t, idx) => {
    const section = document.createElement("section");
    section.className = "theme";

    const header = document.createElement("div");
    header.className = "theme-header";
    header.innerHTML = `<span class="theme-index">${idx + 1}</span><h2>${t.tema}</h2>`;
    section.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "grid";
    t.proyectos.forEach((p) => grid.appendChild(renderProyecto(p)));
    section.appendChild(grid);

    themesEl.appendChild(section);
  });

  const pathLevels = document.getElementById("pathLevels");
  rutaAprendizaje.forEach((nivel) => {
    const div = document.createElement("div");
    div.className = "path-level";
    div.innerHTML = `<h3>${nivel.nivel}</h3><ol>${nivel.proyectos
      .map((p) => `<li>${p}</li>`)
      .join("")}</ol>`;
    pathLevels.appendChild(div);
  });

  const { totalProyectos, camposFaltantes } = validarColeccion();
  const detail = document.getElementById("statusDetail");
  detail.textContent =
    totalProyectos +
    " tarjetas generadas · " +
    (camposFaltantes === 0
      ? "todos los campos obligatorios presentes"
      : camposFaltantes + " campos faltantes detectados");
}

render();
