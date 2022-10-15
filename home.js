let addCarts = document.querySelectorAll('.add-cart');

let number = 0;

class Product{
    constructor(id,name,precio,inCart){
        this.id = id;
        this.name = name.toUpperCase();
        this.price= parseFloat(precio);
        
    }
}

async function fetchProducts(){
    const response= await fetch('./data.json')
    return await response.json()
}

let stock =[];

fetchProducts().then(products => {
    stock = products;
    showProducts();
})



const seccionProducts = document.querySelector('.container')

function showProducts(){
    for( product of stock){
        const {tag, name, price, inCart} = product;
        const productHTML = `
        <div class="image">
        <img src="image/${tag}.jpg"> </img>
        <h3> ${name}</h3>
        <h3>$${price}0</h3>
        <a class="add-cart cart1" href="#">add Cart</a> 
        </div>
        `
        seccionProducts.innerHTML += productHTML
    }
}

showProducts();




function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems); //paso de JSON a JS object
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){ //undefined es porque ese obj no esta en el JSON
            cartItems = {
                ...cartItems, //agarro todo lo que esaba en el cartItems 
                [product.tag]: product //Agrego el nuevo producto
            }
        }
      cartItems[product.tag].inCart += 1;
    } else {
    product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
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
 setItems(product);
}




function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers!=null  && (document.querySelector('.cart span').textContent = productNumbers);
}




for (let i= 0; i < addCarts.length; i++){
    addCarts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
        Toastify({
            text: "Agregaste " + products[i].name,
            duration: 3000,
            gravity: 'bottom',
            position: 'left',
            style: {
                background: 'rgba(253, 108, 122, 1)'
            }
    
        }).showToast();
    
        })
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null){
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + product.price);
    } else {
    localStorage.setItem("totalCost", product.price);
    }
}

