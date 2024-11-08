// Guardar el carrito en el almacenamiento local
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Función para obtener los productos del archivo JSON
const getProducts = async () => {
  try {
      const response = await fetch("data.json");  // Cargar los productos desde data.json
      if (!response.ok) {
          throw new Error("Error al cargar los productos");
      }

      const data = await response.json();  // Parsear el JSON

      // Recorrer y mostrar los productos en el DOM
      data.forEach((product) => {
          let content = document.createElement("div");
          content.className = "card";
          content.innerHTML = `
              <img src="${product.img}" alt="${product.nombre}">
              <h3>${product.nombre}</h3>
              <p class="price">${product.precio} $</p>
          `;
          document.getElementById("shopContent").append(content);

          // Botón de compra
          let comprar = document.createElement("button");
          comprar.innerText = "Comprar";
          comprar.className = "comprar";
          content.appendChild(comprar);

          // Lógica del botón de compra (añadir al carrito)
          comprar.addEventListener("click", () => {
              const repeat = carrito.some((prod) => prod.id === product.id);
              if (repeat) {
                  carrito.map((prod) => {
                      if (prod.id === product.id) {
                          prod.cantidad++;
                      }
                  });
              } else {
                  carrito.push({
                      id: product.id,
                      img: product.img,
                      nombre: product.nombre,
                      precio: product.precio,
                      cantidad: 1,
                  });
              }
              carritoCounter();  // Actualizamos el contador del carrito
              saveLocal();  // Guardamos el carrito en el localStorage
          });
      });
  } catch (error) {
      console.error("Error al cargar los productos:", error);
  }
};

// Llamar a getProducts después de que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  getProducts();
});

// Actualizar el contador del carrito
const carritoCounter = () => {
  const cantidadCarrito = document.getElementById("cantidadCarrito");
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;
  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));  // Guardamos el total del carrito

  cantidadCarrito.innerText = carritoLength;
};
