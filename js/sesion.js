// Retomar donde lo dejaste.
//
// Guarda en localStorage dos cosas:
//   1. la última página que estabas mirando,
//   2. hasta dónde habías bajado (el scroll) en cada página.
//
// Al abrir la app por index.html, si la última página era otra, te lleva
// allí directamente. Para quedarte en el inicio basta con pulsar "Tarjetas"
// en el menú: ese clic deja una nota que cancela el salto una sola vez.
//
// Va todo dentro de una función que se ejecuta sola (IIFE) para no dejar
// variables sueltas que choquen con las de cada página.
(function sesion() {
  const CLAVE = "tarjetas-sesion";
  // sessionStorage, no localStorage: dura solo esta visita, no para siempre
  const CLAVE_IR_A_INICIO = "tarjetas-ir-a-inicio";
  const ES_PAGINA = /^[a-z0-9-]+\.html$/;

  // El nombre del archivo actual: "metodos.html", "index.html"...
  const actual = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  // localStorage solo guarda texto, así que todo pasa por JSON.
  // Y siempre dentro de try/catch: en modo incógnito puede estar bloqueado.
  function leer() {
    try {
      return JSON.parse(localStorage.getItem(CLAVE)) || {};
    } catch (e) {
      return {};
    }
  }

  function escribir(datos) {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(datos));
    } catch (e) {}
  }

  // ---------- 1. Volver a la última página ----------
  let queriaInicio = false;
  try {
    queriaInicio = sessionStorage.getItem(CLAVE_IR_A_INICIO) === "1";
    sessionStorage.removeItem(CLAVE_IR_A_INICIO);
  } catch (e) {}

  const guardado = leer();

  if (
    actual === "index.html" &&
    !queriaInicio &&
    guardado.pagina &&
    guardado.pagina !== "index.html" &&
    ES_PAGINA.test(guardado.pagina)
  ) {
    // replace() y no href =: sustituye esta entrada del historial, así el
    // botón Atrás no te devuelve al inicio para volver a saltar en bucle.
    location.replace(guardado.pagina);
    return;
  }

  // Anotar la intención de ir al inicio en cuanto se pulsa un enlace hacia él
  document.addEventListener("click", (e) => {
    const enlace = e.target.closest && e.target.closest("a[href]");
    if (!enlace) return;
    const destino = (enlace.getAttribute("href") || "").split("/").pop().toLowerCase();
    if (destino === "index.html") {
      try {
        sessionStorage.setItem(CLAVE_IR_A_INICIO, "1");
      } catch (err) {}
    }
  });

  // ---------- 2. Guardar dónde estoy ----------
  function guardarPagina() {
    const datos = leer();
    datos.pagina = actual;
    datos.cuando = Date.now();
    escribir(datos);
  }

  function guardarScroll() {
    const datos = leer();
    datos.pagina = actual;
    datos.cuando = Date.now();
    datos.scroll = datos.scroll || {};
    datos.scroll[actual] = Math.round(window.scrollY);
    escribir(datos);
  }

  // Se apunta la página nada más entrar, sin esperar a nada: si la app se
  // cierra de golpe, al menos ya sabemos dónde estabas.
  guardarPagina();

  // visibilitychange es el evento que SÍ se dispara al cerrar la app o
  // cambiar de aplicación en el móvil. unload y beforeunload no son fiables ahí.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") guardarScroll();
  });
  window.addEventListener("pagehide", guardarScroll);

  // ---------- 3. Recuperar el scroll al volver ----------
  const objetivo = (guardado.scroll && guardado.scroll[actual]) || 0;
  let restaurando = objetivo > 0;

  // Escribir mientras se hace scroll sería lentísimo: se espera a que pare.
  let esperando = null;
  window.addEventListener(
    "scroll",
    () => {
      if (restaurando) return;
      clearTimeout(esperando);
      esperando = setTimeout(guardarScroll, 400);
    },
    { passive: true },
  );

  if (restaurando) {
    // Le decimos al navegador que no intente él restaurar el scroll: lo hacemos nosotros
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    // En cuanto el usuario toque algo, dejamos de insistir: manda él
    ["wheel", "touchstart", "keydown", "mousedown"].forEach((evento) => {
      window.addEventListener(evento, () => { restaurando = false; }, {
        passive: true,
        once: true,
      });
    });

    // El contenido lo pintan los scripts del final del body, así que la
    // página crece después de cargar. Insistimos unos cuantos fotogramas
    // hasta que la altura dé para llegar al punto guardado.
    document.addEventListener("DOMContentLoaded", () => {
      let intentos = 0;
      (function intentar() {
        if (!restaurando) return;
        window.scrollTo(0, objetivo);
        intentos++;
        if (Math.abs(window.scrollY - objetivo) > 2 && intentos < 40) {
          requestAnimationFrame(intentar);
        } else {
          restaurando = false;
        }
      })();
    });
  }
})();
