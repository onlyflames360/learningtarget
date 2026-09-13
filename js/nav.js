// Navegación compartida por todas las páginas.
// Añadir una sección nueva es editar SOLO esta lista.
const PAGINAS = [
  { href: "index.html", texto: "Tarjetas" },
  { href: "metodos.html", texto: "Métodos" },
  { href: "buscar.html", texto: "Buscador" },
  { href: "identificar.html", texto: "Identificar" },
  { href: "practicas.html", texto: "Buenas prácticas" },
  { href: "typescript.html", texto: "TypeScript" },
  { href: "ejercicios.html", texto: "Ejercicios" },
  { href: "constructor.html", texto: "Construye código" },
  { href: "juego.html", texto: "Juego" },
  { href: "pensar.html", texto: "Cómo pensar" },
  { href: "entrenador.html", texto: "Entrenador" },
  { href: "carpetas.html", texto: "Carpetas" },
  { href: "linux.html", texto: "Linux y terminal" },
  { href: "proyectos.html", texto: "Proyectos" },
];

(function construirNav() {
  const nav = document.getElementById("sitenav");
  if (!nav) return;

  const actual = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const conTema = nav.dataset.tema !== "no";

  const enlaces = PAGINAS.map((p) => {
    const activa = p.href.toLowerCase() === actual;
    return `<a href="${p.href}"${activa ? ' class="active" aria-current="page"' : ""}>${p.texto}</a>`;
  }).join("");

  nav.innerHTML = `
    <a class="nav-marca" href="index.html">
      <span class="nav-marca-icono">🗂️</span>
      <span class="nav-marca-texto">Tarjetas <b>de aprender</b></span>
    </a>

    <button class="nav-burger" id="navBurger" type="button"
            aria-expanded="false" aria-controls="navLinks" aria-label="Abrir menú">
      <span></span><span></span><span></span>
    </button>

    <div class="nav-links" id="navLinks">
      ${enlaces}
      ${conTema ? '<button id="themeToggle" type="button">Modo oscuro</button>' : ""}
    </div>
  `;

  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");

  function cerrar() {
    nav.classList.remove("abierto");
    burger.setAttribute("aria-expanded", "false");
  }

  burger.addEventListener("click", () => {
    const abierto = nav.classList.toggle("abierto");
    burger.setAttribute("aria-expanded", String(abierto));
  });

  // Cerrar al elegir una sección o al pulsar fuera
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") cerrar();
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target)) cerrar();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrar();
  });
})();
