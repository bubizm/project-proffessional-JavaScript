const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

function send(onError, onSuccess, url, method = 'GET', data = '', headers = {}, timeout = 60000) {
 
  let xhr;

  if (window.XMLHttpRequest) {
    // Chrome, Mozilla, Opera, Safari
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) { 
    // Internet Explorer
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  for([key, value] of Object.entries(headers)) {
    xhr.setRequestHeader(key, value)
  }

  xhr.timeout = timeout; 

  xhr.ontimeout = onError;

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if(xhr.status < 400) {
        onSuccess(xhr.responseText)
      } else if (xhr.status >= 400) {
        onError(xhr.status)
      }
    }
  }

  xhr.open(method, url, true);

  xhr.send(data);
}

function getCounter() {
  let last = 0;

  return () => ++last;
}

function getGoodStackInCart() {
  delMiddleRow();
  cart.list.forEach(element => {
    let showGoodInCart = `
  <tr class="table-row__middle" data-id="${element.id}">
    <th>${element.good.title}</th>
    <th>${element.count}</th>
    <th>${element.good.price}</th>
    <th>${element.getTotal(element.good.price)}</th>
    <th><button class="plus">+</button> | <button class="minus">-</button></th>
  </tr>`;
  tableRowBottomEl.insertAdjacentHTML('beforebegin', showGoodInCart);
  })
  totalPrice = getTotalPrice();
  sumEl.textContent = totalPrice;
}

function delMiddleRow() {
  const tableRowMiddleEls = document.querySelectorAll('.table-row__middle');
  tableRowMiddleEls.forEach(el=> {
    el.remove();
  })
}

function getTotalPrice() {
  let total = 0;
  cart.list.forEach(element => {
    
    total += element.getTotal(element.good.price);
  })
  return total;
}

const stackIDGenrator = getCounter();
let totalPrice = 0;

const buttonEl = document.querySelector('.cart-button');
const tableRowBottomEl = document.querySelector('.table-row__bottom');

const sumEl = tableRowBottomEl.querySelector('.sum');



class Good {
  constructor({id, title, price}) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  getId() {
    return this.id;
  }

  getPrice() {
    return this.price;
  }

  getTitle() {
    return this.title;
  }
}

class GoodStack {
  constructor(good) {
    this.id = stackIDGenrator();
    this.good = good;
    this.count = 1;
  }

  getGoodId() {
    return this.good.id
  }

  getGood(){
    return this.good;
  }

  getCount() {
    return this.count;
  }

  getTotal(price) {
    return this.count * price;
  }

  add() {
    this.count++;
    return this.count;
  }

  remove() {
    this.count--;
    return this.count;
  }
}

class Cart {
  constructor(){
    this.list = []
  }

  add(good) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id)

    if(idx >= 0) {
      this.list[idx].add()
    } else {
      this.list.push(new GoodStack(good))
    }

  }

  remove(id) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == id)

    if(idx >= 0) {
      this.list[idx].remove()

      if(this.list[idx].getCount() <= 0) {
        this.list.splice(idx, 1)
      }
    } 

  }
}

class Showcase {
  constructor(cart){
    this.list = [];
    this.cart = cart;
  }

  fetchGoods() {
    this.list = [
      new Good({id: 1, title: 'Футболка', price: 140}),
      new Good({id: 2, title: 'Брюки', price: 320}),
      new Good({id: 3, title: 'Галстук', price: 24})
    ]
  }

  addToCart(id) {
    const idx = this.list.findIndex((good) => id == good.id)

    if(idx >= 0) {
      this.cart.add(this.list[idx])
    }
    
  }

  drawGoodInShowcase(id, title, price) {
    const drawGood = `<div class="goods-item" style='border: 1px solid black; max-width: 200px' data-id="${id}"><h3>${title}</h3><p>${price}</p></div>
    <button class="goods-item__button">Добавить в корзину</button>`;
    goodsListEl.insertAdjacentHTML('beforeend', drawGood);
  }
}



const cart = new Cart()
const showcase = new Showcase(cart)

showcase.fetchGoods();

const goodsListEl = document.querySelector('.goods-list');

let list = showcase.list;
list.forEach(element => {
  showcase.drawGoodInShowcase(element.id, element.title, element.price);
});

showcase.addToCart(1)
showcase.addToCart(1)
showcase.addToCart(1)
showcase.addToCart(3)

cart.remove(1)

getGoodStackInCart();

console.log(showcase, cart)


buttonEl.addEventListener('click', event => {
  event.target.nextElementSibling.classList.toggle('hidden');
});

const goodsItemEls = goodsListEl.querySelectorAll('.goods-item__button');
goodsItemEls.forEach(element => {
  element.addEventListener('click', event => {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  const idEl = +event.target.previousElementSibling.dataset.id;

  showcase.addToCart(idEl);
  getGoodStackInCart();
})
})


const cartRectangle = document.querySelector('.cartRectangle');


cartRectangle.addEventListener('click', event => {
  const name = event.target.parentElement.parentElement.children[0].textContent;
  let idEl = 0;
  if (event.target.className === 'plus') {

  list.forEach(element => {
    if (element.title !== name) {
      return;
    } else {
      idEl = element.id;
    }
  })
  

  showcase.addToCart(idEl);
  getGoodStackInCart();
}

if (event.target.className === 'minus') {
  // const id = +event.target.parentElement.parentElement.dataset.id;

  list.forEach(element => {
    if (element.title !== name) {
      return;
    } else {
      idEl = element.id;
    }
  })

  cart.remove(idEl);
  getGoodStackInCart();
}
})


setTimeout(() => {
  showcase.addToCart(123)
  showcase.addToCart(123)
  showcase.addToCart(123)
  showcase.addToCart(456)

  cart.remove(123)


  console.log(showcase, cart)
}, 1000)




// Создать класс для отрисовки каточки товара на витрине, и класс отрисовки карточки товара в корзине, класс отрисовки корзины, и класс отрисовки витрины