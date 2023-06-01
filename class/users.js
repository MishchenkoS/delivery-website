class Users {

  constructor() {

  }

  initHTML() {
    this.login = document.querySelector('#login');
    this.password = document.querySelector('#password');
    this.checkInBtn = document.querySelector('#checkIn');
    this.signIn = document.querySelector('#signIn');
    this.loginBtn = document.querySelector('#logInBtn');
    this.logoutBtn = document.querySelector('#logOut');
    this.modal = document.querySelector('.modal');
    this.blur = document.querySelector('.blur');
    this.admin = document.querySelector('#admin');
    this.seller = document.querySelector('#seller');
    this.registrationInfo = document.querySelector('.modal__block-reg-info');
  }

  showMessage(info) {
    const registrationInfo = this.registrationInfo;
    this.registrationInfo.innerText = info;
    function hideMessage () {
      registrationInfo.classList.add('hide');
    }
    setTimeout(hideMessage, 5000);
  }
  
  addEvent() {
    this.initHTML();
    this.checkInBtn.addEventListener('click', () => {
      this.checkIn();
    });
    
    this.signIn.addEventListener('click', () => {
      this.authentication();
    });

    this.logoutBtn.addEventListener('click', () => {
      this.logOut();
    })
  }

  checkIn() {
    try{
      this.initHTML();
      const defaultFirestore = firebase.firestore();
      const sfDocRef = defaultFirestore.collection('users').doc(this.login.value);
    
      defaultFirestore.runTransaction(async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);
        if(sfDoc.exists) {
          this.showMessage('Придумайте новий логін');
          return;
        }
        sfDocRef.set({
          password: this.password.value,
          role: 'user'
        });
        this.clearInput();
        this.showMessage('Ви зареєстровані');
      })
    } catch(error) {
      this.showMessage('Щось із сервером:');
    }
  }
  
  async authentication() {
    try{
      this.initHTML();
      const defaultFirestore = firebase.firestore();
      const docRef = defaultFirestore.collection('users').doc(this.login.value);
      const doc = await docRef.get();

      if(doc.exists) {
        if(this.password.value === doc.data().password) {
          const secret = Array(31).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, 30);
          docRef.update({
            secret: secret
          });
          localStorage.setItem('login', this.login.value);
          localStorage.setItem('secret', secret);
          localStorage.setItem('role', doc.data().role);
          this.blur.style.display = 'none';
          this.modal.style.display = 'none';
          document.body.style.overflow = 'auto';
          this.loginBtn.style.display = 'none';
          this.logoutBtn.style.display = 'block';
          this.clearInput();
          this.style();
        } else {
          this.showMessage("No such document!");
        }
      } else {
        this.showMessage("No such document!");
      }
      this.clearInput();
    } catch(error) {
      console.error("Error getting document:", error);
    }
  }

  logOut() {
    this.initHTML();
    this.logoutBtn.style.display = 'none';
    this.loginBtn.style.display = 'block';
    localStorage.removeItem('secret');
    localStorage.removeItem('role');
    const defaultFirestore = firebase.firestore();
    const login = localStorage.getItem('login');
    const docRef = defaultFirestore.collection('users').doc(login);
    docRef.update({
      secret: firebase.firestore.FieldValue.delete()
    });
    this.style()
  }

  clearInput() {
    this.password.value = '';
    this.login.value = '';
  }

  async style() {
    this.initHTML();
    this.addEvent();
    if(localStorage.getItem('secret')) {
      this.logoutBtn.style.display = 'block';
      this.loginBtn.style.display = 'none';
      if(localStorage.getItem('role') === 'admin'){
        this.admin.style.display = 'block';
        this.seller.style.display = 'block';
      } else if(localStorage.getItem('role') === 'seller') {
        this.seller.style.display = 'block';
        this.admin.style.display = 'none';
      } 
    } else {
      this.logoutBtn.style.display = 'none';
      this.loginBtn.style.display = 'block';
      this.admin.style.display = 'none';
      this.seller.style.display = 'none'
    }
  }
}

const user = new Users();
user.style();
