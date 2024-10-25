export let cart = JSON.parse(localStorage.getItem("cart")) ||


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
  ];



// if (!cart) {
//       cart =  [{
//         productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//         quantity: 2,
//       },
//       {
//         productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//         quantity: 1,
//         }];
//     }




export function addToCart(productId) {
  let matchingItem;


  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const selectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
  // const quantity = Number(selectorElement.value);

  const quantity = selectorElement ? Number(selectorElement.value) : 1;

  if (matchingItem) {
    matchingItem.quantity += quantity;
  }
  else {
    cart.push(
      { productId, quantity, deliveryOptionId: "1" }
    );
  }
  saveToStorage();
}

export function removeFromCart(productId) {

  const newArray = [];

  cart.forEach((cartItem) => {

    if (cartItem.productId !== productId) {
      newArray.push(cartItem);
    };
  });

  cart = newArray;
  saveToStorage();

}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  // if (newQuantity <= 1000) {
  //   matchingItem.quantity = newQuantity;
  // }
  // else {
  //   matchingItem.quantity = 1000;
  //   alert("You can't add more than 1000 items to your cart");
    
  // }
  matchingItem.quantity = newQuantity;

  saveToStorage();
2
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;


  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function resetCart() {
  cart = [];
  saveToStorage();
}