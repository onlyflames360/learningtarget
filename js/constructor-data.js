// Cada "programa" es una secuencia de decisiones a/b/c. Al acertar (o ver la
// respuesta correcta) su línea de código se añade al panel de código en construcción,
// para terminar viendo un programa completo y funcional.
// Orden por frecuencia de uso real: variables, bucles+arrays, funciones+arrays,
// clases y constructores, y selectores DOM van primero por ser lo más usado a diario.
const PROGRAMAS = [
  {
    id: "variables",
    titulo: "Variables básicas",
    descripcion: "Cuándo usar let, const y typeof.",
    pasos: [
      {
        pregunta:
          "Vas a llevar la cuenta de los clics de un botón, y ese número cambiará constantemente. ¿Cómo lo declaras?",
        opciones: ["let contador = 0;", "const contador = 0;", "contador = 0;"],
        correcta: 0,
        linea: "let contador = 0;",
        explicacion: "Como el valor va a cambiar en cada clic, necesitas 'let', no 'const'.",
      },
      {
        pregunta:
          "Quieres guardar el número máximo de clics permitidos, que nunca va a cambiar. ¿Cómo lo declaras?",
        opciones: ["let limite = 10;", "const limite = 10;", "var limite;"],
        correcta: 1,
        linea: "const limite = 10;",
        explicacion: "const deja explícito que ese valor no se va a reasignar más adelante.",
      },
      {
        pregunta: "¿Cómo compruebas en la consola qué tipo de dato es 'contador'?",
        opciones: ["typeof contador", "contador.tipo", "type(contador)"],
        correcta: 0,
        linea: "console.log(typeof contador); // 'number'",
        explicacion: "typeof es un operador (no una función) que devuelve un string con el tipo de dato.",
      },
    ],
  },
  {
    id: "bucle-array",
    titulo: "Bucle for que recorre un array",
    descripcion: "Arrays + bucles: la combinación más usada de todas.",
    pasos: [
      {
        pregunta: "¿Cómo declaras un array con tres nombres de frutas?",
        opciones: [
          "const frutas = ['manzana', 'pera', 'uva'];",
          "const frutas = ('manzana', 'pera', 'uva');",
          "let frutas = {manzana, pera, uva};",
        ],
        correcta: 0,
        linea: "const frutas = ['manzana', 'pera', 'uva'];",
        explicacion: "Un array se escribe entre corchetes [ ], con sus elementos separados por comas.",
      },
      {
        pregunta: "¿Cómo empiezas un bucle for que recorra las posiciones del array desde la primera?",
        opciones: [
          "for (let i = 0; i < frutas.length; i++) {",
          "for (let i = 1; i <= frutas.length; i++) {",
          "for (i = 0; i < frutas.length; i--) {",
        ],
        correcta: 0,
        linea: "for (let i = 0; i < frutas.length; i++) {",
        explicacion: "Los arrays empiezan en el índice 0, y frutas.length es el número total de elementos.",
      },
      {
        pregunta: "Dentro del bucle, ¿cómo accedes a la fruta de la posición actual?",
        opciones: ["frutas[i]", "frutas(i)", "frutas.i"],
        correcta: 0,
        linea: "  console.log(frutas[i]);",
        explicacion: "Se accede a un elemento de un array con corchetes y su índice numérico.",
      },
      {
        pregunta: "¿Cómo cierras el bucle for que abriste?",
        opciones: ["}", "end for", "closefor();"],
        correcta: 0,
        linea: "}",
        explicacion: "Un bloque de código en JavaScript se cierra con una llave de cierre.",
      },
      {
        pregunta: "¿Cuál es la forma más moderna y corta de recorrer solo los VALORES del mismo array?",
        opciones: [
          "for (const fruta of frutas) { console.log(fruta); }",
          "for (fruta in frutas) { console.log(fruta); }",
          "frutas.each(fruta => console.log(fruta));",
        ],
        correcta: 0,
        linea: "for (const fruta of frutas) { console.log(fruta); }",
        explicacion: "for...of recorre directamente los valores de un array, sin necesitar un índice.",
      },
    ],
  },
  {
    id: "funcion-array",
    titulo: "Función que suma un array",
    descripcion: "Funciones + arrays: parámetros, acumulador y return.",
    pasos: [
      {
        pregunta: "¿Cómo declaras una función llamada 'sumarTodos' que reciba un array como parámetro?",
        opciones: [
          "function sumarTodos(numeros) {",
          "function sumarTodos = (numeros) {",
          "def sumarTodos(numeros):",
        ],
        correcta: 0,
        linea: "function sumarTodos(numeros) {",
        explicacion: "En JavaScript, una función con nombre se declara con la palabra 'function'.",
      },
      {
        pregunta: "Dentro de la función, ¿cómo declaras una variable para ir acumulando la suma, empezando en 0?",
        opciones: ["let total = 0;", "const total;", "total = 0"],
        correcta: 0,
        linea: "  let total = 0;",
        explicacion: "Necesitas 'let' porque ese valor va a cambiar en cada vuelta del bucle.",
      },
      {
        pregunta: "¿Cómo recorres cada número del array para ir sumándolo al total?",
        opciones: [
          "for (const n of numeros) {\n    total += n;\n  }",
          "for (n in numeros) {\n    total = n;\n  }",
          "numeros.sum(total);",
        ],
        correcta: 0,
        linea: "  for (const n of numeros) {\n    total += n;\n  }",
        explicacion: "total += n suma n al valor que ya tenía total, acumulando el resultado en cada vuelta.",
      },
      {
        pregunta: "¿Cómo haces que la función entregue el resultado final a quien la llamó?",
        opciones: ["return total;", "print(total);", "total;"],
        correcta: 0,
        linea: "  return total;",
        explicacion: "return finaliza la función y entrega el valor indicado a quien la llamó.",
      },
      {
        pregunta: "¿Cómo cierras la función y la llamas con el array [1, 2, 3]?",
        opciones: [
          "}\nsumarTodos([1, 2, 3]); // → 6",
          "end function\nsumarTodos[1, 2, 3]",
          "}\nsumarTodos(1, 2, 3);",
        ],
        correcta: 0,
        linea: "}\nsumarTodos([1, 2, 3]); // → 6",
        explicacion: "Se cierra el bloque con } y se llama a la función pasando el array completo como un único argumento.",
      },
    ],
  },
  {
    id: "clase-constructor",
    titulo: "Clase con constructor",
    descripcion: "class, constructor, this y métodos: la base de la POO.",
    pasos: [
      {
        pregunta: "¿Cómo empiezas a declarar una clase llamada Persona?",
        opciones: ["class Persona {", "function Persona {", "new Persona {"],
        correcta: 0,
        linea: "class Persona {",
        explicacion: "Las clases en JavaScript se declaran con la palabra reservada 'class'.",
      },
      {
        pregunta: "¿Cómo declaras el constructor, que recibirá un parámetro 'nombre'?",
        opciones: ["constructor(nombre) {", "constructor: nombre {", "function constructor(nombre) {"],
        correcta: 0,
        linea: "  constructor(nombre) {",
        explicacion: "constructor() es el método especial que se ejecuta automáticamente al crear una instancia con 'new'.",
      },
      {
        pregunta: "Dentro del constructor, ¿cómo guardas el parámetro 'nombre' como propiedad de la instancia?",
        opciones: ["this.nombre = nombre;", "nombre = this;", "self.nombre = nombre;"],
        correcta: 0,
        linea: "    this.nombre = nombre;",
        explicacion: "'this' hace referencia a la instancia concreta que se está creando en ese momento.",
      },
      {
        pregunta: "Tras cerrar el constructor, ¿cómo añades un método 'saludar' que use ese nombre?",
        opciones: [
          "}\n  saludar() {\n    return 'Hola, soy ' + this.nombre;\n  }",
          "}\n  function saludar() { return this.nombre; }",
          "}\n  saludar = 'Hola';",
        ],
        correcta: 0,
        linea: "  }\n  saludar() {\n    return 'Hola, soy ' + this.nombre;\n  }",
        explicacion: "Un método de instancia se declara dentro de la clase y puede usar 'this' para acceder a sus propios datos.",
      },
      {
        pregunta: "¿Cómo cierras la declaración de la clase?",
        opciones: ["}", "end class", "};"],
        correcta: 0,
        linea: "}",
        explicacion: "Se cierra igual que cualquier otro bloque de código, con una llave.",
      },
      {
        pregunta: "¿Cómo creas una instancia de Persona llamada 'ana' y llamas a su método saludar()?",
        opciones: [
          "const ana = new Persona('Ana');\nconsole.log(ana.saludar()); // 'Hola, soy Ana'",
          "const ana = Persona('Ana');\nana.saludar;",
          "let ana = new saludar('Ana');",
        ],
        correcta: 0,
        linea: "const ana = new Persona('Ana');\nconsole.log(ana.saludar()); // 'Hola, soy Ana'",
        explicacion: "'new' crea la instancia ejecutando el constructor; después se llama a sus métodos con un punto.",
      },
    ],
  },
  {
    id: "dom-evento",
    titulo: "Selector DOM + evento (contador de clics)",
    descripcion: "querySelector, getElementById y addEventListener juntos.",
    pasos: [
      {
        pregunta: "¿Cómo seleccionas el botón cuyo id en el HTML es 'sumar'?",
        opciones: [
          "const boton = document.getElementById('sumar');",
          "const boton = getElementById('sumar');",
          "const boton = document.id('sumar');",
        ],
        correcta: 0,
        linea: "const boton = document.getElementById('sumar');",
        explicacion: "getElementById busca un elemento por su atributo id exacto, sin el símbolo #.",
      },
      {
        pregunta: "¿Cómo seleccionas, con un selector CSS, el elemento con clase 'valor' para mostrar el número?",
        opciones: [
          "const display = document.querySelector('.valor');",
          "const display = document.querySelector('#valor');",
          "const display = document.getElementByClass('valor');",
        ],
        correcta: 0,
        linea: "const display = document.querySelector('.valor');",
        explicacion: "querySelector acepta cualquier selector CSS; una clase se indica con un punto delante.",
      },
      {
        pregunta: "¿Cómo declaras, fuera de cualquier función, la variable que llevará la cuenta de clics?",
        opciones: ["let contador = 0;", "const contador = 0;", "contador;"],
        correcta: 0,
        linea: "let contador = 0;",
        explicacion: "Debe ser 'let' (va a cambiar) y debe vivir fuera del listener para no reiniciarse en cada clic.",
      },
      {
        pregunta: "¿Cómo registras una función que se ejecute cada vez que se haga clic en el botón?",
        opciones: [
          "boton.addEventListener('click', () => {",
          "boton.onClick(() => {",
          "boton.event('click', () => {",
        ],
        correcta: 0,
        linea: "boton.addEventListener('click', () => {",
        explicacion: "addEventListener() es la forma estándar de escuchar eventos sobre un elemento del DOM.",
      },
      {
        pregunta: "Dentro del listener, ¿cómo incrementas el contador y actualizas el texto en pantalla?",
        opciones: [
          "contador++;\n  display.textContent = contador;\n});",
          "contador = contador;\n  display.value = contador;\n});",
          "contador += contador;\n  display.innerHTML();\n});",
        ],
        correcta: 0,
        linea: "  contador++;\n  display.textContent = contador;\n});",
        explicacion: "contador++ incrementa en 1 el valor guardado; textContent actualiza el texto visible sin interpretar HTML.",
      },
    ],
  },
  {
    id: "array-map-filter",
    titulo: "Array: map() y filter()",
    descripcion: "Transformar y filtrar un array sin bucles explícitos.",
    pasos: [
      {
        pregunta: "¿Cómo declaras un array con los números del 1 al 5?",
        opciones: ["const numeros = [1, 2, 3, 4, 5];", "const numeros = (1, 2, 3, 4, 5);", "let numeros = 1-5;"],
        correcta: 0,
        linea: "const numeros = [1, 2, 3, 4, 5];",
        explicacion: "Un array de números se escribe entre corchetes, con sus elementos separados por comas.",
      },
      {
        pregunta: "¿Cómo creas un nuevo array con cada número multiplicado por 2?",
        opciones: [
          "const dobles = numeros.map(n => n * 2);",
          "const dobles = numeros.forEach(n => n * 2);",
          "const dobles = numeros * 2;",
        ],
        correcta: 0,
        linea: "const dobles = numeros.map(n => n * 2);",
        explicacion: "map() crea un array nuevo transformando cada elemento con la función indicada.",
      },
      {
        pregunta: "¿Cómo obtienes solo los números pares del array original?",
        opciones: [
          "const pares = numeros.filter(n => n % 2 === 0);",
          "const pares = numeros.map(n => n % 2 === 0);",
          "const pares = numeros.find(n => n % 2 === 0);",
        ],
        correcta: 0,
        linea: "const pares = numeros.filter(n => n % 2 === 0);",
        explicacion: "filter() devuelve un nuevo array solo con los elementos que cumplen la condición indicada.",
      },
      {
        pregunta: "¿Cómo muestras ambos resultados en la consola?",
        opciones: ["console.log(dobles, pares);", "print(dobles, pares);", "display(dobles + pares);"],
        correcta: 0,
        linea: "console.log(dobles, pares); // [2,4,6,8,10] [2,4]",
        explicacion: "console.log puede recibir varios argumentos y los muestra todos, separados, en la consola.",
      },
    ],
  },
];
