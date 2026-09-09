function renderPreguntas() {
  const contenedor = document.getElementById("topicQuestions");
  PREGUNTAS_PREVIAS.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "topic-accordion";

    const summary = document.createElement("button");
    summary.type = "button";
    summary.className = "topic-summary";
    summary.innerHTML = `<span>${entry.topic}</span><span class="chevron">⌄</span>`;

    const body = document.createElement("div");
    body.className = "topic-body";
    body.innerHTML =
      "<ol>" +
      entry.preguntas.map((p) => `<li>${p}</li>`).join("") +
      "</ol>";

    summary.addEventListener("click", () => {
      card.classList.toggle("open");
    });

    card.appendChild(summary);
    card.appendChild(body);
    contenedor.appendChild(card);
  });
}

renderPreguntas();
