let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let ordenDescendente = true; // Variable para rastrear el estado de la ordenación de las prendas

class Prenda {
    constructor(id, nombre, talle, color, precio, imagen, cantidad = 1) {
        this.id = id;
        this.nombre = nombre;
        this.talle = talle;
        this.color = color;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = cantidad; // manejar la cantidad
    }
}

const prendas = [
    new Prenda(1, "Remera", "M", "Blanco", 15000, "images/remera.png"),
    new Prenda(2, "Jean", "L", "Azul", 30000, "images/jean.png"),
    new Prenda(3, "Zapas", "38", "Negro", 55000, "images/zapatos.png"),
    new Prenda(4, "Campera", "XL", "Gris", 40000, "images/campera.png"),
    new Prenda(5, "Gorra", "S", "Rojo", 10000, "images/gorra.png")
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
    const prendaExistente = carrito.find(p => p.id === id);

    if (prendaExistente) {
        prendaExistente.cantidad += 1; // Incrementar la cantidad si la prenda ya está en el carrito
    } else {
        const prenda = prendas.find(p => p.id === id);
        carrito.push(new Prenda(prenda.id, prenda.nombre, prenda.talle, prenda.color, prenda.precio, prenda.imagen));
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    alert(`${prendaExistente ? prendaExistente.nombre : prendas.find(p => p.id === id).nombre} se agregó al carrito.`);
}

function eliminarDelCarrito(id) {
    const prenda = carrito.find(p => p.id === id);

    if (prenda.cantidad > 1) {
        prenda.cantidad -= 1; // Reducir la cantidad si es mayor a 1
    } else {
        carrito = carrito.filter(p => p.id !== id); // Eliminar del carrito si la cantidad es 1
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito(); // Actualizar la vista del carrito
}

function toggleCarrito() {
    const carritoMenu = document.getElementById('carritoMenu');
    carritoMenu.classList.toggle('mostrar');

    // Si se está mostrando el carrito, se cargan las prendas
    if (carritoMenu.classList.contains('mostrar')) {
        mostrarCarrito();
    }
}

function mostrarCarrito() {
    const carritoContenido = document.getElementById('carritoContenido');
    carritoContenido.innerHTML = ''; // Limpiar contenido previo

    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach(prenda => {
            const prendaDiv = document.createElement('div');
            prendaDiv.classList.add('item');
            prendaDiv.innerHTML = `
                <p>${prenda.nombre} - Talle: ${prenda.talle}, Color: ${prenda.color}, Precio: $${prenda.precio} x ${prenda.cantidad}</p>
                <button onclick="eliminarDelCarrito(${prenda.id})">Eliminar</button>
            `;
            carritoContenido.appendChild(prendaDiv);
        });
    }

    // Actualizar el total
    const total = calcularTotal();
    document.getElementById('totalCarrito').textContent = total;
}

function calcularTotal() {
    return carrito.reduce((total, prenda) => total + (prenda.precio * prenda.cantidad), 0);
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
    let prendasFiltradas;

    if (ordenDescendente) {
        prendasFiltradas = prendas.slice().sort((a, b) => b.precio - a.precio); // Ordenar de mayor a menor
    } else {
        prendasFiltradas = prendas.slice().sort((a, b) => a.precio - b.precio); // Ordenar de menor a mayor
    }

    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';

    if (prendasFiltradas.length === 0) {
        productosDiv.innerHTML = "No hay prendas disponibles.";
    } else {
        prendasFiltradas.forEach(prenda => {
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

    // Alternar el estado de la ordenación para la próxima vez
    ordenDescendente = !ordenDescendente;
}

function buscarPrendaPorNombre() {
    const nombreBusqueda = document.getElementById('nombreBusqueda').value.toLowerCase();

    const prendasEncontradas = prendas.filter(prenda => prenda.nombre.toLowerCase().includes(nombreBusqueda));

    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';

    if (prendasEncontradas.length > 0) {
        prendasEncontradas.forEach(prenda => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.innerHTML = `
                <img src="${prenda.imagen}" alt="${prenda.nombre}" class="product-image">
                <span>${prenda.nombre} - Talle: ${prenda.talle}, Color: ${prenda.color}, Precio: $${prenda.precio}</span>
                <button onclick="agregarAlCarrito(${prenda.id})">Agregar</button>
            `;
            productosDiv.appendChild(itemDiv);
        });
    } else {
        productosDiv.innerHTML = "No se encontró ninguna prenda con ese nombre.";
    }
}