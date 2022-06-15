const API_URL = 'http://localhost:3000';

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

const stackIDGenrator = getCounter()
let totalPrice = 0;


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

  getPrice() {
    return this.good.price * this.count
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

  _onError(err) {
    console.log(err);
  }

  add(good) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id)

    if(idx >= 0) {
      this.list[idx].add()
    } else {
      this.list.push(new GoodStack(good))
    }
    drawGoodsInCart.getGoodStackInCart();
  }

  remove(id) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == id)

    if(idx >= 0) {
      this.list[idx].remove()

      if(this.list[idx].getCount() <= 0) {
        this.list.splice(idx, 1)
      }
    } 
    drawGoodsInCart.getGoodStackInCart();
  }

    addToServer(good) {
      send(this._onError, response => {
        const data = JSON.parse(response);

        if (data.result == 1) {
          this.add(good);
        }
      }, `${API_URL}/api/v1/addToBasket`);
    }

    delToServer(id) {
      send(this._onError, response => {
        const data = JSON.parse(response);

        if (data.result === 1) {
          this.remove(id);
        }
      }, `${API_URL}/api/v1/deleteFromBasket`)
    }
  }

class Showcase {
  constructor(cart){
    this.list = [];
    this.cart = cart;
  }

  _onSuccess(response) {
    const data = JSON.parse(response)
    data.forEach(product => {
      this.list.push(
        new Good({id: product.id, title:product.title, price:product.price})
      )
    });
  }

  _onError(err) {
    console.log(err);
  }

  fetchGoods() {
    send(this._onError, this._onSuccess.bind(this), `${API_URL}/api/v1/showcase`)
  }

  addToCart(id) {
    const idx = this.list.findIndex((good) => id == good.id)

    if(idx >= 0) {
      this.cart.addToServer(this.list[idx])
    }
  }
}

class DrawShowcase {
  constructor(showcaseList) {
    this.showcase = showcaseList;
  }

  draw() {
    this.showcase.forEach(element => {
      const drawGood = `<div class="goods-item" style='border: 1px solid black; max-width: 200px' data-id="${element.id}">
      <h3>${element.title}</h3>
      <p>${element.price}</p>
      </div>
    <button class="goods-item__button">Добавить в корзину</button>`;
    goodsListEl.insertAdjacentHTML('beforeend', drawGood);
    })
  }
}

class DrawGoodsInCart {
  constructor(cart) {
    this.cart = cart;
  }

  getGoodStackInCart() {
    const tableRowMiddleEls = document.querySelectorAll('.table-row__middle');
    tableRowMiddleEls.forEach(el=> {
      el.remove();
    })

    this.cart.list.forEach(element => {
      let showGoodInCart = `
    <tr class="table-row__middle" data-id="${element.id}">
      <th>${element.good.title}</th>
      <th>${element.count}</th>
      <th>${element.good.price}</th>
      <th>${element.getPrice()}</th>
      <th><button class="plus">+</button> | <button class="minus">-</button></th>
    </tr>`;
    tableRowBottomEl.insertAdjacentHTML('beforebegin', showGoodInCart);
    })
    totalPrice = drawGoodsInCart.getTotalPrice();
    sumEl.textContent = totalPrice;
  }

  getTotalPrice() {
    let total = 0;
    cart.list.forEach(element => {
      
      total += element.getPrice();
    })
    return total;
  }
}

class PlusInCart {
  constructor (showcase) {
    this.showcase = showcase;
  }

  plus(event) {
      const name = event.target.parentElement.parentElement.children[0].textContent;
      let idEl = 0;
      if (event.target.className !== 'plus') {
        return;
      }
    
      list.forEach(element => {
        if (element.title !== name) {
          return;
        } else {
          idEl = element.id;
        }
      })
    
      this.showcase.addToCart(idEl);
      drawGoodsInCart.getGoodStackInCart();
}
}

class MinusInCart {
  constructor (cart) {
    this.cart = cart;
  }
  minus(event) {
    const name = event.target.parentElement.parentElement.children[0].textContent;
    let idEl = 0;

      if (event.target.className !== 'minus') {
        return;
      }  
      
      list.forEach(element => {
        if (element.title !== name) {
          return;
        } else {
          idEl = element.id;
        }
      })

      this.cart.delToServer(idEl);
      drawGoodsInCart.getGoodStackInCart();
      
  }
}

class AddInCartFromButton {
  constructor(showcase) {
    this.showcase = showcase;
  }

  addInCart(event) {
    const idEl = +event.target.previousElementSibling.dataset.id;
    
    this.showcase.addToCart(idEl);
    drawGoodsInCart.getGoodStackInCart();
  }
}

function drawAll() {
  drawShowcase.draw();
  drawGoodsInCart.getGoodStackInCart();
}

const cart = new Cart()
const showcase = new Showcase(cart)
const buttonEl = document.querySelector('.cart-button');
const tableRowBottomEl = document.querySelector('.table-row__bottom');
const sumEl = tableRowBottomEl.querySelector('.sum');
const cartRectangle = document.querySelector('.cartRectangle');

const plus = new PlusInCart(showcase);
const minus = new MinusInCart(cart);
cartRectangle.addEventListener('click', event => {
  if (event.target.className === 'plus') {
    plus.plus(event);
  };
  if (event.target.className === 'minus') {
    minus.minus(event);
  };
})

buttonEl.addEventListener('click', event => {
  event.target.nextElementSibling.classList.toggle('hidden');
});

showcase.fetchGoods();

const goodsListEl = document.querySelector('.goods-list');
let list = showcase.list;
const drawShowcase = new DrawShowcase(list);

const addInCartFromBtn = new AddInCartFromButton(showcase);

const bodyEl = document.querySelector('body');
bodyEl.addEventListener('click', event => {
    if ((event.target.tagName === 'BUTTON') && 
    (event.target.className === 'goods-item__button')) {
      addInCartFromBtn.addInCart(event);
    }
  })


setTimeout(() => {
  drawAll();
  console.log(showcase, cart)

}, 100)

const drawGoodsInCart = new DrawGoodsInCart(cart);

console.log(showcase, cart)
