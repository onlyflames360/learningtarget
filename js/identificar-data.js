// "¿Qué estoy viendo?" — aprender a clasificar cualquier cosa que aparezca
// después de un punto, sin tener que memorizar listas.

const REGLA_PARENTESIS = {
  propiedad: {
    titulo: "Propiedad",
    definicion: "Un dato que el objeto ya tiene guardado. Se lee tal cual, SIN paréntesis.",
    ejemplos: ["texto.length", "input.value", "boton.id", "casilla.checked", "parrafo.textContent"],
    truco: "Si le pones paréntesis, revienta: texto.length() da 'is not a function'.",
  },
  metodo: {
    titulo: "Método",
    definicion: "Una acción que el objeto sabe hacer. Hay que ejecutarla, CON paréntesis.",
    ejemplos: ["texto.trim()", "lista.push(4)", "boton.addEventListener(...)", "Object.keys(obj)"],
    truco: "Si te olvidas los paréntesis, no falla: te devuelve la función en sí, no el resultado. Es un bug silencioso.",
  },
};

// La tabla, ordenada por lo que más te vas a encontrar
const FAMILIAS = [
  {
    id: "propiedades",
    nombre: "Propiedades",
    emoji: "📦",
    resumen: "Datos que el objeto guarda. Sin paréntesis.",
    ejemplos: ["value", "length", "name", "id", "checked", "textContent"],
    comoSaber:
      "No llevan paréntesis y responden a la pregunta '¿qué tiene?' en vez de '¿qué hace?'. Muchas se pueden además ASIGNAR: elemento.textContent = \"Hola\".",
    ejemplo:
      'const input = document.getElementById("nombre");\n\nconsole.log(input.value);   // ¿qué tiene? → lo escrito\nconsole.log(input.value.length); // ¿cuántos caracteres?\n\ninput.value = "";           // las propiedades se pueden asignar',
    cuidado:
      "input.value siempre es TEXTO, aunque el input sea de tipo number. Si vas a operar, conviértelo antes.",
  },
  {
    id: "arrays",
    nombre: "Métodos de arrays",
    emoji: "🧺",
    resumen: "Acciones sobre listas. A la izquierda del punto hay [ ].",
    ejemplos: ["map()", "filter()", "find()", "push()", "forEach()", "reduce()"],
    comoSaber:
      "Si a la izquierda del punto hay un array (o algo que viene de querySelectorAll, split(), etc.) son métodos de array. Señal inconfundible: muchos reciben una función dentro — item => ....",
    ejemplo:
      "const precios = [10, 25, 5];\n\nprecios.push(30);                    // modifica el original\nconst caros = precios.filter(p => p > 9);  // devuelve uno NUEVO\nconst total = precios.reduce((a, b) => a + b, 0);",
    cuidado:
      "Unos modifican el array original (push, pop, sort, reverse) y otros devuelven uno nuevo (map, filter, slice, concat). Confundirlos es la fuente de bugs número uno con arrays.",
  },
  {
    id: "strings",
    nombre: "Métodos de strings",
    emoji: "🔤",
    resumen: "Acciones sobre texto. A la izquierda hay comillas.",
    ejemplos: ["split()", "trim()", "replace()", "includes()", "startsWith()", "toUpperCase()", "slice()"],
    comoSaber:
      "A la izquierda del punto hay texto (entre comillas, o una variable que contiene texto, o un input.value).",
    ejemplo:
      'const entrada = "  Ana Pérez  ";\n\nconst limpio = entrada.trim();          // "Ana Pérez"\nconst partes = limpio.split(" ");       // ["Ana", "Pérez"]\nconst mayus = limpio.toUpperCase();     // "ANA PÉREZ"',
    cuidado:
      "NINGÚN método de string modifica el original: siempre devuelven uno nuevo. Si haces texto.trim() sin guardar el resultado, no pasa nada.",
  },
  {
    id: "dom",
    nombre: "Métodos del DOM",
    emoji: "🌳",
    resumen: "Acciones sobre la página. Casi siempre empiezan por document o un elemento.",
    ejemplos: ["querySelector()", "addEventListener()", "createElement()", "appendChild()", "classList.add()"],
    comoSaber:
      "Empiezan por document., o por una variable que guarda un elemento de la página. Si el nombre habla de HTML (Element, Node, Attribute, class...), es DOM.",
    ejemplo:
      'const lista = document.querySelector("#tareas");\nconst li = document.createElement("li");\n\nli.textContent = "Nueva tarea";\nli.classList.add("pendiente");\nlista.appendChild(li);',
    cuidado:
      "Solo funcionan en el navegador. Si tu código va a correr en Node o quieres poder probarlo sin página, sepáralo de la lógica.",
  },
  {
    id: "objetos",
    nombre: "Métodos de objetos",
    emoji: "🗂️",
    resumen: "Utilidades globales. Empiezan por Object. con O mayúscula.",
    ejemplos: ["Object.keys()", "Object.values()", "Object.entries()", "Object.assign()"],
    comoSaber:
      "El objeto va DENTRO del paréntesis, no delante del punto: Object.keys(persona), no persona.keys(). Es la señal que los distingue de todo lo demás.",
    ejemplo:
      'const persona = { nombre: "Ana", edad: 30 };\n\nObject.keys(persona);    // ["nombre", "edad"]\nObject.values(persona);  // ["Ana", 30]\n\nfor (const [clave, valor] of Object.entries(persona)) {\n  console.log(clave, valor);\n}',
    cuidado:
      "Object.keys() siempre devuelve un ARRAY de textos. Por eso después puedes encadenar métodos de array: Object.keys(obj).length.",
  },
];

// Los tres símbolos: una pregunta mental para cada uno, y cómo distinguir
// sus distintos usos cuando el mismo símbolo significa cosas diferentes.
const SIMBOLOS = [
  {
    simbolo: "( )",
    nombre: "Paréntesis",
    emoji: "▶️",
    pregunta: "¿Voy a ejecutar algo?",
    usos: [
      {
        que: "Ejecutar una función",
        ej: "saludar();",
        nota: "Sin los paréntesis no se ejecuta: obtienes la función en sí, no su resultado.",
      },
      {
        que: "Declarar qué recibe una función",
        ej: "function saludar(nombre) { }",
        nota: "Aquí no se ejecuta nada: se está diciendo qué datos va a aceptar.",
      },
      {
        que: "Agrupar para cambiar el orden de una operación",
        ej: "(2 + 3) * 4  // 20, no 14",
        nota: "Igual que en matemáticas: lo de dentro se resuelve primero.",
      },
      {
        que: "Envolver la condición de un if o un bucle",
        ej: "if (edad >= 18) { }\nwhile (quedan > 0) { }",
        nota: "Delimitan la pregunta que se está haciendo.",
      },
    ],
    truco:
      "Mira qué hay JUSTO DELANTE. Un nombre → se está ejecutando. La palabra function → declara lo que recibe. if / while / for → envuelven una condición. Nada → están agrupando una operación.",
  },
  {
    simbolo: "[ ]",
    nombre: "Corchetes",
    emoji: "🧺",
    pregunta: "¿Voy a acceder o guardar elementos?",
    usos: [
      {
        que: "Crear una lista",
        ej: 'const frutas = ["manzana", "pera"];',
        nota: "Vacíos o con elementos dentro: estás definiendo una colección.",
      },
      {
        que: "Acceder a una posición",
        ej: "frutas[0]  // primera fruta",
        nota: "Los índices empiezan en 0, no en 1.",
      },
      {
        que: "Acceder a una propiedad cuyo nombre es variable",
        ej: 'const campo = "edad";\npersona[campo]  // equivale a persona.edad',
        nota: "Es la única forma cuando el nombre no lo sabes hasta que se ejecuta.",
      },
      {
        que: "Sacar valores de una lista a variables",
        ej: "const [primero, segundo] = coordenadas;",
        nota: "Desestructuración: los corchetes indican que el origen es un array.",
      },
    ],
    truco:
      "Si van DESPUÉS de un nombre (frutas[0]) estás accediendo. Si van después de un = o sueltos, estás creando o repartiendo una colección.",
  },
  {
    simbolo: "{ }",
    nombre: "Llaves",
    emoji: "🗂️",
    pregunta: "¿Voy a agrupar o definir cosas?",
    usos: [
      {
        que: "Delimitar un bloque de código",
        ej: "if (activo) {\n  encender();\n}",
        nota: "Marcan dónde empieza y acaba lo que se ejecuta en ese caso.",
      },
      {
        que: "Definir un objeto",
        ej: 'const persona = { nombre: "Ana", edad: 30 };',
        nota: "Dentro hay pares clave: valor separados por comas.",
      },
      {
        que: "Sacar propiedades de un objeto a variables",
        ej: "const { nombre, edad } = persona;",
        nota: "Desestructuración: las llaves indican que el origen es un objeto.",
      },
      {
        que: "Elegir qué importar de otro archivo",
        ej: 'import { sumar } from "./operaciones.js";',
        nota: "Sin llaves sería la exportación por defecto del archivo.",
      },
    ],
    truco:
      "La duda típica es bloque u objeto. Si van después de un = o dentro de un ( ), es un OBJETO. Si van después de un if, for, function o =>, es un BLOQUE de código.",
  },
];

// Otros símbolos que aparecen constantemente
const SIMBOLOS_EXTRA = [
  {
    simbolo: "=>",
    significa: "Arrow function: una función escrita en corto.",
    ej: "const doble = (n) => n * 2;",
  },
  {
    simbolo: "${ }",
    significa: "Meter una variable dentro de un texto. Solo funciona con comillas invertidas ` `.",
    ej: "`Hola ${nombre}, tienes ${edad} años`",
  },
  {
    simbolo: "...",
    significa: "Expandir una lista, o recoger lo que sobra en una nueva.",
    ej: "const copia = [...original];\nfunction sumar(...numeros) { }",
  },
  {
    simbolo: "?.",
    significa: "Accede solo si existe; si no, devuelve undefined en vez de romperse.",
    ej: "usuario?.direccion?.calle",
  },
  {
    simbolo: ":",
    significa: "Asigna dentro de un objeto (o el tipo, en TypeScript). Fuera de ahí se usa =.",
    ej: 'const p = { nombre: "Ana" };  // dentro: dos puntos\nlet nombre = "Ana";           // fuera: igual',
  },
  {
    simbolo: "` `",
    significa: "Comillas invertidas: texto que admite variables dentro y saltos de línea.",
    ej: "`Total: ${precio} €`",
  },
];

// Consejos útiles: las señales que permiten reconocer al vuelo, sin memorizar
const SENALES = [
  {
    senal: "Lleva ( ) al final",
    significa: "Es un método: una acción que se ejecuta.",
    ejemplo: "texto.trim()",
  },
  {
    senal: "NO lleva ( )",
    significa: "Es una propiedad: un dato ya guardado que solo se lee o se asigna.",
    ejemplo: "texto.length",
  },
  {
    senal: "Es una palabra suelta: if, else, switch, for, return",
    significa:
      "No es un método ni una propiedad: es una estructura de control, la que decide QUÉ código se ejecuta. No lleva punto delante porque no pertenece a ningún objeto.",
    ejemplo: "if (edad >= 18) { ... }",
  },
  {
    senal: "Empieza con mayúscula antes del punto",
    significa: "Es una utilidad global del lenguaje: Object, Math, JSON, Array, Number.",
    ejemplo: "Math.random()",
  },
  {
    senal: "Empieza por document.",
    significa: "Estás tocando la página: es DOM.",
    ejemplo: 'document.querySelector(".btn")',
  },
  {
    senal: "Recibe una función dentro: item => ...",
    significa: "Casi siempre es un método de array de orden superior (map, filter, find, forEach, reduce, some, every).",
    ejemplo: "precios.filter(p => p > 10)",
  },
  {
    senal: "Se llama .value",
    significa: "Vienes de un input o un select: es lo que escribió el usuario, y siempre es texto.",
    ejemplo: "input.value.trim()",
  },
  {
    senal: "Habla de clases, atributos o nodos",
    significa: "DOM: classList, setAttribute, appendChild, closest, matches.",
    ejemplo: 'div.classList.toggle("activo")',
  },
  {
    senal: "Aparece en una cadena con puntos seguidos",
    significa: "Se lee de IZQUIERDA a DERECHA: cada trozo actúa sobre el resultado del anterior. El tipo puede cambiar por el camino.",
    ejemplo: 'texto.trim().split(" ").length',
  },
];

// Menos frecuente, pero es lo que más bloquea cuando pasa: aparte, al final
const ERRORES_CLASICOS = [
  {
    sintoma: "x.length is not a function",
    causa: "Le pusiste paréntesis a una propiedad.",
    arreglo: "Quítalos: texto.length, no texto.length().",
  },
  {
    sintoma: "x.filter is not a function",
    causa: "Estás usando un método de array sobre algo que no es un array (un string, un objeto, un NodeList antiguo).",
    arreglo: "Comprueba qué hay a la izquierda del punto: console.log(x) o Array.isArray(x). Si es un NodeList, conviértelo con [...x].",
  },
  {
    sintoma: "En consola aparece 'function' en vez del resultado",
    causa: "Te olvidaste los paréntesis al llamar a un método.",
    arreglo: "texto.toUpperCase() con paréntesis. Sin ellos obtienes la función, no su resultado.",
  },
  {
    sintoma: "El if se cumple siempre, pase lo que pase",
    causa: "Dentro de la condición escribiste = (asignar) en vez de === (comparar).",
    arreglo:
      "if (edad === 18). Con un solo = le asignas 18 a la variable, y la asignación devuelve 18, que es verdadero: el bloque entra siempre.",
  },
  {
    sintoma: "undefined al leer .value",
    causa: "Ese elemento no es un input: los div, p o span no tienen .value.",
    arreglo: "Para elementos normales usa .textContent; .value es exclusivo de campos de formulario.",
  },
  {
    sintoma: "Cannot read properties of null",
    causa: "El selector no encontró nada, así que estás llamando algo sobre null.",
    arreglo: "Revisa que el id o la clase coincidan y que el script se ejecute DESPUÉS de que exista el HTML (defer o al final del body).",
  },
  {
    sintoma: "persona.keys is not a function",
    causa: "Los métodos de objeto no se llaman sobre el objeto.",
    arreglo: "Es Object.keys(persona), con el objeto dentro del paréntesis.",
  },
];

// Identificador interactivo: reconocer al vuelo
const RETOS_IDENTIFICAR = [
  {
    codigo: 'const nombre = input.value;',
    marcado: "value",
    pregunta: "¿Qué es <code>value</code> aquí?",
    opciones: [
      "Una propiedad: un dato guardado en el input, por eso no lleva paréntesis",
      "Un método del DOM que hay que ejecutar con value()",
      "Un método de string que limpia el texto",
    ],
    correcta: 0,
    explicacion:
      "No lleva paréntesis → es una propiedad. Guarda lo que el usuario escribió, siempre como texto.",
  },
  {
    codigo: "const largos = palabras.filter(p => p.length > 5);",
    marcado: "filter",
    pregunta: "¿Qué familia es <code>filter</code>?",
    opciones: [
      "Método de array: a la izquierda hay una lista y recibe una función dentro",
      "Método de string, porque trabaja con palabras",
      "Propiedad del DOM",
    ],
    correcta: 0,
    explicacion:
      "Dos señales: a la izquierda del punto hay un array y recibe una función (p => ...). Eso es siempre un método de array de orden superior.",
  },
  {
    codigo: 'const partes = "12-05-2026".split("-");',
    marcado: "split",
    pregunta: "¿Qué familia es <code>split</code>?",
    opciones: [
      "Método de string: a la izquierda del punto hay texto entre comillas",
      "Método de array, porque el resultado es un array",
      "Método de Object",
    ],
    correcta: 0,
    explicacion:
      "Lo que manda es lo que hay a la IZQUIERDA del punto, no el resultado. A la izquierda hay un string → método de string (aunque devuelva un array).",
  },
  {
    codigo: "const claves = Object.keys(config);",
    marcado: "Object.keys",
    pregunta: "¿Por qué se escribe <code>Object.keys(config)</code> y no <code>config.keys()</code>?",
    opciones: [
      "Porque es una utilidad global: el objeto va dentro del paréntesis, no delante del punto",
      "Porque config es un array y los arrays no tienen keys",
      "Porque keys es una propiedad y no admite paréntesis",
    ],
    correcta: 0,
    explicacion:
      "Object empieza por mayúscula: es una utilidad del lenguaje. Ese patrón (mayúscula + punto + método) lo comparten Math, JSON, Array y Number.",
  },
  {
    codigo: 'boton.addEventListener("click", saludar);',
    marcado: "addEventListener",
    pregunta: "¿Qué familia es <code>addEventListener</code>?",
    opciones: [
      "Método del DOM: se llama sobre un elemento de la página",
      "Método de array, porque añade algo a una lista",
      "Propiedad, porque no devuelve nada",
    ],
    correcta: 0,
    explicacion:
      "Se llama sobre un elemento de la página y su nombre habla de eventos del navegador: es DOM. Aunque diga 'add', no tiene relación con arrays.",
  },
  {
    codigo: "const total = carrito.length;",
    marcado: "length",
    pregunta: "¿Es <code>length</code> lo mismo que <code>length()</code>?",
    opciones: [
      "No: length es una propiedad, con paréntesis daría 'is not a function'",
      "Sí, ambas formas son válidas en JavaScript",
      "Solo se pueden usar paréntesis si carrito es un array",
    ],
    correcta: 0,
    explicacion:
      "length es una propiedad tanto en arrays como en strings. Los paréntesis solo van en métodos.",
  },
  {
    codigo: 'const limpio = input.value.trim().toLowerCase();',
    marcado: "cadena",
    pregunta: "En esa cadena de puntos, ¿en qué orden ocurre todo?",
    opciones: [
      "De izquierda a derecha: se lee el value, se recorta y luego se pasa a minúsculas",
      "De derecha a izquierda: primero toLowerCase()",
      "Todo a la vez, el orden no importa",
    ],
    correcta: 0,
    explicacion:
      "Cada trozo actúa sobre el resultado del anterior. Leer de izquierda a derecha te dice también con qué TIPO estás trabajando en cada paso.",
  },
  {
    codigo: 'div.classList.add("activo");',
    marcado: "classList.add",
    pregunta: "¿Qué es <code>classList</code> y qué es <code>add</code>?",
    opciones: [
      "classList es una propiedad del elemento y add es un método de esa propiedad",
      "Las dos son métodos del DOM",
      "Las dos son propiedades",
    ],
    correcta: 0,
    explicacion:
      "classList (sin paréntesis) es una propiedad que contiene las clases; add() (con paréntesis) es una acción sobre ella. Se pueden encadenar propiedades y métodos.",
  },
  {
    codigo: "const enteros = Math.floor(4.9);",
    marcado: "Math.floor",
    pregunta: "¿Qué te dice la mayúscula de <code>Math</code>?",
    opciones: [
      "Que es una utilidad global del lenguaje, no algo que pertenezca a tu dato",
      "Que es una clase que tienes que instanciar con new",
      "Que es una propiedad del DOM",
    ],
    correcta: 0,
    explicacion:
      "Mayúscula antes del punto = utilidad global (Math, Object, JSON, Number). Nunca se crean con new: se usan directamente.",
  },
  {
    codigo: 'const items = document.querySelectorAll(".item");\nitems.forEach(i => i.remove());',
    marcado: "forEach",
    pregunta: "¿Por qué funciona <code>forEach</code> sobre el resultado de querySelectorAll?",
    opciones: [
      "Porque querySelectorAll devuelve una NodeList, que sí admite forEach (aunque no map ni filter)",
      "Porque devuelve un array normal con todos los métodos",
      "Porque forEach es un método del DOM",
    ],
    correcta: 0,
    explicacion:
      "Una NodeList se parece a un array pero no lo es: tiene forEach, pero no map ni filter. Si los necesitas, conviértela primero con [...items].",
  },
  {
    codigo: 'const persona = { nombre: "Ana" };\n\nif (persona.nombre) {\n  console.log("Tiene nombre");\n}',
    marcado: "llaves",
    pregunta: "Las llaves aparecen dos veces. ¿Significan lo mismo?",
    opciones: [
      "No: las primeras definen un objeto (van tras un =) y las segundas delimitan un bloque (van tras un if)",
      "Sí, las llaves siempre definen un objeto",
      "Sí, las llaves siempre delimitan un bloque de código",
    ],
    correcta: 0,
    explicacion:
      "Es la duda más común con { }. La pista está en lo que va delante: tras un = es un objeto; tras un if, for, function o => es un bloque de código.",
  },
  {
    codigo: 'const campo = "edad";\n\nconsole.log(persona[campo]);\nconsole.log(persona.campo);',
    marcado: "corchetes",
    pregunta: "¿Por qué las dos líneas dan resultados distintos?",
    opciones: [
      "persona[campo] usa el VALOR de la variable ('edad'); persona.campo busca una propiedad llamada literalmente 'campo'",
      "Son exactamente equivalentes, solo cambia el estilo",
      "La segunda da un error de sintaxis",
    ],
    correcta: 0,
    explicacion:
      "Los corchetes evalúan lo de dentro; el punto toma el nombre literal. Por eso, cuando el nombre de la propiedad está en una variable, la única opción son los corchetes.",
  },
  {
    codigo: "boton.addEventListener('click', saludar);\nboton.addEventListener('click', saludar());",
    marcado: "parentesis",
    pregunta: "¿Qué diferencia hay entre las dos líneas?",
    opciones: [
      "La primera pasa la función para que se ejecute al hacer clic; la segunda la ejecuta YA y pasa su resultado",
      "Son equivalentes: los paréntesis sobran o faltan sin consecuencia",
      "La segunda es la forma correcta de registrar un evento",
    ],
    correcta: 0,
    explicacion:
      "Los paréntesis significan 'ejecuta ahora'. En un listener quieres pasar la función SIN ejecutarla, para que el navegador la llame cuando ocurra el evento. Es un error clásico.",
  },
  {
    codigo: 'const mensaje = "Hola " + nombre + ", tienes " + edad;\nconst mejor = `Hola ${nombre}, tienes ${edad}`;',
    marcado: "template",
    pregunta: "¿Qué hace falta para que funcione <code>${ }</code>?",
    opciones: [
      "Que el texto vaya entre comillas invertidas ` `, no entre comillas normales",
      "Nada especial, funciona con cualquier tipo de comillas",
      "Que la variable esté declarada con var",
    ],
    correcta: 0,
    explicacion:
      "${ } solo se interpreta dentro de comillas invertidas (template literals). Con comillas normales aparecería tal cual, como texto literal.",
  },
  {
    codigo: 'if (usuario.edad = 18) {\n  console.log("Tiene 18");\n}',
    marcado: "=",
    pregunta: "¿Qué hace el <code>=</code> dentro de este if?",
    opciones: [
      "Asignar: le pone 18 a usuario.edad, así que el if se cumple siempre",
      "Comparar si usuario.edad vale 18",
      "Comparar el valor y el tipo, igual que ===",
    ],
    correcta: 0,
    explicacion:
      "Un solo = asigna. Además, la asignación devuelve el valor asignado (18), que es verdadero, así que el bloque entra siempre. Para preguntar hace falta ===.",
  },
];
