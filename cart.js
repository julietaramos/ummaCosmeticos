import{onLoadCartNumbers} from "./home.js";

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null){
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + product.price);
    } else {
    localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
 let cartItems = localStorage.getItem("productsInCart");
 cartItems = JSON.parse(cartItems); 
 let productContainer = document.querySelector(".products");
 let cartCost = localStorage.getItem('totalCost');
 if(cartItems && productContainer){
        productContainer.innerHTML = ' ';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
              <ion-icon name="close-circle"></ion-icon>
              <img src="./image/${item.tag}.jpg"> </img>
              <span>${item.name}</span>
              </div>
              <div class="price"> ${item.price}</div>
              <div class="quantity"> 
              <ion-icon class="decrease" name="arrow-dropleft-circle"> </ion-icon>
              <span> ${item.inCart} </span>
              <ion-icon class="increase" name="arrow-dropright-circle"> </ion-icon>
              </div>
              <div class="total">
              $${item.inCart * item.price},00
              </div>
            `;
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                 Total Carrito
                 </h4>
                 <h4 class="basketTotal">
                 $ ${cartCost},00
        `;
}
}

onLoadCartNumbers();
fetchProducts().then(productsJason => {
    products = productsJason;
    showProducts();
})