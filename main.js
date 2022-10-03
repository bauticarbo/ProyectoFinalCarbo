function traerProductos() {
  fetch('data.json')
    .then((res) => res.json())
    .then((json) => {
      let productosHTML;

      for (const item of json) {
        productosHTML += `<div class="prod"><p>Producto: ${item.prod} <br>Precio: $${item.precio}</p><button class="btn-prod" id="btn${item.id}" onclick="sumarAlCarrito(${item.id}); renderCarrito()">Agregar al carrito</button></div>`;
      }

      document.getElementById('productos').innerHTML = productosHTML;
    })
    .catch((e) => {
      console.log(e);
    });
}

function sumarAlCarrito(id) {
  fetch('data.json')
    .then((res) => res.json())
    .then((json) => {
      carrito.push(json[id]);
      totalCarrito += json[id].precio;

      carritoFinal.innerHTML = `<p>Los productos que colocó en el carrito son: </p>`;
      for (let i = 0; i < carrito.length; i++) {
        carritoFinal.innerHTML += `<div>- ${carrito[i].prod}  $${carrito[i].precio} <button class="btn-eliminar"  onclick="eliminarDelCarrito(${carrito[i].id}); renderCarrito()">Eliminar del carrito</button></div>`;
      }

      carritoFinal.innerHTML += `<p> Sumando un total de $${totalCarrito}</p> <div><button class="btn-finalizar" id="btn-finalizar" onclick="">FINALIZAR COMPRA</button></div>`;

      Toastify({
        text: 'Producto agregado!',
        duration: 2000,
      }).showToast();
    });
}

function eliminarDelCarrito(id) {
  fetch('data.json')
    .then((res) => res.json())
    .then((json) => {
      carritoAct = carrito.filter((el) => el.id != id);
      carrito = carritoAct;
      totalCarrito -= json[id].precio;

      carritoFinal.innerHTML = `<p>Los productos que colocó en el carrito son: </p>`;
      for (let i = 0; i < carrito.length; i++) {
        carritoFinal.innerHTML += `<div>- ${carrito[i].prod}  $${carrito[i].precio} <button class="btn-eliminar"  onclick="eliminarDelCarrito(${carrito[i].id}); renderCarrito()">Eliminar del carrito</button></div>`;
      }

      carritoFinal.innerHTML += `<p> Sumando un total de $${totalCarrito}</p> <div><button class="btn-finalizar" id="btn-finalizar" onclick="">FINALIZAR COMPRA</button></div>`;
    });
  Toastify({
    text: 'Producto eliminado!',
    duration: 2000,
  }).showToast();
}
function renderCarrito() {
  carritoJSON = JSON.stringify(carrito);
  localStorage.setItem('carritoLS', carritoJSON);
}
let carrito;

let carritoFinal = document.getElementById('carritoFinal');

let carritoEnLS = JSON.parse(localStorage.getItem('carritoLS'));

traerProductos();

if (carritoEnLS) {
  carrito = carritoEnLS;
  carritoFinal.innerHTML = `<p>Los productos que colocó en el carrito son: </p>`;
  for (let i = 0; i < carrito.length; i++) {
    carritoFinal.innerHTML += `<div>- ${carrito[i].prod}  $${carrito[i].precio} <button class="btn-eliminar"  onclick="eliminarDelCarrito(${carrito[i].id}); renderCarrito()">Eliminar del carrito</button></div>`;
    /*carritoFinal.innerHTML += `<p> Sumando un total de $${totalCarrito}</p> <div><button class="btn-finalizar" id="btn-finalizar" onclick="">FINALIZAR COMPRA</button></div>`;*/
  }
} else {
  carrito = [];
  carritoFinal.innerHTML = '<b>Aún no tiene ningun producto en el carrito.</b>';
}

carritoFinal.className = 'totalProductos';

console.log(carrito);

//-----------------------------------------------
