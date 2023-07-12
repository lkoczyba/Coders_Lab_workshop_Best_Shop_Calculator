//form elements
const form = {
    products: document.getElementById('products'),
    orders: document.getElementById('orders'),
    package: document.getElementById('package'),
    accounting: document.getElementById('accounting'),
    terminal: document.getElementById('terminal')
}

//summary elements
const summary = {
    products: document.querySelector('[data-id=products]'),
    orders: document.querySelector('[data-id=orders]'),
    package: document.querySelector('[data-id=package]'),
    accounting: document.querySelector('[data-id=accounting]'),
    terminal: document.querySelector('[data-id=terminal]'),
    totalPrice: document.querySelector('[data-id=total-price]')
}

const prices ={
    products: 0.5,
    orders: 0.25,
    package:{
        premium: 60,
        professional: 25,
        basic: 0
    },
    accounting: 35,
    terminal: 5
}
form.package.addEventListener('click', function (e) {
    this.classList.toggle('open');
});

form.products.addEventListener('input', function () {
    if (this.value > 0) {
        summary.products.classList.add('open');
    }else{
        summary.products.classList.remove('open');
    }
    summary.products.children[1].textContent=`${this.value} * $${prices.products}`;
    summary.products.children[2].textContent=`$${this.value*prices.products}`;
});