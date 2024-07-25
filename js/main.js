let carrito = [];

class Prenda {
    constructor(nombre, talle, color, precio) {
        this.nombre = nombre;
        this.talle = talle;
        this.color = color;
        this.precio = precio;
    }
}

const PRENDA_CAMISETA = new Prenda("Remera", "M", "Blanco", 15000);
const PRENDA_PANTALONES = new Prenda("Jean", "L", "Azul", 30000);
const PRENDA_ZAPATOS = new Prenda("Zapas", "38", "Negro", 55000);
const PRENDA_CHAQUETA = new Prenda("Campera", "XL", "Gris", 40000);
const PRENDA_SOMBRERO = new Prenda("Gorra", "S", "Rojo", 10000);

function mostrarOpciones() {
    while (true) {
        let opcion = prompt(`Selecciona una opción:
1. Agregar prenda al carrito
2. Eliminar prenda del carrito
3. Mostrar carrito
4. Filtrar prendas por precio
5. Buscar prenda por nombre
6. Salir`);

        switch (opcion) {
            case "1":
                agregarPrenda();
                break;
            case "2":
                eliminarPrenda();
                break;
            case "3":
                mostrarCarrito();
                break;
            case "4":
                filtrarPrendasPorPrecio();
                break;
            case "5":
                buscarPrendaPorNombre();
                break;
            case "6":
                console.log("Gracias por elegir nuestra tienda!");
                return; // Salir del bucle y terminar la función
            default:
                console.log("Opción inválida. Inténtalo de nuevo.");
        }
    }
}

function agregarPrenda() {
    let seleccion = prompt(`Selecciona una prenda para agregar al carrito:
1. Camiseta - Talle: ${PRENDA_CAMISETA.talle}, Color: ${PRENDA_CAMISETA.color}, Precio: $${PRENDA_CAMISETA.precio}
2. Pantalones - Talle: ${PRENDA_PANTALONES.talle}, Color: ${PRENDA_PANTALONES.color}, Precio: $${PRENDA_PANTALONES.precio}
3. Zapatos - Talle: ${PRENDA_ZAPATOS.talle}, Color: ${PRENDA_ZAPATOS.color}, Precio: $${PRENDA_ZAPATOS.precio}
4. Chaqueta - Talle: ${PRENDA_CHAQUETA.talle}, Color: ${PRENDA_CHAQUETA.color}, Precio: $${PRENDA_CHAQUETA.precio}
5. Sombrero - Talle: ${PRENDA_SOMBRERO.talle}, Color: ${PRENDA_SOMBRERO.color}, Precio: $${PRENDA_SOMBRERO.precio}`);

    let indice = parseInt(seleccion) - 1;
    const prendas = [PRENDA_CAMISETA, PRENDA_PANTALONES, PRENDA_ZAPATOS, PRENDA_CHAQUETA, PRENDA_SOMBRERO];
    
    if (indice >= 0 && indice < prendas.length) {
        agregarAlCarrito(prendas[indice]);
    } else {
        console.log("Opción inválida. Inténtalo de nuevo.");
    }
}

function eliminarPrenda() {
    if (carrito.length === 0) {
        console.log("El carrito está vacío.");
        return;
    }

    console.log("Selecciona una prenda para eliminar del carrito:");
    mostrarPrendasEnCarrito();

    let seleccion = prompt("Ingresa el número de la prenda que deseas eliminar:");

    let indice = parseInt(seleccion) - 1;
    if (indice >= 0 && indice < carrito.length) {
        let prendaEliminada = carrito.splice(indice, 1);
        console.log(`"${prendaEliminada[0].nombre}" se eliminó del carrito.`);
    } else {
        console.log("Opción inválida. Inténtalo de nuevo.");
    }
}

function mostrarPrendasEnCarrito() {
    carrito.forEach((prenda, index) => {
        console.log(`${index + 1}. ${prenda.nombre} - Talle: ${prenda.talle}, Color: ${prenda.color}, Precio: $${prenda.precio}`);
    });
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        console.log("El carrito está vacío.");
    } else {
        console.log("Carrito de compras:");
        // Utilizamos map para transformar la información del carrito en una lista formateada
        let listadoPrendas = carrito.map((prenda, index) => 
            `${index + 1}. ${prenda.nombre} - Talle: ${prenda.talle}, Color: ${prenda.color}, Precio: $${prenda.precio}`
        ).join("\n");
        
        console.log(listadoPrendas);
        console.log(`Total: $${calcularTotal()}`);
    }
}

function calcularTotal() {
    // Utilizamos reduce para calcular el total del carrito
    return carrito.reduce((total, prenda) => total + prenda.precio, 0);
}

function agregarAlCarrito(prenda) {
    carrito.push(prenda);
    console.log(`"${prenda.nombre}" se agregó al carrito.`);
}

function filtrarPrendasPorPrecio() {
    let montoMaximo = parseFloat(prompt("Ingresa el monto máximo que quieres gastar:"));

    if (isNaN(montoMaximo) || montoMaximo < 0) {
        console.log("Monto inválido. Inténtalo de nuevo.");
        return;
    }

    // Filtramos las prendas en el carrito que tienen un precio menor o igual al monto ingresado
    let prendasFiltradas = carrito.filter(prenda => prenda.precio <= montoMaximo);

    if (prendasFiltradas.length === 0) {
        console.log("No hay prendas disponibles para ese monto.");
    } else {
        console.log("Prendas disponibles para el monto ingresado:");
        // Utilizamos map para transformar la información de las prendas filtradas en una lista formateada
        let listadoPrendas = prendasFiltradas.map((prenda, index) => 
            `${index + 1}. ${prenda.nombre} - Talle: ${prenda.talle}, Color: ${prenda.color}, Precio: $${prenda.precio}`
        ).join("\n");
        
        console.log(listadoPrendas);
    }
}

function buscarPrendaPorNombre() {
    let nombreBusqueda = prompt("Ingresa el nombre de la prenda que deseas buscar:");

    // Utilizamos find para buscar la prenda en el carrito
    let prendaEncontrada = carrito.find(prenda => prenda.nombre.toLowerCase() === nombreBusqueda.toLowerCase());

    if (prendaEncontrada) {
        console.log(`Prenda encontrada: ${prendaEncontrada.nombre} - Talle: ${prendaEncontrada.talle}, Color: ${prendaEncontrada.color}, Precio: $${prendaEncontrada.precio}`);
    } else {
        console.log("No se encontró ninguna prenda con ese nombre.");
    }
}

mostrarOpciones();

