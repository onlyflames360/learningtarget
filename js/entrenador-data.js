// Preguntas socráticas fijas: exactamente las que pide el modo entrenador.
// No dan respuestas ni código, solo fuerzan a mirar la pieza desde otro ángulo.
const PREGUNTAS_ATASCO = [
  {
    campo: "tengo",
    titulo: "¿Qué información tienes ahora mismo?",
    ayuda:
      "Piensa en los datos, valores o elementos del HTML que ya existen y puedes usar tal cual, sin inventar nada nuevo.",
  },
  {
    campo: "necesito",
    titulo: "¿Qué información necesitas y todavía no tienes?",
    ayuda:
      "No pienses en cómo conseguirla todavía. Solo nombra qué es lo que falta.",
  },
  {
    campo: "antes",
    titulo: "¿Qué ocurre justo antes del punto donde te has bloqueado?",
    ayuda:
      "Describe el último paso que sí sabes cómo hacer, el que viene inmediatamente antes del bloqueo.",
  },
  {
    campo: "despues",
    titulo: "¿Qué ocurre justo después, una vez resuelto esto?",
    ayuda:
      "Describe el siguiente paso que ya tienes claro, el que depende de que esta pieza funcione.",
  },
  {
    campo: "entradaSalida",
    titulo: "¿Qué datos entran y qué datos salen de esta pieza concreta?",
    ayuda:
      "Piensa en esta pieza como una caja: ¿qué le metes dentro y qué te devuelve cuando termina?",
  },
  {
    campo: "ignorar",
    titulo: "¿Qué puedes ignorar por completo para avanzar ahora mismo?",
    ayuda:
      "Casos raros, estilos bonitos, validaciones extra... ¿qué puede esperar sin bloquearte hoy?",
  },
];

const PREGUNTA_MICRODECISION = {
  campo: "microDecision",
  titulo: "¿Cuál es la decisión más pequeña que puedes tomar ahora mismo?",
  ayuda:
    "No pienses en resolver la pieza entera. Una sola decisión pequeña: qué variable declarar, qué evento escuchar, qué comprobar primero.",
};

// Pistas de "flujo mental" cuando el problema menciona una estructura conocida.
const PISTAS_FLUJO = [
  {
    patron: /\bbucle|for\s*\(|while\b|repetir|iterar/i,
    etiqueta: "Bucle",
    preguntas: [
      "¿Qué es exactamente lo que se repite?",
      "¿Sabes cuántas veces se repite, o depende de una condición que puede cambiar?",
      "¿Qué cambia en cada vuelta y qué se mantiene igual entre una vuelta y la siguiente?",
      "¿Qué tiene que pasar para que el bucle se detenga?",
    ],
  },
  {
    patron: /\bfunci[oó]n|function\b/i,
    etiqueta: "Función",
    preguntas: [
      "¿Qué entra a la función (sus parámetros)?",
      "¿Qué debe devolver exactamente cuando termina?",
      "¿Qué pasa si la entrada no es la esperada (vacía, nula, de otro tipo)?",
      "¿Esta función depende del DOM, o podría funcionar sola, sin pantalla?",
    ],
  },
  {
    patron: /\bclase|class\b/i,
    etiqueta: "Clase",
    preguntas: [
      "¿Qué datos pertenecen a cada instancia (sus propiedades)?",
      "¿Qué acciones puede realizar (sus métodos)?",
      "¿Necesitas de verdad varias instancias distintas, o te bastaría con una función?",
    ],
  },
  {
    patron: /\bapi\b|fetch\(|endpoint/i,
    etiqueta: "API",
    preguntas: [
      "¿Qué le vas a pedir exactamente a esa API (qué datos envías)?",
      "¿Qué formas puede tomar la respuesta: éxito, error, vacío, lenta?",
      "¿Qué debe mostrar tu app mientras espera la respuesta?",
    ],
  },
  {
    patron: /\bbase de datos|\bbd\b|sql|localstorage|persisti/i,
    etiqueta: "Almacenamiento / base de datos",
    preguntas: [
      "¿Qué se guarda exactamente, y con qué forma (qué campos tiene)?",
      "¿En qué momento se lee y en qué momento se escribe?",
      "¿Qué pasa la primera vez, cuando todavía no hay nada guardado?",
    ],
  },
];
