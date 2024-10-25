import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";


renderTrackingPage();


 function renderTrackingPage() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');



  let trackingPage = "";

  orders.forEach((order) => {
    if (order.id === orderId) {
      order.products.forEach((productDetails) => {


        if (productDetails.productId === productId) {
          const matchingProduct = getProduct(productId);
          const { image, name } = matchingProduct;

          const today = dayjs();
          const orderTime = dayjs(order.orderTime);
          const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
          const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

          trackingPage +=
            `
        <div class="delivery-date">
        Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
            </div>
            <div class="product-info">
            ${name}
        </div>
    
        <div class="product-info">
            Quantity: ${productDetails.quantity}
        </div>
    
        <img class="product-image" src="${image}">

         <div class="progress-labels-container">
          <div class="progress-label ${percentProgress < 50 ? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label ${(percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''}">
            Shipped
          </div>
          <div class="progress-label ${percentProgress >= 100 ? "current-status" : ""}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%;"></div>
        </div>


            `;
        }
      })
    }
  });
  document.querySelector(".js-tracking-page")
    .innerHTML = trackingPage;

};















