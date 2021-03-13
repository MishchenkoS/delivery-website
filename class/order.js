class Order {
  constructor() {
  }

  initHTML() {
    this.userName = document.querySelector('#user_name');
    this.addressName = document.querySelector('#address_name');
    this.cash = document.querySelector('#cash');
    this.card = document.querySelector('#card');
    this.cardName = document.querySelector('#card_name');
    this.ordered = document.querySelector('#ordered');
  }
 
  addOrder() {
    this.initHTML();
    let playment;
    if(this.card.checked) {
      playment = this.cardName.value;
    } else {
      playment = 'cash';
    }
    const defaultFirestore = firebase.firestore();
    defaultFirestore.collection('orders').add({
      food : JSON.parse(localStorage.getItem('basket')),
      nameUser : this.userName.value,
      address : this.addressName.value,
      playment : playment,
      price : this.countOrderPrice(),
      ordered : new Date()
    });
    localStorage.removeItem('basket');
    this.clearForm();
  } 

  addListener() {
    this.initHTML();
    this.ordered.onclick = () => {
      this.addOrder();
    }
  }

  countAllPrice() {
    const basket = JSON.parse(localStorage.getItem('basket'));
    const SUM = basket.reduce((sum, current) => {
      return  sum + current.priceAll;
    }, 0);
    return SUM;
  }

  countOrderPrice() {
    const basket = JSON.parse(localStorage.getItem('basket'));
    for(let i = 0; i < basket.length; i++) {
      if(basket[i].shop != basket[0].shop){
        return 52 + this.countAllPrice();
      } 
    }
    return 50 + this.countAllPrice();
  }

  clearForm() {
    this.initHTML();
    this.userName.value = '';
    this.addressName.value = '';
    this.cardName.value = '';
  }

  countProduct() {
    const basket = JSON.parse(localStorage.getItem('basket'));
    const SUM = basket.reduce((sum, current) => {
      return sum + current.count;
    }, 0);
    return SUM;
  }
}

const order = new Order();
order.addListener();
