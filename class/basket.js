class Basket extends Order {
  constructor() {
    super();
    this.basket = JSON.parse(localStorage.getItem('basket'));
  }

  initHTML() {
    this.clearBasketBtn = document.querySelector('.cart__button-clear');
    this.cartEmpty =  document.querySelector('.cart__container');
    this.cartFull =  document.querySelector('.cart-full__container');
  }

  addListener() {
    this.initHTML();
    this.clearBasketBtn.addEventListener('click', this.clearBasket);
  }

  checkCart() {
    if(localStorage.getItem('basket') && localStorage.getItem('secret')) {
      this.cartEmpty.classList.add('cart_hide-elements');
      this.cartFull.classList.remove('cart_hide-elements');
    } else {
      this.cartFull.classList.add('cart_hide-elements');
      this.cartEmpty.classList.remove('cart_hide-elements');
    }
  }

  outputBottom() {
    this.CART_CONTAINER_MIDDLE = document.querySelector('.cart__container-middle');
    const SPAN_PRICE = document.querySelector('.span-price');
    const SPAN_QUANTITY = document.querySelector('.span-quantity');

    const CART_CONTAINER_BOTTOM = document.createElement('div');
    const CART_CONTAINER_BOTTOM_PRICE = document.createElement('div');
    const CART_TEXT_QUANTITY = document.createElement('p');
    const CART_SPAN_QUANTITY = document.createElement('span');
    const CART_TEXT_PRICE = document.createElement('p');
    const CART_SPAN_PRICE = document.createElement('span');

    CART_CONTAINER_BOTTOM.classList.add("cart__container-bottom");
    CART_CONTAINER_BOTTOM_PRICE.classList.add('cart__container-bottom-price');
    CART_TEXT_QUANTITY.classList.add('cart__text-quantity');
    CART_TEXT_PRICE.classList.add('cart__text-price');
    CART_SPAN_QUANTITY.classList.add('cart__span-quantity');
    CART_SPAN_PRICE.classList.add('cart__span-price');

    this.CART_CONTAINER_MIDDLE.after(CART_CONTAINER_BOTTOM);
    CART_CONTAINER_BOTTOM.append(CART_CONTAINER_BOTTOM_PRICE);
    CART_CONTAINER_BOTTOM_PRICE.append(CART_TEXT_QUANTITY);
    CART_TEXT_QUANTITY.append('All products: ');
    CART_TEXT_QUANTITY.append(CART_SPAN_QUANTITY);
    CART_CONTAINER_BOTTOM_PRICE.append(CART_TEXT_PRICE);
    CART_TEXT_PRICE.append('Order price: ');
    CART_TEXT_PRICE.append(CART_SPAN_PRICE);

    if(localStorage.getItem('secret')) {
      SPAN_PRICE.innerText = `${this.countOrderPrice()} UAH`;
      SPAN_QUANTITY.innerText = this.countProduct(); 
    }

    CART_SPAN_QUANTITY.innerText = this.countProduct(); 
    CART_SPAN_PRICE.innerText = `${this.countOrderPrice()} UAH`;

    this.SPAN_PRICE = SPAN_PRICE;
    this.SPAN_QUANTITY = SPAN_QUANTITY;
    this.CART_SPAN_PRICE = CART_SPAN_PRICE;
    this.CART_SPAN_QUANTITY = CART_SPAN_QUANTITY;
  }

  outputBasket() {
    this.CART_CONTAINER_MIDDLE = document.querySelector('.cart__container-middle');
    this.basket.forEach(element => {
      const PRODUCT = document.createElement('div');
      const PRODUCT_IMAGE = document.createElement('img');
      const PRODUCT_CHARACTERISTIC_BLOCK = document.createElement('div');
      const PRODUCT_NAME = document.createElement('h2');
      const PRODUCT_COUNTER_BLOCK = document.createElement('div');
      const PRODUCT_COUNTER_BUTTON_MINUS = document.createElement('button');
      const PRODUCT_COUNTER_TEXT_COUNT = document.createElement('span');
      const PRODUCT_COUNTER_BUTTON_PLUS = document.createElement('button');
      const PRODUCT_PRICE_BLOCK = document.createElement('div');
      const PRODUCT_PRICE_TEXT = document.createElement('span');
      const PRODUCT_BUTTON_DELETE = document.createElement('div');
      const BUTTON = document.createElement('button');

      PRODUCT.classList.add('product');
      PRODUCT_IMAGE.classList.add('product__image');
      PRODUCT_CHARACTERISTIC_BLOCK.classList.add('product-characteristic__block');
      PRODUCT_NAME.classList.add('product-name');
      PRODUCT_COUNTER_BLOCK.classList.add('product-counter__block');
      PRODUCT_COUNTER_BUTTON_MINUS.classList.add('product-counter__button');
      PRODUCT_COUNTER_BUTTON_MINUS.classList.add('product-counter__button-minus');
      PRODUCT_COUNTER_TEXT_COUNT.classList.add('product-counter__text-count');
      PRODUCT_COUNTER_BUTTON_PLUS.classList.add('product-counter__button-plus');
      PRODUCT_COUNTER_BUTTON_PLUS.classList.add('product-counter__button');
      PRODUCT_PRICE_BLOCK.classList.add('product-price__block');
      PRODUCT_PRICE_TEXT.classList.add('product-price__text');
      PRODUCT_BUTTON_DELETE.classList.add('product__button-delete');
      BUTTON.classList.add('button');

      this.CART_CONTAINER_MIDDLE.append(PRODUCT);
      PRODUCT.append(PRODUCT_IMAGE);
      PRODUCT.append(PRODUCT_CHARACTERISTIC_BLOCK);
      PRODUCT_CHARACTERISTIC_BLOCK.append(PRODUCT_NAME);
      PRODUCT.append(PRODUCT_COUNTER_BLOCK);
      PRODUCT_COUNTER_BLOCK.append(PRODUCT_COUNTER_BUTTON_MINUS);
      PRODUCT_COUNTER_BLOCK.append(PRODUCT_COUNTER_TEXT_COUNT);
      PRODUCT_COUNTER_BLOCK.append(PRODUCT_COUNTER_BUTTON_PLUS);
      PRODUCT.append(PRODUCT_PRICE_BLOCK);
      PRODUCT_PRICE_BLOCK.append(PRODUCT_PRICE_TEXT);
      PRODUCT.append(PRODUCT_BUTTON_DELETE);
      PRODUCT_BUTTON_DELETE.append(BUTTON);

      PRODUCT_IMAGE.src = element.foodImg;
      PRODUCT_NAME.innerText = element.foodName;
      PRODUCT_COUNTER_BUTTON_MINUS.innerText = '-';
      PRODUCT_COUNTER_TEXT_COUNT.innerText = element.count;
      PRODUCT_COUNTER_BUTTON_PLUS.innerText = '+';
      PRODUCT_PRICE_TEXT.innerText = `${element.priceAll} UAH`;
      BUTTON.innerHTML = '&#10006;';

      PRODUCT_COUNTER_BUTTON_PLUS.onclick = () => {
        this.incrementFoodInBasket(element.foodName, PRODUCT_COUNTER_TEXT_COUNT, PRODUCT_PRICE_TEXT);
      };
      PRODUCT_COUNTER_BUTTON_MINUS.onclick = () => {
        this.decrementFoodInBasket(element.foodName, PRODUCT_COUNTER_TEXT_COUNT, PRODUCT_PRICE_TEXT);
      };
      BUTTON.onclick = () => {
        this.deleteProduct(element.foodName);
      }
    })
  }

  clearBasket() {
    localStorage.removeItem('basket');
    if(window.location.href) {
      window.location.replace(window.location.href);
    }
  }

  deleteProduct(foodName) {
    this.basket.forEach((item, index) => {
      if(item.foodName == foodName) {
        this.basket.splice(index, 1);
      }
    });

    if(this.basket.length === 0){
      localStorage.removeItem('basket');
      this.checkCart();
    } else {
      const arr = JSON.stringify(this.basket);
      localStorage.setItem('basket', arr);
      this.SPAN_PRICE.innerText = `${this.countOrderPrice()} UAH`;
      this.SPAN_QUANTITY.innerText = this.countProduct();
      this.CART_SPAN_PRICE.innerText = `${this.countOrderPrice()} UAH`;
      this.CART_SPAN_QUANTITY.innerText = this.countProduct();
      this.CART_CONTAINER_MIDDLE.innerHTML = '';
      this.outputBasket();
    }
  }

  incrementFoodInBasket(foodName, PRODUCT_COUNTER_TEXT_COUNT, PRODUCT_PRICE_TEXT) {
    const name = this.basket.find(item => item.foodName === foodName);

    if(name) {
      name.count++;
      name.priceAll = name.count * name.price;
      PRODUCT_COUNTER_TEXT_COUNT.innerText = name.count;
      PRODUCT_PRICE_TEXT.innerText = `${name.priceAll} UAH`;
    } 

    const arr = JSON.stringify(this.basket);
    localStorage.setItem('basket', arr);
    this.SPAN_PRICE.innerText = `${this.countOrderPrice()} UAH`;
    this.SPAN_QUANTITY.innerText = this.countProduct();
    this.CART_SPAN_PRICE.innerText = `${this.countOrderPrice()} UAH`;
    this.CART_SPAN_QUANTITY.innerText = this.countProduct();
  }

  decrementFoodInBasket(foodName, PRODUCT_COUNTER_TEXT_COUNT, PRODUCT_PRICE_TEXT) {
    const name = this.basket.find(item => item.foodName === foodName);

    if(name) {
      if(name.count > 1){
        name.count--;
      }
      name.priceAll = name.count * name.price;
      PRODUCT_COUNTER_TEXT_COUNT.innerText = name.count;
      PRODUCT_PRICE_TEXT.innerText = `${name.priceAll} UAH`;
    } 

    const arr = JSON.stringify(this.basket);
    localStorage.setItem('basket', arr);
    this.SPAN_PRICE.innerText = `${this.countOrderPrice()} UAH`;
    this.SPAN_QUANTITY.innerText = this.countProduct();
    this.CART_SPAN_PRICE.innerText = `${this.countOrderPrice()} UAH`;
    this.CART_SPAN_QUANTITY.innerText = this.countProduct();
  }
}

const basket = new Basket();
basket.addListener();
basket.checkCart();
basket.outputBasket();
basket.outputBottom();
