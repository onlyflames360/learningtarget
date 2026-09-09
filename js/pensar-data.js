const PREGUNTAS_PREVIAS = [
  {
    topic: "Contador de Clics",
    preguntas: [
      "¿Qué dato necesito recordar entre un clic y el siguiente? ¿Dónde debo declararlo para que no se reinicie?",
      "¿Qué elemento del HTML debo actualizar cada vez que ese dato cambia?",
      "¿Qué pasaría si hubiera dos contadores en la misma página? ¿Compartirían la misma variable por error?",
    ],
  },
  {
    topic: "Lista Dinámica",
    preguntas: [
      "¿De dónde viene el texto que se va a añadir? ¿Qué pasa si el usuario no escribe nada?",
      "¿Necesito solo mostrar los datos en pantalla, o también guardarlos en un array para usarlos después?",
      "Después de añadir un elemento, ¿qué debo limpiar o resetear para que la app quede lista para el siguiente uso?",
    ],
  },
  {
    topic: "Filtro de Búsqueda en Tiempo Real",
    preguntas: [
      "¿Cuál es la lista de datos original que nunca debo modificar directamente?",
      "¿En qué momento exacto quiero que se vuelva a calcular el filtro: al escribir cada letra, o solo al enviar el formulario?",
      "¿Cómo debo tratar las mayúsculas y minúsculas para que la búsqueda sea justa?",
    ],
  },
  {
    topic: "Calculadora Sencilla",
    preguntas: [
      "¿Qué operaciones tengo que soportar, y tiene sentido escribir una función separada para cada una?",
      "¿En qué formato llegan los valores de los inputs, y qué conversión necesito antes de poder operar con ellos?",
      "¿Qué caso especial (como dividir entre 0) tengo que contemplar antes de mostrar un resultado?",
    ],
  },
  {
    topic: "Temporizador con Inicio, Pausa y Reinicio",
    preguntas: [
      "¿Qué necesito guardar para poder detener el conteo más adelante?",
      "¿Cómo evito que pulsar 'Iniciar' varias veces cree varios conteos a la vez?",
      "¿Qué diferencia hay, en términos de datos, entre 'pausar' y 'reiniciar'?",
    ],
  },
  {
    topic: "Generador de Contraseñas Aleatorias",
    preguntas: [
      "¿Qué conjunto de caracteres posibles necesito tener disponible antes de generar nada?",
      "¿Cómo elijo un carácter al azar de ese conjunto, paso a paso?",
      "¿Qué pasa si el usuario pide una longitud de 0 o un número negativo?",
    ],
  },
  {
    topic: "Contador de Palabras y Caracteres",
    preguntas: [
      "¿Qué cuenta como 'palabra'? ¿Qué pasa con los espacios extra o los saltos de línea?",
      "¿En qué momento se debe recalcular el conteo: mientras se escribe o solo al terminar?",
      "¿Qué debería mostrar el contador cuando el campo de texto está completamente vacío?",
    ],
  },
  {
    topic: "Lista de Tareas con LocalStorage",
    preguntas: [
      "¿Qué forma tiene cada tarea (qué propiedades necesita: texto, completada, id...)?",
      "¿En qué momentos exactos tengo que leer y en qué momentos tengo que guardar en localStorage?",
      "¿Qué debo hacer la primera vez que se abre la app, cuando todavía no hay nada guardado?",
      "Si borro o edito una tarea en memoria, ¿qué paso final no puedo olvidar para que el cambio no se pierda al recargar?",
    ],
  },
];
