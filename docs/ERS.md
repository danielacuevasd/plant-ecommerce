# Documento ERS — Especificación de Requisitos del Software

**Proyecto:** Florae — Tienda online de plantas y jardinería
**Asignatura:** DSY1104 — Desarrollo Fullstack II
**Versión:** 1.0 (propuesta previa, EP1)
**Estado:** En construcción — este documento se irá completando durante el semestre

---

## 1. Introducción

Florae es una tienda online dedicada a la venta de plantas, macetas, sustratos y herramientas básicas de jardinería. El proyecto busca digitalizar la experiencia de compra de un vivero, permitiendo a los clientes explorar un catálogo, agregar productos a un carrito de compras y —en etapas posteriores— completar una compra real, mientras un equipo administrador gestiona el catálogo y los usuarios del sistema.

Este documento corresponde a la primera versión del ERS, elaborada durante el desarrollo de la Evaluación Parcial 1 (EP1), cuyo alcance se limita a la construcción del frontend con HTML, CSS y JavaScript, sin integración a backend ni base de datos.

## 2. Objetivo del proyecto

Desarrollar una aplicación web de comercio electrónico para un vivero, que permita:

- A los **clientes**, explorar el catálogo, revisar el detalle de cada producto y gestionar un carrito de compras.
- A los **vendedores**, consultar el catálogo de productos y sus pedidos.
- A los **administradores**, gestionar el catálogo completo de productos y los usuarios del sistema.

## 3. Alcance por evaluación

| Evaluación | Alcance |
|---|---|
| **EP1** (actual) | Frontend estático con HTML5, CSS3 y JavaScript vanilla. Estructura de vistas tienda + admin, validaciones de formularios en JS, carrito con `localStorage`. Sin backend ni base de datos. |
| **EP2** (futura) | Pruebas unitarias de frontend con Jasmine y Karma (RA2). Posible incorporación de React y Bootstrap. |
| **EP3** (futura) | Integración frontend/backend mediante API REST conectada a una base de datos (RA3). |

## 4. Requerimientos funcionales

### 4.1 Vista tienda (pública)

| ID | Requerimiento |
|---|---|
| RF-01 | El sistema debe mostrar una página de inicio con información general de la tienda y productos destacados. |
| RF-02 | El sistema debe listar todos los productos disponibles, mostrando imagen, nombre y precio. |
| RF-03 | El sistema debe permitir ver el detalle de un producto individual, incluyendo descripción y productos relacionados. |
| RF-04 | El sistema debe permitir agregar productos al carrito de compras desde el listado y desde el detalle. |
| RF-05 | El carrito debe persistir mientras el usuario navega, utilizando almacenamiento local del navegador (`localStorage`). |
| RF-06 | El usuario debe poder modificar la cantidad de un producto en el carrito o eliminarlo. |
| RF-07 | El sistema debe permitir aplicar un cupón de descuento simulado sobre el total del carrito. |
| RF-08 | El sistema debe contar con un formulario de registro de usuario, con validaciones en tiempo real. |
| RF-09 | El sistema debe contar con un formulario de inicio de sesión, con validaciones en tiempo real. |
| RF-10 | El sistema debe contar con un formulario de contacto, con validaciones en tiempo real. |
| RF-11 | El sistema debe mostrar una página "Nosotros" con información institucional de la tienda. |

### 4.2 Vista administrador

| ID | Requerimiento |
|---|---|
| RF-12 | El sistema debe mostrar un panel de administración con resumen de productos, usuarios y alertas de stock crítico. |
| RF-13 | El administrador debe poder ver un listado de todos los productos, con su código, nombre, categoría, precio, stock y estado. |
| RF-14 | El administrador debe poder crear un nuevo producto, indicando código, nombre, descripción, precio, stock, stock crítico, categoría e imagen. |
| RF-15 | El administrador debe poder editar y eliminar un producto existente. |
| RF-16 | El administrador debe poder ver un listado de todos los usuarios registrados, con su RUN, nombre, correo y tipo de usuario. |
| RF-17 | El administrador debe poder crear un nuevo usuario, indicando RUN, nombre, apellidos, correo, contraseña, tipo de usuario, región, comuna y dirección. |
| RF-18 | El administrador debe poder editar y eliminar un usuario existente. |

### 4.3 Roles del sistema

| Rol | Permisos |
|---|---|
| **Cliente** | Solo puede acceder a la vista pública de la tienda (explorar catálogo, comprar, registrarse). |
| **Vendedor** | Puede visualizar el listado de productos y sus detalles, y el listado de órdenes. No tiene acceso a la gestión de usuarios ni a otras funciones administrativas. |
| **Administrador** | Tiene acceso total al sistema, incluyendo la gestión de productos y usuarios. |

> Nota: en esta etapa (EP1), los roles están definidos a nivel de datos y de interfaz (selección de "Tipo de usuario" en el formulario de administración), pero **no existe un sistema de autenticación ni control de acceso real**, ya que esto requiere integración con backend (ver sección 3, EP3).

## 5. Requerimientos no funcionales

| ID | Requerimiento |
|---|---|
| RNF-01 | El sitio debe construirse utilizando HTML5 semántico, CSS3 y JavaScript, sin frameworks, para esta evaluación. |
| RNF-02 | El diseño debe ser consistente en todas las vistas, mediante una hoja de estilos externa. |
| RNF-03 | El sitio debe ser responsivo, adaptándose a pantallas de escritorio, tablet y móvil. |
| RNF-04 | Los formularios deben validar los datos ingresados en tiempo real, mostrando mensajes de error claros y específicos. |
| RNF-05 | El código debe organizarse siguiendo una separación de responsabilidades (estructura, estilos y comportamiento en archivos independientes). |
| RNF-06 | El proyecto debe versionarse en un repositorio Git con al menos 3 ramas, y commits descriptivos. |

## 6. Herramientas y tecnologías

| Categoría | Herramienta |
|---|---|
| Estructura | HTML5 |
| Estilos | CSS3 (hojas de estilo propias: `estilos.css` para tienda, `admin.css` para el panel administrador) |
| Comportamiento | JavaScript (ES6+), sin librerías externas |
| Control de versiones | Git + GitHub (repositorio público: `plant-ecommerce`) |
| Diseño de referencia | Figma Make (prototipo visual, no utilizado como código) |
| Persistencia temporal | `localStorage` del navegador (carrito de compras) |
| Planificado para etapas futuras | Jasmine y Karma (pruebas unitarias), React, Bootstrap, API REST, base de datos |

## 7. Propuesta de diseño

### 7.1 Identidad de marca

- **Nombre:** Florae
- **Estilo:** cálido, natural, editorial — combina tipografía serif para títulos con sans-serif para texto de cuerpo.

### 7.2 Paleta de colores

| Color | Uso | Código |
|---|---|---|
| Crema | Fondo principal | `#F5F1E8` |
| Verde oscuro | Textos destacados, botones principales, header/footer | `#33402A` |
| Terracota | Acentos, enlaces destacados | `#C1633D` |
| Blanco | Tarjetas, formularios | `#FFFFFF` |

### 7.3 Tipografía

- Títulos: fuente serif (Lora, con Georgia como respaldo).
- Texto de cuerpo: fuente sans-serif (Inter, con Segoe UI como respaldo).

> Nota: la integración de Google Fonts para cargar las tipografías reales queda pendiente para una etapa posterior; actualmente se utilizan las fuentes de respaldo del sistema.

## 8. Estructura de páginas (sitemap)

```
Tienda (pública)
├── Home
├── Productos
│   └── Detalle de producto
├── Registro
├── Login
├── Nosotros
├── Contacto
└── Carrito

Administrador
├── Inicio (resumen)
├── Productos
│   └── Nuevo / Editar producto
└── Usuarios
    └── Nuevo / Editar usuario
```

## 9. Estado actual del desarrollo (EP1)

- [x] Estructura HTML de las 8 vistas de la tienda
- [x] Estructura HTML de las 5 vistas de administrador
- [x] Hoja de estilos de la tienda (`estilos.css`)
- [x] Hoja de estilos del panel administrador (`admin.css`)
- [x] Lógica de productos y renderizado dinámico (`productos.js`)
- [x] Carrito de compras con `localStorage` (`carrito.js`)
- [x] Validaciones de formularios (`validaciones.js`)
- [x] Lógica del panel administrador: CRUD simulado de productos y usuarios (`admin.js`)
- [ ] Imágenes definitivas de productos, logo y banner principal
- [ ] Integración de tipografías Google Fonts
- [ ] Documento ERS completo (versión final)

## 10. Pendientes y próximas etapas

- Completar la carga de imágenes reales del catálogo.
- Definir con mayor detalle los requerimientos no funcionales de rendimiento y accesibilidad.
- Evaluar la incorporación de Jasmine y Karma para pruebas unitarias (EP2).
- Diseñar el modelo de datos que sustentará la futura integración con base de datos (EP3).
- Definir el contrato de la API REST para la comunicación frontend/backend (EP3).

---

*Este documento es una propuesta previa y se actualizará de forma incremental durante el desarrollo del proyecto.*