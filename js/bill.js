window.onload = function () {
  let mapaProductos = new Map();
  let tabla = document.querySelector("table");

  if (localStorage.key != null) {
    for (let i = 0; i < localStorage.length; i++) {
      let clave = localStorage.key(i);
      let valor = JSON.parse(localStorage[clave]);
      mapaProductos.set(clave, valor);
    }
    let cantidadTotal = 0;
    let contadorProductos = 1;
    for ([clave, valor] of mapaProductos) {
      let fila = document.createElement("tr");
      let celda1 = document.createElement("td");
      let celda2 = document.createElement("td");
      let celda3 = document.createElement("td");
      let celda4 = document.createElement("td");
      let celda5 = document.createElement("td");

      celda1.classList.add("no");
      celda2.classList.add("desc");
      celda3.classList.add("unit");
      celda4.classList.add("qty");
      celda5.classList.add("total");

      celda1.textContent = contadorProductos;
      contadorProductos++;
      celda2.textContent = valor.nombre;
      celda3.textContent = valor.precio;
      celda4.textContent = valor.cantidad;
      celda5.textContent = parseInt(valor.precio * valor.cantidad) + "€";

      tabla.appendChild(fila);
      fila.appendChild(celda1);
      fila.appendChild(celda2);
      fila.appendChild(celda3);
      fila.appendChild(celda4);
      fila.appendChild(celda5);

      cantidadTotal += parseInt(valor.precio * valor.cantidad);
    }
    let precioTotal = document.querySelector(".precioTotal");
    let celdaPrecioTotal = document.createElement("td");
    celdaPrecioTotal.textContent = cantidadTotal + "€";
    precioTotal.appendChild(celdaPrecioTotal);    

    //Imprimir pdf
    document.querySelector(".pdf").addEventListener("click",descargarPDF);
    function descargarPDF(){
        let divPrint = document.querySelector(".print");
        html2pdf().set({
            margin:0.5,
            filename: "DetallesFactura.pdf",
            image:{
                type:"jpeg",
                quality:0.9
            },
            html2canvas: {
                scale: 3,
                letterRendering: true,
            },
            jsPDF: {
                unit: "in",
                format: "a4",
                orientation: "landscape",
            }
        })
        .from(divPrint).save();
    }
  }

};
