let addCarts = document.querySelectorAll('.add-cart');

let number = 0;

class Product{
    constructor(id,name,precio){
        this.id = id;
        this.name = name.toUpperCase();
        this.price= parseFloat(precio);
        this.inCart = parseInt (0);
        
    }
}

async function fetchProducts(){
    let response = await fetch('./data.json')
    return await response.json()
}

let stock =[];

fetchProducts().then(products => {
    stock = products
    showProducts()
})



const seccionProducts = document.querySelector('.container')

function showProducts(){
    for( product of stock){
        const {tag, name, price, inCart,id} = product;
        const productHTML = `
        <div class="image">
        <img src="image/${tag}.jpg"> </img>
        <h3> ${name}</h3>
        <h3>$${price}0</h3>
        <a class="add-cart cart${id}" href="#">add Cart</a> 
        </div>
        `
        seccionProducts.innerHTML += productHTML
    }
}

showProducts();




function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null){
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + product.price);
    } else {
    localStorage.setItem("totalCost", product.price);
    }
}


let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || [];



function setItems(id) {

    const product = stock.find(product => product.id = id);
    if(cartItems.find(product = product.id == id)){
        const product = cartItems.find(product => product.id == id)
            product.cant++
    } else {
         cartItems.push({
            ...product,
            cant: 1
         })
    }
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        //Uso el stingify para no pasarlo como objeto. 
}



function cartNumbers(product){

 let productNumbers = localStorage.getItem('cartNumbers');
 //El tipo que trae es string//
 productNumbers= parseInt(productNumbers);
 if(productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers +1;
 } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = productNumbers;
 }
 setItems(product.id);
}



/*TIENE LO QUE PIDE LA CLASE 12*/

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers!=null  && (document.querySelector('.cart span').textContent = productNumbers);
}




for (let i= 0; i < addCarts.length; i++){
    addCarts[i].addEventListener('click',()=>{
        cartNumbers(stock[i]);
        Toastify({
            text: "Agregaste " + stock[i].name,
            duration: 3000,
            gravity: 'bottom',
            position: 'left',
            style: {
                background: 'rgba(253, 108, 122, 1)'
            }
    
        }).showToast();
    
        })
}

onLoadCartNumbers();