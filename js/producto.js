// Selecciona elementos relevantes
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const botonAgregarCarrito = document.querySelector("#agregarCarrito");
const botonVaciarCarrito = document.querySelector("#vaciar-carrito");

let arrayCarrito = []; // Contenedor de artículos seleccionados

// Registra eventos
document.addEventListener('DOMContentLoaded', () => {
    botonAgregarCarrito.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    botonVaciarCarrito.addEventListener('click', vaciarCarrito);
});

// Función para agregar un curso al carrito
function agregarCurso(e) {
    e.preventDefault();

    // Encuentra el producto seleccionado
    const producto = e.target.closest(".texto");

    const infoProducto = {
        imagen: document.querySelector(".carousel-item.active img").src, // Imagen del producto
        titulo: producto.querySelector("h3.titulo").textContent,       // Título del producto
        precio: producto.querySelector("h4.titulo:nth-of-type(1)").textContent.trim(), // Precio
        talle: producto.querySelector(".form-check-input:checked")?.value || "Sin seleccionar",
        uniqueKey: `${producto.querySelector("#agregarCarrito").dataset.id}-${producto.querySelector(".form-check-input:checked")?.value || "NA"}`,
        cantidad: 1
    };


    // Verifica si el producto ya existe en el carrito
    const existe = arrayCarrito.some(item => item.uniqueKey === infoProducto.uniqueKey);

    if (existe) {
        // Incrementa la cantidad si ya existe
        arrayCarrito = arrayCarrito.map(item => {
            if (item.uniqueKey === infoProducto.uniqueKey) {
                item.cantidad++;
            }
            return item;
        });
    } else {
        // Agrega el nuevo producto al carrito
        arrayCarrito.push(infoProducto);
    }

    // Actualiza el HTML del carrito
    carritoHTML();
}

// Función para eliminar un producto del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const uniqueKey = e.target.dataset.id;

        // Filtra para eliminar el producto seleccionado
        arrayCarrito = arrayCarrito.filter(item => item.uniqueKey !== uniqueKey);

        carritoHTML();
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    arrayCarrito = []; // Resetea el carrito
    carritoHTML(); // Limpia el HTML del carrito
}

// Actualiza el carrito en el HTML
function carritoHTML() {
    // Limpia el carrito
    contenedorCarrito.innerHTML = '';

    // Recorre el carrito y genera filas
    arrayCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.titulo}</td>
            <td class="TALLE">${producto.talle}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><a href="#" class="borrar-curso nav-link" data-id="${producto.uniqueKey}">X</a></td>
        `;
        contenedorCarrito.appendChild(row);
    });
}