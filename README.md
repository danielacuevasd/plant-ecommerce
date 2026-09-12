# Florae — Tienda online de plantas y jardinería

Proyecto semestral de la asignatura **DSY1104 — Desarrollo Fullstack II**. Consiste en el desarrollo de una tienda online para un vivero, construida de forma incremental a lo largo de tres evaluaciones parciales.

## Evaluación Parcial 1 (actual)

Frontend estático desarrollado con **HTML5, CSS3 y JavaScript** (sin frameworks), enfocado en:

- Estructura semántica de las vistas de tienda y administrador.
- Hojas de estilo propias y externas.
- Validaciones de formularios controladas por JavaScript.
- Carrito de compras persistido con `localStorage`.
- Simulación de un mantenedor de productos y usuarios (sin backend).

## Estructura del proyecto

```
plant-ecommerce/
├── admin/
│   ├── index.html
│   ├── productos.html
│   ├── nuevo-producto.html
│   ├── usuarios.html
│   └── nuevo-usuario.html
├── css/
│   ├── estilos.css       # Estilos de la vista tienda
│   └── admin.css         # Estilos del panel administrador
├── js/
│   ├── productos.js       # Datos y renderizado de productos
│   ├── carrito.js         # Lógica del carrito (localStorage)
│   ├── validaciones.js    # Validaciones de formularios (tienda)
│   └── admin.js           # Lógica del panel administrador
├── img/
├── docs/
│   └── ERS.md             # Especificación de requisitos del software
├── index.html
├── productos.html
├── detalle-producto.html
├── registro.html
├── login.html
├── nosotros.html
├── contacto.html
├── carrito.html
└── README.md
```

## Cómo ejecutar el proyecto

Al ser un proyecto de frontend estático, no requiere instalación de dependencias:

1. Clona el repositorio.
2. Abre `index.html` en tu navegador (o usa una extensión como "Live Server" en VS Code).

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
- `feature/*`: una rama por funcionalidad (ej. `feature/vistas-tienda`, `feature/vista-admin`).

## Próximas etapas

- Integración de pruebas unitarias con Jasmine y Karma.
- Posible incorporación de React y Bootstrap.
- Integración con API REST y base de datos.