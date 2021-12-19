function getCounter() {
  let last = 0;

  return () => ++last;
}

function getGoodStackInCart() {
  cart.list.forEach(element => {
    let showGoodInCart = `
  <tr class="table-row__top">
    <th>${element.good.title}</th>
    <th>${element.count}</th>
    <th>${element.good.price}</th>
    <th>${element.getTotal(element.good.price)}</th>
  </tr>`;
  tableRowBottomEl.insertAdjacentHTML('beforebegin', showGoodInCart);
  })
  totalPrice = getTotalPrice();
  sumEl.textContent = totalPrice;
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

  drawGoodInShowcase(title, price) {
    const drawGood = `<div class="goods-item" style='border: 1px solid black; max-width: 200px'><h3>${title}</h3><p>${price}</p></div>`;
    goodsListEl.insertAdjacentHTML('beforeend', drawGood);
  }
}



const cart = new Cart()
const showcase = new Showcase(cart)

showcase.fetchGoods();

const goodsListEl = document.querySelector('.goods-list');

let list = showcase.list;
list.forEach(element => {
  showcase.drawGoodInShowcase(element.title, element.price);
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
})