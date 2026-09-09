// Banco de ejercicios: preguntas de opción múltiple (a/b/c) que acompañan
// cada proyecto de proyectos.html, ordenadas de fácil a nivel senior.
const TOPICS = [
  "Contador de Clics",
  "Lista Dinámica",
  "Filtro de Búsqueda en Tiempo Real",
  "Calculadora Sencilla",
  "Temporizador con Inicio, Pausa y Reinicio",
  "Generador de Contraseñas Aleatorias",
  "Contador de Palabras y Caracteres",
  "Lista de Tareas con LocalStorage",
];

const EJERCICIOS = [
  // ---------- Contador de Clics ----------
  {
    topic: "Contador de Clics",
    dificultad: "Fácil",
    pregunta:
      "¿Qué propiedad se usa para actualizar el número mostrado en pantalla sin insertar HTML?",
    opciones: [
      "elemento.textContent",
      "elemento.innerHTML",
      "elemento.value",
    ],
    correcta: 0,
    explicacion:
      "textContent escribe texto plano, sin interpretar HTML. Es la opción correcta y más segura cuando solo se muestra un número o texto simple.",
  },
  {
    topic: "Contador de Clics",
    dificultad: "Medio",
    pregunta:
      "Si declaras `let contador = 0;` dentro del listener de click, ¿qué ocurre al pulsar el botón varias veces?",
    opciones: [
      "El contador se reinicia a 0 en cada clic",
      "El contador se acumula correctamente entre clics",
      "JavaScript lanza un error de sintaxis",
    ],
    correcta: 0,
    explicacion:
      "Al declarar la variable dentro del listener, se vuelve a crear (y a poner a 0) cada vez que se ejecuta la función. El estado debe vivir fuera del listener para conservarse entre clics.",
  },
  {
    topic: "Contador de Clics",
    dificultad: "Senior",
    pregunta:
      "Tienes dos contadores de clics independientes en la misma página. ¿Cuál es la forma más robusta de evitar que compartan estado por accidente?",
    opciones: [
      "Usar la misma variable global para ambos y confiar en el orden de los clics",
      "Encapsular el estado de cada contador en su propia función/closure o instancia, en vez de usar variables globales sueltas",
      "Declarar la variable con var en vez de let",
    ],
    correcta: 1,
    explicacion:
      "Encapsular el estado (por ejemplo con una función fábrica que devuelve su propio 'contador' en un closure, o una clase) evita colisiones entre instancias independientes de un mismo componente.",
  },

  // ---------- Lista Dinámica ----------
  {
    topic: "Lista Dinámica",
    dificultad: "Fácil",
    pregunta: "¿Qué método crea un nuevo elemento HTML que aún no está en la página?",
    opciones: ["document.appendChild()", "document.createElement()", "document.querySelector()"],
    correcta: 1,
    explicacion:
      "createElement() crea un nodo en memoria (por ejemplo un <li>) que todavía no forma parte del DOM visible hasta que se inserta con appendChild().",
  },
  {
    topic: "Lista Dinámica",
    dificultad: "Medio",
    pregunta:
      "¿Por qué se prefiere appendChild() en vez de innerHTML += para añadir un elemento a una lista existente?",
    opciones: [
      "Porque innerHTML += siempre es más rápido de escribir",
      "Porque innerHTML += reconstruye toda la lista desde cero y pierde los listeners ya asignados a los elementos existentes",
      "No hay ninguna diferencia real entre ambas formas",
    ],
    correcta: 1,
    explicacion:
      "innerHTML += vuelve a parsear todo el contenido del contenedor, destruyendo y recreando los nodos existentes (y sus eventos). appendChild() solo añade el nodo nuevo sin tocar los demás.",
  },
  {
    topic: "Lista Dinámica",
    dificultad: "Senior",
    pregunta:
      "Necesitas insertar 200 elementos nuevos en una lista de golpe. ¿Cuál es la técnica más eficiente?",
    opciones: [
      "Llamar a appendChild() 200 veces directamente sobre la lista del DOM",
      "Construir los 200 elementos dentro de un DocumentFragment y añadirlo una sola vez a la lista",
      "Reconstruir toda la lista con innerHTML += en un bucle",
    ],
    correcta: 1,
    explicacion:
      "Un DocumentFragment agrupa los nodos en memoria sin provocar repintados intermedios; al añadirlo una sola vez al DOM, el navegador solo recalcula el layout una vez en lugar de 200.",
  },

  // ---------- Filtro de Búsqueda en Tiempo Real ----------
  {
    topic: "Filtro de Búsqueda en Tiempo Real",
    dificultad: "Fácil",
    pregunta:
      "¿Qué evento se debe escuchar para reaccionar a cada tecla que el usuario escribe en un input?",
    opciones: ["click", "input", "submit"],
    correcta: 1,
    explicacion:
      "El evento 'input' se dispara cada vez que cambia el valor del campo, incluida cada pulsación de tecla, pegar texto o borrar.",
  },
  {
    topic: "Filtro de Búsqueda en Tiempo Real",
    dificultad: "Medio",
    pregunta:
      "¿Para qué se usa toLowerCase() tanto en el texto buscado como en los datos antes de compararlos?",
    opciones: [
      "Para que la comparación no distinga entre mayúsculas y minúsculas",
      "Para que el filtrado sea más rápido en arrays grandes",
      "Es un paso obligatorio del método filter() en JavaScript",
    ],
    correcta: 0,
    explicacion:
      "Sin normalizar mayúsculas/minúsculas, buscar 'manzana' no encontraría 'Manzana'. Convertir ambos lados a minúsculas hace la búsqueda insensible a mayúsculas.",
  },
  {
    topic: "Filtro de Búsqueda en Tiempo Real",
    dificultad: "Senior",
    pregunta:
      "Filtras un array de 10.000 elementos en cada tecla pulsada y la interfaz se nota lenta. ¿Qué técnica ayuda más?",
    opciones: [
      "Aplicar un debounce que retrase el filtrado hasta que el usuario deje de escribir unos milisegundos",
      "Ejecutar el filtro dos veces para asegurarse del resultado",
      "Eliminar el evento input y usar solo el evento click",
    ],
    correcta: 0,
    explicacion:
      "El debounce evita recalcular el filtro en cada pulsación; solo lo ejecuta cuando el usuario hace una pausa al escribir, reduciendo drásticamente el trabajo del navegador.",
  },

  // ---------- Calculadora Sencilla ----------
  {
    topic: "Calculadora Sencilla",
    dificultad: "Fácil",
    pregunta: "¿Qué palabra clave se usa para devolver un valor desde una función?",
    opciones: ["return", "break", "yield"],
    correcta: 0,
    explicacion:
      "return finaliza la ejecución de la función y entrega el valor indicado a quien la llamó.",
  },
  {
    topic: "Calculadora Sencilla",
    dificultad: "Medio",
    pregunta:
      "Si lees `document.getElementById('numA').value` sin convertirlo, ¿qué tipo de dato obtienes?",
    opciones: ["number", "string", "boolean"],
    correcta: 1,
    explicacion:
      "El valor de un input siempre llega como string, aunque el usuario haya escrito números. Hay que convertirlo con Number() o parseFloat() antes de operar.",
  },
  {
    topic: "Calculadora Sencilla",
    dificultad: "Avanzado",
    pregunta: "¿Qué debería hacer una función dividir(a, b) bien diseñada cuando b es 0?",
    opciones: [
      "Devolver Infinity sin ningún aviso adicional",
      "Detectar el caso especial y devolver (o comunicar) un error controlado en vez de un resultado engañoso",
      "Detener por completo la ejecución del programa",
    ],
    correcta: 1,
    explicacion:
      "Los casos límite como la división entre cero deben manejarse explícitamente, devolviendo un mensaje claro en vez de dejar que el resultado sea Infinity o NaN sin explicación.",
  },
  {
    topic: "Calculadora Sencilla",
    dificultad: "Senior",
    pregunta:
      "¿Por qué conviene separar las funciones sumar/restar/multiplicar/dividir de la lógica que lee el DOM?",
    opciones: [
      "Porque así el archivo pesa menos en disco",
      "Porque permite probar (testear) la lógica matemática de forma aislada, sin depender del navegador ni de elementos HTML",
      "No aporta ninguna ventaja real, es solo cuestión de estilo",
    ],
    correcta: 1,
    explicacion:
      "Las funciones puras, sin dependencias del DOM, se pueden probar con un simple assert (sumar(2,2) === 4) sin necesidad de un navegador, lo que facilita el testing y la reutilización.",
  },

  // ---------- Temporizador con Inicio, Pausa y Reinicio ----------
  {
    topic: "Temporizador con Inicio, Pausa y Reinicio",
    dificultad: "Fácil",
    pregunta: "¿Qué función ejecuta un bloque de código repetidamente cada cierto intervalo de tiempo?",
    opciones: ["setTimeout()", "setInterval()", "requestAnimationFrame()"],
    correcta: 1,
    explicacion:
      "setInterval(fn, ms) repite la ejecución de fn cada 'ms' milisegundos hasta que se cancela explícitamente.",
  },
  {
    topic: "Temporizador con Inicio, Pausa y Reinicio",
    dificultad: "Medio",
    pregunta: "¿Qué función se utiliza para detener un setInterval() que está en marcha?",
    opciones: ["stopInterval()", "clearInterval()", "cancelInterval()"],
    correcta: 1,
    explicacion:
      "clearInterval() recibe el identificador devuelto por setInterval() y detiene las siguientes ejecuciones programadas.",
  },
  {
    topic: "Temporizador con Inicio, Pausa y Reinicio",
    dificultad: "Avanzado",
    pregunta:
      "Si el usuario pulsa 'Iniciar' tres veces seguidas sin ningún control adicional, ¿qué problema aparece?",
    opciones: [
      "Ninguno, JavaScript evita automáticamente los intervalos duplicados",
      "Se crean varios intervalos simultáneos, lo que hace que el contador avance más deprisa de lo esperado",
      "El navegador se bloquea inmediatamente",
    ],
    correcta: 1,
    explicacion:
      "Cada clic en 'Iniciar' crea un nuevo intervalo independiente. Si no se controla, varios intervalos incrementan la misma variable a la vez, acelerando el conteo.",
  },
  {
    topic: "Temporizador con Inicio, Pausa y Reinicio",
    dificultad: "Senior",
    pregunta:
      "¿Cuál es la forma correcta de evitar crear intervalos duplicados al pulsar 'Iniciar' repetidamente?",
    opciones: [
      "Usar una variable booleana de estado (por ejemplo enMarcha) que se comprueba antes de crear un nuevo intervalo",
      "Mostrar un alert() antes de iniciar el temporizador",
      "No es necesario evitarlo, el navegador lo gestiona solo",
    ],
    correcta: 0,
    explicacion:
      "Comprobar `if (enMarcha) return;` al inicio del handler impide crear un segundo intervalo mientras el primero sigue activo, evitando el bug de aceleración.",
  },

  // ---------- Generador de Contraseñas Aleatorias ----------
  {
    topic: "Generador de Contraseñas Aleatorias",
    dificultad: "Fácil",
    pregunta: "¿Qué función genera un número decimal aleatorio entre 0 (incluido) y 1 (excluido)?",
    opciones: ["Math.random()", "Math.floor()", "Math.round()"],
    correcta: 0,
    explicacion:
      "Math.random() es la base para generar aleatoriedad en JavaScript; devuelve siempre un decimal entre 0 y 1.",
  },
  {
    topic: "Generador de Contraseñas Aleatorias",
    dificultad: "Medio",
    pregunta:
      "¿Para qué se combina Math.floor() con Math.random() al elegir un carácter de un string de posibles caracteres?",
    opciones: [
      "Para redondear al entero más cercano",
      "Para obtener un índice entero válido con el que acceder a una posición del string",
      "Para generar únicamente números negativos",
    ],
    correcta: 1,
    explicacion:
      "Math.random() * longitud da un decimal; Math.floor() lo redondea hacia abajo para obtener un índice entero utilizable como posición dentro del string de caracteres.",
  },
  {
    topic: "Generador de Contraseñas Aleatorias",
    dificultad: "Avanzado",
    pregunta:
      "¿Qué puede pasar si no se valida que la longitud pedida por el usuario sea mayor que 0?",
    opciones: [
      "No ocurre ningún problema, el bucle simplemente no se ejecuta",
      "Se puede generar una contraseña vacía o un comportamiento inesperado en la interfaz",
      "El navegador se bloquea de forma permanente",
    ],
    correcta: 1,
    explicacion:
      "Con longitud 0 o negativa el bucle for no genera caracteres, produciendo una contraseña vacía que puede confundir al usuario si no se avisa explícitamente.",
  },
  {
    topic: "Generador de Contraseñas Aleatorias",
    dificultad: "Senior",
    pregunta:
      "¿Por qué se recomienda usar crypto.getRandomValues() en lugar de Math.random() en un generador de contraseñas pensado para producción?",
    opciones: [
      "Porque es más lento y por eso genera contraseñas más seguras",
      "Porque Math.random() no es criptográficamente seguro: sus valores pueden llegar a predecirse",
      "Porque crypto.getRandomValues() no existe realmente en JavaScript",
    ],
    correcta: 1,
    explicacion:
      "Math.random() usa un generador pseudoaleatorio no diseñado para seguridad. crypto.getRandomValues() usa una fuente de entropía criptográficamente segura, adecuada para contraseñas o tokens reales.",
  },

  // ---------- Contador de Palabras y Caracteres ----------
  {
    topic: "Contador de Palabras y Caracteres",
    dificultad: "Fácil",
    pregunta: "¿Qué propiedad devuelve el número de caracteres de un string?",
    opciones: [".length", ".size", ".count"],
    correcta: 0,
    explicacion:
      "length es una propiedad (no un método) disponible en strings y arrays que indica cuántos elementos o caracteres contienen.",
  },
  {
    topic: "Contador de Palabras y Caracteres",
    dificultad: "Medio",
    pregunta: "¿Qué hace exactamente split(/\\s+/) sobre un texto?",
    opciones: [
      "Lo divide por cada espacio, tabulación o salto de línea, incluso si hay varios seguidos",
      "Lo divide únicamente por comas",
      "Elimina todos los espacios sin dividir el texto en partes",
    ],
    correcta: 0,
    explicacion:
      "La expresión regular /\\s+/ representa 'uno o más espacios en blanco', por lo que split() corta el texto en cada bloque de espacios consecutivos.",
  },
  {
    topic: "Contador de Palabras y Caracteres",
    dificultad: "Avanzado",
    pregunta:
      "Un textarea vacío, tras aplicar trim().split(/\\s+/) sin usar filter() después, ¿cuántas 'palabras' devuelve?",
    opciones: ["0", "1 (una cadena vacía contada como palabra)", "undefined"],
    correcta: 1,
    explicacion:
      "split() sobre una cadena vacía devuelve un array con un único elemento: la cadena vacía [''], que sin filtrar se contaría erróneamente como una palabra.",
  },
  {
    topic: "Contador de Palabras y Caracteres",
    dificultad: "Senior",
    pregunta:
      "¿Qué evento es más apropiado para actualizar los contadores mientras el usuario escribe, en vez de 'change'?",
    opciones: [
      "'input', porque se dispara en cada modificación del valor, tecla a tecla",
      "'change', porque consume menos recursos del navegador",
      "'submit', porque solo se activa al enviar un formulario",
    ],
    correcta: 0,
    explicacion:
      "'change' solo se dispara cuando el campo pierde el foco tras modificarse; 'input' se dispara en tiempo real con cada cambio, que es lo que se necesita para un contador en vivo.",
  },

  // ---------- Lista de Tareas con LocalStorage ----------
  {
    topic: "Lista de Tareas con LocalStorage",
    dificultad: "Fácil",
    pregunta: "¿Qué API del navegador permite guardar datos que persisten aunque se cierre la pestaña?",
    opciones: ["sessionStorage", "localStorage", "una variable global"],
    correcta: 1,
    explicacion:
      "localStorage guarda datos sin fecha de caducidad, disponibles incluso después de cerrar el navegador. sessionStorage, en cambio, se borra al cerrar la pestaña.",
  },
  {
    topic: "Lista de Tareas con LocalStorage",
    dificultad: "Medio",
    pregunta: "¿Por qué hay que usar JSON.stringify() antes de guardar un array de tareas en localStorage?",
    opciones: [
      "Porque localStorage solo puede almacenar strings, no objetos ni arrays directamente",
      "Porque así el array ocupa menos espacio en disco",
      "No es necesario, localStorage guarda arrays y objetos tal cual",
    ],
    correcta: 0,
    explicacion:
      "localStorage solo admite claves y valores de tipo string. Para guardar estructuras como arrays u objetos hay que serializarlas primero con JSON.stringify().",
  },
  {
    topic: "Lista de Tareas con LocalStorage",
    dificultad: "Avanzado",
    pregunta:
      "La primera vez que se usa la app, antes de haber guardado nada, ¿qué devuelve localStorage.getItem('tareas')?",
    opciones: ["Un array vacío []", "null", "undefined"],
    correcta: 1,
    explicacion:
      "Si la clave no existe todavía, getItem() devuelve null. Por eso hay que comprobarlo antes de intentar hacer JSON.parse() sobre el resultado.",
  },
  {
    topic: "Lista de Tareas con LocalStorage",
    dificultad: "Avanzado",
    pregunta: "¿Qué ocurre si se llama a JSON.parse(null) sin comprobar antes el valor devuelto por localStorage?",
    opciones: [
      "Devuelve automáticamente un array vacío",
      "Lanza un error, porque 'null' no es un JSON válido para convertir en objeto/array",
      "Devuelve null sin más, sin provocar ningún error",
    ],
    correcta: 1,
    explicacion:
      "JSON.parse(null) en realidad convierte null a texto 'null' y lo interpreta como el valor null de JSON, pero mezclar esta lógica sin un valor por defecto explícito es una fuente común de errores; lo correcto es comprobar el resultado de getItem() antes de parsear.",
  },
  {
    topic: "Lista de Tareas con LocalStorage",
    dificultad: "Senior",
    pregunta:
      "En una app CRUD con localStorage, si modificas el array de tareas en memoria pero olvidas volver a llamar a guardarTareas(), ¿qué sucede?",
    opciones: [
      "Los cambios se sincronizan igualmente de forma automática",
      "Los cambios se ven en pantalla, pero se pierden en cuanto se recarga la página porque nunca llegaron a localStorage",
      "localStorage se actualiza solo una vez por segundo en segundo plano",
    ],
    correcta: 1,
    explicacion:
      "localStorage no observa las variables de JavaScript: solo se actualiza cuando se llama explícitamente a setItem(). Si una operación CRUD no vuelve a guardar el array completo, los cambios no persisten.",
  },
];
