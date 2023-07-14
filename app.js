//form elements
const form = {
    products: document.getElementById('products'),
    orders: document.getElementById('orders'),
    package: document.getElementById('package'),
    accounting: document.getElementById('accounting'),
    terminal: document.getElementById('terminal')
};

//summary elements
const summary = {
    products: document.querySelector('[data-id=products]'),
    orders: document.querySelector('[data-id=orders]'),
    package: document.querySelector('[data-id=package]'),
    accounting: document.querySelector('[data-id=accounting]'),
    terminal: document.querySelector('[data-id=terminal]'),
    totalPrice: document.querySelector('[data-id=total-price]')
};

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
};

let prices_calculated={
    products: 0,
    orders: 0,
    package:0,
    accounting: 0,
    terminal: 0
}
form.package.addEventListener('click', function (e) {
    this.classList.toggle('open');
});

function processInput(inputElement, summaryElement){
    inputElement.addEventListener('input', function () {
        if (inputElement.value) {
            summaryElement.classList.add('open');
        }else{
            summaryElement.classList.remove('open');
        }
        prices_calculated[this.id] = this.value * prices[this.id] ;
        summaryElement.children[1].textContent=`${this.value} * $${prices[this.id]}`;
        summaryElement.children[2].textContent=`$${prices_calculated[this.id]}`;
    });
}


processInput(form.products, summary.products);
processInput(form.orders, summary.orders);

