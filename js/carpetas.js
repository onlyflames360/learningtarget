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
