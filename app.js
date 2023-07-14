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

let prices_calculated = {
    products: [],
    orders: [],
    package: [],
    accounting: [],
    terminal: []
}

function processInput(inputElement) {
    inputElement.addEventListener(inputElement.type===undefined ? 'click':'input', function (e) {
        switch (inputElement.type) {
            case undefined:
                this.classList.toggle('open');
                if(e.target.tagName==='LI') {
                    prices_calculated[this.id][0] = prices[this.id][e.target.getAttribute('data-value')];
                    prices_calculated[this.id][1] = e.target.getAttribute('data-value');
                    prices_calculated[this.id][2] = `$${prices[this.id][e.target.getAttribute('data-value')]}`;
                }
                break;
            case 'checkbox':
                if (this.checked) {
                    prices_calculated[this.id][0] = prices[this.id];
                    prices_calculated[this.id][1] = `$${prices_calculated[this.id][0]}`;
                }
                else {
                    prices_calculated[this.id]=[];
                }
                break;
            case 'number':
                prices_calculated[this.id][0] = this.value * prices[this.id];
                prices_calculated[this.id][1] = `${this.value} * $${prices[this.id]}`;
                prices_calculated[this.id][2] = `$${prices_calculated[this.id][0]}`;
                break;
        }
        displayCalculatedPrice(prices_calculated[this.id],summary[this.id]);
    });
}

function displayCalculatedPrice(calculatedPrice, summaryElement) {
    if (typeof calculatedPrice[0] === 'number') {
        summaryElement.classList.add('open');
        summaryElement.children[1].textContent = calculatedPrice[1];
        if(summaryElement.children[2]) {
            summaryElement.children[2].textContent = calculatedPrice[2];
        }
    } else {
        summaryElement.classList.remove('open');
    }

}

processInput(form.products);
processInput(form.orders);
processInput(form.package);
processInput(form.accounting);
processInput(form.terminal);

