class Modal {
  constructor() {

  }

  addListener() {
    const closeBtn = document.querySelector('.modal__button-close');
    const logInBtn = document.querySelector('.header__login-button');
    const modalUsername = document.querySelector('.modal__input-username');
    const modalPassword = document.querySelector('.modal__input-password');

    logInBtn.addEventListener('click', this.openLoginModal);
    closeBtn.addEventListener('click', this.closeLoginModal);
    modalUsername.addEventListener('keyup', this.checkModalInputs);
    modalPassword.addEventListener('keyup', this.checkModalInputs);
  }

  openLoginModal () {
    const body = document.querySelector('body');
    const blur = document.querySelector('.blur');
    const modal = document.querySelector('.modal');

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    blur.style.display = 'flex';
    modal.style.display = 'flex';
    body.style.overflow = 'hidden';
  }

  closeLoginModal () {
    const body = document.querySelector('body');
    const blur = document.querySelector('.blur');
    const modal = document.querySelector('.modal');
    blur.style.display = 'none';
    modal.style.display = 'none';
    body.style.overflow = 'auto';
  }

  checkModalInputs () {
    const modalUsername = document.querySelector('.modal__input-username');
    const modalPassword = document.querySelector('.modal__input-password');
    const signInBtn = document.querySelector('.modal__button-signIn');
    const registrationBtn = document.querySelector('.modal__button-registration');

    if (modalUsername.value.length> 0 && modalPassword.value.length > 0) {
      signInBtn.removeAttribute('disabled');
      signInBtn.style.backgroundColor = '#FE5F1E';
      registrationBtn.removeAttribute('disabled');
      registrationBtn.style.backgroundColor = '#FE5F1E';
    } else {
      signInBtn.setAttribute('disabled', 'disabled');
      signInBtn.style.backgroundColor = '#7f7f7f';
      registrationBtn.setAttribute('disabled', 'disabled');
      registrationBtn.style.backgroundColor = '#7f7f7f';
    }
  }
}

const modal = new Modal() ;
modal.addListener();
modal.checkModalInputs();
