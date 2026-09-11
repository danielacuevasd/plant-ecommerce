/* FLORAE — admin.js
   Lógica común del panel de administrador.
   Depende de "productos.js" (arreglo global "productos"). */

// --- Arreglo de usuarios simulado (simula la base de datos para EP1) ---
// Se irá utilizando también en admin/usuarios.html
const usuariosAdmin = [
    { run: "191102201", nombre: "Camila", apellidos: "Reyes Soto", correo: "camila.reyes@gmail.com", tipo: "Cliente" },
    { run: "128374651", nombre: "Matías", apellidos: "Fuentes Lara", correo: "matias.fuentes@duoc.cl", tipo: "Vendedor" },
    { run: "175293840", nombre: "Daniela", apellidos: "Cuevas", correo: "daniela.cuevas@profesor.duoc.cl", tipo: "Administrador" }
];

// --- Renderiza los contadores de la portada del admin (index.html) ---
function renderizarResumenAdmin() {
    const totalProductos = document.getElementById("total-productos");
    const totalUsuarios = document.getElementById("total-usuarios");
    const totalStockCritico = document.getElementById("total-stock-critico");

    if (!totalProductos) return; // Solo corre en admin/index.html

    const listaProductos = typeof productos !== "undefined" ? productos : [];

    totalProductos.textContent = listaProductos.length;
    totalUsuarios.textContent = usuariosAdmin.length;
    totalStockCritico.textContent = listaProductos.filter(
        p => p.stock <= p.stockCritico
    ).length;
}

// --- Formatea números como precio en pesos chilenos ---
function formatearPrecioAdmin(valor) {
    return "$" + valor.toLocaleString("es-CL");
}

// --- Renderiza la tabla de productos en admin/productos.html ---
function renderizarTablaProductos() {
    const cuerpoTabla = document.getElementById("tabla-productos-body");
    if (!cuerpoTabla) return;

    const listaProductos = typeof productos !== "undefined" ? productos : [];

    cuerpoTabla.innerHTML = listaProductos.map(p => {
        const enStockCritico = p.stock <= p.stockCritico;
        const badge = enStockCritico
            ? '<span class="badge badge--alerta">Stock crítico</span>'
            : '<span class="badge badge--ok">Disponible</span>';

        return `
            <tr data-id="${p.id}">
                <td>${p.codigo}</td>
                <td>${p.nombre}</td>
                <td>${p.categoria}</td>
                <td>${formatearPrecioAdmin(p.precio)}</td>
                <td>${p.stock}</td>
                <td>${badge}</td>
                <td class="acciones">
                    <a href="nuevo-producto.html?id=${p.id}">Editar</a>
                    <button type="button" class="accion-eliminar" data-id="${p.id}">Eliminar</button>
                </td>
            </tr>
        `;
    }).join("");
}

// --- Elimina un producto del arreglo en memoria (simulado, sin backend) ---
function eliminarProductoAdmin(id) {
    if (!confirm("¿Seguro que deseas eliminar este producto? Esta acción no se puede deshacer.")) return;

    const indice = productos.findIndex(p => p.id === id);
    if (indice !== -1) {
        productos.splice(indice, 1);
        renderizarTablaProductos();
        renderizarResumenAdmin();
    }
}



document.addEventListener("DOMContentLoaded", () => {
    renderizarResumenAdmin();
    renderizarTablaProductos();

    // Delegación de eventos: botón "Eliminar" en la tabla de productos
    document.addEventListener("click", (evento) => {
        const boton = evento.target.closest(".accion-eliminar");
        if (boton && boton.dataset.id) {
            eliminarProductoAdmin(parseInt(boton.dataset.id, 10));
        }
    });
});