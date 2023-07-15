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
    totalPrice: document.querySelector('#total-price')
};

//default prices
const prices = {
    products: 0.5,
    orders: 0.25,
    package: {
        premium: 60,
        professional: 25,
        basic: 0
    },
    accounting: 35,
    terminal: 5
};

//prices calculated [price, amount*price, $+price]
let pricesCalculated = {
    products: [],
    orders: [],
    package: [],
    accounting: [],
    terminal: []
}

function processInput(inputElement) {
    inputElement.addEventListener(inputElement.type === undefined ? 'click' : 'input', function (e) {
        switch (inputElement.type) {
            case undefined:
                this.classList.toggle('open');
                if (e.target.tagName === 'LI') {
                    pricesCalculated[this.id][0] = prices[this.id][e.target.getAttribute('data-value')];
                    pricesCalculated[this.id][1] = e.target.textContent;
                    pricesCalculated[this.id][2] = `$${prices[this.id][e.target.getAttribute('data-value')]}`;
                }
                break;
            case 'checkbox':
                if (this.checked) {
                    pricesCalculated[this.id][0] = prices[this.id];
                    pricesCalculated[this.id][1] = `$${pricesCalculated[this.id][0]}`;
                } else {
                    pricesCalculated[this.id] = [];
                }
                break;
            case 'number':
                pricesCalculated[this.id][0] = this.value * prices[this.id];
                pricesCalculated[this.id][1] = `${this.value} * $${prices[this.id]}`;
                pricesCalculated[this.id][2] = `$${pricesCalculated[this.id][0]}`;
                break;
        }
        displayCalculatedPrice(pricesCalculated[this.id], summary[this.id]);
        displayTotalPrice(pricesCalculated,summary.totalPrice);
    });
}

function displayCalculatedPrice(calculatedPrice, summaryElement) {
    if (typeof calculatedPrice[0] === 'number') {
        summaryElement.classList.add('open');
        calculatedPrice.slice(1,3).forEach((item,index)=>{
            summaryElement.children[index+1].textContent = calculatedPrice[index+1];
        });
    } else {
        summaryElement.classList.remove('open');
    }
}

function displayTotalPrice(calculatedPrice, summaryElement) {
    summaryElement.children[1].textContent='$'+ Object.values(calculatedPrice).flat().filter(item=>typeof item==='number').reduce((total,item)=>total+item,0);
}

Object.keys(form).forEach(key => {
    processInput(form[key]);
});
