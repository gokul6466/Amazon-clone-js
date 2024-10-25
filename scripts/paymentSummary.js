import { cart } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { getDeliveryOption } from "../data/deliveryOptions.js";
import { formatToINR } from "../data/products.js";
import { calculateCartQuantity } from "../data/cart.js";
import { addOrder } from "../data/orders.js";
import { resetCart } from "../data/cart.js";
import { renderOrderCart } from "../data/orders.js";



export function renderPaymentSummary() {

  let productPrice = 0;
  let shippingPrice = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPrice += product.price * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPrice += deliveryOption.price;


  });

  const totalBeforeTax = productPrice + shippingPrice;
  const tax = totalBeforeTax * 0.1;
  const totalPrice = totalBeforeTax + tax;

  const paymentSummaryHTML =
    `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">
            ${formatToINR(productPrice)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatToINR(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatToINR(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatToINR(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatToINR(totalPrice)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-btn">
            Place your order
          </button>
    
    `
  document.querySelector(".js-payment-container")
    .innerHTML = paymentSummaryHTML;

  document.querySelector(".js-place-order-btn")
    .addEventListener('click', async () => {

      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });
        const order = await response.json();
        console.log(order);
        addOrder(order);
      } catch (error) {
          console.log("unexpected error.")
      }
      resetCart();
      window.location.href = 'orders.html'
    });
}



