class Seller {
  constructor() {

  }

  orderCompletedPerformed(document) {
    const db = firebase.firestore();
    db.collection('orders').doc(document).update({ 
      Performed: new Date()
    });
    this.getDataOrders();
  }

  async getDataOrders() {
    try{
      const db = firebase.firestore();
      const querySnapshot = await db.collection('orders').get();
      const OPEN_ORDER = document.querySelector('.open-order__container');
      const RECEIVED_ORDER = document.querySelector('.received-order__container');
      OPEN_ORDER.innerText = 'Open Order';
      RECEIVED_ORDER.innerText = 'My Order';
      querySnapshot.forEach((doc) => {
        this.outputDataOrders(doc);
        this.outputDataMyOrders(doc);
      });
    } catch(error) {
      console.error(error);
    }  
  } 

  outputDataOrders(doc) {
    if(!('Received' in doc.data()) && !('Performed' in doc.data())){

      const OPEN_ORDER = document.querySelector('.open-order__container');
      const OPEN_ORDER_BLOCK = document.createElement('div');
      const UL_FOOD = document.createElement('ul');
      const UL_INFO = document.createElement('ul');
      const BUTTON_RECEIVED = document.createElement('button');
      const LI_USER = document.createElement('li');
      const LI_ADDRESS = document.createElement('li');
      const LI_PRICE = document.createElement('li');
      const LI_PLAYMENT = document.createElement('li');

      BUTTON_RECEIVED.classList.add('seller__button');
      OPEN_ORDER_BLOCK.classList.add('open-order__block');
      UL_FOOD.classList.add('food-info');
      UL_INFO.classList.add('food-info');
      LI_USER.classList.add('food-info__item');
      LI_ADDRESS.classList.add('food-info__item');
      LI_PRICE.classList.add('food-info__item');
      LI_PLAYMENT.classList.add('food-info__item');

      UL_FOOD.innerText = 'Grocery list:';
      UL_INFO.innerText = 'Information:';
      const foodArr = doc.data().food;
      foodArr.forEach(element => {
        const LI_FOOD = document.createElement('li');
        LI_FOOD.classList.add('food-info__item');
        LI_FOOD.innerText = `Name Food:${element.foodName}, Price: ${element.price}, Count: ${element.count}, Shop: ${element.shop}`;
        UL_FOOD.append(LI_FOOD)
      });

      LI_USER.innerText = `Customer: ${doc.data().nameUser};`;
      LI_ADDRESS.innerText = `Address: ${doc.data().address};`;
      LI_PRICE.innerText = `Price: ${doc.data().price}; `;
      LI_PLAYMENT.innerText = `Playment: ${doc.data().playment};`;

      BUTTON_RECEIVED.innerText = 'Received';

      BUTTON_RECEIVED.onclick = () => {
        this.orderCompletedReceived(doc.id)
      };
      OPEN_ORDER.append(OPEN_ORDER_BLOCK);
      OPEN_ORDER_BLOCK.append(UL_INFO);
      OPEN_ORDER_BLOCK.append(UL_FOOD);
      UL_INFO.append(LI_USER);
      UL_INFO.append(LI_ADDRESS);
      UL_INFO.append(LI_PRICE);
      UL_INFO.append(LI_PLAYMENT);
      OPEN_ORDER_BLOCK.append(BUTTON_RECEIVED);
    }
  }

  outputDataMyOrders(doc) {
     if((doc.data().Received === localStorage.getItem('login')) && !('Performed' in doc.data())) {
      const RECEIVED_ORDER = document.querySelector('.received-order__container');
      const RECEIVED_ORDER_BLOCK = document.createElement('div');
      const UL_FOOD = document.createElement('ul');
      const UL_INFO = document.createElement('ul');
      const BUTTON_PERFORMED = document.createElement('button');
      const LI_USER = document.createElement('li');
      const LI_ADDRESS = document.createElement('li');
      const LI_PRICE = document.createElement('li');
      const LI_PLAYMENT = document.createElement('li');

      RECEIVED_ORDER_BLOCK.classList.add('received-order__block');
      BUTTON_PERFORMED.classList.add('seller__button');
      UL_INFO.classList.add('food-info');
      UL_FOOD.classList.add('food-info');
      UL_INFO.classList.add('food-info');
      LI_USER.classList.add('food-info__item');
      LI_ADDRESS.classList.add('food-info__item');
      LI_PRICE.classList.add('food-info__item');
      LI_PLAYMENT.classList.add('food-info__item');
      
      UL_FOOD.innerText = 'Grocery list:';
      UL_INFO.innerText = 'Information:';
      const foodArr = doc.data().food;
      foodArr.forEach(element => {
        const LI_FOOD = document.createElement('li');
        LI_FOOD.classList.add('food-info__item');
        LI_FOOD.innerText = `Name Food:${element.foodName}, Price: ${element.price}, Count: ${element.count}, Shop: ${element.shop}`;
        UL_FOOD.append(LI_FOOD)
      });

      LI_USER.innerText = `Customer: ${doc.data().nameUser};`;
      LI_ADDRESS.innerText = `Address: ${doc.data().address};`;
      LI_PRICE.innerText = `Price: ${doc.data().price}; `;
      LI_PLAYMENT.innerText = `Playment: ${doc.data().playment};`;

      BUTTON_PERFORMED.innerText = 'Performed';
      
      BUTTON_PERFORMED.onclick = () => {
        this.orderCompletedPerformed(doc.id)
      };

      RECEIVED_ORDER.append(RECEIVED_ORDER_BLOCK);
      RECEIVED_ORDER_BLOCK.append(UL_FOOD);
      RECEIVED_ORDER_BLOCK.append(UL_INFO);
      UL_INFO.append(LI_USER);
      UL_INFO.append(LI_ADDRESS);
      UL_INFO.append(LI_PRICE);
      UL_INFO.append(LI_PLAYMENT);
      RECEIVED_ORDER_BLOCK.append(BUTTON_PERFORMED);
    }
  } 

  orderCompletedReceived(doc) {
    const db = firebase.firestore();
    db.collection('orders').doc(doc).update({ 
      Received: localStorage.getItem('login')
    });
    this.getDataOrders();
  }
}

const seller = new Seller();
seller.getDataOrders();
