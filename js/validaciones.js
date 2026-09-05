/* =========================================================
   FLORAE — validaciones.js
   Validaciones de formularios controladas por JavaScript:
   - Registro de usuario
   - Inicio de sesión
   - Formulario de contacto
   ========================================================= */

// --- Dominios de correo permitidos (regla del anexo) ---
const dominiosPermitidos = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

// --- Datos de regiones y comunas (simulado para EP1, sin backend) ---
const regiones = [
    {
        nombre: "Región Metropolitana de Santiago",
        comunas: ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto"]
    },
    {
        nombre: "Región de Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "San Antonio"]
    },
    {
        nombre: "Región del Biobío",
        comunas: ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"]
    },
    {
        nombre: "Región de la Araucanía",
        comunas: ["Temuco", "Villarrica", "Angol", "Pucón"]
    }
];


// UTILIDADES GENERALES DE VALIDACIÓN

function mostrarError(idCampo, mensaje) {
    const elementoError = document.getElementById(`error-${idCampo}`);
    if (elementoError) elementoError.textContent = mensaje;
}

function limpiarError(idCampo) {
    mostrarError(idCampo, "");
}

// --- Valida que el correo tenga formato válido y termine en un dominio permitido ---
function validarCorreo(correo) {
    const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    if (!formatoValido) return "Ingresa un correo con formato válido.";

    const dominio = correo.split("@")[1]?.toLowerCase();
    const permitido = dominiosPermitidos.some(d => dominio === d);

    if (!permitido) {
        return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
    return "";
}

// --- Valida el RUN chileno: formato (sin puntos ni guion) y dígito verificador ---
function validarRun(run) {
    const limpio = run.trim().toUpperCase();

    if (limpio.length < 7 || limpio.length > 9) {
        return "El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guion.";
    }

    if (!/^[0-9]+[0-9K]$/.test(limpio)) {
        return "El RUN solo debe contener números y, opcionalmente, K al final.";
    }

    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i], 10) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resto = 11 - (suma % 11);
    const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);

    if (dv !== dvEsperado) {
        return "El RUN ingresado no es válido (dígito verificador incorrecto).";
    }

    return "";
}


// REGIÓN / COMUNA (usado en registro.html)

function poblarRegiones() {
    const selectRegion = document.getElementById("region");
    if (!selectRegion) return;

    regiones.forEach((region, indice) => {
        const opcion = document.createElement("option");
        opcion.value = indice;
        opcion.textContent = region.nombre;
        selectRegion.appendChild(opcion);
    });

    selectRegion.addEventListener("change", () => {
        poblarComunas(selectRegion.value);
    });
}

function poblarComunas(indiceRegion) {
    const selectComuna = document.getElementById("comuna");
    if (!selectComuna) return;

    selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

    if (indiceRegion === "") return;

    const comunas = regiones[indiceRegion].comunas;
    comunas.forEach(comuna => {
        const opcion = document.createElement("option");
        opcion.value = comuna;
        opcion.textContent = comuna;
        selectComuna.appendChild(opcion);
    });
}


// FORMULARIO DE REGISTRO

function inicializarFormularioRegistro() {
    const form = document.getElementById("form-registro");
    if (!form) return;

    poblarRegiones();

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        let esValido = true;

        // RUN
        const run = document.getElementById("run").value;
        const errorRun = validarRun(run);
        if (errorRun) { mostrarError("run", errorRun); esValido = false; }
        else limpiarError("run");

        // Nombre
        const nombre = document.getElementById("nombre").value.trim();
        if (!nombre) { mostrarError("nombre", "El nombre es obligatorio."); esValido = false; }
        else if (nombre.length > 50) { mostrarError("nombre", "Máximo 50 caracteres."); esValido = false; }
        else limpiarError("nombre");

        // Apellidos
        const apellidos = document.getElementById("apellidos").value.trim();
        if (!apellidos) { mostrarError("apellidos", "Los apellidos son obligatorios."); esValido = false; }
        else if (apellidos.length > 100) { mostrarError("apellidos", "Máximo 100 caracteres."); esValido = false; }
        else limpiarError("apellidos");

        // Correo
        const correo = document.getElementById("correo").value.trim();
        if (!correo) { mostrarError("correo", "El correo es obligatorio."); esValido = false; }
        else if (correo.length > 100) { mostrarError("correo", "Máximo 100 caracteres."); esValido = false; }
        else {
            const errorCorreo = validarCorreo(correo);
            if (errorCorreo) { mostrarError("correo", errorCorreo); esValido = false; }
            else limpiarError("correo");
        }

        // Contraseña
        const contrasena = document.getElementById("contrasena").value;
        if (contrasena.length < 4 || contrasena.length > 10) {
            mostrarError("contrasena", "La contraseña debe tener entre 4 y 10 caracteres.");
            esValido = false;
        } else limpiarError("contrasena");

        // Confirmar contraseña
        const confirmar = document.getElementById("confirmar-contrasena").value;
        if (confirmar !== contrasena || confirmar === "") {
            mostrarError("confirmar-contrasena", "Las contraseñas no coinciden.");
            esValido = false;
        } else limpiarError("confirmar-contrasena");

        // Dirección
        const direccion = document.getElementById("direccion").value.trim();
        if (!direccion) { mostrarError("direccion", "La dirección es obligatoria."); esValido = false; }
        else if (direccion.length > 300) { mostrarError("direccion", "Máximo 300 caracteres."); esValido = false; }
        else limpiarError("direccion");

        // Región y comuna
        const region = document.getElementById("region").value;
        const comuna = document.getElementById("comuna").value;
        if (!region || !comuna) {
            esValido = false;
            alert("Debes seleccionar región y comuna.");
        }

        if (esValido) {
            alert(`¡Registro exitoso! Bienvenido/a a Florae, ${nombre}.`);
            form.reset();
            poblarComunas("");
        }
    });
}


// FORMULARIO DE LOGIN

function inicializarFormularioLogin() {
    const form = document.getElementById("form-login");
    if (!form) return;

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        let esValido = true;

        const correo = document.getElementById("correo").value.trim();
        if (!correo) { mostrarError("correo", "El correo es obligatorio."); esValido = false; }
        else if (correo.length > 100) { mostrarError("correo", "Máximo 100 caracteres."); esValido = false; }
        else {
            const errorCorreo = validarCorreo(correo);
            if (errorCorreo) { mostrarError("correo", errorCorreo); esValido = false; }
            else limpiarError("correo");
        }

        const contrasena = document.getElementById("contrasena").value;
        if (contrasena.length < 4 || contrasena.length > 10) {
            mostrarError("contrasena", "La contraseña debe tener entre 4 y 10 caracteres.");
            esValido = false;
        } else limpiarError("contrasena");

        if (esValido) {
            alert("Inicio de sesión simulado con éxito.");
            form.reset();
        }
    });
}


// FORMULARIO DE CONTACTO

function inicializarFormularioContacto() {
    const form = document.getElementById("form-contacto");
    if (!form) return;

    const comentario = document.getElementById("comentario");
    const contador = document.getElementById("contador-comentario");

    if (comentario && contador) {
        comentario.addEventListener("input", () => {
            contador.textContent = `${comentario.value.length} / 500`;
        });
    }

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        let esValido = true;

        const nombre = document.getElementById("nombre").value.trim();
        if (!nombre) { mostrarError("nombre", "El nombre es obligatorio."); esValido = false; }
        else if (nombre.length > 100) { mostrarError("nombre", "Máximo 100 caracteres."); esValido = false; }
        else limpiarError("nombre");

        const correo = document.getElementById("correo").value.trim();
        if (correo) {
            if (correo.length > 100) { mostrarError("correo", "Máximo 100 caracteres."); esValido = false; }
            else {
                const errorCorreo = validarCorreo(correo);
                if (errorCorreo) { mostrarError("correo", errorCorreo); esValido = false; }
                else limpiarError("correo");
            }
        } else {
            limpiarError("correo");
        }

        const mensaje = document.getElementById("comentario").value.trim();
        if (!mensaje) { mostrarError("comentario", "El comentario es obligatorio."); esValido = false; }
        else if (mensaje.length > 500) { mostrarError("comentario", "Máximo 500 caracteres."); esValido = false; }
        else limpiarError("comentario");

        if (esValido) {
            alert("¡Gracias por tu mensaje! Te responderemos a la brevedad.");
            form.reset();
            if (contador) contador.textContent = "0 / 500";
        }
    });
}


// PUNTO DE ENTRADA

document.addEventListener("DOMContentLoaded", () => {
    inicializarFormularioRegistro();
    inicializarFormularioLogin();
    inicializarFormularioContacto();
});