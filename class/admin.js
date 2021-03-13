class Admin{
  constructor() {
    
  }
 
  initHTML() {
    this.COLLECTION_CREATE = document.querySelector('#collectionCreate');
    this.SHOP_CREATE = document.querySelector('#shopCreate');
    this.NAME_FOOD_CREATE = document.querySelector('#nameFoodCreate');
    this.PRICE_CREATE = document.querySelector('#priceCreate');
    this.IMG_CREATE = document.querySelector('#imgCreate');
    this.BUTTON_CREATE = document.querySelector('#buttonCreate');

    this.COLLECTION_UPDATE = document.querySelector('#collectionUpdate');
    this.SHOP_UPDATE = document.querySelector('#shopUpdate');
    this.NAME_FOOD_UPDATE = document.querySelector('#nameFoodUpdate');
    this.PRICE_UPDATE = document.querySelector('#priceUpdate');
    this.IMG_UPDATE = document.querySelector('#imgUpdate');
    this.BUTTON_UPDATE = document.querySelector('#buttonUpdate');

    this.COLLECTION_DELETE_ALL = document.querySelector('#collectionDeleteAll');
    this.SHOP_DELETE_ALL = document.querySelector('#shopDeleteAll');
    this.BUTTON_REMOVE_SHOP = document.querySelector('#buttonRemoveShop');

    this.COLLECTION_DELETE = document.querySelector('#collectionDelete');
    this.SHOP_DELETE = document.querySelector('#shopDelete');
    this.NAME_FOOD_DELETE = document.querySelector('#nameFoodDelete');
    this.BUTTON_REMOVE_FOOD = document.querySelector('#buttonRemoveFood');

    this.LOGIN = document.querySelector('#login');
    this.ROLE = document.querySelector('#role');
    this.BUTTON_UPDATE_ROLE = document.querySelector('#buttonUpdateRole');
  }

  addListener() {
    this.initHTML();
    this.BUTTON_CREATE.onclick = () => {
      this.addCollection();
    };
    this.BUTTON_UPDATE.onclick = () => {
      this.updateCollection();
    };
    this.BUTTON_REMOVE_SHOP.onclick = () => {
      this.deleteDoc();
    };
    this.BUTTON_REMOVE_FOOD.onclick = () => {
      this.deleteFood();
    };
    this.BUTTON_UPDATE_ROLE.onclick = () => {
      this.updateRole();
    } 
  }

  addCollection() {
    this.initHTML();
    const db = firebase.firestore();
    db.collection(this.COLLECTION_CREATE.value).doc(this.SHOP_CREATE.value).set({
      [this.NAME_FOOD_CREATE.value] : [this.PRICE_CREATE.value, this.IMG_CREATE.value]
    })
  }

  updateCollection() {
    this.initHTML();
    const db = firebase.firestore();
    db.collection(this.COLLECTION_UPDATE.value).doc(this.SHOP_UPDATE.value).update({
      [this.NAME_FOOD_UPDATE.value] : [this.PRICE_UPDATE.value, this.IMG_UPDATE.value]
    })
  } 

  deleteDoc() {
    this.initHTML();
    const db = firebase.firestore();
    db.collection(this.COLLECTION_DELETE_ALL.value).doc(this.SHOP_DELETE_ALL.value).delete();
  }

  deleteFood() {
    this.initHTML();
    const db = firebase.firestore();
    db.collection(this.COLLECTION_DELETE.value).doc(this.SHOP_DELETE.value).update({
      [this.NAME_FOOD_DELETE.value]: firebase.firestore.FieldValue.delete()
    });
  }

  updateRole() {
    this.initHTML();
    const db = firebase.firestore();
    db.collection('users').doc(this.LOGIN.value).update({
      role : this.ROLE.value
    })
  }
}

const admin = new Admin;
admin.addListener();
