// Obtener los productos del carrito
const pintarCarrito = () => {
   const modalContainer = document.getElementById("modal-container");
   modalContainer.innerHTML = "";  // Limpiar contenido del modal

   modalContainer.style.display = "flex";  // Mostrar el modal

   const modalHeader = document.createElement("div");
   modalHeader.className = "modal-header";
   modalHeader.innerHTML = `
       <h1 class="modal-header-title">Carrito.</h1>
   `;
   modalContainer.append(modalHeader);

   const modalbutton = document.createElement("h1");
   modalbutton.innerText = "x";
   modalbutton.className = "modal-header-button";
   modalbutton.addEventListener("click", () => {
       modalContainer.style.display = "none";  // Cerrar el modal
   });

   modalHeader.append(modalbutton);

   carrito.forEach((product) => {
       let carritoContent = document.createElement("div");
       carritoContent.className = "modal-content";
       carritoContent.innerHTML = `
           <img src="${product.img}">
           <h3>${product.nombre}</h3>
           <p>${product.precio} $</p>
           <span class="restar"> - </span>
           <p>Cantidad: ${product.cantidad}</p>
           <span class="sumar"> + </span>
           <p>Total: ${product.cantidad * product.precio}</p>
       `;

       modalContainer.append(carritoContent);

       // Botón para restar cantidad
       let restar = carritoContent.querySelector(".restar");
       restar.addEventListener("click", () => {
           if (product.cantidad > 1) {
               product.cantidad--;
               saveLocal();  // Guardar cambios en localStorage
               pintarCarrito();  // Actualizar la vista del carrito
           }
       });

       // Botón para sumar cantidad
       let sumar = carritoContent.querySelector(".sumar");
       sumar.addEventListener("click", () => {
           product.cantidad++;
           saveLocal();  // Guardar cambios en localStorage
           pintarCarrito();  // Actualizar la vista del carrito
       });

       // Botón para eliminar producto
       let eliminar = document.createElement("span");
       eliminar.innerText = "❌";
       eliminar.className = "delete-product";
       carritoContent.append(eliminar);

       eliminar.addEventListener("click", () => eliminarProducto(product.id));  // Eliminar producto del carrito
   });

   // Mostrar total del carrito
   const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
   const totalBuying = document.createElement("div");
   totalBuying.className = "total-content";
   totalBuying.innerHTML = `Total a pagar: ${total} $`;
   modalContainer.append(totalBuying);
};

// Eliminar producto del carrito
const eliminarProducto = (id) => {
   carrito = carrito.filter((product) => product.id !== id);  // Filtrar el producto por id
   carritoCounter();  // Actualizar contador del carrito
   saveLocal();  // Guardar los cambios en localStorage
   pintarCarrito();  // Volver a pintar el carrito
};

// Mostrar el carrito cuando se hace clic
const verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener("click", pintarCarrito);

// Cargar carrito del localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
carritoCounter();  // Inicializar contador al cargar la página
