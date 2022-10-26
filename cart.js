

let cartItems = localStorage.getItem("productsInCart") || [];
cartItems = JSON.parse(cartItems)

function displayCart() {
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem('totalCost');
  for (const item of cartItems) {
    const { tag, name, price, inCart, id } = item;
    const div = document.createElement('div');
    div.setAttribute("id", tag);
    const itemHTML = `
          
           
            <button class="delete-cart cart${id}  onclick="quitarDelCarrito(${id})"" >ELIMINAR</button> 
            <button class="add-product cart${id}" >AGREGAR</button> 
            <div class="product">
           
            <div class="product-reference">
              <img src="./image/${tag}.jpg"> </img>
              <span>${name}</span>
              
              </div>
      

              <div class="price"> ${price}</div>
              <div class="quantity"> 
           
              <span > ${inCart} </span>
             
              </div>
              <div class="total" >
              $${inCart * price},00
              </div>
              </div>
          
            `
    div.innerHTML += itemHTML;
    productContainer.appendChild(div);
  }

  let add = document.querySelectorAll('.add-product');
  for (let i = 0; i < add.length; i++) {
    add[i].addEventListener('click', () => {
      cartNumbersCart(cartItems[i])
      totalCost(cartItems[i])
      Toastify({
        text: "Producto Agregado",
        className: "info",
        style: {
          background: "linear-gradient(to right, #e68e83, #ad7e7b, #d65c85)",
        }
      }).showToast();
    })

  }



  let del = document.querySelectorAll('.delete-cart');
  for (let i = 0; i < del.length; i++) {
    del[i].addEventListener('click', () => {
      cartNumbersDecrece(cartItems[i])
      decreceTotalCost(cartItems[i])
      Toastify({
        text: "Producto ELIMINADO",
        className: "info",
        style: {
          background: "linear-gradient(to right, #e68e83, #ad7e7b)",
        }
      }).showToast();

    })


  }



}


onLoadCartNumbersCart();
displayCart();



function onLoadCartNumbersCart() {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers != null && (document.querySelector('.cart span').textContent = productNumbers);
}


const seccionResumen = document.querySelector('#resum')
function displayResume() {
  let cartCost = localStorage.getItem("totalCost")
  seccionResumen.innerHTML = " "
  const resumen = `
    <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
             Total Carrito
             </h4>
             <h4 class="basketTotal">
             $ ${cartCost},00
             </h4>
       <button ><a class="btn" href="form.html">Comprar</a> </button>
    </div>`
  seccionResumen.innerHTML += resumen
}

displayResume();










/*AGREGAR PRODUCTOS */


function setItemsCart(p) {
  const prod = cartItems.find(prod => prod.id == p.id)
  prod.inCart++
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}



function cartNumbersCart(product) {

  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);

  localStorage.setItem('cartNumbers', productNumbers + 1);
  document.querySelector('.cart span').textContent = productNumbers + 1;
  setItemsCart(product);
  onLoadCartNumbersCart();
  const prod = cartItems.find(prod => prod.id == product.id)
  resetProduct(prod);
  window.location.reload();
}



function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');
  if (cartCost != null) {
    cartCost = parseInt(cartCost) + product.price;
    localStorage.setItem("totalCost", cartCost);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}


function decreceTotalCost(product) {
  let totalItems = localStorage.getItem('cartNumbers');
  let cartCost = localStorage.getItem('totalCost');
  cartCost = parseInt(cartCost) - product.price;
  if (totalItems < 0) { cartCost = totalItems }
  localStorage.setItem("totalCost", cartCost);

}


function cartNumbersDecrece(product) {

  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if (productNumbers != 0) {
    localStorage.setItem('cartNumbers', productNumbers - 1);
    document.querySelector('.cart span').textContent = productNumbers - 1;
    deleteItem(product);
  }
  onLoadCartNumbersCart();
  const prod = cartItems.find(prod => prod.id == product.id)
  resetProduct(prod)
  window.location.reload();
}





/*ELIMINAR PRODUCTOS */



function deleteItem(p) {
  const prod = cartItems.find(prod => prod.id == p.id)
  if (prod.inCart === 1) {
    cartItems.splice(cartItems.findIndex(prod => prod.id == p.id), 1)
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    decreceTotalCost(p)
    window.location.reload();
  } else {
    prod.inCart--
  }

  localStorage.setItem('productsInCart', JSON.stringify(cartItems))

}


function resetProduct(product) {

  let containerProd = document.querySelector("#" + product.tag);
  containerProd.innerHTML =
    `   <button class="delete-cart cart${product.id}  onclick="quitarDelCarrito(${product.id})"" >ELIMINAR</button> 
  <button class="add-product cart${product.id}" >AGREGAR</button> 
  <div class="product">
 
  <div class="product-reference">
    <img src="./image/${product.tag}.jpg"> </img>
    <span>${product.name}</span>
    
    </div>


    <div class="price"> ${product.price}</div>
    <div class="quantity"> 
 
    <span > ${product.inCart} </span>
   
    </div>
    <div class="total" >
    $${product.inCart * product.price},00
    </div>
    </div>

    `;

}


