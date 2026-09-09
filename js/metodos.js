// ---------- Datos: 56 métodos JS vs Python ----------
const DATA = [
  // TEXTO — JavaScript
  { lang: "JavaScript", cat: "Texto", method: ".slice()", options: ["Extrae una parte del string entre dos posiciones", "Parte el string en trozos iguales", "Ordena los caracteres"], correct: 0, example: '"manzana".slice(0, 3) // → "man"' },
  { lang: "JavaScript", cat: "Texto", method: ".split()", options: ["Divide un string en un array de trozos según un separador", "Une los elementos de un array en un string", "Elimina espacios al principio y al final"], correct: 0, example: '"a,b,c".split(",") // → ["a", "b", "c"]' },
  { lang: "JavaScript", cat: "Texto", method: ".replace()", options: ["Sustituye la primera coincidencia de un texto por otro", "Elimina un fragmento del string", "Convierte el string a mayúsculas"], correct: 0, example: '"hola mundo".replace("mundo", "JS") // → "hola JS"' },
  { lang: "JavaScript", cat: "Texto", method: ".trim()", options: ["Elimina los espacios en blanco del principio y el final", "Elimina todos los espacios del string", "Corta el string por la mitad"], correct: 0, example: '"  hola  ".trim() // → "hola"' },
  { lang: "JavaScript", cat: "Texto", method: ".toUpperCase()", options: ["Convierte todas las letras del string a mayúsculas", "Capitaliza solo la primera letra", "Invierte el orden de los caracteres"], correct: 0, example: '"hola".toUpperCase() // → "HOLA"' },
  { lang: "JavaScript", cat: "Texto", method: ".includes()", options: ["Comprueba si un string contiene un fragmento de texto", "Cuenta cuántas veces aparece un fragmento", "Devuelve la posición de un fragmento"], correct: 0, example: '"manzana".includes("man") // → true' },
  { lang: "JavaScript", cat: "Texto", method: ".padStart()", options: ["Rellena el string por la izquierda hasta alcanzar una longitud", "Rellena el string por la derecha hasta alcanzar una longitud", "Recorta el string hasta una longitud"], correct: 0, example: '"5".padStart(2, "0") // → "05"' },
  // TEXTO — Python
  { lang: "Python", cat: "Texto", method: ".strip()", options: ["Elimina los espacios en blanco del principio y el final", "Elimina todos los espacios del string", "Divide el string en palabras"], correct: 0, example: '"  hola  ".strip()  # → "hola"' },
  { lang: "Python", cat: "Texto", method: ".split()", options: ["Divide un string en una lista de trozos según un separador", "Une los elementos de una lista en un string", "Cuenta las palabras del string"], correct: 0, example: '"a,b,c".split(",")  # → [\'a\', \'b\', \'c\']' },
  { lang: "Python", cat: "Texto", method: ".replace()", options: ["Sustituye todas las coincidencias de un texto por otro", "Sustituye solo la primera coincidencia", "Busca la posición de un texto"], correct: 0, example: '"hola mundo".replace("mundo", "Py")  # → "hola Py"' },
  { lang: "Python", cat: "Texto", method: ".upper()", options: ["Convierte todas las letras del string a mayúsculas", "Capitaliza solo la primera letra", "Invierte el string"], correct: 0, example: '"hola".upper()  # → "HOLA"' },
  { lang: "Python", cat: "Texto", method: ".lower()", options: ["Convierte todas las letras del string a minúsculas", "Elimina las mayúsculas del string", "Capitaliza cada palabra"], correct: 0, example: '"HOLA".lower()  # → "hola"' },
  { lang: "Python", cat: "Texto", method: ".find()", options: ["Devuelve la posición de la primera coincidencia, o -1", "Comprueba si el texto existe (True/False)", "Cuenta cuántas veces aparece el texto"], correct: 0, example: '"manzana".find("man")  # → 0' },
  { lang: "Python", cat: "Texto", method: ".format()", options: ["Inserta valores dentro de un string usando marcadores {}", "Convierte el string a mayúsculas", "Divide el string en una lista"], correct: 0, example: '"Hola {}".format("Ana")  # → "Hola Ana"' },
  // LISTAS Y ARRAYS — JavaScript
  { lang: "JavaScript", cat: "Arrays y objetos", method: ".map()", options: ["Crea un nuevo array transformando cada elemento con una función", "Filtra los elementos que cumplen una condición", "Reduce el array a un único valor"], correct: 0, example: "[1, 2, 3].map(x => x * 2) // → [2, 4, 6]" },
  { lang: "JavaScript", cat: "Arrays y objetos", method: ".filter()", options: ["Crea un nuevo array solo con los elementos que cumplen una condición", "Transforma cada elemento del array", "Ordena los elementos del array"], correct: 0, example: "[1, 2, 3, 4].filter(x => x % 2 === 0) // → [2, 4]" },
  { lang: "JavaScript", cat: "Arrays y objetos", method: ".reduce()", options: ["Combina todos los elementos del array en un único valor acumulado", "Elimina elementos duplicados", "Divide el array en grupos"], correct: 0, example: "[1, 2, 3].reduce((a, b) => a + b, 0) // → 6" },
  { lang: "JavaScript", cat: "Arrays y objetos", method: ".push()", options: ["Añade uno o más elementos al final del array", "Añade un elemento al principio del array", "Elimina el último elemento del array"], correct: 0, example: "[1, 2].push(3) // el array queda [1, 2, 3]" },
  { lang: "JavaScript", cat: "Arrays y objetos", method: ".pop()", options: ["Elimina y devuelve el último elemento del array", "Elimina y devuelve el primer elemento", "Devuelve el último elemento sin eliminarlo"], correct: 0, example: "[1, 2, 3].pop() // → 3, el array queda [1, 2]" },
  { lang: "JavaScript", cat: "Arrays y objetos", method: ".sort()", options: ["Ordena los elementos del array modificando el original", "Invierte el orden del array", "Devuelve una copia ordenada sin modificar el original"], correct: 0, example: "[3, 1, 2].sort() // → [1, 2, 3]" },
  { lang: "JavaScript", cat: "Arrays y objetos", method: ".concat()", options: ["Une dos o más arrays en uno nuevo", "Une los elementos del array en un string", "Elimina elementos repetidos entre dos arrays"], correct: 0, example: "[1, 2].concat([3, 4]) // → [1, 2, 3, 4]" },
  // LISTAS Y ARRAYS — Python
  { lang: "Python", cat: "Arrays y objetos", method: ".append()", options: ["Añade un elemento al final de la lista", "Añade un elemento al principio de la lista", "Une dos listas en una nueva"], correct: 0, example: "[1, 2].append(3)  # la lista queda [1, 2, 3]" },
  { lang: "Python", cat: "Arrays y objetos", method: ".pop()", options: ["Elimina y devuelve el último elemento de la lista", "Elimina y devuelve el primer elemento", "Ordena la lista de mayor a menor"], correct: 0, example: "[1, 2, 3].pop()  # → 3, la lista queda [1, 2]" },
  { lang: "Python", cat: "Arrays y objetos", method: ".sort()", options: ["Ordena los elementos de la lista modificando la original", "Devuelve una copia ordenada sin modificar la original", "Invierte el orden de la lista"], correct: 0, example: "[3, 1, 2].sort()  # la lista queda [1, 2, 3]" },
  { lang: "Python", cat: "Arrays y objetos", method: ".reverse()", options: ["Invierte el orden de los elementos de la lista", "Ordena la lista alfabéticamente", "Elimina el último elemento de la lista"], correct: 0, example: "[1, 2, 3].reverse()  # la lista queda [3, 2, 1]" },
  { lang: "Python", cat: "Arrays y objetos", method: ".index()", options: ["Devuelve la posición de la primera coincidencia de un valor", "Comprueba si el valor existe (True/False)", "Cuenta cuántas veces aparece el valor"], correct: 0, example: "[10, 20, 30].index(20)  # → 1" },
  { lang: "Python", cat: "Arrays y objetos", method: ".count()", options: ["Cuenta cuántas veces aparece un valor en la lista", "Devuelve la posición de un valor", "Elimina las repeticiones de un valor"], correct: 0, example: "[1, 2, 2, 3].count(2)  # → 2" },
  { lang: "Python", cat: "Arrays y objetos", method: ".extend()", options: ["Añade todos los elementos de otra lista al final", "Añade otra lista como un único elemento", "Elimina los elementos que están en otra lista"], correct: 0, example: "[1, 2].extend([3, 4])  # → [1, 2, 3, 4]" },
  // CONVERSIÓN — JavaScript
  { lang: "JavaScript", cat: "Conversión", method: "Number()", options: ["Convierte un valor a tipo número", "Convierte un valor a texto", "Comprueba si un valor es numérico"], correct: 0, example: 'Number("42") // → 42' },
  { lang: "JavaScript", cat: "Conversión", method: "String()", options: ["Convierte un valor a tipo texto", "Convierte un texto a número", "Convierte un valor a booleano"], correct: 0, example: 'String(42) // → "42"' },
  { lang: "JavaScript", cat: "Conversión", method: "parseInt()", options: ["Convierte un texto a número entero, ignorando decimales", "Convierte un texto a número decimal exacto", "Comprueba si un texto es un número"], correct: 0, example: 'parseInt("42px") // → 42' },
  { lang: "JavaScript", cat: "Conversión", method: "JSON.stringify()", options: ["Convierte un objeto o array en un texto JSON", "Convierte un texto JSON en un objeto", "Valida si un texto es JSON correcto"], correct: 0, example: 'JSON.stringify({a: 1}) // → \'{"a":1}\'' },
  { lang: "JavaScript", cat: "Conversión", method: "Boolean()", options: ["Convierte un valor a true o false", "Invierte un valor booleano", "Comprueba si dos valores son iguales"], correct: 0, example: "Boolean(0) // → false" },
  // CONVERSIÓN — Python
  { lang: "Python", cat: "Conversión", method: "int()", options: ["Convierte un valor a tipo entero", "Convierte un valor a texto", "Convierte un valor a decimal"], correct: 0, example: 'int("42")  # → 42' },
  { lang: "Python", cat: "Conversión", method: "str()", options: ["Convierte un valor a tipo texto", "Convierte un texto a número", "Convierte un valor a lista"], correct: 0, example: 'str(42)  # → "42"' },
  { lang: "Python", cat: "Conversión", method: "float()", options: ["Convierte un valor a número decimal", "Convierte un valor a número entero", "Redondea un número decimal"], correct: 0, example: 'float("3.14")  # → 3.14' },
  { lang: "Python", cat: "Conversión", method: "json.dumps()", options: ["Convierte un diccionario o lista en un texto JSON", "Convierte un texto JSON en un diccionario", "Guarda un archivo JSON en disco"], correct: 0, example: 'json.dumps({"a": 1})  # → \'{"a": 1}\'' },
  { lang: "Python", cat: "Conversión", method: "bool()", options: ["Convierte un valor a True o False", "Invierte un valor booleano", "Comprueba si un valor es nulo"], correct: 0, example: "bool(0)  # → False" },
  // DOM — JavaScript (Python no tiene DOM)
  { lang: "JavaScript", cat: "DOM", method: "document.querySelector()", options: ["Devuelve el primer elemento que coincide con un selector CSS", "Devuelve todos los elementos que coinciden con un selector", "Crea un nuevo elemento HTML"], correct: 0, example: 'document.querySelector(".btn") // primer elemento con clase btn' },
  { lang: "JavaScript", cat: "DOM", method: "document.getElementById()", options: ["Devuelve el elemento cuyo id coincide exactamente", "Devuelve todos los elementos con esa clase", "Elimina un elemento por su id"], correct: 0, example: 'document.getElementById("titulo") // elemento con id="titulo"' },
  { lang: "JavaScript", cat: "DOM", method: ".addEventListener()", options: ["Registra una función que se ejecuta cuando ocurre un evento", "Elimina todos los eventos de un elemento", "Simula un clic sobre un elemento"], correct: 0, example: 'boton.addEventListener("click", fn)' },
  { lang: "JavaScript", cat: "DOM", method: ".createElement()", options: ["Crea un nuevo nodo HTML que aún no está en la página", "Inserta un elemento existente en la página", "Elimina un elemento de la página"], correct: 0, example: 'document.createElement("li") // nuevo <li> en memoria' },
  { lang: "JavaScript", cat: "DOM", method: ".appendChild()", options: ["Inserta un nodo como último hijo de un elemento", "Elimina un nodo hijo de un elemento", "Reemplaza todos los hijos de un elemento"], correct: 0, example: "lista.appendChild(li) // añade <li> al final de lista" },
  { lang: "JavaScript", cat: "DOM", method: ".classList.add()", options: ["Añade una o más clases CSS a un elemento", "Elimina una clase CSS de un elemento", "Comprueba si un elemento tiene una clase"], correct: 0, example: 'div.classList.add("activo")' },
  { lang: "JavaScript", cat: "DOM", method: ".setAttribute()", options: ["Establece el valor de un atributo HTML en un elemento", "Lee el valor de un atributo HTML", "Elimina un atributo HTML de un elemento"], correct: 0, example: 'img.setAttribute("alt", "foto")' },
  { lang: "JavaScript", cat: "DOM", method: ".textContent", options: ["Obtiene o establece el texto plano de un elemento, sin HTML", "Obtiene o establece el HTML interno de un elemento", "Obtiene el estilo CSS aplicado a un elemento"], correct: 0, example: 'p.textContent = "Hola" // el párrafo muestra "Hola"' },
  // MATEMÁTICAS — JavaScript
  { lang: "JavaScript", cat: "Matemáticas", method: "Math.round()", options: ["Redondea un número al entero más cercano", "Redondea siempre hacia abajo", "Redondea siempre hacia arriba"], correct: 0, example: "Math.round(4.5) // → 5" },
  { lang: "JavaScript", cat: "Matemáticas", method: "Math.random()", options: ["Genera un decimal aleatorio entre 0 (incluido) y 1 (excluido)", "Genera un entero aleatorio entre 0 y 100", "Elige un elemento aleatorio de un array"], correct: 0, example: "Math.random() // → 0.3721..." },
  { lang: "JavaScript", cat: "Matemáticas", method: "Math.max()", options: ["Devuelve el valor más alto de una lista de números", "Devuelve el valor más bajo de una lista de números", "Devuelve la suma de una lista de números"], correct: 0, example: "Math.max(3, 7, 2) // → 7" },
  { lang: "JavaScript", cat: "Matemáticas", method: "Math.floor()", options: ["Redondea un número hacia abajo, al entero inferior", "Redondea un número hacia arriba", "Redondea al entero más cercano"], correct: 0, example: "Math.floor(4.9) // → 4" },
  { lang: "JavaScript", cat: "Matemáticas", method: "Math.abs()", options: ["Devuelve el valor absoluto (sin signo) de un número", "Devuelve el opuesto (cambia el signo) de un número", "Redondea un número a dos decimales"], correct: 0, example: "Math.abs(-7) // → 7" },
  // MATEMÁTICAS — Python
  { lang: "Python", cat: "Matemáticas", method: "round()", options: ["Redondea un número al entero más cercano", "Redondea siempre hacia abajo", "Convierte un número a texto"], correct: 0, example: "round(4.6)  # → 5" },
  { lang: "Python", cat: "Matemáticas", method: "random.random()", options: ["Genera un decimal aleatorio entre 0.0 y 1.0", "Genera un entero aleatorio entre 0 y 100", "Elige un elemento aleatorio de una lista"], correct: 0, example: "random.random()  # → 0.482..." },
  { lang: "Python", cat: "Matemáticas", method: "max()", options: ["Devuelve el valor más alto de una secuencia de números", "Devuelve el valor más bajo de una secuencia", "Devuelve la media de una secuencia de números"], correct: 0, example: "max(3, 7, 2)  # → 7" },
  { lang: "Python", cat: "Matemáticas", method: "math.floor()", options: ["Redondea un número hacia abajo, al entero inferior", "Redondea un número hacia arriba", "Redondea al entero más cercano"], correct: 0, example: "math.floor(4.9)  # → 4" },
  { lang: "Python", cat: "Matemáticas", method: "abs()", options: ["Devuelve el valor absoluto (sin signo) de un número", "Devuelve el opuesto (cambia el signo) de un número", "Redondea un número a dos decimales"], correct: 0, example: "abs(-7)  # → 7" },
  // PROMESAS — JavaScript
  { lang: "JavaScript", cat: "Promesas", method: ".then()", options: ["Registra una función que se ejecuta cuando la promesa se resuelve con éxito", "Registra una función que se ejecuta solo si la promesa falla", "Convierte una función normal en una promesa"], correct: 0, example: 'fetch(url).then(res => console.log("listo"))' },
  { lang: "JavaScript", cat: "Promesas", method: ".catch()", options: ["Registra una función que se ejecuta cuando la promesa es rechazada (hay un error)", "Detiene por completo la ejecución del programa", "Convierte el error en un valor de éxito"], correct: 0, example: "promesa.catch(err => console.error(err))" },
  { lang: "JavaScript", cat: "Promesas", method: ".finally()", options: ["Registra una función que se ejecuta siempre, tanto si la promesa se resuelve como si falla", "Solo se ejecuta si la promesa se resuelve con éxito", "Cancela la promesa antes de que termine"], correct: 0, example: 'promesa.finally(() => ocultarCargando())' },
  { lang: "JavaScript", cat: "Promesas", method: "Promise.all()", options: ["Espera a que todas las promesas del array se resuelvan, o falla en cuanto una falla", "Espera solo a la primera promesa que termine, ignorando el resto", "Ejecuta las promesas una detrás de otra, nunca a la vez"], correct: 0, example: "Promise.all([p1, p2]).then(([r1, r2]) => ...)" },
  { lang: "JavaScript", cat: "Promesas", method: "async function", options: ["Declara una función que siempre devuelve una promesa y permite usar await dentro", "Declara una función que se ejecuta más rápido que las normales", "Declara una función que no puede fallar nunca"], correct: 0, example: "async function cargarDatos() { ... }" },
  { lang: "JavaScript", cat: "Promesas", method: "await", options: ["Pausa la ejecución de una función async hasta que la promesa se resuelva, sin bloquear la página", "Cancela una promesa que tarda demasiado", "Convierte un valor normal en una promesa rechazada"], correct: 0, example: "const datos = await fetch(url);" },
  // PROMESAS — Python (equivalentes con asyncio)
  { lang: "Python", cat: "Promesas", method: "async def", options: ["Declara una función asíncrona (una corrutina) que se puede pausar y reanudar", "Declara una función que se ejecuta en un hilo aparte automáticamente", "Declara una función privada dentro de una clase"], correct: 0, example: "async def cargar_datos(): ..." },
  { lang: "Python", cat: "Promesas", method: "await", options: ["Espera el resultado de una corrutina sin bloquear el resto del programa", "Detiene el programa hasta que el usuario pulse una tecla", "Repite la llamada hasta que no dé error"], correct: 0, example: "datos = await obtener_datos()" },
  { lang: "Python", cat: "Promesas", method: "asyncio.run()", options: ["Ejecuta una función async como punto de entrada del programa", "Pausa el programa un número de segundos", "Convierte una función normal en asíncrona automáticamente"], correct: 0, example: "asyncio.run(cargar_datos())" },
  { lang: "Python", cat: "Promesas", method: "asyncio.gather()", options: ["Ejecuta varias corrutinas a la vez y espera a que todas terminen", "Ejecuta corrutinas una detrás de otra, nunca a la vez", "Cancela todas las corrutinas en marcha"], correct: 0, example: "await asyncio.gather(tarea1(), tarea2())" },
  // FETCH — JavaScript
  { lang: "JavaScript", cat: "Fetch", method: "fetch()", options: ["Envía una petición HTTP y devuelve una promesa con la respuesta", "Descarga un archivo directamente al disco del usuario", "Solo funciona para pedir imágenes, no datos JSON"], correct: 0, example: 'fetch("https://api.ejemplo.com/datos")' },
  { lang: "JavaScript", cat: "Fetch", method: "response.json()", options: ["Convierte el cuerpo de la respuesta en un objeto JavaScript, devolviendo otra promesa", "Convierte la respuesta en texto plano de forma síncrona", "Envía datos en formato JSON al servidor"], correct: 0, example: "const datos = await respuesta.json();" },
  { lang: "JavaScript", cat: "Fetch", method: "response.ok", options: ["Booleano que indica si la respuesta tuvo un código de estado 200-299", "Número exacto del código de estado HTTP", "Texto con la descripción del error, si lo hay"], correct: 0, example: "if (!respuesta.ok) throw new Error('Fallo en la petición');" },
  { lang: "JavaScript", cat: "Fetch", method: "fetch(url, { method })", options: ["El segundo argumento configura el método HTTP y el cuerpo de la petición", "El segundo argumento solo sirve para añadir cabeceras de seguridad", "fetch() no admite un segundo argumento"], correct: 0, example: "fetch(url, { method: 'POST', body: JSON.stringify(datos) })" },
  // FETCH — Python (equivalente con requests)
  { lang: "Python", cat: "Fetch", method: "requests.get()", options: ["Envía una petición HTTP GET y devuelve un objeto Response", "Descarga siempre un archivo al disco", "Solo puede usarse dentro de una función async"], correct: 0, example: 'requests.get("https://api.ejemplo.com/datos")' },
  { lang: "Python", cat: "Fetch", method: "response.json()", options: ["Convierte el cuerpo de la respuesta en un diccionario o lista de Python", "Convierte la respuesta en un archivo .json en disco", "Envía datos JSON como parte de la URL"], correct: 0, example: "datos = respuesta.json()" },
  { lang: "Python", cat: "Fetch", method: "response.status_code", options: ["Número que indica el resultado de la petición (200 éxito, 404 no encontrado...)", "Texto con el cuerpo completo de la respuesta", "Booleano que indica si hubo un error de red"], correct: 0, example: "if respuesta.status_code == 200: ..." },
  { lang: "Python", cat: "Fetch", method: "requests.post()", options: ["Envía una petición HTTP POST, normalmente con datos en el cuerpo", "Solo sirve para descargar archivos grandes", "Es la única forma de leer datos de una API"], correct: 0, example: "requests.post(url, json={'nombre': 'Ana'})" },
  // CRUD COMPLETO — JavaScript (fetch)
  { lang: "JavaScript", cat: "CRUD completo", method: "Leer (GET)", options: ["fetch(url) sin opciones envía una petición GET y devuelve el recurso solicitado", "fetch(url) siempre borra el recurso indicado", "fetch(url) solo funciona para enviar datos, no para leerlos"], correct: 0, example: "const datos = await (await fetch(url)).json();" },
  { lang: "JavaScript", cat: "CRUD completo", method: "Crear (POST)", options: ["fetch(url, { method: 'POST', body }) crea un recurso nuevo con los datos enviados", "fetch(url, { method: 'POST' }) siempre actualiza un recurso existente", "POST no puede llevar cuerpo (body)"], correct: 0, example: "fetch(url, { method: 'POST', body: JSON.stringify(nuevo) })" },
  { lang: "JavaScript", cat: "CRUD completo", method: "Actualizar completo (PUT)", options: ["fetch(url, { method: 'PUT', body }) reemplaza todos los datos de un recurso existente", "PUT solo puede usarse para crear recursos nuevos", "PUT nunca lleva cuerpo (body)"], correct: 0, example: "fetch(url + '/5', { method: 'PUT', body: JSON.stringify(datos) })" },
  { lang: "JavaScript", cat: "CRUD completo", method: "Actualizar parcial (PATCH)", options: ["fetch(url, { method: 'PATCH', body }) actualiza solo una parte del recurso", "PATCH hace exactamente lo mismo que DELETE", "PATCH nunca se usa en aplicaciones reales"], correct: 0, example: "fetch(url + '/5', { method: 'PATCH', body: JSON.stringify({ completada: true }) })" },
  { lang: "JavaScript", cat: "CRUD completo", method: "Eliminar (DELETE)", options: ["fetch(url, { method: 'DELETE' }) elimina el recurso indicado en la URL", "DELETE solo funciona si se envía también un body con los datos", "DELETE es equivalente a hacer un GET"], correct: 0, example: "fetch(url + '/5', { method: 'DELETE' })" },
  // CRUD COMPLETO — Python (requests)
  { lang: "Python", cat: "CRUD completo", method: "Leer (GET)", options: ["requests.get(url) lee y devuelve el recurso solicitado", "requests.get(url) siempre elimina el recurso", "requests.get(url) requiere enviar siempre un body"], correct: 0, example: "datos = requests.get(url).json()" },
  { lang: "Python", cat: "CRUD completo", method: "Crear (POST)", options: ["requests.post(url, json=datos) crea un recurso nuevo con los datos enviados", "requests.post() solo sirve para leer datos existentes", "POST en requests nunca acepta el argumento json="], correct: 0, example: "requests.post(url, json={'texto': 'Nueva tarea'})" },
  { lang: "Python", cat: "CRUD completo", method: "Actualizar completo (PUT)", options: ["requests.put(url, json=datos) reemplaza todos los datos de un recurso existente", "requests.put() solo puede usarse para borrar recursos", "PUT y GET hacen exactamente lo mismo"], correct: 0, example: "requests.put(url + '/5', json=datos)" },
  { lang: "Python", cat: "CRUD completo", method: "Actualizar parcial (PATCH)", options: ["requests.patch(url, json=datos) actualiza solo una parte del recurso", "requests.patch() reemplaza siempre el recurso completo", "PATCH no existe en la librería requests"], correct: 0, example: "requests.patch(url + '/5', json={'completada': True})" },
  { lang: "Python", cat: "CRUD completo", method: "Eliminar (DELETE)", options: ["requests.delete(url) elimina el recurso indicado en la URL", "requests.delete() necesita siempre un body con datos", "requests.delete() solo funciona con bases de datos SQL"], correct: 0, example: "requests.delete(url + '/5')" },
  // VARIABLES — JavaScript
  { lang: "JavaScript", cat: "Variables", method: "let", options: ["Declara una variable con ámbito de bloque: solo existe dentro de las llaves {} donde se creó", "Declara una variable que nunca puede cambiar de valor", "Declara una variable global automáticamente, sin importar dónde se escriba"], correct: 0, example: "if (true) { let x = 1; }\n// x no existe aquí fuera" },
  { lang: "JavaScript", cat: "Variables", method: "const", options: ["Declara una variable que no se puede reasignar, aunque su contenido interno sí pueda cambiar", "Declara una variable cuyo valor puede cambiar libremente en cualquier momento", "Es exactamente igual que var, solo cambia el nombre"], correct: 0, example: "const lista = [];\nlista.push(1); // válido, no se reasigna 'lista'" },
  { lang: "JavaScript", cat: "Variables", method: "var", options: ["Declara una variable con ámbito de función (no de bloque) y sufre 'hoisting'", "Declara una variable con ámbito de bloque, igual que let", "Ya no puede usarse en JavaScript moderno"], correct: 0, example: "if (true) { var y = 1; }\nconsole.log(y); // 1, var 'se escapa' del bloque" },
  { lang: "JavaScript", cat: "Variables", method: "typeof", options: ["Devuelve un string con el tipo de dato de un valor", "Convierte un valor a otro tipo de dato", "Comprueba si dos valores son del mismo tipo"], correct: 0, example: 'typeof "hola" // → "string"' },
  { lang: "JavaScript", cat: "Variables", method: "Hoisting", options: ["Las declaraciones con var se mueven mentalmente al principio del ámbito, pero su asignación no", "Todas las variables se ejecutan en un orden aleatorio", "Solo afecta a las funciones, nunca a las variables"], correct: 0, example: "console.log(a); var a = 5;\n// undefined, no da error" },
  { lang: "JavaScript", cat: "Variables", method: "Ámbito de bloque", options: ["El código dentro de {} (un if, un for...) puede tener sus propias variables con let/const, invisibles fuera", "Todas las variables son siempre visibles en cualquier parte del archivo", "Solo las funciones pueden crear un nuevo ámbito"], correct: 0, example: "for (let i = 0; i < 3; i++) {}\nconsole.log(i); // Error: i no existe aquí" },
  // VARIABLES — Python
  { lang: "Python", cat: "Variables", method: "Asignación (=)", options: ["Python no distingue let/const: toda asignación crea o reemplaza una variable en su ámbito actual", "Python obliga a declarar el tipo antes de asignar un valor", "En Python una variable nunca puede cambiar de tipo"], correct: 0, example: "x = 5\nx = 'hola'  # válido, Python es de tipado dinámico" },
  { lang: "Python", cat: "Variables", method: "global", options: ["Permite modificar dentro de una función una variable definida fuera de ella", "Convierte una variable local en una constante", "Elimina una variable del programa"], correct: 0, example: "contador = 0\ndef sumar():\n    global contador\n    contador += 1" },
  // BUCLES — JavaScript
  { lang: "JavaScript", cat: "Bucles", method: "for", options: ["Repite un bloque de código un número conocido de veces, controlado por un contador", "Repite un bloque de código de forma infinita siempre", "Solo puede usarse para recorrer arrays, nunca como contador simple"], correct: 0, example: "for (let i = 0; i < 5; i++) { console.log(i); }" },
  { lang: "JavaScript", cat: "Bucles", method: "while", options: ["Repite un bloque mientras una condición sea verdadera, sin necesitar un contador", "Se ejecuta siempre exactamente una vez", "Es idéntico a un bucle for, solo cambia la sintaxis"], correct: 0, example: "let i = 0;\nwhile (i < 5) { i++; }" },
  { lang: "JavaScript", cat: "Bucles", method: "do...while", options: ["Igual que while, pero ejecuta el bloque al menos una vez antes de comprobar la condición", "Comprueba la condición antes de ejecutar el bloque, igual que while", "Solo puede ejecutarse una vez, nunca repite"], correct: 0, example: "let i = 0;\ndo { i++; } while (i < 5);" },
  { lang: "JavaScript", cat: "Bucles", method: "for...of", options: ["Recorre los valores de un array (o cualquier iterable), uno a uno", "Recorre las claves de un objeto, nunca los valores de un array", "Solo funciona con strings, no con arrays"], correct: 0, example: "for (const fruta of ['manzana', 'pera']) { console.log(fruta); }" },
  { lang: "JavaScript", cat: "Bucles", method: "for...in", options: ["Recorre las claves (propiedades) de un objeto, no los valores de un array", "Recorre los valores de un array en orden inverso", "Es la forma moderna de recorrer arrays, reemplazando a for...of"], correct: 0, example: "for (const clave in {a: 1, b: 2}) { console.log(clave); } // 'a', 'b'" },
  { lang: "JavaScript", cat: "Bucles", method: "break", options: ["Detiene por completo la ejecución del bucle, saliendo inmediatamente de él", "Salta a la siguiente vuelta del bucle sin salir de él", "Pausa el bucle temporalmente hasta que se le indique continuar"], correct: 0, example: "for (let i = 0; i < 10; i++) { if (i === 3) break; }" },
  { lang: "JavaScript", cat: "Bucles", method: "continue", options: ["Salta directamente a la siguiente vuelta del bucle, sin ejecutar el resto del código de esa iteración", "Detiene el bucle por completo, igual que break", "Reinicia el bucle desde el principio"], correct: 0, example: "for (let i = 0; i < 5; i++) { if (i % 2 === 0) continue; console.log(i); }" },
  // BUCLES — Python
  { lang: "Python", cat: "Bucles", method: "for ... in range()", options: ["Repite un bloque un número determinado de veces generando una secuencia de números", "Solo puede recorrer listas, nunca un rango de números", "Detiene el programa tras la primera vuelta"], correct: 0, example: "for i in range(5):\n    print(i)" },
  { lang: "Python", cat: "Bucles", method: "while", options: ["Repite un bloque mientras la condición indicada sea verdadera", "Se ejecuta siempre un número fijo de 5 veces", "Es exclusivo de listas, no puede usarse con números"], correct: 0, example: "i = 0\nwhile i < 5:\n    i += 1" },
  { lang: "Python", cat: "Bucles", method: "for elemento in lista", options: ["Recorre directamente los elementos de una lista, uno a uno, sin necesitar un índice", "Recorre solo las posiciones pares de la lista", "Requiere convertir antes la lista en un diccionario"], correct: 0, example: "for fruta in ['manzana', 'pera']:\n    print(fruta)" },
  { lang: "Python", cat: "Bucles", method: "break / continue", options: ["break detiene el bucle por completo; continue salta a la siguiente vuelta", "break y continue hacen exactamente lo mismo en Python", "Solo pueden usarse dentro de funciones, nunca en un bucle suelto"], correct: 0, example: "for i in range(10):\n    if i == 3:\n        break" },
  // FUNCIONES — JavaScript
  { lang: "JavaScript", cat: "Funciones", method: "function saludar() {}", options: ["Declara una función con nombre, disponible en todo su ámbito incluso antes de la línea donde se escribe", "Solo puede usarse una vez en todo el programa", "Es idéntica a una arrow function en todos los aspectos"], correct: 0, example: "function saludar(nombre) { return 'Hola ' + nombre; }" },
  { lang: "JavaScript", cat: "Funciones", method: "Function expression", options: ["Guarda una función (con o sin nombre) dentro de una variable; a diferencia de la declarada, no sufre hoisting", "Es obligatoria para poder usar parámetros", "Solo puede usarse dentro de una clase"], correct: 0, example: "const saludar = function (nombre) { return 'Hola ' + nombre; };" },
  { lang: "JavaScript", cat: "Funciones", method: "Arrow function", options: ["Sintaxis corta para funciones que no tiene su propio 'this': hereda el del contexto donde se define", "Es la única forma de declarar funciones en JavaScript moderno", "Siempre necesita la palabra function delante"], correct: 0, example: "const sumar = (a, b) => a + b;" },
  { lang: "JavaScript", cat: "Funciones", method: "Parámetro por defecto", options: ["Asigna un valor a un parámetro cuando no se pasa nada al llamar la función", "Obliga a que el parámetro se pase siempre", "Solo puede usarse con números, no con strings"], correct: 0, example: "function saludar(nombre = 'invitado') { return 'Hola ' + nombre; }" },
  { lang: "JavaScript", cat: "Funciones", method: "Rest params (...args)", options: ["Agrupa un número indefinido de argumentos en un array dentro de la función", "Solo puede capturar como máximo 3 argumentos", "Convierte automáticamente los argumentos en un objeto"], correct: 0, example: "function sumarTodos(...numeros) { return numeros.reduce((a, b) => a + b, 0); }" },
  { lang: "JavaScript", cat: "Funciones", method: "return", options: ["Finaliza la función y entrega un valor a quien la llamó; sin return, devuelve undefined", "Solo puede usarse una vez por función y siempre al final", "Detiene todo el programa, no solo la función"], correct: 0, example: "function doble(x) { return x * 2; }" },
  { lang: "JavaScript", cat: "Funciones", method: "this en arrow vs función normal", options: ["En una función normal, 'this' depende de cómo se la llama; en una arrow function, 'this' es siempre el del contexto exterior", "Ambas gestionan 'this' exactamente de la misma forma", "Las arrow functions no pueden usar 'this' bajo ninguna circunstancia"], correct: 0, example: "const obj = { valor: 1, normal() { return this.valor; } };" },
  // FUNCIONES — Python
  { lang: "Python", cat: "Funciones", method: "def", options: ["Declara una función en Python", "Declara una variable constante", "Solo puede usarse dentro de una clase"], correct: 0, example: "def saludar(nombre):\n    return 'Hola ' + nombre" },
  { lang: "Python", cat: "Funciones", method: "Parámetro por defecto", options: ["Asigna un valor a un parámetro que se usa si no se pasa nada al llamar la función", "Obliga a pasar siempre ese parámetro", "Solo puede definirse en el primer parámetro de la función"], correct: 0, example: "def saludar(nombre='invitado'):\n    return 'Hola ' + nombre" },
  { lang: "Python", cat: "Funciones", method: "*args", options: ["Agrupa argumentos posicionales indefinidos en una tupla dentro de la función", "Solo admite un único argumento adicional", "Convierte los argumentos en un diccionario automáticamente"], correct: 0, example: "def sumar_todos(*numeros):\n    return sum(numeros)" },
  { lang: "Python", cat: "Funciones", method: "**kwargs", options: ["Agrupa argumentos con nombre indefinidos en un diccionario dentro de la función", "Es obligatorio en cualquier función con parámetros", "Hace exactamente lo mismo que *args"], correct: 0, example: "def config(**opciones):\n    print(opciones)" },
  // ARRAYS Y OBJETOS (ampliación) — JavaScript
  { lang: "JavaScript", cat: "Arrays y objetos", method: "Object.keys()", options: ["Devuelve un array con los nombres de las propiedades (claves) de un objeto", "Devuelve un array con los valores de las propiedades de un objeto", "Comprueba si un objeto tiene una propiedad concreta"], correct: 0, example: "Object.keys({a: 1, b: 2}) // → ['a', 'b']" },
  { lang: "JavaScript", cat: "Arrays y objetos", method: "Object.values()", options: ["Devuelve un array con los valores de las propiedades de un objeto", "Devuelve un array con los nombres de las propiedades de un objeto", "Convierte el objeto en un array de arrays [clave, valor]"], correct: 0, example: "Object.values({a: 1, b: 2}) // → [1, 2]" },
  { lang: "JavaScript", cat: "Arrays y objetos", method: "Object.entries()", options: ["Devuelve un array de pares [clave, valor] a partir de un objeto", "Devuelve solo las claves de un objeto", "Elimina las propiedades vacías de un objeto"], correct: 0, example: "Object.entries({a: 1}) // → [['a', 1]]" },
  { lang: "JavaScript", cat: "Arrays y objetos", method: "Desestructuración de arrays", options: ["Extrae valores de un array y los asigna a variables en una sola línea", "Convierte un array en un objeto automáticamente", "Solo funciona con arrays de un único elemento"], correct: 0, example: "const [primero, segundo] = [10, 20];" },
  { lang: "JavaScript", cat: "Arrays y objetos", method: "Desestructuración de objetos", options: ["Extrae propiedades de un objeto y las asigna a variables con el mismo nombre", "Elimina propiedades del objeto original", "Solo puede usarse dentro de un bucle"], correct: 0, example: "const { nombre, edad } = persona;" },
  { lang: "JavaScript", cat: "Arrays y objetos", method: "Spread (...)", options: ["Expande los elementos de un array u objeto dentro de otro array, objeto o llamada de función", "Solo sirve para copiar strings", "Combina dos funciones en una sola"], correct: 0, example: "const copia = [...original, 4, 5];" },
  // ARRAYS Y OBJETOS (ampliación) — Python
  { lang: "Python", cat: "Arrays y objetos", method: ".keys()", options: ["Devuelve las claves de un diccionario", "Devuelve los valores de un diccionario", "Convierte el diccionario en una lista de tuplas"], correct: 0, example: "{'a': 1}.keys()  # → dict_keys(['a'])" },
  { lang: "Python", cat: "Arrays y objetos", method: ".values()", options: ["Devuelve los valores de un diccionario", "Devuelve las claves de un diccionario", "Elimina todos los valores del diccionario"], correct: 0, example: "{'a': 1}.values()  # → dict_values([1])" },
  { lang: "Python", cat: "Arrays y objetos", method: ".items()", options: ["Devuelve pares (clave, valor) de un diccionario", "Devuelve solo las claves de un diccionario", "Cuenta cuántas claves tiene el diccionario"], correct: 0, example: "{'a': 1}.items()  # → dict_items([('a', 1)])" },
  // CLASES Y CONSTRUCTORES — JavaScript
  { lang: "JavaScript", cat: "Clases y constructores", method: "class", options: ["Declara una plantilla para crear objetos con propiedades y métodos comunes", "Declara una función normal con otro nombre", "Solo puede contener propiedades, nunca métodos"], correct: 0, example: "class Persona { }" },
  { lang: "JavaScript", cat: "Clases y constructores", method: "constructor()", options: ["Método especial que se ejecuta automáticamente al crear una instancia con 'new', para inicializar sus propiedades", "Se ejecuta cada vez que se llama a cualquier método de la clase", "Es opcional y nunca recibe parámetros"], correct: 0, example: "class Persona {\n  constructor(nombre) {\n    this.nombre = nombre;\n  }\n}" },
  { lang: "JavaScript", cat: "Clases y constructores", method: "this (en una clase)", options: ["Hace referencia a la instancia concreta que se está creando o usando", "Hace referencia siempre a la clase en general, no a una instancia", "Solo puede usarse dentro del constructor"], correct: 0, example: "this.nombre = nombre;" },
  { lang: "JavaScript", cat: "Clases y constructores", method: "new", options: ["Crea una nueva instancia de una clase, ejecutando automáticamente su constructor", "Declara una nueva clase vacía", "Solo se usa con funciones, nunca con clases"], correct: 0, example: "const ana = new Persona('Ana');" },
  { lang: "JavaScript", cat: "Clases y constructores", method: "Método de instancia", options: ["Función definida dentro de la clase que puede usar 'this' para acceder a los datos de esa instancia concreta", "Solo puede llamarse una vez por instancia", "Se ejecuta automáticamente sin necesidad de llamarla"], correct: 0, example: "class Persona {\n  saludar() { return 'Hola, soy ' + this.nombre; }\n}" },
  { lang: "JavaScript", cat: "Clases y constructores", method: "extends", options: ["Permite que una clase herede propiedades y métodos de otra clase", "Crea una copia exacta de una clase con otro nombre", "Solo puede usarse una vez en todo el programa"], correct: 0, example: "class Estudiante extends Persona { }" },
  { lang: "JavaScript", cat: "Clases y constructores", method: "super()", options: ["Llama al constructor de la clase padre; es obligatorio antes de usar 'this' en el constructor de una clase hija", "Crea una nueva instancia de la clase padre de forma independiente", "Elimina la herencia de la clase padre"], correct: 0, example: "class Estudiante extends Persona {\n  constructor(nombre, curso) {\n    super(nombre);\n    this.curso = curso;\n  }\n}" },
  { lang: "JavaScript", cat: "Clases y constructores", method: "static", options: ["Define un método o propiedad que pertenece a la clase en sí, no a sus instancias, y se llama sin crear un objeto", "Hace que un método sea privado y no se pueda llamar nunca", "Convierte el método en asíncrono automáticamente"], correct: 0, example: "class Utilidades {\n  static sumar(a, b) { return a + b; }\n}\nUtilidades.sumar(2, 3);" },
  // CLASES Y CONSTRUCTORES — Python
  { lang: "Python", cat: "Clases y constructores", method: "class", options: ["Declara una clase en Python", "Declara una función normal con otro nombre", "Solo puede usarse para crear excepciones"], correct: 0, example: "class Persona:\n    pass" },
  { lang: "Python", cat: "Clases y constructores", method: "__init__", options: ["Método especial equivalente al constructor: se ejecuta al crear una instancia para inicializar sus atributos", "Se ejecuta cada vez que se destruye una instancia", "Es obligatorio llamarlo manualmente después de crear el objeto"], correct: 0, example: "class Persona:\n    def __init__(self, nombre):\n        self.nombre = nombre" },
  { lang: "Python", cat: "Clases y constructores", method: "self", options: ["Hace referencia a la instancia concreta dentro de los métodos de la clase (equivalente a 'this' en JavaScript)", "Es una palabra reservada opcional que se puede omitir siempre", "Hace referencia a la clase en general, no a la instancia"], correct: 0, example: "def saludar(self):\n    return 'Hola, soy ' + self.nombre" },
  { lang: "Python", cat: "Clases y constructores", method: "Herencia: class Hijo(Padre)", options: ["Permite que una clase herede atributos y métodos de otra clase", "Crea dos clases completamente independientes", "Solo funciona si ambas clases están en el mismo archivo"], correct: 0, example: "class Estudiante(Persona):\n    pass" },
  { lang: "Python", cat: "Clases y constructores", method: "super()", options: ["Llama a un método de la clase padre desde la clase hija", "Crea una instancia nueva de la clase hija", "Elimina los atributos heredados de la clase padre"], correct: 0, example: "class Estudiante(Persona):\n    def __init__(self, nombre, curso):\n        super().__init__(nombre)\n        self.curso = curso" },
  // SELECTORES DOM (ampliación) — JavaScript
  { lang: "JavaScript", cat: "DOM", method: "document.querySelectorAll()", options: ["Devuelve una lista (NodeList) con TODOS los elementos que coinciden con un selector CSS", "Devuelve solo el primer elemento que coincide, igual que querySelector", "Elimina todos los elementos que coinciden con el selector"], correct: 0, example: "document.querySelectorAll('.item') // todos los elementos con clase item" },
  { lang: "JavaScript", cat: "DOM", method: ".closest()", options: ["Busca hacia arriba en el árbol del DOM el ancestro más cercano que coincide con un selector", "Busca hacia abajo el primer descendiente que coincide con un selector", "Comprueba si dos elementos están uno al lado del otro"], correct: 0, example: "boton.closest('.tarjeta') // la tarjeta que contiene al botón" },
  { lang: "JavaScript", cat: "DOM", method: ".matches()", options: ["Comprueba si un elemento concreto coincide con un selector CSS, devolviendo true o false", "Selecciona todos los elementos que coinciden con un selector", "Compara el contenido de dos elementos"], correct: 0, example: "elemento.matches('.activo') // → true o false" },
  // EVENTOS — JavaScript
  { lang: "JavaScript", cat: "Eventos", method: "El objeto event", options: ["El callback de un evento recibe automáticamente un objeto con información sobre lo ocurrido", "Hay que crear manualmente el objeto event antes de poder usarlo", "Solo existe en los eventos de teclado, no en los de clic"], correct: 0, example: "boton.addEventListener('click', (event) => console.log(event));" },
  { lang: "JavaScript", cat: "Eventos", method: "event.target", options: ["Referencia al elemento exacto sobre el que ocurrió el evento", "Referencia al elemento que registró el addEventListener, nunca al que se pulsó", "Es un string con el nombre del evento disparado"], correct: 0, example: "lista.addEventListener('click', (e) => console.log(e.target));" },
  { lang: "JavaScript", cat: "Eventos", method: "event.preventDefault()", options: ["Cancela el comportamiento por defecto del navegador para ese evento (por ejemplo, enviar un formulario)", "Detiene la propagación del evento hacia los elementos padre", "Elimina el elemento que disparó el evento"], correct: 0, example: "formulario.addEventListener('submit', (e) => e.preventDefault());" },
  { lang: "JavaScript", cat: "Eventos", method: "event.stopPropagation()", options: ["Evita que el evento siga propagándose (burbujeando) hacia los elementos padre", "Cancela el comportamiento por defecto del navegador", "Detiene todos los demás listeners del mismo elemento"], correct: 0, example: "boton.addEventListener('click', (e) => e.stopPropagation());" },
  { lang: "JavaScript", cat: "Eventos", method: "Burbujeo (bubbling)", options: ["Un evento disparado en un elemento hijo también se puede escuchar en sus elementos padre, porque 'sube' por el árbol del DOM", "Los eventos solo se pueden escuchar en el elemento exacto donde ocurrieron", "Solo ocurre con eventos de teclado, no con clics"], correct: 0, example: "document.body.addEventListener('click', () => console.log('clic en cualquier parte'));" },
  { lang: "JavaScript", cat: "Eventos", method: "Delegación de eventos", options: ["Escuchar el evento en un elemento padre en vez de en cada hijo, usando event.target para saber cuál se pulsó", "Delegar la gestión del evento a otro archivo JavaScript", "Es obligatorio para que addEventListener funcione"], correct: 0, example: "lista.addEventListener('click', (e) => { if (e.target.tagName === 'LI') { /* ... */ } });" },
  // OBJETOS DEL NAVEGADOR — JavaScript (menos usado)
  { lang: "JavaScript", cat: "Objetos del navegador", method: "window", options: ["Objeto global del navegador que representa la ventana; document, alert, setTimeout... son propiedades suyas", "Solo existe si la página tiene más de una ventana abierta", "Es un sinónimo exacto de document"], correct: 0, example: "window.innerWidth // ancho visible de la ventana" },
  { lang: "JavaScript", cat: "Objetos del navegador", method: "document", options: ["Representa la página cargada; es el punto de entrada para acceder y modificar el DOM", "Representa el archivo .html tal como está guardado en disco", "Solo puede leerse, nunca modificarse"], correct: 0, example: "document.title = 'Nuevo título';" },
  { lang: "JavaScript", cat: "Objetos del navegador", method: "location.href", options: ["Contiene (y permite cambiar) la URL actual de la página", "Contiene solo el nombre de dominio, sin el resto de la URL", "Es una función que hay que llamar con paréntesis"], correct: 0, example: "location.href = 'https://ejemplo.com';" },
  { lang: "JavaScript", cat: "Objetos del navegador", method: "setTimeout()", options: ["Ejecuta una función una sola vez, después de un tiempo determinado", "Ejecuta una función repetidamente cada cierto tiempo", "Detiene la ejecución del programa el tiempo indicado"], correct: 0, example: "setTimeout(() => console.log('hola'), 1000);" },
  { lang: "JavaScript", cat: "Objetos del navegador", method: "alert() / confirm()", options: ["Muestran un cuadro de diálogo del navegador; confirm() además devuelve true o false según la elección del usuario", "Solo sirven para mostrar errores de JavaScript", "Se ejecutan sin interrumpir el resto del código"], correct: 0, example: "if (confirm('¿Seguro?')) { /* ... */ }" },
  // MÓDULOS ES6 — JavaScript (menos usado)
  { lang: "JavaScript", cat: "Módulos ES6", method: "export", options: ["Hace que una variable, función o clase de un archivo esté disponible para importarla en otro", "Guarda el archivo actual en el servidor", "Ejecuta automáticamente el código exportado"], correct: 0, example: "export function sumar(a, b) { return a + b; }" },
  { lang: "JavaScript", cat: "Módulos ES6", method: "export default", options: ["Exporta un único valor principal por archivo, que se puede importar con cualquier nombre", "Exporta automáticamente todas las funciones del archivo", "Solo puede usarse una vez en todo el proyecto"], correct: 0, example: "export default function App() { }" },
  { lang: "JavaScript", cat: "Módulos ES6", method: "import { }", options: ["Trae una exportación concreta (con nombre) de otro archivo para poder usarla", "Copia todo el contenido de otro archivo en el actual", "Solo funciona con archivos .json"], correct: 0, example: "import { sumar } from './operaciones.js';" },
  { lang: "JavaScript", cat: "Módulos ES6", method: "import ... as", options: ["Permite importar algo con un nombre distinto al que tiene en el archivo original", "Duplica la exportación con dos nombres en el archivo original", "Es obligatorio usarlo siempre que se importa algo"], correct: 0, example: "import { sumar as add } from './operaciones.js';" },
  { lang: "JavaScript", cat: "Módulos ES6", method: "import * as", options: ["Importa todas las exportaciones de un archivo agrupadas en un solo objeto", "Importa solo la primera exportación del archivo", "Falla si el archivo tiene más de una exportación"], correct: 0, example: "import * as operaciones from './operaciones.js';" },
  // TYPESCRIPT BÁSICO — (menos usado)
  { lang: "JavaScript", cat: "TypeScript básico", method: "Anotación de tipo", options: ["Indica explícitamente qué tipo de dato puede tener una variable o parámetro", "Convierte automáticamente el valor al tipo indicado si no coincide", "Solo puede usarse en funciones, nunca en variables sueltas"], correct: 0, example: "let edad: number = 25;" },
  { lang: "JavaScript", cat: "TypeScript básico", method: "interface", options: ["Define la forma (propiedades y tipos) que debe tener un objeto", "Crea una clase con implementación incluida", "Solo sirve para documentar, no se comprueba nunca"], correct: 0, example: "interface Persona { nombre: string; edad: number; }" },
  { lang: "JavaScript", cat: "TypeScript básico", method: "Propiedad opcional (?)", options: ["Marca una propiedad o parámetro como opcional: puede no estar presente", "Hace que la propiedad sea obligatoria en todos los casos", "Convierte la propiedad en de solo lectura"], correct: 0, example: "interface Persona { nombre: string; apodo?: string; }" },
  { lang: "JavaScript", cat: "TypeScript básico", method: "any", options: ["Tipo comodín que desactiva la comprobación de tipos para ese valor; se recomienda evitarlo", "Obliga a que el valor sea siempre un número", "Solo puede usarse en TypeScript, nunca compila a JavaScript"], correct: 0, example: "let dato: any = 'puede ser cualquier cosa';" },
  { lang: "JavaScript", cat: "TypeScript básico", method: "type", options: ["Crea un alias con nombre propio para un tipo, útil para tipos complejos o reutilizados", "Declara una nueva clase con métodos", "Es idéntico a interface en todos los casos, sin ninguna diferencia"], correct: 0, example: "type ID = string | number;" },
];

// Orden por frecuencia de uso real: lo más usado primero.
// Las últimas cuatro categorías (Objetos del navegador, Módulos ES6 y TypeScript básico)
// son las menos usadas en el día a día y se dejan aparte, al final de la lista.
const CATEGORIES = [
  "Todas",
  "Variables",
  "Arrays y objetos",
  "Bucles",
  "Funciones",
  "Clases y constructores",
  "DOM",
  "Eventos",
  "Texto",
  "Conversión",
  "Matemáticas",
  "Promesas",
  "Fetch",
  "CRUD completo",
  "Objetos del navegador",
  "Módulos ES6",
  "TypeScript básico",
];
const LANGS = ["Los dos", "JavaScript", "Python"];

// ---------- Estado ----------
let langFilter = "JavaScript";
let catFilter = "Variables";
let queue = [];
let pos = 0;
let total = 0;
let correctCount = 0;
let attempts = 0;
let streak = 0;
let answered = false;

const KEYS = ["a", "b", "c"];

function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function filteredPool() {
  return DATA.filter((item) => {
    const langOk = langFilter === "Los dos" || item.lang === langFilter;
    const catOk = catFilter === "Todas" || item.cat === catFilter;
    return langOk && catOk;
  });
}

function startRound() {
  const pool = shuffle(filteredPool());
  queue = pool.map((item, i) => ({ ...item, uid: i + "-" + Date.now() }));
  pos = 0;
  total = queue.length;
  correctCount = 0;
  attempts = 0;
  streak = 0;
  answered = false;
  renderCard();
  updateStats();
}

function updateStats() {
  document.getElementById("statAciertos").textContent =
    correctCount + "/" + attempts;
  document.getElementById("statRacha").textContent = streak;
  document.getElementById("statPos").textContent =
    Math.min(pos + 1, total) + " DE " + total;
  const pct = total ? Math.round((pos / total) * 100) : 0;
  document.getElementById("progressFill").style.width = pct + "%";
}

function renderCard() {
  const cardArea = document.getElementById("cardArea");
  cardArea.innerHTML = "";

  if (total === 0) {
    cardArea.innerHTML =
      '<div class="round-done"><h2>No hay métodos con estos filtros</h2><p>Prueba a cambiar el idioma o la categoría.</p></div>';
    return;
  }

  if (pos >= total) {
    cardArea.innerHTML =
      '<div class="round-done"><h2>Ronda completada</h2><p>' +
      correctCount +
      " aciertos de " +
      attempts +
      ' intentos.</p><button class="pill active" id="restartBtn" type="button">Repetir ronda</button></div>';
    document
      .getElementById("restartBtn")
      .addEventListener("click", startRound);
    return;
  }

  const item = queue[pos];
  answered = false;

  const optionsOrder = shuffle(
    item.options.map((text, i) => ({ text, isCorrect: i === item.correct })),
  );

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="badges">
      <span class="badge lang">${item.lang}</span>
      <span class="badge">${item.cat.toUpperCase()}</span>
    </div>
    <p class="method-name">${item.method}</p>
    <p class="ask">¿Qué hace?</p>
    <div class="options"></div>
    <div class="example-box" id="exampleBox"></div>
  `;

  const optionsEl = card.querySelector(".options");
  optionsOrder.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.innerHTML = `<span class="key">${KEYS[i]}</span><span>${opt.text}</span>`;
    btn.addEventListener("click", () => selectOption(btn, opt, item, optionsEl));
    optionsEl.appendChild(btn);
  });

  cardArea.appendChild(card);
  updateStats();
}

function selectOption(btn, opt, item, optionsEl) {
  if (answered) return;
  answered = true;
  attempts++;

  if (opt.isCorrect) {
    correctCount++;
    streak++;
    btn.classList.add("correct");
  } else {
    streak = 0;
    btn.classList.add("incorrect");
    [...optionsEl.children].forEach((child, i) => {
      if (child.textContent.trim() === item.options[item.correct]) {
        child.classList.add("correct");
      }
    });
    // Falla: vuelve a salir al final de la ronda
    queue.push({ ...item, uid: item.uid + "-retry-" + Date.now() });
    total = queue.length;
  }

  [...optionsEl.children].forEach((child) => (child.disabled = true));

  const exampleBox = document.getElementById("exampleBox");
  exampleBox.textContent = item.example;
  exampleBox.classList.add("show");

  updateStats();
}

function nextCard() {
  if (!answered) return;
  pos++;
  renderCard();
}

// ---------- Filtros ----------
function renderFilters() {
  const langEl = document.getElementById("langFilters");
  langEl.innerHTML = "";
  LANGS.forEach((lang) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pill" + (lang === langFilter ? " active" : "");
    btn.textContent = lang;
    btn.addEventListener("click", () => {
      langFilter = lang;
      renderFilters();
      startRound();
    });
    langEl.appendChild(btn);
  });

  const catEl = document.getElementById("catFilters");
  catEl.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pill" + (cat === catFilter ? " active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      catFilter = cat;
      renderFilters();
      startRound();
    });
    catEl.appendChild(btn);
  });
}

// ---------- Teclado ----------
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (!answered && KEYS.includes(key)) {
    const idx = KEYS.indexOf(key);
    const options = document.querySelectorAll(".option");
    if (options[idx]) options[idx].click();
  } else if (answered && key === "enter") {
    nextCard();
  }
});

// ---------- Avanzar con clic en la tarjeta tras responder ----------
document.getElementById("cardArea").addEventListener("click", (e) => {
  if (answered && e.target.closest(".example-box")) {
    nextCard();
  }
});

renderFilters();
startRound();
