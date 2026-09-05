/* =========================================================
   FLORAE — carrito.js
   Manejo del carrito de compras usando localStorage.
   Depende de que "productos.js" se cargue antes (usa el
   arreglo global "productos" para obtener nombre/precio/imagen).
   ========================================================= */

const CARRITO_KEY = "florae_carrito";

// Cupones válidos de ejemplo (simulados para EP1, sin backend)
const cuponesValidos = {
    "FLORAE10": 0.10,
    "BIENVENIDO": 0.05
};

// --- Obtiene el carrito guardado en localStorage ---
function obtenerCarrito() {
    const datos = localStorage.getItem(CARRITO_KEY);
    return datos ? JSON.parse(datos) : [];
}

// --- Guarda el carrito en localStorage ---
function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// --- Agrega un producto al carrito (o suma cantidad si ya existe) ---
function agregarAlCarrito(idProducto, cantidad = 1) {
    const carrito = obtenerCarrito();
    const item = carrito.find(i => i.id === idProducto);

    if (item) {
        item.cantidad += cantidad;
    } else {
        carrito.push({ id: idProducto, cantidad: cantidad });
    }

    guardarCarrito(carrito);
}

// --- Actualiza la cantidad de un producto específico ---
function actualizarCantidadCarrito(idProducto, nuevaCantidad) {
    let carrito = obtenerCarrito();

    if (nuevaCantidad <= 0) {
        carrito = carrito.filter(i => i.id !== idProducto);
    } else {
        const item = carrito.find(i => i.id === idProducto);
        if (item) item.cantidad = nuevaCantidad;
    }

    guardarCarrito(carrito);
    renderizarCarrito();
}

// --- Elimina un producto del carrito ---
function eliminarDelCarrito(idProducto) {
    const carrito = obtenerCarrito().filter(i => i.id !== idProducto);
    guardarCarrito(carrito);
    renderizarCarrito();
}

// --- Calcula la cantidad total de productos en el carrito (para el contador del header) ---
function contarItemsCarrito() {
    return obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

// --- Actualiza el número que aparece junto al texto "Carrito" en el header ---
function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        contador.textContent = contarItemsCarrito();
    }
}

// --- Une los datos del carrito (id + cantidad) con la info completa del producto ---
function obtenerDetalleCarrito() {
    const carrito = obtenerCarrito();

    return carrito
        .map(item => {
            const producto = typeof productos !== "undefined"
                ? productos.find(p => p.id === item.id)
                : null;

            if (!producto) return null;

            return {
                ...producto,
                cantidad: item.cantidad,
                subtotalItem: producto.precio * item.cantidad
            };
        })
        .filter(item => item !== null);
}

// --- Formatea números como precio en pesos chilenos ---
function formatearPrecioCarrito(valor) {
    return "$" + Math.round(valor).toLocaleString("es-CL");
}

// --- Renderiza el contenido completo de carrito.html ---
function renderizarCarrito() {
    const contenedor = document.getElementById("carrito-items");
    const mensajeVacio = document.getElementById("carrito-vacio");
    const elementoSubtotal = document.getElementById("carrito-subtotal");
    const elementoTotal = document.getElementById("carrito-total");

    // Si no estamos en la página del carrito, no hacemos nada más
    if (!contenedor) return;

    const items = obtenerDetalleCarrito();

    if (items.length === 0) {
        contenedor.innerHTML = "";
        if (mensajeVacio) mensajeVacio.style.display = "block";
        if (elementoSubtotal) elementoSubtotal.textContent = formatearPrecioCarrito(0);
        if (elementoTotal) elementoTotal.textContent = formatearPrecioCarrito(0);
        return;
    }

    if (mensajeVacio) mensajeVacio.style.display = "none";

    contenedor.innerHTML = items.map(item => `
        <article class="item-carrito" data-id="${item.id}">
            <img src="${item.imagen}" alt="${item.nombre}" width="80" height="80">
            <div class="item-carrito__info">
                <h3>${item.nombre}</h3>
                <p class="precio">${formatearPrecioCarrito(item.precio)}</p>
            </div>
            <div class="item-carrito__cantidad">
                <button type="button" class="btn-cantidad" data-accion="restar" data-id="${item.id}">-</button>
                <span>${item.cantidad}</span>
                <button type="button" class="btn-cantidad" data-accion="sumar" data-id="${item.id}">+</button>
            </div>
            <p class="item-carrito__subtotal">${formatearPrecioCarrito(item.subtotalItem)}</p>
            <button type="button" class="btn-eliminar" data-id="${item.id}" aria-label="Eliminar ${item.nombre} del carrito">
                Eliminar
            </button>
        </article>
    `).join("");

    const subtotal = items.reduce((total, item) => total + item.subtotalItem, 0);
    const descuento = obtenerDescuentoAplicado();
    const total = subtotal * (1 - descuento);

    if (elementoSubtotal) elementoSubtotal.textContent = formatearPrecioCarrito(subtotal);
    if (elementoTotal) elementoTotal.textContent = formatearPrecioCarrito(total);
}

// --- Manejo simple de cupón de descuento (guardado en localStorage aparte) ---
function obtenerDescuentoAplicado() {
    const cupon = localStorage.getItem("florae_cupon");
    return cupon && cuponesValidos[cupon] ? cuponesValidos[cupon] : 0;
}

function aplicarCupon(codigo) {
    const errorCupon = document.getElementById("error-cupon");
    const codigoNormalizado = codigo.trim().toUpperCase();

    if (!codigoNormalizado) {
        if (errorCupon) errorCupon.textContent = "Ingresa un código de cupón.";
        return;
    }

    if (!cuponesValidos[codigoNormalizado]) {
        if (errorCupon) errorCupon.textContent = "El cupón ingresado no es válido.";
        localStorage.removeItem("florae_cupon");
        renderizarCarrito();
        return;
    }

    localStorage.setItem("florae_cupon", codigoNormalizado);
    if (errorCupon) errorCupon.textContent = "";
    renderizarCarrito();
}


// EVENTOS

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    renderizarCarrito();

    // Delegación de eventos: botones "Añadir al carrito" en tarjetas (home / productos / relacionados)
    document.addEventListener("click", (evento) => {
        const boton = evento.target.closest(".tarjeta-producto .btn-secundario");
        if (boton && boton.dataset.id) {
            agregarAlCarrito(parseInt(boton.dataset.id, 10), 1);
            boton.textContent = "Agregado";
            setTimeout(() => { boton.textContent = "Añadir al carrito"; }, 1200);
        }
    });

    // Formulario "Añadir al carrito" en la vista de detalle de producto (incluye cantidad)
    const formDetalle = document.getElementById("form-agregar-carrito");
    if (formDetalle) {
        formDetalle.addEventListener("submit", (evento) => {
            evento.preventDefault();
            const id = parseInt(document.getElementById("btn-agregar-carrito").dataset.id, 10);
            const cantidad = parseInt(document.getElementById("cantidad").value, 10) || 1;
            agregarAlCarrito(id, cantidad);
        });
    }

    // Botones +/- y eliminar dentro del carrito (delegación, porque las filas se generan dinámicamente)
    document.addEventListener("click", (evento) => {
        const botonCantidad = evento.target.closest(".btn-cantidad");
        if (botonCantidad) {
            const id = parseInt(botonCantidad.dataset.id, 10);
            const item = obtenerCarrito().find(i => i.id === id);
            if (!item) return;

            const nuevaCantidad = botonCantidad.dataset.accion === "sumar"
                ? item.cantidad + 1
                : item.cantidad - 1;

            actualizarCantidadCarrito(id, nuevaCantidad);
        }

        const botonEliminar = evento.target.closest(".btn-eliminar");
        if (botonEliminar) {
            eliminarDelCarrito(parseInt(botonEliminar.dataset.id, 10));
        }
    });

    // Formulario de cupón
    const formCupon = document.getElementById("form-cupon");
    if (formCupon) {
        formCupon.addEventListener("submit", (evento) => {
            evento.preventDefault();
            const codigo = document.getElementById("cupon").value;
            aplicarCupon(codigo);
        });
    }

    // Botón "Pagar" (placeholder: sin backend en EP1, solo valida que el carrito no esté vacío)
    const botonPagar = document.getElementById("btn-pagar");
    if (botonPagar) {
        botonPagar.addEventListener("click", () => {
            if (obtenerCarrito().length === 0) {
                alert("Tu carrito está vacío. Agrega productos antes de continuar.");
                return;
            }
            alert("Compra simulada con éxito. La integración de pago real se implementará en una etapa posterior del proyecto.");
        });
    }
});