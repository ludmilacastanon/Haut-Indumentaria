let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


    iniciarPagina();
    document.getElementById('btnMostrarCarrito').addEventListener('click', toggleCarrito);
    document.getElementById('btnEliminarPrenda').addEventListener('click', mostrarEliminarPrenda);
    document.getElementById('btnConfirmarEliminar').addEventListener('click', eliminarPrenda);
    document.getElementById('btnFiltrarPorPrecio').addEventListener('click', filtrarPrendasPorPrecio);
    document.getElementById('btnBuscarPorNombre').addEventListener('click', buscarPrendaPorNombre);
    document.getElementById('btnVaciarCarrito').addEventListener('click', confirmarVaciarCarrito);
    document.getElementById('btnFinalizarCompra').addEventListener('click', finalizarCompra);
    document.getElementById('btnCerrarCarrito').addEventListener('click', toggleCarrito);

function iniciarPagina() {
    try {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        if (carritoGuardado) {
            carrito = carritoGuardado;
            mostrarCarrito();
        }
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
    }
}

function agregarAlCarrito(id) {
    const prendaExistente = carrito.find(p => p.id === id);

    if (prendaExistente) {
        prendaExistente.cantidad += 1; 
    } else {
        const prenda = prendas.find(p => p.id === id);
        if (prenda) {
            carrito.push(new Prenda(prenda.id, prenda.nombre, prenda.talle, prenda.color, prenda.precio, prenda.imagen));
        } else {
            console.error('Prenda no encontrada para el ID:', id);
            return;
        }
    }

    try {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }

    mostrarCarrito();
    alert(`${prendaExistente ? prendaExistente.nombre : prendas.find(p => p.id === id).nombre} se agregó al carrito.`);
}

function eliminarDelCarrito(id) {
    const prenda = carrito.find(p => p.id === id);

    if (prenda) {
        if (prenda.cantidad > 1) {
            prenda.cantidad -= 1; 
        } else {
            carrito = carrito.filter(p => p.id !== id); 
        }

        try {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }

        mostrarCarrito();
    } else {
        console.error('Prenda no encontrada en el carrito para el ID:', id);
    }
}

function toggleCarrito() {
    const carritoMenu = document.getElementById('carritoMenu');
    carritoMenu.classList.toggle('mostrar');

    if (carritoMenu.classList.contains('mostrar')) {
        mostrarCarrito();
    }
}

function mostrarCarrito() {
    const carritoContenido = document.getElementById('carritoContenido');
    carritoContenido.innerHTML = ''; 

    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach(prenda => {
            const prendaDiv = document.createElement('div');
            prendaDiv.classList.add('item');
            prendaDiv.innerHTML = `
                <p>${prenda.nombre} - Talle: ${prenda.talle}, Color: ${prenda.color}, Precio: $${prenda.precio} x ${prenda.cantidad}</p>
                <button class="btn-incrementar" data-id="${prenda.id}">+</button>
                <button class="btn-reducir" data-id="${prenda.id}">-</button>
            `;
            carritoContenido.appendChild(prendaDiv);
        });

        carritoContenido.querySelectorAll('.btn-incrementar').forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt(button.getAttribute('data-id'));
                actualizarCantidad(id, 'incrementar');
            });
        });

        carritoContenido.querySelectorAll('.btn-reducir').forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt(button.getAttribute('data-id'));
                actualizarCantidad(id, 'reducir');
            });
        });
    }

    const total = calcularTotal();
    document.getElementById('totalCarrito').textContent = total;
}

function actualizarCantidad(id, operacion) {
    const prenda = carrito.find(p => p.id === id);
    if (prenda) {
        if (operacion === 'incrementar') {
            prenda.cantidad += 1;
        } else if (operacion === 'reducir') {
            if (prenda.cantidad > 1) {
                prenda.cantidad -= 1;
            } else {
                eliminarDelCarrito(id);
                return;
            }
        }

        try {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }

        mostrarCarrito();
    } else {
        console.error('Prenda no encontrada para actualizar la cantidad, ID:', id);
    }
}

function confirmarVaciarCarrito() {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        vaciarCarrito();
    }
}

function vaciarCarrito() {
    carrito = [];
    try {
        localStorage.removeItem('carrito');
    } catch (error) {
        console.error('Error al eliminar el carrito de localStorage:', error);
    }
    mostrarCarrito();
}

function mostrarEliminarPrenda() {
    const eliminarPrendaDiv = document.getElementById('eliminarPrenda');
    const select = document.getElementById('prendasEliminar');
    select.innerHTML = '';

    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

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

    if (isNaN(indice) || indice < 0 || indice >= carrito.length) {
        alert('Opción inválida. Inténtalo de nuevo.');
        return;
    }

    const prendaEliminada = carrito.splice(indice, 1)[0];

    try {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }

    alert(`Prenda "${prendaEliminada.nombre}" eliminada del carrito.`);
    mostrarCarrito();
    document.getElementById('eliminarPrenda').classList.add('hidden');
}

function calcularTotal() {
    return carrito.reduce((total, prenda) => total + (prenda.precio * prenda.cantidad), 0);
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    const nombre = prompt('Ingresa tu nombre:');
    if (!nombre) {
        alert('Nombre requerido para finalizar la compra.');
        return;
    }

    const direccion = prompt('Ingresa tu dirección:');
    if (!direccion) {
        alert('Dirección requerida para finalizar la compra.');
        return;
    }

    const total = calcularTotal();

    alert(`Gracias ${nombre} por tu compra! El total es $${total}. Tus productos serán enviados a ${direccion}.`);

    vaciarCarrito(); // Vaciar el carrito automáticamente después de la compra
}