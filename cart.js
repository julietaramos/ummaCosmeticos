
function onLoadCartNumbersCart() {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers != null && (document.querySelector('.cart span').textContent = productNumbers);
}
 
let cartItems=localStorage.getItem("productsInCart") || [];
 cartItems = JSON.parse(cartItems)

function displayCart(){
 let productContainer = document.querySelector(".products");
 let cartCost = localStorage.getItem('totalCost');
 for(const item of cartItems){
    const {tag, name, price, inCart, id} = item;
         const itemHTML = `
          
           
                     <button class="delete-cart cart${id}" >ELIMINAR</button> 
            <button class="add-product cart${id}" >AGREGAR</button> 
            <div class="product">
           
            <div class="product-reference">
              <img src="./image/${tag}.jpg"> </img>
              <span>${name}</span>
              
              </div>
      

              <div class="price"> ${price}</div>
              <div class="quantity"> 
           
              <span> ${inCart} </span>
             
              </div>
              <div class="total">
              $${inCart * price},00
              </div>
              </div>
          
            `
            productContainer.innerHTML += itemHTML;
 }
  
     let deleteProduct = document.querySelectorAll('.delete-cart');
     for(let i = 0; i< deleteProduct.length; i++){
           deleteProduct[i].addEventListener('click',()=>{
             deleteProd(inCart[i]);
            })

     }

     let addProduct = document.querySelectorAll('.add-product')
     for (let i= 0; i < addProduct.length; i++){
        addProduct[i].addEventListener('click',()=>{
            cartNumbersCart(products[i]);
            })
    } 

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                 Total Carrito
                 </h4>
                 <h4 class="basketTotal">
                 $ ${cartCost},00
                 </h4>
        <button onclick="JSalert()">COMPRAR</button>
        </div>
     
           `;

           onLoadCartNumbersCart(); 
    }
displayCart();





function JSalert(){
	Swal.fire({  title: "Require Email!",   
    text: "Enter your email address:",   
    type: "input",   
    showCancelButton: true,   
    closeOnConfirm: false,   
    animation: "slide-from-top",   
    inputPlaceholder: "Your Email address" }, 
    
    function(inputValue){   
        if (inputValue === false) 
        return false;      
           if (inputValue === "") {     
            swal.showInputError("Please enter email!");     
            return false   
            }      
         swal("Action Saved!", "You entered following email: " + inputValue, "success"); });
         //deleteProducts();
}







/*PARA ELIMINAR PRODUCTO*/

function deleteProd(producto){

  let prod= Array.from(cartItems).find((p) => p.id === producto.id)
    if (prod.inCart === 1) {
        carrito.splice(carrito.findIndex(p => p.id == producto.id), 1)
    } else {
        prod.inCart--
    }
    ReduceItems(producto);
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
    decreceTotalCost(producto)
    displayCart();
}

function cartNumbersReduce(){

    let productNumbers = localStorage.getItem('cartNumbers');
    //El tipo que trae es string//
    productNumbers= parseInt(productNumbers);
    if(productNumbers != 0 ){
       localStorage.setItem('cartNumbers', productNumbers - 1);
       document.querySelector('.cart span').textContent = productNumbers -1;
    } else {
       localStorage.setItem('cartNumbers', 0);
       document.querySelector('.cart span').textContent = productNumbers;
    }
   
   }


function decreceTotalCost(product){
    let cartCost = localStorage.getItem('totalCost');
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost - product.price);
    } 

  /*PARA AGREGAR PRODUCTO*/


function setItemsCart(p){
    const prod = products.find(prod => prod.id == p.id )
    if (cartItems.find (prod => prod.id== p.id)){
        const prod = cartItems.find(prod => prod.id == p.id)
        prod.inCart++
    } else {
        cartItems.push({
            ...prod,
            inCart: 1
        })
        
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
    totalCostCart(p[i]);
    displayCart();
} 

  

function cartNumbersCart(product) {

  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.cart span').textContent = productNumbers + 1;
  } else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.cart span').textContent = productNumbers;
  }
  setItems(product);
}


 function totalCostCart(product){
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null){
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + product.price);
    } else {
    localStorage.setItem("totalCost", product.price);
    }
}
  





