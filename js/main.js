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

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('btnAgregarCamiseta').addEventListener('click', () => agregarAlCarrito(PRENDA_CAMISETA));
    document.getElementById('btnAgregarPantalones').addEventListener('click', () => agregarAlCarrito(PRENDA_PANTALONES));
    document.getElementById('btnAgregarZapatos').addEventListener('click', () => agregarAlCarrito(PRENDA_ZAPATOS));
    document.getElementById('btnAgregarChaqueta').addEventListener('click', () => agregarAlCarrito(PRENDA_CHAQUETA));
    document.getElementById('btnAgregarSombrero').addEventListener('click', () => agregarAlCarrito(PRENDA_SOMBRERO));


    document.getElementById('btnEliminarPrenda').addEventListener('click', mostrarEliminarPrenda);
    document.getElementById('btnFiltrarPorPrecio').addEventListener('click', filtrarPrendasPorPrecio);
    document.getElementById('btnBuscarPorNombre').addEventListener('click', buscarPrendaPorNombre);

    document.getElementById('btnMostrarCarrito').addEventListener('click', mostrarCarrito);


    document.getElementById('btnConfirmarEliminar').addEventListener('click', eliminarPrenda);
});

function mostrarCarrito() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    if (carrito.length === 0) {
        resultado.innerHTML = "El carrito está vacío.";
    } else {
        let listadoPrendas = carrito.map((prenda, index) => 
            `${index + 1}. ${prenda.nombre} - Talle: ${prenda.talle}, Color: ${prenda.color}, Precio: $${prenda.precio}`
        ).join("<br>");
        
        resultado.innerHTML = `<div>Carrito de compras:<br>${listadoPrendas}<br>Total: $${calcularTotal()}</div>`;
    }
    resultado.classList.remove('hidden');
}

function calcularTotal() {
    return carrito.reduce((total, prenda) => total + prenda.precio, 0);
}

function agregarAlCarrito(prenda) {
    carrito.push(prenda);
    mostrarCarrito();
    alert(`"${prenda.nombre}" se agregó al carrito.`);
    actualizarListaCarrito(); 
}

function actualizarListaCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = '';

    carrito.forEach((prenda, index) => {
        const li = document.createElement('li');
        li.textContent = `${prenda.nombre} - Talle: ${prenda.talle}, Color: ${prenda.color}, Precio: $${prenda.precio}`;
        
        
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => {
            carrito.splice(index, 1);
            actualizarListaCarrito(); 
        };
        
        li.appendChild(btnEliminar);
        listaCarrito.appendChild(li);
    });
}

function mostrarEliminarPrenda() {
    const eliminarPrendaDiv = document.getElementById('eliminarPrenda');
    const select = document.getElementById('prendasEliminar');
    
    select.innerHTML = '';
    carrito.forEach((prenda, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = `${prenda.nombre} - Talle: ${prenda.talle}, Color: ${prenda.color}, Precio: $${prenda.precio}`;
        select.appendChild(option);
    });

    eliminarPrendaDiv.classList.remove('hidden');
}

function eliminarPrenda() {
    const select = document.getElementById('prendasEliminar');
    const indice = parseInt(select.value);
    
    if (indice >= 0 && indice < carrito.length) {
        carrito.splice(indice, 1);
        alert("Prenda eliminada del carrito.");
        actualizarListaCarrito(); 
        mostrarCarrito(); 
    } else {
        alert("Opción inválida. Inténtalo de nuevo.");
    }
    document.getElementById('eliminarPrenda').classList.add('hidden');
}

function filtrarPrendasPorPrecio() {
    const montoMaximo = parseFloat(document.getElementById('precioMaximo').value);
    
    if (isNaN(montoMaximo) || montoMaximo < 0) {
        alert("Monto inválido. Inténtalo de nuevo.");
        return;
    }

    const prendasFiltradas = carrito.filter(prenda => prenda.precio <= montoMaximo);

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    if (prendasFiltradas.length === 0) {
        resultado.innerHTML = "No hay prendas disponibles para ese monto.";
    } else {
        let listadoPrendas = prendasFiltradas.map((prenda, index) => 
            `${index + 1}. ${prenda.nombre} - Talle: ${prenda.talle}, Color: ${prenda.color}, Precio: $${prenda.precio}`
        ).join("<br>");
        
        resultado.innerHTML = `Prendas disponibles para el monto ingresado:<br>${listadoPrendas}`;
    }
    resultado.classList.remove('hidden');
    document.getElementById('filtrarPorPrecio').classList.add('hidden');
}

function buscarPrendaPorNombre() {
    const nombreBusqueda = document.getElementById('nombreBusqueda').value.toLowerCase();

    const prendaEncontrada = carrito.find(prenda => prenda.nombre.toLowerCase() === nombreBusqueda);

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    if (prendaEncontrada) {
        resultado.innerHTML = `Prenda encontrada: ${prendaEncontrada.nombre} - Talle: ${prendaEncontrada.talle}, Color: ${prendaEncontrada.color}, Precio: $${prendaEncontrada.precio}`;
    } else {
        resultado.innerHTML = "No se encontró ninguna prenda con ese nombre.";
    }
    resultado.classList.remove('hidden');
    document.getElementById('buscarPorNombre').classList.add('hidden');
}