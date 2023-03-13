window.onload = function () {
  let meterEnMain = document.querySelector("main");
  let mapaProductos = new Map();
  let numeroArticulos = document.querySelector(".articulos");
  let cantidadTotal = document.querySelector(".subtotal");

  // Cargamos los productos del JSON
  async function cargar() {
    let response = await fetch("./js/products.json");
    let productos = await response.json();

    function pintarProductos() {
      // Section "productos(keycaps)"
      let seccionTodosProductos = document.createElement("section");
      seccionTodosProductos.classList.add("keycap");
      // Div "divCompleto"
      let divCompleto = document.createElement("div");
      divCompleto.classList.add("divCompleto");
      // Div "KeycapSet"
      let divKeycapSet = document.createElement("div");
      divKeycapSet.classList.add("keycapSet");
      // Span "Keycap Set"
      let spanKeyCapSet = document.createElement("span");
      spanKeyCapSet.textContent = "Keycap Set";
      // Div "Productos"
      let divProductos = document.createElement("div");
      divProductos.classList.add("divProductos");

      // Section "productos(mousepads)"
      let seccionTodosProductos2 = document.createElement("section");
      seccionTodosProductos2.classList.add("mousepad");
      // Div "divCompleto"
      let divCompleto2 = document.createElement("div");
      divCompleto2.classList.add("divCompleto");
      // Div "KeycapSet"
      let divKeycapSet2 = document.createElement("div");
      divKeycapSet2.classList.add("mousepads");
      // Span "Keycap Set"
      let spanKeyCapSet2 = document.createElement("span");
      spanKeyCapSet2.textContent = "Mousepads";
      // Div "Productos"
      let divProductos2 = document.createElement("div");
      divProductos2.classList.add("divProductos");
      // Separador HR
      let separador = document.createElement("hr");
      separador.classList.add("separador");

      // Inserciones estaticas(keycaps)
      meterEnMain.appendChild(seccionTodosProductos);
      seccionTodosProductos.appendChild(divCompleto);
      divCompleto.appendChild(divKeycapSet);
      divKeycapSet.appendChild(spanKeyCapSet);
      divCompleto.appendChild(divProductos);

      // Separador
      meterEnMain.appendChild(separador);

      // Inserciones estaticas(mousepad)
      meterEnMain.appendChild(seccionTodosProductos2);
      seccionTodosProductos2.appendChild(divCompleto2);
      divCompleto2.appendChild(divKeycapSet2);
      divKeycapSet2.appendChild(spanKeyCapSet2);
      divCompleto2.appendChild(divProductos2);

      // Recorrer los productos del JSON para que se impriman en la tienda
      for (let producto of productos) {
        //Div "PorProducto"
        let divPorProducto = document.createElement("div");
        divPorProducto.classList.add("divPorProducto");
        // Div "imagen"
        let divImagen = document.createElement("div");
        divImagen.classList.add("divImagen");
        // Imagen dentro del div
        let imagen = document.createElement("img");
        imagen.src = `./img/${producto.foto}`;
        // Div "divDescripcion"
        let divDescripcion = document.createElement("div");
        divDescripcion.classList.add("divDescripcion");
        // H4 "titulo del producto"
        let tituloProducto = document.createElement("h4");
        tituloProducto.textContent = `${producto.nombre}`;
        // P "precio del producto"
        let precio = document.createElement("p");
        precio.textContent = `${producto.precio}`;
        // Span "añadir al carrito"
        let spanCarrito = document.createElement("span");
        spanCarrito.textContent = "Añadir al carrito";
        spanCarrito.classList.add("spanCarrito");
        spanCarrito.addEventListener("click", moverACarrito);

        // Inserciones con repeticion
        if (producto.tipo == "keycap") {
          divProductos.appendChild(divPorProducto);
          divPorProducto.appendChild(divImagen);
          divPorProducto.appendChild(divDescripcion);
          divDescripcion.appendChild(tituloProducto);
          divDescripcion.appendChild(precio);
          divDescripcion.appendChild(spanCarrito);
          divImagen.appendChild(imagen);
        }
        // Inserciones con repetición
        if (producto.tipo == "mousepad") {
          divProductos2.appendChild(divPorProducto);
          divPorProducto.appendChild(divImagen);
          divPorProducto.appendChild(divDescripcion);
          divDescripcion.appendChild(tituloProducto);
          divDescripcion.appendChild(precio);
          divDescripcion.appendChild(spanCarrito);
          divImagen.appendChild(imagen);
        }
      }
    }
    pintarProductos();

    // Referencias al botón de carrito
    let botonCarrito = document
      .querySelector(".mostrarCarrito")
      .addEventListener("click", mostrarCarrito);
    let divCarrito = document.querySelector(".carrito");

    // Al hacer click en el icono del carrito, aparece por la derecha
    function mostrarCarrito() {
      divCarrito.classList.toggle("meterCarrito");
    }
    // Se hace traversing para seleccionar el nombre, el precio y la foto de cada producto para moverlo al carrito
    function moverACarrito() {
      let nombreProducto = this.parentNode.children[0].textContent;
      let precio = this.parentNode.children[1].textContent;
      precio = precio.substring(0, precio.length - 1);
      let imagen = this.parentNode.previousElementSibling.children[0].src;
      console.log(nombreProducto, precio, imagen);

      // Almaceno características del producto en un objeto para más adelante poder guardalo en un mapa
      let productoComprado = {
        nombre: nombreProducto,
        precio: precio,
        cantidad: 1,
      };
      // Si el mapa tiene el nombre de ese producto, aumentamos la cantidad de uno en uno y lo guardamos en el mapa
      if (mapaProductos.has(nombreProducto)) {
        productoComprado.cantidad =
          mapaProductos.get(nombreProducto).cantidad + 1;
        console.log(productoComprado.cantidad);
        mapaProductos.set(nombreProducto, productoComprado);

        // Para darle un nombre único a cada cantidad. Es para actualizar la cantidad correspondiente al producto deseado
        let selectorCantidad = document.querySelector(
          `.${nombreProducto.replaceAll(" ", "")}cantidad`
        );
        selectorCantidad.textContent =
          parseInt(selectorCantidad.textContent) + 1;
      } else {
        // Guardamos el producto en un mapa. La clave será el nombre del producto y el valor es el objeto (que creamos más arriba) con varias características de ese mismo producto
        mapaProductos.set(nombreProducto, productoComprado);
        // Div "PorProducto"
        let divPorProductoEnCarrito = document.createElement("div");
        divPorProductoEnCarrito.classList.add("divPorProductoEnCarrito");
        // Div "imagen"
        let divImagenEnCarrito = document.createElement("div");
        divImagenEnCarrito.classList.add("divImagenEnCarrito");
        // Imagen dentro del div
        let imagenEnCarrito = document.createElement("img");
        imagenEnCarrito.src = imagen;
        // Div "divDescripcion"
        let divDescripcionEnCarrito = document.createElement("div");
        divDescripcionEnCarrito.classList.add("divDescripcionEnCarrito");
        // H4 "titulo del producto"
        let tituloProductoEnCarrito = document.createElement("h4");
        tituloProductoEnCarrito.classList.add("tituloProductoEnCarrito");
        tituloProductoEnCarrito.textContent = nombreProducto;
        tituloProductoEnCarrito.style.color = "white";
        // P "precio del producto"
        let precioEnCarrito = document.createElement("p");
        precioEnCarrito.classList.add("precioEnCarrito");
        precioEnCarrito.textContent = `${precio}€`;
        // P "cantidad de productos"
        let cantidadEnCarrito = document.createElement("p");
        cantidadEnCarrito.classList.add("cantidadEnCarrito");
        cantidadEnCarrito.innerHTML = `Cantidad: <span class="${nombreProducto.replaceAll(
          " ",
          ""
        )}cantidad"> 1</span>`;
        // Label "borrar producto"
        let borrarProductoCarrito = document.createElement("label");
        borrarProductoCarrito.classList.add("borrarProductoCarrito");
        borrarProductoCarrito.innerHTML += `<i class="fa-regular fa-trash-can"></i>`;

        let productosCarrito = document.querySelector(".productos");

        // Apendear todo en el carrito
        productosCarrito.appendChild(divPorProductoEnCarrito);
        divPorProductoEnCarrito.appendChild(divImagenEnCarrito);
        divImagenEnCarrito.appendChild(imagenEnCarrito);
        divPorProductoEnCarrito.appendChild(divDescripcionEnCarrito);
        divDescripcionEnCarrito.appendChild(tituloProductoEnCarrito);
        divDescripcionEnCarrito.appendChild(precioEnCarrito);
        divDescripcionEnCarrito.appendChild(borrarProductoCarrito);
        divDescripcionEnCarrito.appendChild(cantidadEnCarrito);
      }
      let contadorArticulos = 0;
      let contadorPrecio = 0;
      // Actualizar el contador del número de artículos y el de precio total
      for ([nombre, productoComprado] of mapaProductos) {
        contadorArticulos += productoComprado.cantidad;
        contadorPrecio += productoComprado.precio * productoComprado.cantidad;
      }
      numeroArticulos.textContent = contadorArticulos;

      cantidadTotal.textContent = contadorPrecio;

      eliminarTodasPapeleras();
    }

    // Para que el icono de la pelera de borrado surta efecto en todos los productos sino de lo contrario, solo permitía borrar el primer producto del carrito
    function eliminarTodasPapeleras(){
      let papeleras = document.querySelectorAll(".borrarProductoCarrito");
      for(let papelera of papeleras){
        papelera.addEventListener("click",eliminarProducto);
      }

    }
    // Se hace traversing de nuevo para seleccionar lo que queremos borrar del mapa y del HTML
    function eliminarProducto() {
      let nombreProducto = this.parentNode.children[0].textContent;
      let quitarCantidad = parseInt(this.nextElementSibling.children[0].textContent);
      let precioProducto = mapaProductos.get(nombreProducto).precio * quitarCantidad;

      this.parentNode.parentNode.remove();
      mapaProductos.delete(nombreProducto);

      numeroArticulos.textContent = parseInt(numeroArticulos.textContent) - quitarCantidad;
      cantidadTotal.textContent = parseFloat(cantidadTotal.textContent-precioProducto,2);
    }

    document.querySelector(".pagar").addEventListener("click",exportarFactura);
    
    // Función para almacenar en el LocalStorage el Mapa y que imprima esos objetos en la factura
    function exportarFactura(){
      localStorage.clear();
      for([clave,valor]of mapaProductos){
        localStorage.setItem(clave, JSON.stringify(valor));
      }
      window.location.href="bill.html";
    }
  }
  cargar();
};
