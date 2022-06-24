let product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get SUMM() {
            return this.price * this.amount
        },
        get KCALL() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 800,
        amount: 0,
        get SUMM() {
            return this.price * this.amount
        },
        get KCALL() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 1100,
        amount: 0,
        get SUMM() {
            return this.price * this.amount
        },
        get KCALL() {
            return this.kcall * this.amount
        }
    }
}

let extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 2000,
        kcall: 100
    },
    lettuce: {
        name: 'Салатный лист',
        price: 4000,
        kcall: 20
    },
    cheese: {
        name: 'Сыр',
        price: 5000,
        kcall: 130
    },
}


let btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut = document.querySelector('.receipt__window-out'),
    payBtn = document.querySelector('.receipt__window-btn');
    
btnPlusOrMinus.forEach((btn) => {
    btn.addEventListener('click', function() {
        plusOrMinus(this)
    })
    let interval = 0;
    btn.addEventListener('mouseup', function() {
        clearInterval(interval) 
    })

    btn.addEventListener('mousedown', function() {
        interval = setInterval(() => plusOrMinus(this),100)
    })
})


function plusOrMinus(element) {
    // closest() - подключаеться к ближайшему заданому родителю
    // getAttribute() - берет значение указанного атрибута
    let parentId = element.closest('.main__product').getAttribute('id')
    let output = element.closest('.main__product').querySelector('.main__product-num')
    let price = element.closest('.main__product').querySelector('.main__product-price span')
    let kcall = element.closest('.main__product').querySelector('.main__product-kcall span')
    
    if(element.getAttribute('data-symbol') == '+') {
        product[parentId].amount++
    }else if(element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }
    
    output.innerHTML = product[parentId].amount
    price.innerHTML = product[parentId].SUMM
    kcall.innerHTML = product[parentId].KCALL
}

checkExtraProduct.forEach(product => {
    product.addEventListener('click', function() {
        addExtraProduct(this)
    })
})

function addExtraProduct(el) {
    let parent = el.closest('.main__product');
    let parentId = parent.getAttribute('id');

    parent[parentId][el.getAttribute('data-extra')] = el.checked

    let price = parent.querySelector('main__product-price span');
    let kcall = parent.querySelector('main__product-kcall span');
    let elData = getAttribute('data-extra');

    if (product[parentId][elData] == true) {
        product[parentId].price += extraProduct[elData].price
        product[parentId].kcall += extraProduct[elData].kcall
    }else{
        product[parentId].price -= extraProduct[elData].price
        product[parentId].kcall -= extraProduct[elData].kcall
    }

    price.innerHTML = product[parentId].SUMM;
    kcall.innerHTML = product[parentId].KCALL;
}

let korzina = [],
    totalName = ''
    totalPrice = 0
    totalPrice = 0

  
addCart.addEventListener('click', () => {
    for(let key in product) {
       let burgers = product[key]
       if(burgers.amount > 0) {
            korzina.push(burgers);
            for(let newKey in burgers){
                if (burgers[newKey] === true) {
                    //'\n' - Экранирование он переносит наш елемент на след строку
                    burgers.name += '\n' + extraProduct[newKey].name
                }
            }
       }
       burgers.price = burgers.SUMM;
       burgers.kcall = burgers.KCALL
    }
    korzina.forEach(item =>{
        totalName = '\n' + item.name + '\n';
        totalPrice = item.price
        totalKcall = item.kcall 
    })
        receipt.style.display = 'flex'
        setTimeout(() => receipt.style.opacity = '1', 100);
        setTimeout(() => receiptWindow.style.top = '0', 200);
        receiptOut.innerHTML= `Ваш заказ: \n ${totalName} \n Kaллорийность: ${totalKcall} Общая сумма: ${totalPrice} сумм`
    })
    
    let lvl = document.querySelector('.header__timer-extra');

    function timer() {
        if(lvl.innerHTML < 100) {
            lvl.innerHTML++
            setTimeout(() => timer(),200)
        }
    }
    timer()


