



let number = 0;

async function fetchProducts() {
    let response = await fetch('./data.json')
    return await response.json()
}

let products = [];

fetchProducts().then(stock => {
    products = stock
    showProducts()
})



const seccionProducts = document.querySelector('.container')

function showProducts() {
    for (const product of products) {
        const { tag, name, price, inCart, id } = product;
        const productHTML = `
        <div class="image">
        <img src="image/${tag}.jpg"> </img>
        <h3> ${name}</h3>
        <h3>$${price}0</h3>
        <button class="add-cart cart${id}" >add Cart</button> 
        </div>
        `
        seccionProducts.innerHTML += productHTML;

    }

    let addCarts = document.querySelectorAll('.add-cart');
    for (let i = 0; i < addCarts.length; i++) {
        addCarts[i].addEventListener('click', () => {
            cartNumbers(products[i]);
            totalCost(products[i]);
            Toastify({
                text: "Producto Agregado",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #e68e83, #ad7e7b, #d65c85)",
                }
              }).showToast();
        })


    }
    onLoadCartNumbers();
}

//showProducts();
const cartItems= JSON.parse(localStorage.getItem('productsInCart')) || [];
function setItems(p){
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

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
} 





function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');
    //El tipo que trae es string//
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



function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers != null && (document.querySelector('.cart span').textContent = productNumbers);
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

onLoadCartNumbers();