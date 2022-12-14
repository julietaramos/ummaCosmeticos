new Cleave('#tarjeta', {
    creditCard: true,
    onCreditCardTypeChanged: function (type) {
        console.log('Credit card type changed: ', type);
    }
})

new Cleave('#vencimiento', {
    date: true,
    datePattern: ['m', 'y'],
    delimiter: '/'
});

new Cleave('#codigo', {
    numericOnly: true,
    blocks: [3]
});

document.querySelector('#confirmarCompra').addEventListener('click', (e) => {
    e.preventDefault()
    Swal.fire(
        'Listo!',
        'Gracias por tu compra!',
        'success'
    )
    localStorage.removeItem("productsInCart")
    localStorage.removeItem("totalCost")
    localStorage.removeItem("cartNumbers")
    redireccionar();

    setTimeout(() => {
        window.location.href = "/"
    }, 3000)
})




function redireccionar(){ document.location.href=index.html;}