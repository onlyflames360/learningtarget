const REQUIRED_FIELDS = [
  "titulo",
  "nivel",
  "categoria",
  "objetivo",
  "conceptos",
  "requisitosPrevios",
  "explicacionSimple",
  "explicacionTecnica",
  "codigoEjemplo",
  "pasos",
  "pistas",
  "erroresComunes",
  "resultadoEsperado",
  "desafioExtra",
  "nivelVisual",
  "tiempoEstimado",
  "tecnologias",
  "habilidadesAdquiridas",
  "siguienteProyecto",
];

const temas = [
  {
    tema: "Manipulación básica del DOM",
    proyectos: [
      {
        titulo: "Cambiador de Color de Fondo",
        nivel: "Principiante",
        categoria: "Manipulación básica del DOM",
        objetivo:
          "Cambiar dinámicamente el color de fondo de la página al pulsar un botón.",
        conceptos: [
          "querySelector()",
          "getElementById()",
          "addEventListener()",
          "style.backgroundColor",
        ],
        requisitosPrevios: [
          "Saber crear una página HTML básica",
          "Saber enlazar un archivo .js con <script>",
          "Conocer qué es una etiqueta y un atributo HTML",
        ],
        explicacionSimple:
          "Imagina que tu pantalla es una pared que puedes pintar. Cuando aprietas un botón, le dices al ordenador: 'píntala de otro color'. El ordenador busca la pared (la página) y le cambia el color al instante, como magia.",
        explicacionTecnica:
          "Se selecciona el elemento <body> (u otro contenedor) del DOM mediante querySelector o getElementById. Se registra un listener de tipo 'click' sobre un botón con addEventListener, y en el callback se modifica la propiedad style.backgroundColor del elemento seleccionado, lo que provoca un repintado inmediato del navegador.",
        codigoEjemplo:
          "// Seleccionamos los elementos que necesitamos\nconst boton = document.getElementById('cambiarColor');\nconst body = document.body;\n\n// Lista de colores disponibles\nconst colores = ['#f7d9c4', '#c4e1f7', '#d9f7c4', '#f7c4e7'];\n\nboton.addEventListener('click', () => {\n  // Elegimos un color al azar del array\n  const indice = Math.floor(Math.random() * colores.length);\n  // Aplicamos el color directamente al estilo del body\n  body.style.backgroundColor = colores[indice];\n});",
        pasos: [
          "Crea el HTML con un botón y un contenedor visible.",
          "Enlaza un archivo script.js al final del body.",
          "Selecciona el botón con querySelector o getElementById.",
          "Añade un listener de click al botón.",
          "Dentro del listener, cambia el style.backgroundColor del body.",
          "Prueba varios colores y comprueba que el cambio es inmediato.",
        ],
        pistas: [
          "Guarda los colores en un array para poder elegir uno al azar con Math.random().",
          "Puedes usar valores hexadecimales (#ff0000) o nombres de color (red).",
          "Si quieres restaurar el color original, guárdalo en una variable antes de cambiarlo.",
        ],
        erroresComunes: [
          "Olvidar que backgroundColor se escribe en camelCase en JavaScript (no background-color).",
          "Seleccionar el elemento antes de que el HTML se haya cargado, obteniendo null.",
          "Colocar el <script> antes del HTML sin usar defer, provocando errores de elemento no encontrado.",
        ],
        resultadoEsperado:
          "Al pulsar el botón, el color de fondo de la página cambia inmediatamente y de forma visible.",
        desafioExtra: [
          "Generar colores aleatorios con RGB (Math.random() * 255)",
          "Permitir introducir un color hexadecimal manualmente",
          "Añadir un botón para restaurar el color original",
        ],
        nivelVisual: 1,
        tiempoEstimado: "20-30 minutos",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        habilidadesAdquiridas: [
          "Selección de elementos del DOM",
          "Manejo de eventos click",
          "Modificación de estilos en tiempo real",
        ],
        siguienteProyecto: "Contador de Clics",
      },
      {
        titulo: "Contador de Clics",
        nivel: "Principiante",
        categoria: "Manipulación básica del DOM",
        objetivo: "Contar cuántas veces el usuario pulsa un botón.",
        conceptos: [
          "Variables",
          "Incremento (++)",
          "Eventos click",
          "textContent",
        ],
        requisitosPrevios: [
          "Haber completado 'Cambiador de Color de Fondo' o equivalente",
          "Saber declarar variables con let/const",
          "Conocer la diferencia entre textContent e innerHTML",
        ],
        explicacionSimple:
          "Es como un contador de saltos: cada vez que saltas (pulsas el botón), alguien apunta un número más en una libreta. Ese número se muestra en la pantalla para que veas cuántas veces has saltado.",
        explicacionTecnica:
          "Se mantiene una variable de estado (let contador = 0) en el ámbito del módulo. En cada evento click se incrementa dicha variable y se sincroniza el DOM actualizando el textContent de un elemento que la muestra, evitando el uso de innerHTML por razones de rendimiento y seguridad.",
        codigoEjemplo:
          "let contador = 0;\n\nconst boton = document.getElementById('sumar');\nconst display = document.getElementById('valor');\n\nboton.addEventListener('click', () => {\n  contador++; // aumentamos el valor guardado\n  display.textContent = contador; // reflejamos el cambio en pantalla\n});",
        pasos: [
          "Crea un botón y un elemento (span o p) para mostrar el número.",
          "Declara una variable contador = 0 fuera de cualquier función.",
          "Añade un listener de click al botón.",
          "En el listener, incrementa contador y actualiza el textContent.",
          "Comprueba que el número sube en cada clic.",
        ],
        pistas: [
          "El estado (contador) debe vivir fuera del listener para que se conserve entre clics.",
          "Usa textContent en vez de innerHTML porque solo hay texto, no HTML.",
          "Piensa qué pasaría si dos botones distintos usan la misma variable.",
        ],
        erroresComunes: [
          "Declarar contador dentro del listener, reiniciándolo a 0 en cada clic.",
          "Olvidar actualizar el DOM después de modificar la variable.",
          "Confundir contador++ con contador+1 (esta última no modifica la variable).",
        ],
        resultadoEsperado:
          "Cada clic incrementa en 1 el número mostrado en pantalla, de forma visible e inmediata.",
        desafioExtra: [
          "Añadir un botón para reiniciar el contador a 0",
          "Añadir un botón para restar clics (con límite en 0)",
          "Guardar el récord más alto alcanzado en la sesión",
        ],
        nivelVisual: 1,
        tiempoEstimado: "20-25 minutos",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        habilidadesAdquiridas: [
          "Gestión de estado con variables",
          "Actualización reactiva del DOM",
          "Buenas prácticas con textContent",
        ],
        siguienteProyecto: "Lista Dinámica",
      },
    ],
  },
  {
    tema: "Arrays y renderizado dinámico",
    proyectos: [
      {
        titulo: "Lista Dinámica",
        nivel: "Principiante",
        categoria: "Arrays y renderizado dinámico",
        objetivo:
          "Añadir elementos introducidos por el usuario a una lista visible en pantalla.",
        conceptos: [
          "Arrays",
          "createElement()",
          "appendChild()",
          "Inputs y su valor (.value)",
        ],
        requisitosPrevios: [
          "Conocer arrays básicos (push, length)",
          "Saber capturar el valor de un <input>",
          "Haber trabajado con eventos click",
        ],
        explicacionSimple:
          "Es como una lista de la compra en un papel. Escribes algo, aprietas 'añadir' y aparece una línea nueva en la lista, sin borrar las anteriores. Puedes seguir añadiendo todo lo que quieras.",
        explicacionTecnica:
          "El valor del input se lee mediante la propiedad .value. Se crea un nuevo nodo con document.createElement('li'), se le asigna el texto con textContent y se inserta en el DOM con appendChild sobre un <ul> contenedor. Opcionalmente se guarda también en un array en memoria para mantener sincronizado el estado de la aplicación.",
        codigoEjemplo:
          "const input = document.getElementById('tarea');\nconst boton = document.getElementById('anadir');\nconst lista = document.getElementById('lista');\nconst tareas = []; // guardamos el estado en un array\n\nboton.addEventListener('click', () => {\n  const texto = input.value.trim();\n  if (texto === '') return; // evitamos añadir vacío\n\n  tareas.push(texto); // actualizamos el array\n\n  const li = document.createElement('li'); // creamos el elemento\n  li.textContent = texto;\n  lista.appendChild(li); // lo insertamos en el DOM\n\n  input.value = ''; // limpiamos el input\n});",
        pasos: [
          "Crea un input, un botón 'Añadir' y una lista <ul> vacía.",
          "Captura el valor del input al pulsar el botón.",
          "Valida que el texto no esté vacío.",
          "Crea un elemento <li> con createElement y asígnale el texto.",
          "Inserta el <li> en la lista con appendChild.",
          "Limpia el input después de añadir el elemento.",
        ],
        pistas: [
          "Usa input.value.trim() para evitar añadir espacios en blanco como si fueran texto válido.",
          "Guarda los datos también en un array para poder manipularlos después (editar, borrar, ordenar).",
          "Puedes permitir añadir también con la tecla Enter escuchando el evento keydown.",
        ],
        erroresComunes: [
          "Usar innerHTML += para añadir elementos, lo que reconstruye toda la lista y pierde eventos.",
          "No limpiar el input después de añadir, obligando al usuario a borrar manualmente.",
          "No validar el texto vacío, generando elementos de lista sin contenido.",
        ],
        resultadoEsperado:
          "Cada texto introducido aparece como un nuevo elemento en la lista, sin recargar la página.",
        desafioExtra: [
          "Añadir un botón para eliminar cada elemento individualmente",
          "Permitir editar un elemento haciendo doble clic",
          "Ordenar la lista alfabéticamente",
        ],
        nivelVisual: 2,
        tiempoEstimado: "30-40 minutos",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        habilidadesAdquiridas: [
          "Creación dinámica de elementos DOM",
          "Sincronización entre array de datos y vista",
          "Manejo de formularios simples",
        ],
        siguienteProyecto: "Filtro de Búsqueda en Tiempo Real",
      },
    ],
  },
  {
    tema: "Eventos y formularios",
    proyectos: [
      {
        titulo: "Filtro de Búsqueda en Tiempo Real",
        nivel: "Intermedio",
        categoria: "Eventos y formularios",
        objetivo:
          "Filtrar elementos de una lista mientras el usuario escribe en un campo de búsqueda.",
        conceptos: [
          "Evento input",
          "Array.filter()",
          "String.includes()",
          "Arrays de objetos",
        ],
        requisitosPrevios: [
          "Haber completado 'Lista Dinámica' o entender bien createElement/appendChild",
          "Conocer los métodos de array filter() y map()",
          "Saber usar toLowerCase() en strings",
        ],
        explicacionSimple:
          "Es como buscar un juguete en una caja llena de juguetes: a medida que dices letras de su nombre, alguien va apartando los que no coinciden, hasta que solo quedan a la vista los que se parecen a lo que buscas.",
        explicacionTecnica:
          "En cada evento input sobre el campo de búsqueda se toma el valor actual, se normaliza con toLowerCase() y se aplica Array.prototype.filter() sobre el array de datos original, comprobando con includes() si cada elemento contiene el texto buscado. El resultado filtrado se vuelve a renderizar por completo en el contenedor, reemplazando el contenido anterior.",
        codigoEjemplo:
          "const datos = ['Manzana', 'Banana', 'Cereza', 'Melón', 'Naranja'];\nconst input = document.getElementById('buscar');\nconst lista = document.getElementById('resultados');\n\nfunction render(items) {\n  lista.innerHTML = ''; // limpiamos antes de volver a pintar\n  items.forEach((item) => {\n    const li = document.createElement('li');\n    li.textContent = item;\n    lista.appendChild(li);\n  });\n}\n\ninput.addEventListener('input', () => {\n  const texto = input.value.toLowerCase();\n  const filtrados = datos.filter((item) =>\n    item.toLowerCase().includes(texto),\n  );\n  render(filtrados);\n});\n\nrender(datos); // pintado inicial",
        pasos: [
          "Crea un array de datos base (strings u objetos).",
          "Crea un input de búsqueda y un contenedor de resultados.",
          "Escribe una función render(items) que pinte la lista completa.",
          "Escucha el evento 'input' sobre el campo de búsqueda.",
          "Filtra el array original usando filter() e includes().",
          "Vuelve a renderizar solo los elementos filtrados.",
        ],
        pistas: [
          "Convierte tanto el texto buscado como los datos a minúsculas para ignorar mayúsculas.",
          "No modifiques el array original: filter() ya devuelve uno nuevo.",
          "Separa la lógica de 'pintar' en una función render() reutilizable.",
        ],
        erroresComunes: [
          "Filtrar directamente sobre el array ya filtrado, perdiendo elementos de forma permanente.",
          "Olvidar toLowerCase(), haciendo que la búsqueda distinga mayúsculas y minúsculas.",
          "No limpiar el contenedor antes de volver a renderizar, duplicando elementos.",
        ],
        resultadoEsperado:
          "La lista se actualiza en tiempo real mostrando solo los elementos que coinciden con el texto escrito.",
        desafioExtra: [
          "Resaltar la parte del texto que coincide con la búsqueda",
          "Mostrar un contador de resultados encontrados",
          "Mostrar un mensaje cuando no hay coincidencias",
        ],
        nivelVisual: 3,
        tiempoEstimado: "40-50 minutos",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        habilidadesAdquiridas: [
          "Filtrado de datos con métodos funcionales de array",
          "Renderizado reactivo basado en estado",
          "Manejo de eventos de teclado en inputs",
        ],
        siguienteProyecto: "Contador de Palabras y Caracteres",
      },
      {
        titulo: "Contador de Palabras y Caracteres",
        nivel: "Intermedio",
        categoria: "Eventos y formularios",
        objetivo:
          "Contar palabras y caracteres de un texto mientras el usuario escribe.",
        conceptos: [
          "Strings",
          "split()",
          "length",
          "Evento input en textarea",
        ],
        requisitosPrevios: [
          "Conocer los métodos básicos de String (trim, split)",
          "Saber trabajar con el evento input",
          "Entender qué es un array y su propiedad length",
        ],
        explicacionSimple:
          "Cuando escribes una carta, alguien va contando en voz alta cuántas letras y cuántas palabras llevas escritas, actualizando el número cada vez que añades algo nuevo.",
        explicacionTecnica:
          "Sobre un <textarea> se escucha el evento input. El número de caracteres se obtiene directamente con value.length. El número de palabras se calcula recortando espacios sobrantes con trim(), dividiendo el string por espacios con split(/\\s+/) y filtrando cadenas vacías para evitar contar un textarea vacío como una palabra.",
        codigoEjemplo:
          "const textarea = document.getElementById('texto');\nconst contadorPalabras = document.getElementById('palabras');\nconst contadorCaracteres = document.getElementById('caracteres');\n\ntextarea.addEventListener('input', () => {\n  const texto = textarea.value;\n\n  contadorCaracteres.textContent = texto.length;\n\n  const palabras = texto\n    .trim()\n    .split(/\\s+/) // separa por uno o más espacios\n    .filter((palabra) => palabra.length > 0); // quita vacíos\n\n  contadorPalabras.textContent = palabras.length;\n});",
        pasos: [
          "Crea un <textarea> y dos elementos para mostrar palabras y caracteres.",
          "Escucha el evento input sobre el textarea.",
          "Calcula el número de caracteres con value.length.",
          "Calcula el número de palabras usando trim() + split(/\\s+/) + filter().",
          "Actualiza ambos contadores en pantalla en cada pulsación.",
        ],
        pistas: [
          "Un textarea vacío no tiene 0 palabras si no filtras las cadenas vacías tras el split.",
          "split(/\\s+/) es más robusto que split(' ') porque soporta varios espacios seguidos.",
          "Puedes reutilizar la misma función para calcular estadísticas adicionales.",
        ],
        erroresComunes: [
          "Usar split(' ') sin trim(), contando una palabra fantasma cuando el texto está vacío.",
          "No manejar saltos de línea, que también deben tratarse como separadores de palabras.",
          "Actualizar el contador solo en el evento 'change', que no se dispara mientras se escribe.",
        ],
        resultadoEsperado:
          "Los contadores de palabras y caracteres se actualizan automáticamente mientras el usuario escribe.",
        desafioExtra: [
          "Contar también el número de frases (dividiendo por . ! ?)",
          "Mostrar el tiempo estimado de lectura",
          "Mostrar las palabras que más se repiten",
        ],
        nivelVisual: 2,
        tiempoEstimado: "30-40 minutos",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        habilidadesAdquiridas: [
          "Procesamiento de texto con expresiones regulares simples",
          "Cálculo de estadísticas en tiempo real",
          "Manejo de eventos en textarea",
        ],
        siguienteProyecto: "Calculadora Sencilla",
      },
    ],
  },
  {
    tema: "Funciones y lógica",
    proyectos: [
      {
        titulo: "Calculadora Sencilla",
        nivel: "Intermedio",
        categoria: "Funciones y lógica",
        objetivo:
          "Realizar operaciones matemáticas básicas (suma, resta, multiplicación, división) a partir de dos números.",
        conceptos: [
          "Funciones",
          "Parámetros",
          "Return",
          "Operadores matemáticos",
          "switch / condicionales",
        ],
        requisitosPrevios: [
          "Saber declarar funciones con parámetros y return",
          "Conocer los operadores aritméticos básicos",
          "Saber leer valores numéricos de inputs con Number() o parseFloat()",
        ],
        explicacionSimple:
          "Es como una máquina expendedora: le metes dos números y le dices qué operación quieres (sumar, restar...), aprietas el botón y la máquina te devuelve el resultado ya calculado.",
        explicacionTecnica:
          "Se implementan funciones puras (sumar, restar, multiplicar, dividir) que reciben dos parámetros numéricos y devuelven el resultado con return. Un manejador de evento click lee los valores de los inputs con Number(), determina la operación seleccionada (por ejemplo con un switch) y muestra el resultado devuelto por la función correspondiente en el DOM.",
        codigoEjemplo:
          "function sumar(a, b) { return a + b; }\nfunction restar(a, b) { return a - b; }\nfunction multiplicar(a, b) { return a * b; }\nfunction dividir(a, b) {\n  if (b === 0) return 'Error: no se puede dividir entre 0';\n  return a / b;\n}\n\nconst boton = document.getElementById('calcular');\nboton.addEventListener('click', () => {\n  const numeroA = Number(document.getElementById('numA').value);\n  const numeroB = Number(document.getElementById('numB').value);\n  const operacion = document.getElementById('operacion').value;\n\n  let resultado;\n  switch (operacion) {\n    case 'suma': resultado = sumar(numeroA, numeroB); break;\n    case 'resta': resultado = restar(numeroA, numeroB); break;\n    case 'multiplicacion': resultado = multiplicar(numeroA, numeroB); break;\n    case 'division': resultado = dividir(numeroA, numeroB); break;\n  }\n\n  document.getElementById('resultado').textContent = resultado;\n});",
        pasos: [
          "Crea dos inputs numéricos y un selector de operación (select).",
          "Escribe funciones independientes para cada operación matemática.",
          "Añade un botón 'Calcular' con su evento click.",
          "Lee y convierte los valores de los inputs a número.",
          "Según la operación elegida, llama a la función correspondiente.",
          "Muestra el resultado devuelto en el DOM.",
        ],
        pistas: [
          "Cada operación merece su propia función pequeña: es más fácil de probar y leer.",
          "Usa Number() en vez de parseInt() para permitir decimales.",
          "Controla la división entre 0 como caso especial antes de operar.",
        ],
        erroresComunes: [
          "Olvidar convertir el valor del input (string) a número antes de operar, concatenando en vez de sumar.",
          "No controlar la división entre cero, mostrando Infinity o NaN sin explicación.",
          "Mezclar la lógica de cálculo con la lógica del DOM en la misma función, dificultando las pruebas.",
        ],
        resultadoEsperado:
          "Al pulsar 'Calcular', se muestra el resultado correcto de la operación matemática seleccionada.",
        desafioExtra: [
          "Añadir la operación de potencia (Math.pow o **)",
          "Calcular porcentajes entre dos números",
          "Guardar un historial de las últimas operaciones realizadas",
        ],
        nivelVisual: 3,
        tiempoEstimado: "45-60 minutos",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        habilidadesAdquiridas: [
          "Diseño de funciones puras y reutilizables",
          "Separación de lógica de negocio y lógica de interfaz",
          "Manejo de casos límite (división entre cero)",
        ],
        siguienteProyecto: "Generador de Contraseñas Aleatorias",
      },
      {
        titulo: "Generador de Contraseñas Aleatorias",
        nivel: "Intermedio",
        categoria: "Funciones y lógica",
        objetivo:
          "Generar contraseñas aleatorias y seguras con una longitud configurable.",
        conceptos: [
          "Strings",
          "Arrays",
          "Math.random()",
          "Math.floor()",
          "Bucles for",
          "Funciones",
        ],
        requisitosPrevios: [
          "Haber completado 'Calculadora Sencilla' o dominar funciones con return",
          "Conocer bucles for",
          "Saber acceder a caracteres de un string por índice",
        ],
        explicacionSimple:
          "Imagina una bolsa llena de letras, números y símbolos revueltos. Metes la mano sin mirar y sacas uno, lo apuntas, lo devuelves a la bolsa y repites hasta tener la cantidad de caracteres que pediste. Así se forma una contraseña que nadie puede adivinar.",
        explicacionTecnica:
          "Se define un conjunto de caracteres posibles (mayúsculas, minúsculas, números, símbolos) concatenados en un string. En un bucle for que se repite tantas veces como la longitud deseada, se genera un índice aleatorio con Math.floor(Math.random() * caracteres.length) y se va concatenando el carácter correspondiente al resultado final.",
        codigoEjemplo:
          "function generarPassword(longitud) {\n  const letrasMinus = 'abcdefghijklmnopqrstuvwxyz';\n  const letrasMayus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';\n  const numeros = '0123456789';\n  const simbolos = '!@#$%^&*';\n  const todos = letrasMinus + letrasMayus + numeros + simbolos;\n\n  let password = '';\n  for (let i = 0; i < longitud; i++) {\n    const indice = Math.floor(Math.random() * todos.length);\n    password += todos[indice]; // añadimos un carácter aleatorio\n  }\n  return password;\n}\n\ndocument.getElementById('generar').addEventListener('click', () => {\n  const longitud = Number(document.getElementById('longitud').value) || 12;\n  document.getElementById('resultado').textContent = generarPassword(longitud);\n});",
        pasos: [
          "Define los conjuntos de caracteres posibles (letras, números, símbolos).",
          "Escribe la función generarPassword(longitud) con un bucle for.",
          "En cada iteración, elige un carácter aleatorio con Math.random() y Math.floor().",
          "Concatena el carácter elegido al resultado final.",
          "Muestra la contraseña generada en el DOM al pulsar un botón.",
        ],
        pistas: [
          "Math.random() genera un número entre 0 (incluido) y 1 (excluido); multiplícalo por la longitud del string de caracteres.",
          "Math.floor() redondea hacia abajo para obtener un índice entero válido.",
          "Separa la generación de la contraseña (lógica) de su visualización (DOM) en funciones distintas.",
        ],
        erroresComunes: [
          "Olvidar Math.floor(), generando un índice decimal que no sirve para acceder a un carácter.",
          "Permitir longitud 0 o negativa sin validar, generando una contraseña vacía.",
          "Repetir siempre el mismo orden de caracteres al inicio del string, reduciendo la aleatoriedad percibida.",
        ],
        resultadoEsperado:
          "Se genera una contraseña aleatoria con la longitud especificada por el usuario cada vez que se pulsa el botón.",
        desafioExtra: [
          "Añadir un botón para copiar la contraseña al portapapeles (navigator.clipboard)",
          "Mostrar un indicador visual de fortaleza (débil/media/fuerte)",
          "Permitir marcar checkboxes para incluir o excluir símbolos y números",
        ],
        nivelVisual: 3,
        tiempoEstimado: "45-60 minutos",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        habilidadesAdquiridas: [
          "Generación de valores aleatorios controlados",
          "Composición de strings dinámicamente",
          "Diseño de funciones configurables mediante parámetros",
        ],
        siguienteProyecto: "Temporizador con Inicio, Pausa y Reinicio",
      },
    ],
  },
  {
    tema: "Temporizadores",
    proyectos: [
      {
        titulo: "Temporizador con Inicio, Pausa y Reinicio",
        nivel: "Intermedio",
        categoria: "Temporizadores",
        objetivo:
          "Crear un cronómetro totalmente funcional que se pueda iniciar, pausar y reiniciar.",
        conceptos: [
          "setInterval()",
          "clearInterval()",
          "Variables de estado",
          "Manipulación del DOM en bucle",
        ],
        requisitosPrevios: [
          "Conocer funciones y variables de estado (let)",
          "Haber trabajado con eventos click en varios botones",
          "Entender la diferencia entre ejecutar algo una vez y repetirlo cada cierto tiempo",
        ],
        explicacionSimple:
          "Es como un reloj de arena que puedes controlar: aprietas 'inicio' y empieza a caer arena (pasan los segundos), aprietas 'pausa' y se detiene en el aire, y aprietas 'reiniciar' para que vuelva a estar lleno desde el principio.",
        explicacionTecnica:
          "Se usa setInterval() para ejecutar una función cada 1000ms que incrementa una variable de segundos y actualiza el DOM. El identificador devuelto por setInterval se guarda en una variable para poder cancelarlo con clearInterval() al pausar. Un booleano de estado (enMarcha) evita crear múltiples intervalos simultáneos si se pulsa 'inicio' repetidamente.",
        codigoEjemplo:
          "let segundos = 0;\nlet intervalo = null;\nlet enMarcha = false;\n\nconst display = document.getElementById('tiempo');\n\nfunction actualizarDisplay() {\n  display.textContent = segundos + 's';\n}\n\ndocument.getElementById('iniciar').addEventListener('click', () => {\n  if (enMarcha) return; // evita duplicar intervalos\n  enMarcha = true;\n  intervalo = setInterval(() => {\n    segundos++;\n    actualizarDisplay();\n  }, 1000);\n});\n\ndocument.getElementById('pausar').addEventListener('click', () => {\n  clearInterval(intervalo); // detiene el conteo\n  enMarcha = false;\n});\n\ndocument.getElementById('reiniciar').addEventListener('click', () => {\n  clearInterval(intervalo);\n  enMarcha = false;\n  segundos = 0;\n  actualizarDisplay();\n});",
        pasos: [
          "Crea tres botones: Iniciar, Pausar y Reiniciar, más un display de tiempo.",
          "Declara las variables de estado: segundos, intervalo y enMarcha.",
          "En 'Iniciar', usa setInterval para incrementar segundos cada 1000ms.",
          "En 'Pausar', usa clearInterval para detener el conteo sin perder el valor.",
          "En 'Reiniciar', detén el intervalo y pon segundos a 0.",
          "Actualiza el display cada vez que cambie el valor de segundos.",
        ],
        pistas: [
          "Guarda siempre el ID que devuelve setInterval; sin él no puedes detenerlo con clearInterval.",
          "Usa una bandera booleana (enMarcha) para evitar crear varios intervalos si se pulsa 'Iniciar' varias veces.",
          "Separa la función que actualiza el display de la lógica de control del tiempo.",
        ],
        erroresComunes: [
          "No guardar el ID de setInterval, haciendo imposible pausarlo después.",
          "Pulsar 'Iniciar' varias veces sin control, creando múltiples intervalos que aceleran el conteo.",
          "Olvidar clearInterval en 'Reiniciar', dejando un intervalo antiguo corriendo en segundo plano.",
        ],
        resultadoEsperado:
          "El usuario puede iniciar el conteo, pausarlo en cualquier segundo y reiniciarlo a 0 sin errores.",
        desafioExtra: [
          "Convertir el temporizador en una cuenta atrás desde un valor introducido",
          "Reproducir un sonido de alarma cuando la cuenta atrás llega a 0",
          "Mostrar el tiempo con formato HH:MM:SS",
        ],
        nivelVisual: 4,
        tiempoEstimado: "50-70 minutos",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        habilidadesAdquiridas: [
          "Control de temporizadores con setInterval/clearInterval",
          "Gestión de estado booleano para evitar bugs de concurrencia",
          "Diseño de controles de inicio/pausa/reinicio",
        ],
        siguienteProyecto: "Lista de Tareas con LocalStorage",
      },
    ],
  },
  {
    tema: "Almacenamiento local",
    proyectos: [
      {
        titulo: "Lista de Tareas con LocalStorage",
        nivel: "Avanzado",
        categoria: "Almacenamiento local",
        objetivo:
          "Crear una aplicación de tareas (To-Do List) cuyos datos persistan aunque se recargue o cierre el navegador.",
        conceptos: [
          "localStorage",
          "JSON.stringify()",
          "JSON.parse()",
          "Arrays de objetos",
          "Operaciones CRUD",
        ],
        requisitosPrevios: [
          "Dominar la creación dinámica de elementos (createElement/appendChild)",
          "Haber completado 'Lista Dinámica' y 'Filtro de Búsqueda'",
          "Conocer arrays de objetos y sus métodos (push, filter, map, find)",
        ],
        explicacionSimple:
          "Es como escribir tu lista de tareas en una libreta especial que no se borra nunca, ni siquiera si apagas el ordenador. Cada vez que la abres, la libreta sigue teniendo todo lo que escribiste la última vez.",
        explicacionTecnica:
          "El estado de la aplicación (un array de objetos {id, texto, completada}) se serializa con JSON.stringify() y se guarda en localStorage bajo una clave fija. Al cargar la página, se lee esa clave con localStorage.getItem(), se deserializa con JSON.parse() (con un valor por defecto si no existe) y se renderiza. Cada operación CRUD (crear, leer, actualizar, borrar) modifica el array en memoria y vuelve a persistirlo en localStorage para mantener la sincronía.",
        codigoEjemplo:
          "const CLAVE = 'tareas';\n\nfunction cargarTareas() {\n  const guardado = localStorage.getItem(CLAVE);\n  return guardado ? JSON.parse(guardado) : []; // valor por defecto\n}\n\nfunction guardarTareas(tareas) {\n  localStorage.setItem(CLAVE, JSON.stringify(tareas));\n}\n\nlet tareas = cargarTareas();\n\nfunction renderizar() {\n  const lista = document.getElementById('lista');\n  lista.innerHTML = '';\n  tareas.forEach((tarea) => {\n    const li = document.createElement('li');\n    li.textContent = tarea.texto;\n    li.style.textDecoration = tarea.completada ? 'line-through' : 'none';\n    li.addEventListener('click', () => {\n      tarea.completada = !tarea.completada; // actualizar (U de CRUD)\n      guardarTareas(tareas);\n      renderizar();\n    });\n    lista.appendChild(li);\n  });\n}\n\ndocument.getElementById('anadir').addEventListener('click', () => {\n  const input = document.getElementById('nueva');\n  if (!input.value.trim()) return;\n  tareas.push({ id: Date.now(), texto: input.value, completada: false }); // crear (C)\n  guardarTareas(tareas);\n  input.value = '';\n  renderizar();\n});\n\nrenderizar(); // leer (R) al cargar la página",
        pasos: [
          "Define la estructura de una tarea: {id, texto, completada}.",
          "Escribe cargarTareas() y guardarTareas() usando JSON.parse/stringify sobre localStorage.",
          "Al cargar la página, lee las tareas guardadas y renderízalas.",
          "Implementa 'crear': añadir una nueva tarea al array y guardarla.",
          "Implementa 'actualizar': marcar una tarea como completada al hacer clic.",
          "Implementa 'eliminar': quitar una tarea del array con filter() y guardar de nuevo.",
          "Verifica que, tras recargar la página, las tareas siguen apareciendo.",
        ],
        pistas: [
          "localStorage solo guarda strings: por eso siempre hay que pasar por JSON.stringify/JSON.parse.",
          "Cada operación que cambie los datos debe terminar llamando a guardarTareas() para no perder la persistencia.",
          "Usa Date.now() como forma sencilla de generar un id único por tarea.",
        ],
        erroresComunes: [
          "Olvidar JSON.parse() al leer, tratando el string guardado como si ya fuera un array.",
          "Modificar el array en memoria pero no volver a llamar a guardarTareas(), perdiendo los cambios al recargar.",
          "No comprobar si localStorage.getItem() devuelve null la primera vez que se usa la app, provocando un error en JSON.parse(null).",
        ],
        resultadoEsperado:
          "Las tareas añadidas, completadas o eliminadas siguen disponibles tal cual tras cerrar y volver a abrir el navegador.",
        desafioExtra: [
          "Permitir editar el texto de una tarea existente",
          "Añadir categorías o etiquetas a cada tarea",
          "Añadir niveles de prioridad (alta/media/baja) con colores",
          "Añadir un buscador que filtre las tareas guardadas",
          "Implementar un modo oscuro persistente también en localStorage",
          "Permitir reordenar tareas con Drag & Drop",
        ],
        nivelVisual: 5,
        tiempoEstimado: "90-120 minutos",
        tecnologias: ["HTML", "CSS", "JavaScript", "localStorage API"],
        habilidadesAdquiridas: [
          "Persistencia de datos en el navegador con localStorage",
          "Serialización y deserialización de datos con JSON",
          "Implementación completa de operaciones CRUD",
          "Sincronización entre estado en memoria y almacenamiento",
        ],
        siguienteProyecto:
          "Proyecto libre: combinar LocalStorage con fetch() a una API externa",
      },
    ],
  },
];

const rutaAprendizaje = [
  {
    nivel: "Nivel 1",
    proyectos: [
      "Cambiador de Color de Fondo",
      "Contador de Clics",
      "Lista Dinámica",
    ],
  },
  {
    nivel: "Nivel 2",
    proyectos: [
      "Filtro de Búsqueda en Tiempo Real",
      "Contador de Palabras y Caracteres",
      "Calculadora Sencilla",
    ],
  },
  {
    nivel: "Nivel 3",
    proyectos: [
      "Generador de Contraseñas Aleatorias",
      "Temporizador con Inicio, Pausa y Reinicio",
    ],
  },
  {
    nivel: "Nivel 4",
    proyectos: ["Lista de Tareas con LocalStorage"],
  },
];
