import {cart, addToCart } from "./cart.js";
import { getProduct } from "./products.js";
import { formatToINR } from "./products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";



export const orders = JSON.parse(localStorage.getItem('orders')) || [];

const url = new URL(window.location.href);
if (window.location.pathname.endsWith('orders.html')) {
  renderOrderCart();
}


export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders' , JSON.stringify(orders))
}



export function renderOrderCart() {

  const orderContainer = document.querySelector(".js-order-container");
    
    // If the container is not present, do not execute the function
    if (!orderContainer) {
        return;
    }

  let orderCart = "";

  orders.forEach((order) => {
       
    order.orderTime = dayjs().format('MMMM D')
    const { id, orderTime, totalCostCents } = order;
    // console.log(orderProducts);
        
       

    orderCart += `
        <div class="order-header">
        <div class="order-header-left-section">
            <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderTime}</div>
            </div>
            <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>${formatToINR(totalCostCents)}</div>
            </div>
        </div>

        <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${id}</div>
        </div>
        </div>

         <div class="order-details-grid">
           ${addOrderCartDetails(order)}
        </div>
          

        `
  })

  
   orderContainer.innerHTML = orderCart;


  function addOrderCartDetails(order) {

    let addOrderCart = "";
    order.products.forEach((productDetails) => {
      const productId = productDetails.productId;
      const matchingProduct = getProduct(productId);
      const { image, name, id } = matchingProduct;

        
      addOrderCart +=
        `
           <div class="product-image-container">
              <img src="${image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity: ${productDetails.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-btn" data-product-id="${id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>        
 `
    })
    return addOrderCart;
  }



  document.querySelectorAll(".js-buy-again-btn")
    .forEach((buyAgain) => {
      buyAgain.addEventListener('click', () => {
        const productId = buyAgain.dataset.productId;
        console.log(productId);

        addToCart(productId);

        buyAgain.innerHTML = 'Added';
        setTimeout(() => {
          buyAgain.innerHTML = 
          ` <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          `
          
        }, 1000);

      });
  
    });
}