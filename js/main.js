let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

class Prenda {
    constructor(id, nombre, talle, color, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.talle = talle;
        this.color = color;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const prendas = [
    new Prenda(1, "Remera", "M", "Blanco", 15000, "images/remera.jpg"),
    new Prenda(2, "Jean", "L", "Azul", 30000, "images/jean.jpg"),
    new Prenda(3, "Zapas", "38", "Negro", 55000, "images/zapatos.jpg"),
    new Prenda(4, "Campera", "XL", "Gris", 40000, "images/campera.jpg"),
    new Prenda(5, "Gorra", "S", "Rojo", 10000, "images/gorra.jpg")
];

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    document.getElementById('btnMostrarCarrito').addEventListener('click', mostrarCarrito);
    document.getElementById('btnEliminarPrenda').addEventListener('click', mostrarEliminarPrenda);
    document.getElementById('btnConfirmarEliminar').addEventListener('click', eliminarPrenda);
    document.getElementById('btnFiltrarPorPrecio').addEventListener('click', filtrarPrendasPorPrecio);
    document.getElementById('btnBuscarPorNombre').addEventListener('click', buscarPrendaPorNombre);
    actualizarListaCarrito();
});

function renderizarProductos() {
    const productosDiv = document.getElementById('productos');
    prendas.forEach(prenda => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <img src="${prenda.imagen}" alt="${prenda.nombre}" class="product-image">
            <span>${prenda.nombre} - Talle: ${prenda.talle}, Color: ${prenda.color}, Precio: $${prenda.precio}</span>
            <button onclick="agregarAlCarrito(${prenda.id})">Agregar</button>
        `;
        productosDiv.appendChild(itemDiv);
    });
}

function agregarAlCarrito(id) {
    const prenda = prendas.find(p => p.id === id);
    carrito.push(prenda);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarListaCarrito();
    alert(`${prenda.nombre} se agregó al carrito.`);
}

function mostrarCarrito() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    if (carrito.length === 0) {
        resultado.innerHTML = "El carrito está vacío.";
    } else {
        const listadoPrendas = carrito.map((prenda, index) => 
            `${index + 1}. ${prenda.nombre} - Talle: ${prenda.talle}, Color: ${prenda.color}, Precio: $${prenda.precio}`
        ).join("<br>");
        
        resultado.innerHTML = `<div>Carrito de compras:<br>${listadoPrendas}<br>Total: $${calcularTotal()}</div>`;
    }
    resultado.classList.remove('hidden');
}

function calcularTotal() {
    return carrito.reduce((total, prenda) => total + prenda.precio, 0);
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
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarListaCarrito();
            mostrarCarrito();
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
        localStorage.setItem('carrito', JSON.stringify(carrito));
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
        const listadoPrendas = prendasFiltradas.map((prenda, index) => 
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

