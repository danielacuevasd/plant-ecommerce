/* =========================================================
   FLORAE — productos.js
   Arreglo de productos y renderizado dinámico en:
   - index.html (productos destacados)
   - productos.html (listado completo)
   - detalle-producto.html (detalle + relacionados)
   ========================================================= */

// --- Arreglo de productos (simula la base de datos para EP1) ---
const productos = [
    {
        id: 1,
        nombre: "Monstera Deliciosa",
        categoria: "interior",
        precio: 18990,
        stock: 12,
        stockCritico: 3,
        descripcionCorta: "Planta de interior de hojas grandes y recortadas.",
        descripcion: "La Monstera Deliciosa es una de las plantas de interior más populares por sus hojas grandes con recortes característicos. Prefiere luz indirecta y riego moderado, ideal para espacios luminosos sin sol directo.",
        imagen: "img/monstera.jpg"
    },
    {
        id: 2,
        nombre: "Potus Verde",
        categoria: "interior",
        precio: 8990,
        stock: 20,
        stockCritico: 5,
        descripcionCorta: "Planta colgante de fácil cuidado, ideal para principiantes.",
        descripcion: "El Potus es una planta trepadora o colgante muy resistente, perfecta para quienes recién comienzan en el mundo de las plantas. Tolera baja luminosidad y riego espaciado.",
        imagen: "img/potus.jpg"
    },
    {
        id: 3,
        nombre: "Calathea Orbifolia",
        categoria: "interior",
        precio: 14990,
        stock: 3,
        stockCritico: 3,
        descripcionCorta: "Hojas redondeadas con líneas plateadas, apta para mascotas.",
        descripcion: "La Calathea Orbifolia destaca por sus hojas redondeadas con vetas plateadas. Necesita humedad ambiental y luz indirecta. Es una planta no tóxica, apta para hogares con mascotas.",
        imagen: "img/calathea.jpg"
    },
    {
        id: 4,
        nombre: "Lavanda",
        categoria: "exterior",
        precio: 6990,
        stock: 15,
        stockCritico: 4,
        descripcionCorta: "Arbusto aromático de exterior, ideal para jardines soleados.",
        descripcion: "La lavanda es un arbusto perenne muy aromático, perfecto para jardines exteriores con buena exposición solar. Atrae polinizadores y requiere riego escaso una vez establecida.",
        imagen: "img/lavanda.jpg"
    },
    {
        id: 5,
        nombre: "Suculenta Echeveria",
        categoria: "exterior",
        precio: 4990,
        stock: 30,
        stockCritico: 8,
        descripcionCorta: "Suculenta de bajo mantenimiento, ideal para principiantes.",
        descripcion: "La Echeveria es una suculenta de roseta compacta, ideal para espacios con mucha luz. Requiere riego muy espaciado y es perfecta para quienes buscan plantas de bajo mantenimiento.",
        imagen: "img/echeveria.jpg"
    },
    {
        id: 6,
        nombre: "Maceta Cerámica Blanca",
        categoria: "macetas",
        precio: 9990,
        stock: 25,
        stockCritico: 5,
        descripcionCorta: "Maceta de cerámica con plato incluido, 20 cm de diámetro.",
        descripcion: "Maceta de cerámica esmaltada color blanco, con orificio de drenaje y plato incluido. Diámetro de 20 cm, ideal para plantas de interior medianas.",
        imagen: "img/maceta-blanca.jpg"
    },
    {
        id: 7,
        nombre: "Sustrato Universal 5L",
        categoria: "sustratos",
        precio: 5990,
        stock: 40,
        stockCritico: 10,
        descripcionCorta: "Mezcla de tierra apta para la mayoría de las plantas de interior.",
        descripcion: "Sustrato universal balanceado, apto para el trasplante de la mayoría de las plantas de interior y exterior. Presentación de 5 litros.",
        imagen: "img/sustrato.jpg"
    },
    {
        id: 8,
        nombre: "Set de Herramientas de Jardín",
        categoria: "herramientas",
        precio: 12990,
        stock: 10,
        stockCritico: 2,
        descripcionCorta: "Set de 3 piezas: pala, rastrillo y tijera de podar.",
        descripcion: "Set de herramientas básicas de jardinería en acero inoxidable con mango ergonómico: pala de trasplante, rastrillo de mano y tijera de podar.",
        imagen: "img/herramientas.jpg"
    }
];

// --- Utilidad: formatear números como precio en pesos chilenos ---
function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CL");
}

// --- Utilidad: obtener el id del producto desde la URL (?id=1) ---
function obtenerIdDesdeUrl() {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");
    return id ? parseInt(id, 10) : null;
}

// --- Genera el HTML de una tarjeta de producto ---
function crearTarjetaProducto(producto, incluirEnlace = true) {
    const contenidoInterno = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
    `;

    const bloqueImagenTitulo = incluirEnlace
        ? `<a href="detalle-producto.html?id=${producto.id}">${contenidoInterno}</a>`
        : contenidoInterno;

    return `
        <article class="tarjeta-producto">
            ${bloqueImagenTitulo}
            <p class="precio">${formatearPrecio(producto.precio)}</p>
            <button class="btn-secundario" type="button" data-id="${producto.id}">
                Añadir al carrito
            </button>
        </article>
    `;
}

// --- Renderiza productos destacados en el Home (primeros 4) ---
function renderizarDestacadosHome() {
    const contenedor = document.getElementById("lista-productos-home");
    if (!contenedor) return;

    const destacados = productos.slice(0, 4);
    contenedor.innerHTML = destacados.map(p => crearTarjetaProducto(p)).join("");
}

// --- Renderiza el listado completo en productos.html ---
function renderizarListadoProductos() {
    const contenedor = document.getElementById("lista-productos");
    const contador = document.getElementById("contador-productos");
    if (!contenedor) return;

    contenedor.innerHTML = productos.map(p => crearTarjetaProducto(p)).join("");

    if (contador) {
        contador.textContent = `${productos.length} productos disponibles`;
    }
}

// --- Renderiza el detalle de un producto según el id de la URL ---
function renderizarDetalleProducto() {
    const detalle = document.getElementById("detalle-producto");
    if (!detalle) return;

    const id = obtenerIdDesdeUrl();
    const producto = productos.find(p => p.id === id) || productos[0];

    document.getElementById("nombre-producto").textContent = producto.nombre;
    document.getElementById("precio-producto").textContent = formatearPrecio(producto.precio);
    document.getElementById("descripcion-producto").textContent = producto.descripcion;
    document.getElementById("imagen-principal").src = producto.imagen;
    document.getElementById("imagen-principal").alt = producto.nombre;

    const miga = document.getElementById("miga-producto");
    if (miga) miga.textContent = producto.nombre;

    const btnAgregar = document.getElementById("btn-agregar-carrito");
    if (btnAgregar) btnAgregar.dataset.id = producto.id;

    document.title = `${producto.nombre} | Florae`;

    renderizarRelacionados(producto);
}

// --- Renderiza productos relacionados (misma categoría, excluyendo el actual) ---
function renderizarRelacionados(productoActual) {
    const contenedor = document.getElementById("lista-relacionados");
    if (!contenedor) return;

    const relacionados = productos
        .filter(p => p.categoria === productoActual.categoria && p.id !== productoActual.id)
        .slice(0, 4);

    contenedor.innerHTML = relacionados.length
        ? relacionados.map(p => crearTarjetaProducto(p)).join("")
        : "<p class=\"texto-secundario\">No hay productos relacionados por ahora.</p>";
}

// --- Punto de entrada: decide qué renderizar según la página actual ---
document.addEventListener("DOMContentLoaded", () => {
    renderizarDestacadosHome();
    renderizarListadoProductos();
    renderizarDetalleProducto();
});