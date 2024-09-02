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

let prendas = [];
let ordenDescendente = true;

fetch('data/prendas.json')
    .then(response => response.json())
    .then(data => {
        prendas = data.map(p => new Prenda(p.id, p.nombre, p.talle, p.color, p.precio, p.imagen));
        renderizarProductos();
    })
    .catch(error => console.error('Error al cargar las prendas:', error));

function renderizarProductos() {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = ''; // Limpiar contenido previo
    prendas.forEach(prenda => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <img src="${prenda.imagen}" alt="${prenda.nombre}" class="product-image">
            <span>${prenda.nombre} - Talle: ${prenda.talle}, Color: ${prenda.color}, Precio: $${prenda.precio}</span>
            <button data-id="${prenda.id}" class="btnAgregarCarrito">Agregar</button>
        `;
        productosDiv.appendChild(itemDiv);
    });

    // Añadir eventos a los botones de agregar
    document.querySelectorAll('.btnAgregarCarrito').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            agregarAlCarrito(id);
        });
    });
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
                <button data-id="${prenda.id}" class="btnAgregarCarrito">Agregar</button>
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
                <button data-id="${prenda.id}" class="btnAgregarCarrito">Agregar</button>
            `;
            productosDiv.appendChild(itemDiv);
        });
    } else {
        productosDiv.innerHTML = "No se encontró ninguna prenda con ese nombre.";
    }

    // Añadir eventos a los botones de agregar
    document.querySelectorAll('.btnAgregarCarrito').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            agregarAlCarrito(id);
        });
    });
}