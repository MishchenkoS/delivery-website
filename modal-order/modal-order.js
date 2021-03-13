class ModalOrder {
  constructor() {
  }
  
  initHTML() {
  }

  addListener() {
    const radioCard = document.querySelector('.modal-order__radio-card');
    const radioCash = document.querySelector('.modal-order__radio-cash');
    const cartBtnPay = document.querySelector('.cart__button-pay');
    const closeBtn = document.querySelector('.modal__button-close');

    radioCard.addEventListener('click', this.checkRadioCard);
    radioCash.addEventListener('click', this.checkRadioCash);
    cartBtnPay.onclick = () => {
      this.autoScrollUp();
      this.openModalOrder();
    };
    closeBtn.addEventListener('click', this.closeLoginModal);
  }

  checkRadioCash() {
    const radioCard = document.querySelector('.modal-order__radio-card');
    const radioCash = document.querySelector('.modal-order__radio-cash');
    const inputCard = document.querySelector('.modal-order__input-card');

    if (radioCash.checked === true) {
      radioCard.checked = false;
      inputCard.classList.remove('active');
    } else {
      radioCard.checked = false;
    }
  }

  checkRadioCard() {
    const radioCard = document.querySelector('.modal-order__radio-card');
    const radioCash = document.querySelector('.modal-order__radio-cash');
    const inputCard = document.querySelector('.modal-order__input-card');

    if (radioCard.checked === true) {
      radioCash.checked = false;
      inputCard.classList.add('active');
    } else {
      inputCard.classList.remove('active');
    }
  }

  openModalOrder() {
    const body = document.querySelector('body');
    const blur = document.querySelector('.blur'); 
    const modalOrder = document.querySelector('.modal-order');

    blur.style.display = 'flex';
    modalOrder.style.display = 'flex';
    body.style.overflow = 'hidden';
  }
  
  closeLoginModal() {
    const body = document.querySelector('body');
    const blur = document.querySelector('.blur'); 
    const modalOrder = document.querySelector('.modal-order');
    
    blur.style.display = 'none';
    modalOrder.style.display = 'none';
    body.style.overflow = 'auto'
  }

  autoScrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}

const modalOrder = new ModalOrder();
modalOrder.addListener();
