let carrito = [];

const PRENDA_CAMISETA = { nombre: "Camiseta", talle: "M", color: "Blanca", precio: 15000 };
const PRENDA_PANTALONES = { nombre: "Pantalones", talle: "L", color: "Azul", precio: 30000 };
const PRENDA_ZAPATOS = { nombre: "Zapatos", talle: "40", color: "Negro", precio: 50000 };
const PRENDA_CHAQUETA = { nombre: "Chaqueta", talle: "S", color: "Gris", precio: 45000 };
const PRENDA_SOMBRERO = { nombre: "Sombrero", talle: "Único", color: "Rojo", precio: 20000 };

function mostrarOpciones() {
    while (true) {
        let opcion = prompt(`Selecciona una opción:
1. Agregar prenda al carrito
2. Eliminar prenda del carrito
3. Mostrar carrito
4. Salir`);

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
    switch (indice) {
        case 0:
            agregarAlCarrito(PRENDA_CAMISETA);
            break;
        case 1:
            agregarAlCarrito(PRENDA_PANTALONES);
            break;
        case 2:
            agregarAlCarrito(PRENDA_ZAPATOS);
            break;
        case 3:
            agregarAlCarrito(PRENDA_CHAQUETA);
            break;
        case 4:
            agregarAlCarrito(PRENDA_SOMBRERO);
            break;
        default:
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
        mostrarPrendasEnCarrito();
    }
}

function agregarAlCarrito(prenda) {
    carrito.push(prenda);
    console.log(`"${prenda.nombre}" se agregó al carrito.`);
}

mostrarOpciones();

