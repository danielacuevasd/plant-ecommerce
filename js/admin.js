/* FLORAE — admin.js
   Lógica común del panel de administrador.
   Depende de "productos.js" (arreglo global "productos"). */

// --- Arreglo de usuarios simulado (simula la base de datos para EP1) ---
// Se irá utilizando también en admin/usuarios.html
const usuariosAdmin = [
    { id: 1, run: "191102201", nombre: "Camila", apellidos: "Reyes Soto", correo: "camila.reyes@gmail.com", tipo: "Cliente", region: "Región Metropolitana de Santiago", comuna: "Santiago", direccion: "Av. Siempre Viva 123, Santiago" },
    { id: 2, run: "128374651", nombre: "Matías", apellidos: "Fuentes Lara", correo: "matias.fuentes@duoc.cl", tipo: "Vendedor", region: "Región de Valparaíso", comuna: "Viña del Mar", direccion: "Calle Los Aromos 456, Providencia" },
    { id: 3, run: "175293840", nombre: "Marcelo", apellidos: "Caceres", correo: "marcelo.caceres@profesor.duoc.cl", tipo: "Administrador", region: "Región Metropolitana de Santiago", comuna: "Ñuñoa", direccion: "Pasaje Las Flores 789, Ñuñoa" }
];

// --- Utilidad: obtiene el id desde la URL (?id=X), independiente de productos.js ---
function obtenerIdDesdeUrlAdmin() {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");
    return id ? parseInt(id, 10) : null;
}

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


// --- Renderiza la tabla de usuarios en admin/usuarios.html ---
function renderizarTablaUsuarios() {
    const cuerpoTabla = document.getElementById("tabla-usuarios-body");
    if (!cuerpoTabla) return;

    cuerpoTabla.innerHTML = usuariosAdmin.map(u => `
        <tr data-id="${u.id}">
            <td>${u.run}</td>
            <td>${u.nombre} ${u.apellidos}</td>
            <td>${u.correo}</td>
            <td>${u.tipo}</td>
            <td class="acciones">
                <a href="nuevo-usuario.html?id=${u.id}">Editar</a>
                <button type="button" class="accion-eliminar-usuario" data-id="${u.id}">Eliminar</button>
            </td>
        </tr>
    `).join("");
}

// --- Elimina un usuario del arreglo en memoria (simulado, sin backend) ---
function eliminarUsuarioAdmin(id) {
    if (!confirm("¿Seguro que deseas eliminar este usuario? Esta acción no se puede deshacer.")) return;

    const indice = usuariosAdmin.findIndex(u => u.id === id);
    if (indice !== -1) {
        usuariosAdmin.splice(indice, 1);
        renderizarTablaUsuarios();
        renderizarResumenAdmin();
    }
}

// FORMULARIO DE PRODUCTO (crear / editar)
function inicializarFormularioProducto() {
    const form = document.getElementById("form-producto");
    if (!form) return;

    const idProducto = obtenerIdDesdeUrlAdmin();
    const productoExistente = idProducto
        ? productos.find(p => p.id === idProducto)
        : null;

    // Si viene un id válido por la URL, cambiamos a modo edición y precargamos los datos
    if (productoExistente) {
        document.getElementById("titulo-pagina").textContent = "Editar producto | Panel administrador Florae";
        document.getElementById("encabezado-formulario").textContent = "Editar producto";
        document.getElementById("btn-guardar-producto").textContent = "Guardar cambios";

        document.getElementById("codigo").value = productoExistente.codigo;
        document.getElementById("nombre").value = productoExistente.nombre;
        document.getElementById("descripcion").value = productoExistente.descripcion || "";
        document.getElementById("precio").value = productoExistente.precio;
        document.getElementById("categoria").value = productoExistente.categoria;
        document.getElementById("stock").value = productoExistente.stock;
        document.getElementById("stock-critico").value = productoExistente.stockCritico ?? "";
        document.getElementById("imagen").value = productoExistente.imagen || "";
    }

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        let esValido = true;

        const codigo = document.getElementById("codigo").value.trim();
        if (codigo.length < 3) {
            mostrarError("codigo", "El código debe tener al menos 3 caracteres.");
            esValido = false;
        } else limpiarError("codigo");

        const nombre = document.getElementById("nombre").value.trim();
        if (!nombre) { mostrarError("nombre", "El nombre es obligatorio."); esValido = false; }
        else if (nombre.length > 100) { mostrarError("nombre", "Máximo 100 caracteres."); esValido = false; }
        else limpiarError("nombre");

        const descripcion = document.getElementById("descripcion").value.trim();
        if (descripcion.length > 500) { mostrarError("descripcion", "Máximo 500 caracteres."); esValido = false; }
        else limpiarError("descripcion");

        const precio = parseFloat(document.getElementById("precio").value);
        if (isNaN(precio) || precio < 0) {
            mostrarError("precio", "El precio debe ser un número mayor o igual a 0.");
            esValido = false;
        } else limpiarError("precio");

        const categoria = document.getElementById("categoria").value;
        if (!categoria) { mostrarError("categoria", "Selecciona una categoría."); esValido = false; }
        else limpiarError("categoria");

        const stockValor = document.getElementById("stock").value;
        const stock = parseInt(stockValor, 10);
        if (stockValor === "" || isNaN(stock) || stock < 0 || !Number.isInteger(Number(stockValor))) {
            mostrarError("stock", "El stock debe ser un número entero mayor o igual a 0.");
            esValido = false;
        } else limpiarError("stock");

        const stockCriticoValor = document.getElementById("stock-critico").value;
        let stockCritico = null;
        if (stockCriticoValor !== "") {
            stockCritico = parseInt(stockCriticoValor, 10);
            if (isNaN(stockCritico) || stockCritico < 0 || !Number.isInteger(Number(stockCriticoValor))) {
                mostrarError("stock-critico", "Debe ser un número entero mayor o igual a 0.");
                esValido = false;
            } else limpiarError("stock-critico");
        } else limpiarError("stock-critico");

        const imagen = document.getElementById("imagen").value.trim() || "img/producto-placeholder.jpg";

        if (!esValido) return;

        if (productoExistente) {
            // Modo edición: actualizamos el objeto existente
            Object.assign(productoExistente, {
                codigo, nombre, descripcion, precio, categoria, stock,
                stockCritico: stockCritico ?? productoExistente.stockCritico,
                imagen
            });
            alert("Producto actualizado correctamente.");
        } else {
            // Modo creación: generamos un id nuevo y lo agregamos al arreglo
            const nuevoId = productos.length
                ? Math.max(...productos.map(p => p.id)) + 1
                : 1;

            productos.push({
                id: nuevoId,
                codigo,
                nombre,
                categoria,
                precio,
                stock,
                stockCritico: stockCritico ?? 0,
                descripcionCorta: descripcion.slice(0, 80),
                descripcion,
                imagen
            });
            alert("Producto creado correctamente.");
        }

        window.location.href = "productos.html";
    });
}

// FORMULARIO DE USUARIO ADMIN (crear / editar)
// Reutiliza validarRun, validarCorreo, poblarRegiones y
// poblarComunas definidas en validaciones.js
function inicializarFormularioUsuarioAdmin() {
    const form = document.getElementById("form-usuario-admin");
    if (!form) return;

    if (typeof poblarRegiones === "function") poblarRegiones();

    const idUsuario = obtenerIdDesdeUrlAdmin();
    const usuarioExistente = idUsuario
        ? usuariosAdmin.find(u => u.id === idUsuario)
        : null;

    if (usuarioExistente) {
        document.getElementById("titulo-pagina").textContent = "Editar usuario | Panel administrador Florae";
        document.getElementById("encabezado-formulario").textContent = "Editar usuario";
        document.getElementById("btn-guardar-usuario").textContent = "Guardar cambios";

        document.getElementById("run").value = usuarioExistente.run;
        document.getElementById("nombre").value = usuarioExistente.nombre;
        document.getElementById("apellidos").value = usuarioExistente.apellidos;
        document.getElementById("correo").value = usuarioExistente.correo;
        document.getElementById("tipo-usuario").value = usuarioExistente.tipo;
        document.getElementById("direccion").value = usuarioExistente.direccion || "";
        // Nota: la contraseña nunca se precarga por seguridad, aunque sea un dato simulado.

        if (usuarioExistente.region && typeof regiones !== "undefined") {
            const indiceRegion = regiones.findIndex(r => r.nombre === usuarioExistente.region);
            if (indiceRegion !== -1) {
                document.getElementById("region").value = indiceRegion;
                poblarComunas(indiceRegion);
                document.getElementById("comuna").value = usuarioExistente.comuna || "";
            }
        }
    }

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        let esValido = true;

        const run = document.getElementById("run").value;
        const errorRun = typeof validarRun === "function" ? validarRun(run) : "";
        if (errorRun) { mostrarError("run", errorRun); esValido = false; }
        else limpiarError("run");

        const nombre = document.getElementById("nombre").value.trim();
        if (!nombre) { mostrarError("nombre", "El nombre es obligatorio."); esValido = false; }
        else if (nombre.length > 50) { mostrarError("nombre", "Máximo 50 caracteres."); esValido = false; }
        else limpiarError("nombre");

        const apellidos = document.getElementById("apellidos").value.trim();
        if (!apellidos) { mostrarError("apellidos", "Los apellidos son obligatorios."); esValido = false; }
        else if (apellidos.length > 100) { mostrarError("apellidos", "Máximo 100 caracteres."); esValido = false; }
        else limpiarError("apellidos");

        const correo = document.getElementById("correo").value.trim();
        const errorCorreo = typeof validarCorreo === "function" ? validarCorreo(correo) : "";
        if (!correo) { mostrarError("correo", "El correo es obligatorio."); esValido = false; }
        else if (correo.length > 100) { mostrarError("correo", "Máximo 100 caracteres."); esValido = false; }
        else if (errorCorreo) { mostrarError("correo", errorCorreo); esValido = false; }
        else limpiarError("correo");

        // La contraseña solo es obligatoria al crear un usuario nuevo
        const contrasena = document.getElementById("contrasena").value;
        if (!usuarioExistente || contrasena) {
            if (contrasena.length < 4 || contrasena.length > 10) {
                mostrarError("contrasena", "La contraseña debe tener entre 4 y 10 caracteres.");
                esValido = false;
            } else limpiarError("contrasena");
        }

        const tipoUsuario = document.getElementById("tipo-usuario").value;
        if (!tipoUsuario) { mostrarError("tipo-usuario", "Selecciona un tipo de usuario."); esValido = false; }
        else limpiarError("tipo-usuario");

        const direccion = document.getElementById("direccion").value.trim();
        if (!direccion) { mostrarError("direccion", "La dirección es obligatoria."); esValido = false; }
        else if (direccion.length > 300) { mostrarError("direccion", "Máximo 300 caracteres."); esValido = false; }
        else limpiarError("direccion");

        const regionIndice = document.getElementById("region").value;
        const comuna = document.getElementById("comuna").value;
        if (!regionIndice || !comuna) {
            esValido = false;
            alert("Debes seleccionar región y comuna.");
        }
        const nombreRegion = (typeof regiones !== "undefined" && regionIndice !== "")
            ? regiones[regionIndice].nombre
            : "";

        if (!esValido) return;

        if (usuarioExistente) {
            Object.assign(usuarioExistente, {
                run, nombre, apellidos, correo, tipo: tipoUsuario,
                direccion, region: nombreRegion, comuna
            });
            alert("Usuario actualizado correctamente.");
        } else {
            const nuevoId = usuariosAdmin.length
                ? Math.max(...usuariosAdmin.map(u => u.id)) + 1
                : 1;

            usuariosAdmin.push({
                id: nuevoId, run, nombre, apellidos, correo, tipo: tipoUsuario,
                direccion, region: nombreRegion, comuna
            });
            alert("Usuario creado correctamente.");
        }

        window.location.href = "usuarios.html";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarResumenAdmin();
    renderizarTablaProductos();
    renderizarTablaUsuarios();
    inicializarFormularioProducto();
    inicializarFormularioUsuarioAdmin();

    // Delegación de eventos: botón "Eliminar" en la tabla de productos
    document.addEventListener("click", (evento) => {
        const boton = evento.target.closest(".accion-eliminar");
        if (boton && boton.dataset.id) {
            eliminarProductoAdmin(parseInt(boton.dataset.id, 10));
        }
    });

    // Delegación de eventos: botón "Eliminar" en la tabla de usuarios
    document.addEventListener("click", (evento) => {
        const boton = evento.target.closest(".accion-eliminar-usuario");
        if (boton && boton.dataset.id) {
            eliminarUsuarioAdmin(parseInt(boton.dataset.id, 10));
        }
    });
});