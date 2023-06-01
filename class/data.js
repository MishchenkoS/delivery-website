class Data {
  constructor() {
    this.arrayCollection = [' Burgers', ' desserts', 'Garnish', 'Sauce', 'beverages'];
    if(localStorage.getItem('basket')){
      this.arrayBasket = JSON.parse(localStorage.getItem('basket'));
    } else {
      this.arrayBasket = [];
    }
  }

  getDataClassification() {
    this.arrayCollection.forEach(elem => {
      this.outputDataClassification(elem)
    })
  }
 
  async getDataShop(collectionElement) {
    try{
      const db = firebase.firestore();
      const querySnapshot = await db.collection(collectionElement).get();
      const PRODUCTS =  document.querySelector('.products');
      PRODUCTS.innerText = '';
      const SHOP_CONTAINER = document.querySelector('.product-shop__container');
      SHOP_CONTAINER.innerText = '';
      querySnapshot.forEach((doc) => {        
        this.outputDataShop(collectionElement, doc.id, doc.data()[doc.id]);
      });
    } catch(error) {
      console.error(error);
    }  
  }

  async getDataFood(collectionElement, doc) {
    try{
      const db = firebase.firestore();
      const docFood = await db.collection(collectionElement).doc(doc).get();
      const obj = docFood.data();
      this.PRODUCTS =  document.querySelector('.products');
      this.PRODUCTS.innerText = '';
      for (let key in obj){
        if(Array.isArray(obj[key])) {
          this.outputDataFood(key, obj[key][0], obj[key][1], doc)
        }
      }
    } catch(error) {
      console.error(error);
    }
  }

  addClickClassification(classification) {
    classification.onclick = () => {
      this.getDataShop(classification.id);
    }
  }

  addClickShop(collection, shop) {
    shop.onclick = () => {
      this.getDataFood(collection, shop.id);
    }
  }

  outputDataClassification(collection){
    const PRODUCT_SWITCHER = document.querySelector('.product-switcher');
    const PRODUCT_ITEM = document.createElement('li');
    const PRODUCT_LINK = document.createElement('a');

    PRODUCT_ITEM.classList.add('product-switcher__item');
    PRODUCT_LINK.classList.add('product-switcher__link');

    PRODUCT_SWITCHER.append(PRODUCT_ITEM);
    PRODUCT_ITEM.append(PRODUCT_LINK);

    PRODUCT_LINK.innerText = collection;
    PRODUCT_ITEM.id = collection;

    this.addClickClassification(PRODUCT_ITEM)
  }

  outputDataShop(collection, shop, img) {
    const SHOP_CONTAINER = document.querySelector('.product-shop__container');
    const SHOP = document.createElement('div');
    const SHOP_LOGO = document.createElement('img');

    SHOP.classList.add('product-shop__block');
    SHOP_LOGO.classList.add('product-shop__image');

    SHOP_CONTAINER.append(SHOP);
    SHOP.append(SHOP_LOGO);

    SHOP.id = shop;
    SHOP_LOGO.src = img;

    this.addClickShop(collection, SHOP);
  }
 
  outputDataFood(foodName, foodPrice, foodImg, doc) {
    const PRODUCTS =  document.querySelector('.products');
    const PRODUCT_IMAGE_CONTAINER = document.createElement('div');
    const PRODUCT_IMAGE = document.createElement('img');
    const PRODUCT = document.createElement('div');
    const PRODUCT_NAME = document.createElement('h3');
    const PRODUCT_PRICE = document.createElement('div');
    const PRICE = document.createElement('span');
    const PRODUCT_BUTTON = document.createElement('button');

    PRODUCT_IMAGE_CONTAINER.classList.add('product__container-image');
    PRODUCT_IMAGE.classList.add('product__image');
    PRODUCT.classList.add('product');
    PRODUCT_NAME.classList.add('product__name');
    PRODUCT_PRICE.classList.add('product__price');
    PRICE.classList.add('product__price-span');
    PRODUCT_BUTTON.classList.add('product__price-button');

    PRODUCTS.append(PRODUCT);
    PRODUCT.append(PRODUCT_IMAGE_CONTAINER);
    PRODUCT_IMAGE_CONTAINER.append(PRODUCT_IMAGE);
    PRODUCT.append(PRODUCT_NAME);
    PRODUCT.append(PRODUCT_PRICE);
    PRODUCT_PRICE.append(PRICE);
    PRODUCT_PRICE.append(PRODUCT_BUTTON);

    PRODUCT_NAME.id = doc;
    PRODUCT_IMAGE.src = foodImg;
    PRODUCT_NAME.innerText = foodName;
    PRICE.innerText = `${foodPrice} UAH`;
    PRODUCT_BUTTON.innerText = 'Add to card';

    PRODUCT_BUTTON.addEventListener('click', () => {
      this.addFoodInBasket(foodName, foodPrice, foodImg, doc);
      this.outputInfoBasket()
    })
  }

  addFoodInBasket(foodName, foodPrice, foodImg, doc) {
    if(localStorage.getItem('secret')){
      const name = this.arrayBasket.find(item => item.foodName === foodName);

      if(name && doc === name.shop) {
        name.count++;
        name.priceAll = name.count * foodPrice;
      } else { 
        const obj = {
          foodName,
          shop : doc,
          count: 1,
          priceAll: +foodPrice,
          foodImg,
          price: +foodPrice,
        };
        this.arrayBasket.push(obj);
      }    

      const arr = JSON.stringify(this.arrayBasket);
      localStorage.setItem('basket', arr);
    } else {
      console.error('Вибачте, ви не увійшли в систему, а тому не маєте права додавати товари у корзину')
    }
  }

  countOrderPrice() {
    const basket = JSON.parse(localStorage.getItem('basket'));
    const SUM = basket.reduce((sum, current) => {
      return  sum + current.priceAll;
    }, 0);
    for(let i = 0; i < basket.length; i++) {
      if(basket[i].shop != basket[0].shop){
        return 52 + SUM;
      } 
    }
    return 50 + SUM;
  }

  outputInfoBasket() {
    if(localStorage.getItem('basket') && localStorage.getItem('secret')) {
      const basket = JSON.parse(localStorage.getItem('basket'));
      const SPAN_PRICE = document.querySelector('.span-price');
      const SPAN_QUANTITY = document.querySelector('.span-quantity');

      const SUM = basket.reduce((sum, current) => {
        return sum + current.count;
      }, 0);

      SPAN_PRICE.innerText = `${this.countOrderPrice()} UAH`;
      SPAN_QUANTITY.innerText = SUM;
    }
  }
}

const data = new Data();
data.getDataClassification();
data.outputInfoBasket();
data.getDataFood(' Burgers', 'McDonalds');
