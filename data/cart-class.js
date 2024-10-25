class Cart {

  //this is a public property that can even be used outside of a class
  cartItems;
  // localStorageKey;
  //this is a private property which can be accesed ot used 
  // only inside the class and not outside the class

  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadCart();


  }

  //private can also be used for property

  #loadCart() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) ||
      [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1"
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2"
        }
      ]
  };
  // addToCart: function (productId) { };
  // this is the shortcut for this
  addToCart(productId) {
    let matchingItem;



    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    const selectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(selectorElement.value);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    }
    else {
      this.cartItems.push(
        { productId, quantity, deliveryOptionId: "1" }
      );
    }
    this.saveToStorage();
  };
  removeFromCart(productId) {

    const newArray = [];

    this.cartItems.forEach((cartItem) => {

      if (cartItem.productId !== productId) {
        newArray.push(cartItem);
      };
    });

    cart = newArray;
    saveToStorage();

  };
  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  };


  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  };

  updateQuantity(productId, newQuantity) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;

    this.saveToStorage();

  };

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;


    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  };

}



// here the cart and businesscart are called instanceof objects as it generates objects
// im using private property inside the class as parameter
const cart = new Cart('cart-oop');
const bussinessCart = new Cart('business-oop');

console.log(cart);
console.log(bussinessCart)


console.log(bussinessCart instanceof Cart);

