import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products, formatToINR, getProduct, } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { updateDeliveryOption } from "../data/cart.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { getDeliveryOption, calculateDeliveryDate } from "../data/deliveryOptions.js";
// import "../data/cart-oop.js";
// import "../data/cart-class.js";

// new Promise((resolve) => {
//     load(() => {
//         resolve('hello');
//     });

//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         })
//     })
// }).then((value) => {
//     console.log(value);
//     renderOrderSummary()
//     renderPaymentSummary();
//     updateCartQuantity();
// })

// this is promise

// Promise.all([
//    loadProductsFetch(),

//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         })
//     })

// ]).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     updateCartQuantity();
// });


// async function loadPage() {

//     try {
//         // throw 'error'
//         await loadProductsFetch();
//           // we use reject to create an asynchronousn error in future
//         await new Promise((resolve, reject) => {
//             // to create an synchronously
//             // throw 'eeror2';
//             loadCart(() => {
//                 // reject('erro3');
//                 resolve();
//             })
//         });
//     } catch(error) {
//         console.log("unexpected error")
//     }
    
//     renderOrderSummary();
//     renderPaymentSummary();
//     updateCartQuantity();

// }
// loadPage();






// async function loadPage() {
//     console.log('hello');

//     return 'hel'
// }

// loadPage().then((value) => {
//     console.log(`${value} , is a hello`);
// })






//callback functions

// load(() => {
//     renderOrderSummary()
//     renderPaymentSummary();
//     updateCartQuantity();
// })
 




function renderOrderSummary() {

    let cartSummaryHTML = "";

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);



        const { image, name, id } = matchingProduct;
        



        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);



        // const today = dayjs();
        // const deliveryDate = today.add(
        //     deliveryOption.deliveryDays, 'days'
        // )
        // const deliveryDateString = deliveryDate.format('dddd, MMMM D')
        const deliveryDateString = calculateDeliveryDate(deliveryOption);
        const priceString = deliveryOption.price === 0 ? "FREE" :
            `${formatToINR(deliveryOption.price)}`


        cartSummaryHTML +=
            `
    <div class="cart-item-container js-cart-item-container-${id}">
        <div class="delivery-date">
            Delivery date: ${deliveryDateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${name}
            </div>
            <div class="product-price">
                ${matchingProduct.formatCurrency()}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id = "${id}">
                Update
                </span>
                <input class="quantity-input js-quantity-input-${id}" type="number">
                <span class="save-quantity-link link-primary js-save-link" data-product-id = "${id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link"
                data-product-id="${id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
           ${deliveryOptionsHTML(id, cartItem)}
            </div>
        </div>
        </div>
    
    `;

        document.querySelector(".js-order-container")
            .innerHTML = cartSummaryHTML;
    });

    function deliveryOptionsHTML(id, cartItem) {

        let html = "";
        deliveryOptions.forEach((deliveryOption) => {
            const deliveryDateString = calculateDeliveryDate(deliveryOption)
            const priceString = deliveryOption.price === 0 ? "FREE" :
                `${formatToINR(deliveryOption.price)}`
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId


            html += `
        <div class="delivery-option js-delivery-option"
        data-product-id="${id}"
        data-delivery-option-id = "${deliveryOption.id}">
            <input type="radio"
            ${isChecked ? 'checked' : ""}
            class="delivery-option-input"
            name="delivery-option-${id}">
            <div>
            
            <div class="delivery-option-date">
                ${deliveryDateString}
            </div>
            <div class="delivery-option-price">
                ${priceString} - Shipping
            </div>
            </div>
        </div>
    `

        })
        return html;
    }

    document.querySelectorAll(".js-delete-link")
        .forEach((deleteLink) => {
            deleteLink.addEventListener('click', () => {
                const productId = deleteLink.dataset.productId;
                //remove the cart (array) in object
                removeFromCart(productId);

                //remove html contrent in screen

                // const container = document.querySelector(`.js-cart-item-container-${productId}`);
                // container.remove(); 
                // we can also regenerate the html
                renderOrderSummary();
                renderPaymentSummary();
                updateCartQuantity();


            });
        });

    document.querySelectorAll(".js-update-link")
        .forEach((updateLink) => {
            updateLink.addEventListener('click', () => {
                const productId = updateLink.dataset.productId;



                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.classList.add("editing-quantity");
                renderPaymentSummary();

            });
        });



    document.querySelectorAll(".js-save-link")
        .forEach((saveLink) => {
            saveLink.addEventListener('click', () => {

                const productId = saveLink.dataset.productId;

                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.classList.remove("editing-quantity");

                const quantityValue = document.querySelector(`.js-quantity-input-${productId}`)

                const newQuantity = Number(quantityValue.value);

                updateQuantity(productId, newQuantity);

                // const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

                // quantityLabel.innerHTML = newQuantity;

                updateCartQuantity();
                renderOrderSummary();
                renderPaymentSummary();

            });

        });




    // function saveCartQuantity(productId) {

    //     const quantityValue = document.querySelector(".js-quantity-input");
    //     const quantityInputValue = Number(quantityValue.value);
    //     console.log(quantityInputValue);

    //     cart.forEach((cartItem) => {
    //         if (cartItem.productId === productId) {
    //             cartItem.quantity = quantityInputValue;
    //         }
    //         updateCartQuantity();
    //         console.log(cartItem.quantity);
    //     });

    //     const quantityValue = document.querySelector(`.js-quantity-input-${productId}`)
    //     const quantityInputValue = Number(quantityValue.value);
    // };

    document.querySelectorAll(".js-delivery-option")
        .forEach((element) => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                console.log(cart);
                renderOrderSummary();
                renderPaymentSummary()
            })


        })
}

renderOrderSummary();
renderPaymentSummary();
updateCartQuantity();


function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector(".js-checkout-quantity")
        .innerHTML = `${cartQuantity} items`;
    renderOrderSummary();
}

