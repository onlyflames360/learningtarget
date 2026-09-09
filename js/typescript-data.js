// TypeScript enseñado como el resto de la app: por frecuencia de uso real,
// cada concepto empezando por el PROBLEMA que resuelve, con el JS al lado,
// y con el error del compilador que te vas a encontrar.

const TS_PORQUE = {
  js: 'function precioFinal(precio, descuento) {\n  return precio - descuento;\n}\n\n// En algún sitio, meses después:\nprecioFinal("100", 10);\n// → "100" - 10 = 90 ... por casualidad\nprecioFinal(100, "10%");\n// → NaN 💥 y no te enteras hasta producción',
  ts: 'function precioFinal(precio: number, descuento: number): number {\n  return precio - descuento;\n}\n\nprecioFinal("100", 10);\n//         ~~~~~ El editor lo marca en ROJO al escribirlo:\n//         Argument of type \'string\' is not assignable\n//         to parameter of type \'number\'',
  idea: "TypeScript no cambia lo que hace tu código: se ejecuta el mismo JavaScript. Lo que cambia es CUÁNDO te enteras de los errores: al escribirlos, no cuando un usuario los sufre.",
};

const TS_NIVELES = [
  {
    nivel: "Nivel 1",
    titulo: "El 90% de lo que usarás a diario",
    nota: "Con esto solo ya cubres casi todo el TypeScript que se escribe en un proyecto normal.",
    conceptos: [
      {
        nombre: "Tipos básicos",
        clave: "Le pones al dato una etiqueta que dice qué puede contener.",
        problema:
          "En JS una variable puede cambiar de tipo sin avisar, y el fallo aparece mucho después, lejos de donde se originó.",
        js: 'let edad = 25;\nedad = "veinticinco"; // permitido... y peligroso',
        ts: "let edad: number = 25;\nedad = \"veinticinco\";\n//     ~~~~~~~~~~~~~~ Type 'string' is not assignable to type 'number'\n\nlet nombre: string = \"Ana\";\nlet activo: boolean = true;\nlet precios: number[] = [10, 20];",
        explica:
          "Los tres tipos que usarás constantemente son string, number y boolean. Para listas se añade [] al tipo de sus elementos: number[] es 'lista de números'.",
        error: null,
      },
      {
        nombre: "Inferencia: no anotes de más",
        clave: "Si TypeScript ya lo sabe, no se lo repitas.",
        problema:
          "El error más común al empezar es anotar absolutamente todo, lo que llena el código de ruido sin aportar seguridad extra.",
        js: "// en JS no hay tipos que escribir",
        ts: 'let nombre: string = "Ana"; // ❌ redundante\nlet nombre = "Ana";         // ✅ ya sabe que es string\n\nconst precios = [10, 20];   // ya es number[]\nconst total = precios.reduce((a, b) => a + b, 0); // ya es number',
        explica:
          "TypeScript deduce el tipo del valor que asignas. La regla práctica: anota los PARÁMETROS de funciones y las formas de los objetos; deja que infiera el resto.",
        error: null,
      },
      {
        nombre: "Tipar funciones",
        clave: "Los parámetros SÍ hay que anotarlos; el retorno normalmente se infiere.",
        problema:
          "Una función es un contrato: si nadie dice qué entra y qué sale, cualquiera puede llamarla mal y no se detecta.",
        js: "function saludar(nombre) {\n  return \"Hola \" + nombre;\n}",
        ts: 'function saludar(nombre: string) {\n  return "Hola " + nombre; // retorno inferido: string\n}\n\n// Si no devuelve nada, el tipo es void\nfunction registrar(mensaje: string): void {\n  console.log(mensaje);\n}',
        explica:
          "Sin anotar, un parámetro sería 'any' implícito y perderías toda la protección justo donde más importa: en la frontera de la función.",
        error: {
          mensaje: "Parameter 'nombre' implicitly has an 'any' type. (7006)",
          traduccion:
            "No has dicho qué tipo es ese parámetro y con strict activado no se permite adivinarlo. Solución: anótalo.",
        },
      },
      {
        nombre: "Objetos con interface",
        clave: "Describes la FORMA que debe tener un objeto y TS vigila que se cumpla.",
        problema:
          "Los objetos son donde más se equivoca uno: una propiedad mal escrita (nombre vs nombres) no falla hasta que se usa.",
        js: 'const usuario = { nombre: "Ana", edad: 30 };\nconsole.log(usuario.nombres); // undefined, sin aviso',
        ts: 'interface Usuario {\n  nombre: string;\n  edad: number;\n}\n\nconst usuario: Usuario = { nombre: "Ana", edad: 30 };\nconsole.log(usuario.nombres);\n//                  ~~~~~~~ Property \'nombres\' does not exist on type \'Usuario\'',
        explica:
          "Además de proteger, la interface documenta: con leerla sabes exactamente qué campos tiene ese objeto, sin abrir cinco archivos. Y el editor te autocompleta las propiedades.",
        error: {
          mensaje: "Property 'nombres' does not exist on type 'Usuario'. (2339)",
          traduccion:
            "Estás pidiendo una propiedad que ese tipo no tiene: casi siempre es una errata o te falta declararla en la interface.",
        },
      },
      {
        nombre: "Propiedades opcionales",
        clave: "El signo ? dice: puede venir o no.",
        problema:
          "No todos los objetos llegan completos. Sin marcarlo, TS te obligaría a rellenar campos que a veces no existen.",
        js: 'const usuario = { nombre: "Ana" }; // ¿y el teléfono? nadie sabe',
        ts: 'interface Usuario {\n  nombre: string;\n  telefono?: string; // opcional\n}\n\nconst ana: Usuario = { nombre: "Ana" }; // ✅ válido\n\n// Al usarlo, TS te obliga a contemplar que falte:\nconsole.log(ana.telefono.length);\n//              ~~~~~~~~ possibly \'undefined\'\nconsole.log(ana.telefono?.length); // ✅ encadenamiento opcional',
        explica:
          "Marcar algo como opcional obliga (a ti y a quien lea el código) a tratar el caso de que no esté. Ese es justo el bug que TS quiere que dejes de tener.",
        error: {
          mensaje: "'ana.telefono' is possibly 'undefined'. (18048)",
          traduccion:
            "Ese campo puede no existir y lo estás usando sin comprobarlo. Solución: ?. para acceder, o un if que compruebe antes.",
        },
      },
      {
        nombre: "Arrays tipados",
        clave: "Una lista donde todos los elementos son del mismo tipo.",
        problema:
          "Un array en JS puede acabar mezclando números, textos y objetos sin que nadie lo note hasta que un .map() revienta.",
        js: 'const precios = [10, 20];\nprecios.push("treinta"); // permitido',
        ts: 'const precios: number[] = [10, 20];\nprecios.push("treinta");\n//           ~~~~~~~~~ Argument of type \'string\' is not\n//           assignable to parameter of type \'number\'\n\n// Array de objetos, lo más habitual en una app real:\nconst usuarios: Usuario[] = [{ nombre: "Ana", edad: 30 }];',
        explica:
          "Con el array tipado, al recorrerlo con map o filter el editor ya sabe qué es cada elemento y te autocompleta sus propiedades. Ahí es donde más se nota la ganancia.",
        error: null,
      },
    ],
  },
  {
    nivel: "Nivel 2",
    titulo: "Cuando el proyecto crece",
    nota: "Aquí es donde TypeScript deja de ser 'poner etiquetas' y empieza a razonar contigo.",
    conceptos: [
      {
        nombre: "Uniones y narrowing",
        clave: "Un valor puede ser de varios tipos, y TS va descartando según lo compruebas.",
        problema:
          "Muchos datos reales son 'esto o aquello': un id que puede ser texto o número, una respuesta que puede fallar, un usuario que puede no estar.",
        js: "function formatear(id) {\n  return id.toUpperCase(); // 💥 si llega un número\n}",
        ts: 'function formatear(id: string | number) {\n  if (typeof id === "string") {\n    return id.toUpperCase(); // ✅ aquí TS SABE que es string\n  }\n  return id.toFixed(2);      // ✅ aquí solo puede ser number\n}',
        explica:
          "A esto se le llama narrowing (estrechamiento): al comprobar con typeof, con un if o con un ===, TypeScript descarta opciones y te deja usar solo lo que es válido en cada rama. Es el corazón del lenguaje.",
        error: {
          mensaje: "Property 'toUpperCase' does not exist on type 'string | number'. (2339)",
          traduccion:
            "Estás usando un método que solo existe en una de las opciones posibles. Solución: comprueba antes con typeof para estrechar el tipo.",
        },
      },
      {
        nombre: "Tipos literales",
        clave: "No solo 'un texto', sino exactamente cuáles.",
        problema:
          "Un string admite infinitos valores; pero un estado solo puede ser 'pendiente', 'enviado' o 'entregado'. Un typo ahí es un bug silencioso.",
        js: 'pedido.estado = "enviadoo"; // typo, nadie avisa',
        ts: 'type Estado = "pendiente" | "enviado" | "entregado";\n\nlet estado: Estado = "enviado";  // ✅\nestado = "enviadoo";\n//       ~~~~~~~~~~ Type \'"enviadoo"\' is not assignable to type \'Estado\'',
        explica:
          "Es la alternativa moderna a los enums: más simple, se autocompleta igual y desaparece al compilar (no genera código extra). Por eso muchos equipos ya no usan enum.",
        error: null,
      },
      {
        nombre: "type vs interface",
        clave: "Para objetos son casi iguales; type además sirve para todo lo demás.",
        problema:
          "Es la duda clásica al empezar, y suele resolverse mal: eligiendo al azar en cada archivo.",
        js: "// no aplica: JS no tiene tipos",
        ts: '// Ambas valen para describir un objeto\ninterface Usuario { nombre: string }\ntype UsuarioT = { nombre: string };\n\n// Pero solo type puede hacer esto:\ntype Id = string | number;          // uniones\ntype Coordenada = [number, number]; // tuplas\ntype Callback = (n: number) => void;',
        explica:
          "Criterio práctico: interface para la forma de objetos (y porque se puede extender), type para todo lo demás (uniones, alias, funciones). Lo importante es ser consistente dentro del proyecto.",
        error: null,
      },
      {
        nombre: "TypeScript en el DOM",
        clave: "TS no sabe qué elemento devolverá el selector: hay que concretárselo.",
        problema:
          "querySelector puede devolver null (si no encuentra nada) y devuelve un Element genérico, que no tiene .value. Es el choque número uno al pasar una app de JS a TS.",
        js: 'const input = document.querySelector("#nombre");\nconsole.log(input.value); // funciona... hasta que no existe',
        ts: 'const input = document.querySelector("#nombre");\nconsole.log(input.value);\n//          ~~~~~ \'input\' is possibly \'null\'\n//                Property \'value\' does not exist on type \'Element\'\n\n// Solución correcta: comprobar + concretar el tipo\nconst input = document.querySelector<HTMLInputElement>("#nombre");\nif (input) {\n  console.log(input.value); // ✅\n}',
        explica:
          "Los dos avisos son reales: puede no existir, y un Element cualquiera no tiene .value. Comprobar el null es justo el bug que en JS descubres en producción.",
        error: {
          mensaje: "'input' is possibly 'null'. (18047)",
          traduccion:
            "El selector puede no encontrar nada. Solución: un if que compruebe, que además es lo que deberías hacer igualmente en JS.",
        },
      },
      {
        nombre: "Genéricos",
        clave: "Una caja que recuerda el tipo de lo que metes dentro.",
        problema:
          "Quieres una función reutilizable para cualquier tipo, pero sin perder la información de cuál era: con any la pierdes toda.",
        js: "function primero(lista) {\n  return lista[0]; // ¿de qué tipo? nadie sabe\n}",
        ts: "function primero<T>(lista: T[]): T {\n  return lista[0];\n}\n\nconst n = primero([1, 2, 3]);        // n es number\nconst s = primero([\"a\", \"b\"]);      // s es string\n// El tipo entra y sale: no se pierde por el camino",
        explica:
          "La T es un hueco que se rellena en cada llamada. No hace falta escribir genéricos propios para aprovecharlos: los usas constantemente sin darte cuenta (Array<T>, Promise<T>, querySelector<T>).",
        error: null,
      },
    ],
  },
  {
    nivel: "Nivel 3",
    titulo: "Menos usado · para cuando te lo encuentres",
    nota: "No hace falta para empezar. Está aquí para que lo reconozcas cuando aparezca en código ajeno.",
    conceptos: [
      {
        nombre: "Tipos de utilidad (Partial, Pick, Omit, Record)",
        clave: "Tipos que se construyen a partir de otros, sin repetirlos.",
        problema:
          "Necesitas 'un Usuario pero con todo opcional' para un formulario de edición, y copiar la interface entera te obliga a mantener dos.",
        js: "// no aplica",
        ts: "interface Usuario {\n  id: number;\n  nombre: string;\n  email: string;\n}\n\ntype UsuarioEditable = Partial<Usuario>;      // todo opcional\ntype SoloNombre = Pick<Usuario, \"nombre\">;    // solo esos campos\ntype SinId = Omit<Usuario, \"id\">;             // todos menos ese\ntype PorId = Record<number, Usuario>;         // diccionario",
        explica:
          "Derivar tipos evita duplicar: si añades un campo a Usuario, todos los derivados se actualizan solos. Partial y Omit son con diferencia los dos que más verás.",
        error: null,
      },
      {
        nombre: "any vs unknown vs never",
        clave: "any apaga los tipos; unknown obliga a comprobar; never es lo imposible.",
        problema:
          "Al empezar se usa any para 'callar' al compilador, y con eso se pierde justo lo que se venía a ganar.",
        js: "// en JS todo es, de facto, any",
        ts: 'let a: any = "hola";\na.metodoQueNoExiste(); // ✅ compila, 💥 revienta en ejecución\n\nlet u: unknown = "hola";\nu.toUpperCase();\n// ~ \'u\' is of type \'unknown\' → hay que comprobar antes\nif (typeof u === "string") u.toUpperCase(); // ✅',
        explica:
          "unknown es 'no sé qué es, oblígame a comprobarlo': la opción honesta para datos externos (una respuesta de API, un JSON.parse). any es una renuncia y debería ser temporal.",
        error: null,
      },
      {
        nombre: "Tuplas y as const",
        clave: "Arrays de longitud y tipos fijos; as const congela los valores.",
        problema:
          "A veces un array no es una lista homogénea sino una pareja fija, como [latitud, longitud] o el [valor, setValor] de React.",
        js: "const punto = [40.4, -3.7]; // solo un array de números",
        ts: 'const punto: [number, number] = [40.4, -3.7];\n\n// as const congela: los valores pasan a ser literales de solo lectura\nconst ESTADOS = ["pendiente", "enviado"] as const;\ntype Estado = (typeof ESTADOS)[number];\n// → "pendiente" | "enviado", derivado del array real',
        explica:
          "El truco de as const + typeof es muy usado: defines la lista UNA vez y el tipo se deriva de ella, así nunca se desincronizan.",
        error: null,
      },
      {
        nombre: "Aserciones (as) y el ! ",
        clave: "Decirle a TS 'confía en mí'. Úsalo poco y a conciencia.",
        problema:
          "A veces sabes algo que el compilador no puede saber, y la comprobación resulta imposible de expresar.",
        js: "// no aplica",
        ts: 'const input = document.getElementById("nombre") as HTMLInputElement;\nconst valor = input!.value; // ! = "no es null, te lo aseguro"\n\n// ⚠️ Si te equivocas, no hay red: revienta en ejecución\n// igual que habría reventado en JavaScript',
        explica:
          "as y ! desactivan la comprobación en ese punto: son promesas tuyas al compilador. Si puedes resolverlo con un if, hazlo con el if.",
        error: null,
      },
    ],
  },
];

// Lo que casi nadie enseña: leer los mensajes del compilador
const TS_ERRORES = [
  {
    codigo: "2322",
    mensaje: "Type 'string' is not assignable to type 'number'.",
    traduccion:
      "Estás metiendo un texto donde se esperaba un número. Mira el valor que asignas, no la declaración.",
    ejemplo: 'let edad: number = "30"; // ❌ quita las comillas o usa Number("30")',
  },
  {
    codigo: "2339",
    mensaje: "Property 'x' does not exist on type 'Y'.",
    traduccion:
      "Pides una propiedad que ese tipo no tiene. Suele ser una errata, o que el tipo es más genérico de lo que crees (Element en vez de HTMLInputElement).",
    ejemplo: "usuario.nombres; // ❌ era 'nombre'",
  },
  {
    codigo: "2345",
    mensaje: "Argument of type 'A' is not assignable to parameter of type 'B'.",
    traduccion:
      "Le pasas a una función un argumento del tipo equivocado. El orden importa: 'de A a B' significa que enviaste A y pedía B.",
    ejemplo: 'saludar(42); // ❌ la función pedía string',
  },
  {
    codigo: "18047",
    mensaje: "'x' is possibly 'null'.",
    traduccion:
      "Ese valor puede no existir (típico de querySelector o getElementById) y lo usas sin comprobarlo. La solución es un if, no un !.",
    ejemplo: "const el = document.querySelector('#a');\nif (el) { /* ✅ aquí ya no es null */ }",
  },
  {
    codigo: "18048",
    mensaje: "'x' is possibly 'undefined'.",
    traduccion:
      "Campo opcional o resultado de un find() que puede no encontrar nada. Usa ?. o comprueba antes.",
    ejemplo: "const u = usuarios.find(u => u.id === 1);\nconsole.log(u?.nombre); // ✅",
  },
  {
    codigo: "7006",
    mensaje: "Parameter 'x' implicitly has an 'any' type.",
    traduccion:
      "Con strict activado no se permiten parámetros sin tipo. Anótalo: es literalmente lo que TS vino a pedirte.",
    ejemplo: "function f(dato: string) { } // ✅",
  },
  {
    codigo: "2554",
    mensaje: "Expected 2 arguments, but got 1.",
    traduccion:
      "Llamas a la función con menos (o más) argumentos de los que declara. Si alguno debería ser opcional, márcalo con ? en la firma.",
    ejemplo: "function f(a: number, b?: number) { } // b ahora es opcional",
  },
];

const TS_EMPEZAR = [
  {
    paso: "Instalarlo en el proyecto",
    detalle: "npm install --save-dev typescript",
    nota: "Solo como dependencia de desarrollo: al final lo que se publica es JavaScript.",
  },
  {
    paso: "Crear la configuración",
    detalle: "npx tsc --init",
    nota: "Genera un tsconfig.json. Asegúrate de que \"strict\": true está activado: sin strict, TypeScript apenas te protege.",
  },
  {
    paso: "Renombrar y compilar",
    detalle: "app.js → app.ts   ·   npx tsc",
    nota: "Un .js válido casi siempre es un .ts válido: puedes migrar archivo a archivo, sin reescribir nada de golpe.",
  },
  {
    paso: "Dejar que el editor haga el trabajo",
    detalle: "VS Code trae TypeScript integrado",
    nota: "Los errores aparecen subrayados mientras escribes, sin necesidad de compilar. Ahí está el 90% del valor.",
  },
];

const TS_REGLAS_ORO = [
  "Activa strict desde el primer día: sin él, TypeScript es poco más que decoración.",
  "Anota los parámetros de las funciones y la forma de los objetos; deja que infiera el resto.",
  "Cuando dudes entre any y unknown, elige unknown: te obliga a comprobar, que es lo que querías.",
  "Un error del compilador no es un obstáculo: es un bug que acabas de evitar en producción.",
  "Si peleas mucho con los tipos en un sitio, suele ser señal de que el diseño de esos datos se puede simplificar.",
];

// Ejercicio: elegir la anotación correcta
const TS_RETOS = [
  {
    contexto: "Tienes esta función en JavaScript y quieres pasarla a TypeScript:",
    codigo: "function doble(n) {\n  return n * 2;\n}",
    pregunta: "¿Cuál es la versión correcta en TypeScript?",
    opciones: [
      "function doble(n: number) { return n * 2; }",
      "function doble(n: any) { return n * 2; }",
      "function doble(n): number { return n * 2; }",
    ],
    correcta: 0,
    explicacion:
      "Se anota el PARÁMETRO (que es lo que TS no puede adivinar) y se deja que infiera el retorno, que evidentemente será number. Usar any aquí desactivaría justo la protección que buscabas.",
  },
  {
    contexto: "Un usuario puede tener teléfono o no tenerlo:",
    codigo: "interface Usuario {\n  nombre: string;\n  // ¿y el teléfono?\n}",
    pregunta: "¿Cómo declaras un teléfono que puede no venir?",
    opciones: [
      "telefono?: string;",
      "telefono: string | null | undefined | any;",
      "telefono: string; // y ya lo comprobamos luego",
    ],
    correcta: 0,
    explicacion:
      "El ? marca la propiedad como opcional. Además, al usarla TypeScript te obligará a contemplar que falte, que es exactamente el bug que quieres evitar.",
  },
  {
    contexto: "Este valor puede llegar como texto o como número:",
    codigo: "function formatear(id: string | number) {\n  // quieres usar id.toUpperCase() cuando sea texto\n}",
    pregunta: "¿Qué necesitas hacer antes de llamar a toUpperCase()?",
    opciones: [
      'Comprobar el tipo: if (typeof id === "string") { ... }',
      "Forzarlo con (id as string).toUpperCase()",
      "Nada, TypeScript lo resuelve solo en tiempo de ejecución",
    ],
    correcta: 0,
    explicacion:
      "Es el narrowing: al comprobar con typeof, TypeScript descarta number dentro de ese if y te deja usar los métodos de string con seguridad. La aserción 'as' solo silencia el aviso, sin evitar el fallo real.",
  },
  {
    contexto: "Estás pasando código del DOM a TypeScript:",
    codigo: 'const input = document.querySelector("#email");\nconsole.log(input.value);',
    pregunta: "TypeScript da dos avisos aquí. ¿Cuál es la solución correcta?",
    opciones: [
      'Concretar el tipo y comprobar el null:\nconst input = document.querySelector<HTMLInputElement>("#email");\nif (input) { console.log(input.value); }',
      "Poner input!.value y seguir adelante",
      "Cambiar el tipo a any para que no moleste",
    ],
    correcta: 0,
    explicacion:
      "Los dos avisos son reales: puede no existir (null) y un Element genérico no tiene .value. El ! y el any solo callan al compilador; el if evita de verdad el error en ejecución.",
  },
  {
    contexto: "Un pedido solo puede estar en tres estados concretos:",
    codigo: 'let estado = "pendiente"; // o "enviado", o "entregado"',
    pregunta: "¿Cómo lo tipas para que un typo no pase desapercibido?",
    opciones: [
      'type Estado = "pendiente" | "enviado" | "entregado";',
      "let estado: string;",
      "let estado: any;",
    ],
    correcta: 0,
    explicacion:
      "Una unión de literales limita los valores válidos a exactamente esos tres: cualquier typo se marca al escribirlo, y además el editor te autocompleta las opciones.",
  },
  {
    contexto: "Recibes datos de una API y todavía no sabes qué forma tienen:",
    codigo: "const datos = await respuesta.json();",
    pregunta: "¿Qué tipo es más honesto y seguro para esos datos?",
    opciones: [
      "unknown, y comprobar antes de usarlos",
      "any, así no molesta nadie",
      "string, total viene de internet",
    ],
    correcta: 0,
    explicacion:
      "unknown dice 'no sé qué es' y OBLIGA a comprobarlo antes de usarlo. any diría 'da igual', que es exactamente cómo entran los datos malos en una app.",
  },
];
