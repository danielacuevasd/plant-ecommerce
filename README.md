# Florae — Tienda online de plantas y jardinería

Proyecto semestral de la asignatura **DSY1104 — Desarrollo Fullstack II** (Duoc UC). Consiste en el desarrollo de una tienda online para un vivero, construida de forma incremental a lo largo de tres evaluaciones parciales.

## Estado actual: migración a React (EP2)

El proyecto se encuentra migrando desde HTML/CSS/JS puro (EP1) hacia **React + Vite**. La versión original de EP1 se conserva íntegra en la carpeta [`legacy/`](./legacy) como referencia y respaldo.

## Evaluación Parcial 1 (completada)

Frontend estático desarrollado con **HTML5, CSS3 y JavaScript** (sin frameworks), enfocado en:

- Estructura semántica de las vistas de tienda y administrador.
- Hojas de estilo propias y externas.
- Validaciones de formularios controladas por JavaScript.
- Carrito de compras persistido con `localStorage`.
- Simulación de un mantenedor de productos y usuarios (sin backend).

> El detalle completo de EP1 está documentado dentro de [`legacy/`](./legacy).

## Evaluación Parcial 2 (en curso)

Migración del frontend a **React** utilizando **Vite** como herramienta de build, manteniendo el mismo diseño y funcionalidad de EP1, ahora basado en componentes.

## Estructura del proyecto

```
plant-ecommerce/
├── legacy/                # Proyecto completo de EP1 (HTML, CSS y JS puro)
│   ├── admin/
│   ├── css/
│   ├── js/
│   ├── img/
│   └── *.html
├── src/                   # Proyecto React (EP2 en adelante)
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Inicio.jsx
│   │   ├── Catalogo.jsx
│   │   ├── DetalleProducto.jsx
│   │   ├── Registro.jsx
│   │   ├── Login.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Contacto.jsx
│   │   └── Carrito.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
├── docs/
│   └── ERS.md             # Especificación de requisitos del software
├── index.html             # Punto de entrada de Vite
├── package.json
├── vite.config.js
└── README.md
```

## Cómo ejecutar el proyecto

### Versión React (actual)

```bash
npm install
npm run dev
```

### Versión EP1 (legacy, sin dependencias)

Abre `legacy/index.html` directamente en el navegador, o usa una extensión como "Live Server" en VS Code.

## Roles del sistema

| Rol | Alcance |
|---|---|
| Cliente | Explora el catálogo, gestiona su carrito y puede registrarse. |
| Vendedor | Consulta productos y órdenes (vista administrador). |
| Administrador | Gestión completa de productos y usuarios. |

> En esta etapa, los roles se definen a nivel de datos e interfaz. La autenticación y el control de acceso reales se implementarán junto con la integración a backend, en una evaluación posterior.

## Documentación

El detalle de requerimientos, herramientas y propuesta de diseño se encuentra en [`docs/ERS.md`](./docs/ERS.md).

## Control de versiones

El proyecto se desarrolla bajo la estrategia `main` + `develop` + `feature/*`:

- `main`: versión estable.
- `develop`: rama de integración.
- `feature/*`: una rama por funcionalidad (ej. `feature/vistas-tienda`, `feature/vista-admin`, `feature/migracion-react`).

## Próximas etapas

- Completar la migración de todas las vistas a componentes React.
- Incorporar React Router para la navegación entre páginas.
- Integración de pruebas unitarias con Jasmine y Karma.
- Integración con API REST y base de datos (EP3).

---

**Autora:** Daniela Cuevas
**Asignatura:** DSY1104 — Desarrollo Fullstack II