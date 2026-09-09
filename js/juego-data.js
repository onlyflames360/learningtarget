// Code Quest — cada nivel es un "mundo" con un monstruo temático.
// Las preguntas NO son de sintaxis (eso ya está en Métodos/Ejercicios):
// son de reconocimiento y decisión, para entrenar cómo piensa un developer
// ante una situación, no qué palabra clave escribir.
const NIVELES = [
  {
    id: "variables",
    nombre: "El Bosque de las Variables",
    tema: "Variables y estado",
    emoji: "🌲",
    enemigo: "Bicho Var",
    enemigoEmoji: "🐛",
    preguntas: [
      {
        pregunta:
          "Vas a guardar la puntuación de un jugador, que sube cada vez que gana una partida. ¿Qué harías?",
        opciones: [
          "Declarar una variable que se pueda reasignar (let), porque su valor va a cambiar",
          "Declarar una constante, porque los números nunca cambian",
          "No usar ninguna variable, calcularlo cada vez desde cero",
        ],
        correcta: 0,
        explicacion:
          "Si un valor cambia con el tiempo (el estado de la app), necesita una variable reasignable. Ese es el primer criterio: ¿esto va a cambiar o no?",
      },
      {
        pregunta:
          "Guardas el nombre de tu empresa en la cabecera de la web, algo que nunca cambia mientras la página está abierta. ¿Qué harías?",
        opciones: [
          "Usar una constante, para dejar claro que ese valor no se va a tocar",
          "Usar una variable reasignable por si acaso",
          "Escribirlo directamente en el HTML sin ninguna variable en JS",
        ],
        correcta: 0,
        explicacion:
          "Cuando un dato no debería cambiar durante la ejecución, declararlo como constante comunica esa intención y evita reasignaciones accidentales.",
      },
      {
        pregunta:
          "Tu contador de clics siempre vuelve a mostrar 1 en cada clic, en vez de acumularse. ¿Cuál es la causa más probable?",
        opciones: [
          "La variable del contador se está declarando dentro del propio manejador del evento",
          "El botón no tiene ningún estilo CSS aplicado",
          "El navegador tiene un error interno",
        ],
        correcta: 0,
        explicacion:
          "Si el estado vive dentro de la función que reacciona al evento, se reinicia cada vez que esa función se ejecuta. El estado tiene que vivir fuera, en un ámbito que sobreviva entre llamadas.",
      },
      {
        pregunta:
          "Te llega un valor desde un formulario y no estás seguro de si es texto o número antes de operar con él. ¿Qué harías primero?",
        opciones: [
          "Comprobar de qué tipo es antes de decidir cómo tratarlo",
          "Sumarle 1 directamente y ver qué pasa",
          "Ignorar el problema, seguro que funciona",
        ],
        correcta: 0,
        explicacion:
          "Los valores de formularios e inputs siempre llegan como texto. Comprobar el tipo (o convertirlo explícitamente) antes de operar evita errores silenciosos como concatenar en vez de sumar.",
      },
      {
        pregunta:
          "Tienes una constante que apunta a un array y quieres añadirle un elemento más. ¿Es esto un problema?",
        opciones: [
          "No, porque modificar el contenido no es lo mismo que reasignar la variable entera",
          "Sí, una constante nunca puede modificarse de ninguna forma",
          "Solo es un problema si el array tiene más de 10 elementos",
        ],
        correcta: 0,
        explicacion:
          "const impide reasignar la variable (que apunte a otro array distinto), pero el contenido de ese array sigue siendo mutable. Es una distinción clave para no bloquearte innecesariamente.",
      },
    ],
  },
  {
    id: "bucles",
    nombre: "La Cueva de los Bucles",
    tema: "Bucles y arrays",
    emoji: "🕳️",
    enemigo: "Murciélago Bucle",
    enemigoEmoji: "🦇",
    preguntas: [
      {
        pregunta:
          "Sabes exactamente que necesitas repetir una acción 10 veces. ¿Qué enfoque es el más natural?",
        opciones: [
          "Un bucle controlado por un contador, con un límite conocido de antemano",
          "Un bucle sin ninguna condición de parada",
          "Copiar y pegar la misma acción 10 veces seguidas",
        ],
        correcta: 0,
        explicacion:
          "Cuando el número de repeticiones se conoce de antemano, un bucle con contador es la herramienta natural: expresa exactamente esa intención.",
      },
      {
        pregunta:
          "No sabes cuántas veces se va a repetir algo: depende de una condición externa, como 'hasta que el usuario acierte'. ¿Qué enfoque encaja mejor?",
        opciones: [
          "Un bucle que repite mientras una condición siga siendo verdadera",
          "Un bucle con un número fijo de vueltas calculado a ojo",
          "Repetirlo manualmente cada vez que haga falta",
        ],
        correcta: 0,
        explicacion:
          "Cuando el final depende de una condición y no de un conteo fijo, un bucle basado en condición (no en contador) es la elección correcta.",
      },
      {
        pregunta:
          "Tienes un array de productos y solo necesitas imprimir sus nombres; no te importa la posición de cada uno. ¿Qué preferirías?",
        opciones: [
          "Recorrer directamente los valores del array, sin manejar índices",
          "Llevar un índice manual aunque no lo vayas a usar para nada",
          "Convertir el array en un objeto antes de recorrerlo",
        ],
        correcta: 0,
        explicacion:
          "Si solo necesitas los valores, recorrer el array directamente (sin índice) es más simple y menos propenso a errores que gestionar un contador que no vas a usar.",
      },
      {
        pregunta:
          "Estás recorriendo una lista de 1000 usuarios buscando uno con un id concreto, y lo encuentras en la posición 4. ¿Qué deberías hacer?",
        opciones: [
          "Detener el bucle inmediatamente, ya no hace falta seguir revisando el resto",
          "Seguir recorriendo los 996 restantes por si acaso",
          "Reiniciar el bucle desde el principio para confirmarlo",
        ],
        correcta: 0,
        explicacion:
          "Una vez conseguido lo que buscabas, seguir iterando es trabajo desperdiciado. Detener el bucle en cuanto se cumple la condición es más eficiente.",
      },
      {
        pregunta:
          "Quieres saltarte los elementos vacíos de una lista sin abandonar el bucle por completo. ¿Qué harías?",
        opciones: [
          "Saltar directamente a la siguiente vuelta cuando el elemento esté vacío",
          "Detener el bucle por completo en cuanto encuentres uno vacío",
          "Eliminar el bucle y procesar la lista a mano",
        ],
        correcta: 0,
        explicacion:
          "Cuando quieres ignorar un caso puntual sin dejar de procesar el resto, saltar a la siguiente iteración es la herramienta adecuada; detener el bucle entero sería excesivo.",
      },
    ],
  },
  {
    id: "funciones",
    nombre: "La Torre de las Funciones",
    tema: "Funciones y reutilización",
    emoji: "🗼",
    enemigo: "Gólem Función",
    enemigoEmoji: "🗿",
    preguntas: [
      {
        pregunta:
          "Vas a repetir el mismo cálculo (el IVA de un precio) en 5 sitios distintos del código. ¿Qué harías?",
        opciones: [
          "Crear una función reutilizable con ese cálculo",
          "Copiar y pegar el cálculo en los 5 sitios",
          "Guardar el resultado en una variable global que todos lean",
        ],
        correcta: 0,
        explicacion:
          "En cuanto una misma lógica se repite en más de un sitio, es una señal clara de que debe vivir en una función: un único lugar que arreglar si cambia algo.",
      },
      {
        pregunta:
          "Tu función calcula un precio final, pero a veces el usuario no indica ningún descuento. ¿Cómo lo resolverías con elegancia?",
        opciones: [
          "Dándole un valor por defecto al parámetro del descuento",
          "Obligando siempre a pasar el descuento, aunque sea 0",
          "Haciendo que la función falle si falta ese dato",
        ],
        correcta: 0,
        explicacion:
          "Un valor por defecto cubre el caso más común sin obligar a quien llama a la función a pensar en algo que normalmente no hace falta.",
      },
      {
        pregunta:
          "Necesitas sumar todos los precios de un carrito de la compra guardado en un array. ¿Qué enfoque es más directo?",
        opciones: [
          "Acumular un total recorriendo el array una sola vez",
          "Sumar cada producto a mano, escribiendo su nombre en el código",
          "Crear un bucle infinito que vaya sumando indefinidamente",
        ],
        correcta: 0,
        explicacion:
          "Acumular un valor recorriendo una colección es exactamente el patrón para 'combinar todos los elementos en un único resultado'.",
      },
      {
        pregunta:
          "Tu función hace un cálculo, pero además actualiza directamente el HTML de la página desde dentro. ¿Por qué podría darte problemas más adelante?",
        opciones: [
          "Mezcla lógica de negocio con presentación, y será difícil de reutilizar o de probar sin un navegador",
          "No hay ningún problema, así es como se hace siempre",
          "Las funciones nunca deberían leer el DOM",
        ],
        correcta: 0,
        explicacion:
          "Separar 'calcular' de 'mostrar en pantalla' permite reutilizar y comprobar la lógica sola, sin depender de que exista una página cargada.",
      },
      {
        pregunta:
          "Escribes una función y te olvidas de indicar qué debe entregar al terminar. ¿Qué asumirías que ocurre al llamarla?",
        opciones: [
          "Que devuelve un valor vacío (undefined), ya que nunca se le dijo qué devolver",
          "Que lanza un error automáticamente siempre",
          "Que devuelve el último número que aparece en el código",
        ],
        correcta: 0,
        explicacion:
          "Sin una instrucción explícita de qué entregar, una función no tiene forma de saber qué devolver, así que el resultado queda vacío.",
      },
    ],
  },
  {
    id: "dom-eventos",
    nombre: "El Templo del DOM",
    tema: "DOM y eventos",
    emoji: "🏛️",
    enemigo: "Fantasma Evento",
    enemigoEmoji: "👻",
    preguntas: [
      {
        pregunta:
          "Quieres reaccionar a un clic en cualquiera de 50 elementos de una lista que además cambia dinámicamente. ¿Qué evitaría tener que gestionar 50 casos por separado?",
        opciones: [
          "Escuchar el evento en el contenedor padre y averiguar cuál se pulsó",
          "Añadir un manejador distinto a cada uno de los 50 elementos",
          "Revisar constantemente si se hizo clic en algún sitio, con un temporizador",
        ],
        correcta: 0,
        explicacion:
          "Escuchar en un elemento padre común (delegación) funciona incluso con elementos que se añaden después, sin tener que registrar un manejador por cada uno.",
      },
      {
        pregunta:
          "Tu formulario se envía y la página se recarga entera, perdiendo los datos que querías procesar tú mismo con JavaScript. ¿Qué te falta?",
        opciones: [
          "Cancelar el comportamiento por defecto del navegador para ese envío",
          "Un console.log más en el código",
          "Cambiar el formulario por una simple caja de texto",
        ],
        correcta: 0,
        explicacion:
          "Los formularios recargan la página por defecto al enviarse. Si quieres controlarlo tú, necesitas cancelar explícitamente ese comportamiento por defecto.",
      },
      {
        pregunta:
          "Necesitas saber el elemento exacto donde el usuario hizo clic, dentro de una lista con muchos elementos parecidos. ¿Dónde lo consultarías?",
        opciones: [
          "En la información que trae el propio objeto del evento",
          "En una variable global que tendrías que ir actualizando a mano",
          "No es posible saberlo con certeza",
        ],
        correcta: 0,
        explicacion:
          "El evento siempre trae información sobre dónde ocurrió exactamente, sin que tengas que rastrearlo tú mismo por separado.",
      },
      {
        pregunta:
          "Quieres aplicar el mismo cambio visual a todos los elementos que comparten una clase CSS. ¿Qué necesitas primero?",
        opciones: [
          "Seleccionar todos los elementos que coinciden con esa clase, no solo el primero",
          "Seleccionar únicamente el primer elemento que encuentres",
          "Buscarlos uno a uno escribiendo su posición exacta",
        ],
        correcta: 0,
        explicacion:
          "Cuando el cambio afecta a varios elementos a la vez, necesitas seleccionarlos todos, no solo el primero que coincida.",
      },
      {
        pregunta:
          "Un clic en un botón dentro de una tarjeta también dispara, sin que tú quieras, la acción de la tarjeta entera. ¿Cómo evitarías que el clic 'suba' más allá del botón?",
        opciones: [
          "Deteniendo explícitamente que el evento siga propagándose hacia arriba",
          "Eliminando la tarjeta del todo",
          "Esto no se puede evitar de ninguna forma",
        ],
        correcta: 0,
        explicacion:
          "Los eventos suben por el árbol del DOM salvo que se les indique explícitamente que dejen de propagarse. Cortar esa propagación resuelve exactamente este caso.",
      },
    ],
  },
  {
    id: "clases",
    nombre: "La Ciudadela de las Clases",
    tema: "Clases y POO",
    emoji: "🏰",
    enemigo: "Dragón Clase",
    enemigoEmoji: "🐉",
    preguntas: [
      {
        pregunta:
          "Vas a crear muchos objetos 'Producto' con las mismas propiedades y el mismo comportamiento. ¿Qué estructura encaja mejor?",
        opciones: [
          "Una plantilla (clase) que defina esas propiedades y comportamientos una sola vez",
          "Copiar el mismo objeto a mano cada vez que haga falta uno nuevo",
          "Una variable global distinta por cada producto",
        ],
        correcta: 0,
        explicacion:
          "Cuando necesitas muchas cosas con la misma forma y comportamiento, una clase evita repetir la misma definición una y otra vez.",
      },
      {
        pregunta:
          "Ya tienes una clase Vehiculo, y quieres crear Coche y Moto, que comparten comportamiento pero añaden algo propio. ¿Qué harías?",
        opciones: [
          "Hacer que Coche y Moto hereden de Vehiculo y añadan lo suyo encima",
          "Copiar el código de Vehiculo dentro de cada una",
          "Renunciar a reutilizar nada entre ellas",
        ],
        correcta: 0,
        explicacion:
          "La herencia existe exactamente para este caso: compartir comportamiento común y añadir solo lo específico de cada tipo.",
      },
      {
        pregunta:
          "Dentro de un método de tu clase, la referencia a 'la instancia actual' apunta a algo inesperado. ¿En qué situación es más probable que pase?",
        opciones: [
          "Cuando pasas ese método suelto como callback (por ejemplo a un evento) sin cuidar su contexto",
          "Cuando llamas al método normalmente desde una instancia creada con 'new'",
          "Esto nunca puede pasar en ningún caso",
        ],
        correcta: 0,
        explicacion:
          "Al desconectar un método de su instancia (pasarlo suelto como callback), pierde la referencia a 'quién lo llama', y eso puede provocar comportamientos inesperados.",
      },
      {
        pregunta:
          "Quieres una función de ayuda relacionada con la clase, pero que no dependa de ninguna instancia concreta (como una utilidad general). ¿Qué usarías?",
        opciones: [
          "Un miembro que pertenezca a la clase en sí, no a cada instancia",
          "El constructor de la clase",
          "Una copia de la instancia por cada llamada",
        ],
        correcta: 0,
        explicacion:
          "Cuando algo pertenece conceptualmente a la clase entera (no a un objeto concreto), tiene sentido que viva a nivel de clase, no de instancia.",
      },
      {
        pregunta:
          "Extiendes una clase y en el constructor de la hija necesitas que los datos del padre se inicialicen primero. ¿Qué es imprescindible hacer?",
        opciones: [
          "Llamar explícitamente al constructor de la clase padre antes de usar los datos propios",
          "Crear una instancia nueva del padre por separado",
          "No hace falta hacer nada especial, se hereda solo",
        ],
        correcta: 0,
        explicacion:
          "Cuando una clase hereda de otra, debe invocar explícitamente el constructor del padre antes de poder usar 'this' con seguridad en el suyo propio.",
      },
    ],
  },
];

const JEFE_FINAL = {
  id: "jefe-final",
  nombre: "El Jefe Final",
  tema: "Construye una app desde cero",
  emoji: "👑",
  enemigo: "El Bug Definitivo",
  enemigoEmoji: "☠️",
  preguntas: [
    {
      pregunta:
        "Un cliente te dice: 'Quiero una lista de tareas que no se borre al recargar la página'. ¿Cuál es tu primer paso, antes de escribir ni una línea de código?",
      opciones: [
        "Entender qué datos van a cambiar (el estado) y qué debe pasar con ellos con el tiempo",
        "Empezar directamente a escribir estilos CSS bonitos",
        "Instalar el framework más moderno que encuentres",
      ],
      correcta: 0,
      explicacion:
        "Antes de programar, hay que entender el problema: qué cambia, qué se debe conservar y por qué. El código es la traducción de esa comprensión, no el primer paso.",
    },
    {
      pregunta:
        "Ya identificaste que necesitas guardar una lista de tareas. ¿Dónde 'vive' esa lista mientras el usuario está usando la app?",
      opciones: [
        "En una variable en memoria, que se mantiene sincronizada con el almacenamiento del navegador",
        "Solo escrita directamente en el HTML de la página",
        "En ningún sitio, se recalcula cada vez de la nada",
      ],
      correcta: 0,
      explicacion:
        "El estado vive en memoria mientras usas la app (para leerlo y modificarlo rápido) y se sincroniza con almacenamiento persistente para que sobreviva a un cierre o recarga.",
    },
    {
      pregunta:
        "El usuario escribe una tarea y pulsa 'Añadir'. ¿Qué es lo que dispara esa acción en tu código?",
      opciones: [
        "Un evento: el clic del botón (o el envío del formulario)",
        "Un bucle que comprueba constantemente si el input tiene texto",
        "No hace falta ningún disparador, ocurre solo",
      ],
      correcta: 0,
      explicacion:
        "Casi toda interacción de usuario se traduce en un evento concreto. Identificar cuál es el disparador correcto es clave antes de programar la reacción.",
    },
    {
      pregunta:
        "Vas a mostrar cada tarea del array en pantalla. ¿Qué técnica encaja con esa necesidad?",
      opciones: [
        "Recorrer el array y crear un elemento visual por cada tarea que contiene",
        "Escribir a mano en el HTML todas las tareas posibles de antemano",
        "Usar solo CSS, sin tocar el array para nada",
      ],
      correcta: 0,
      explicacion:
        "Cuando el número de elementos depende de datos que cambian, se generan dinámicamente recorriendo esos datos, no escribiéndolos a mano de antemano.",
    },
    {
      pregunta:
        "Quieres que las tareas sigan ahí después de cerrar el navegador. ¿Qué necesitas tener en cuenta sobre cómo guardarlas?",
      opciones: [
        "Que el almacenamiento del navegador solo guarda texto, así que hay que convertir la lista antes de guardarla y volver a convertirla al leerla",
        "Que se puede guardar el array de objetos directamente, tal cual, sin ninguna conversión",
        "Que no se puede persistir nada sin un servidor",
      ],
      correcta: 0,
      explicacion:
        "El almacenamiento local del navegador solo entiende texto. Cualquier estructura de datos debe convertirse a texto antes de guardarla, y reconstruirse al leerla.",
    },
    {
      pregunta:
        "Antes de dar por terminada la función que borra una tarea, ¿qué caso límite deberías plantearte?",
      opciones: [
        "Qué pasa si se intenta borrar una tarea que ya no está en la lista",
        "De qué color debería ser el botón de borrar",
        "No hace falta comprobar ningún caso especial",
      ],
      correcta: 0,
      explicacion:
        "Pensar en los casos límite (algo que ya no existe, una lista vacía, un valor inesperado) antes de dar la función por terminada evita bugs silenciosos más adelante.",
    },
    {
      pregunta:
        "Terminas de pensar toda la función, pero no recuerdas la sintaxis exacta de cómo convertir tu lista a texto para guardarla. ¿Qué haces?",
      opciones: [
        "La buscas: ya sabes que esa herramienta existe y para qué sirve, solo te falta el detalle exacto de cómo se escribe",
        "Te quedas bloqueado sin avanzar hasta recordarlo de memoria",
        "Abandonas la función y empiezas otra cosa distinta",
      ],
      correcta: 0,
      explicacion:
        "Ese es el objetivo de todo este entrenamiento: saber QUÉ necesitas y CUÁNDO usarlo. La sintaxis exacta siempre se puede buscar en segundos; lo que no se improvisa es saber que esa pieza existe y que es la que necesitas.",
    },
  ],
};
