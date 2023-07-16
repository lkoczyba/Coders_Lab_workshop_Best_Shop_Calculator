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

//prices calculated
let pricesCalculated = {
    products: 0,
    orders: 0,
    package: 0,
    accounting: 0,
    terminal: 0
}

function processInput(inputElement) {
    inputElement.addEventListener(inputElement.type === undefined ? 'click' : 'input', function (e) {
        let displayArray = [];
        switch (inputElement.type) {
            case undefined:
                this.classList.toggle('open');
                if (e.target.tagName === 'LI') {
                    pricesCalculated[this.id] = prices[this.id][e.target.getAttribute('data-value')];
                    displayArray[0] = e.target.textContent;
                    displayArray[1] = `$${pricesCalculated[this.id]}`;
                }
                break;
            case 'checkbox':
                if (this.checked) {
                    pricesCalculated[this.id] = prices[this.id];
                    displayArray[0] = `$${pricesCalculated[this.id]}`;
                } else {
                    pricesCalculated[this.id] = 0;
                }
                break;
            case 'number':
                if (this.checkValidity()) {
                    pricesCalculated[this.id] = this.value * prices[this.id];
                    displayArray[0] = `${this.value} * $${prices[this.id]}`;
                    displayArray[1] = `$${pricesCalculated[this.id]}`;
                }else{
                    alert('Value must be greater than zero and be an integer');
                }
                break;
        }
        displayCalculatedPrice(displayArray, summary[this.id]);
        displayTotalPrice(pricesCalculated,summary.totalPrice);
    });
}

function displayCalculatedPrice(displayArray, summaryElement) {
    if (displayArray.length>0) {
        summaryElement.classList.add('open');
        displayArray.forEach((item,index)=>{
            summaryElement.children[index+1].textContent = displayArray[index];
        });
    } else {
        summaryElement.classList.remove('open');
    }
}

function displayTotalPrice(calculatedPrice, summaryElement) {
    summaryElement.children[1].textContent='$'+ Object.values(calculatedPrice).reduce((total,item)=>total+item,0);
}

Object.keys(form).forEach(key => {
    processInput(form[key]);
});
