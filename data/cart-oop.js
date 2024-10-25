function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,
    
        loadCart() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) ||
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
        },
        
        // addToCart: function (productId) { };
        // this is the shortcut for this
             addToCart(productId ) {
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
        },
         removeFromCart(productId) {
    
            const newArray = [];
          
            this.cartItems.forEach((cartItem) => {
          
              if (cartItem.productId !== productId) {
                newArray.push(cartItem);
              };
            });
          
            cart = newArray;
            saveToStorage();
          
        },
         calculateCartQuantity() {
            let cartQuantity = 0;
          
            this.cartItems.forEach((cartItem) => {
              cartQuantity += cartItem.quantity;
            });
            return cartQuantity;
          },
          
            saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
         updateQuantity(productId, newQuantity) {
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
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
          
            this.saveToStorage();
          
          },
           updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;
          
          
            this.cartItems.forEach((cartItem) => {
              if (productId === cartItem.productId) {
                matchingItem = cartItem;
              }
            });
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
          }
             
        
    
    };
    return cart;
}

const cart = Cart('cart-oop');
const bussinessCart = Cart('cart-business');

cart.loadCart();
bussinessCart.loadCart();
console.log(bussinessCart)
console.log(cart);











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













