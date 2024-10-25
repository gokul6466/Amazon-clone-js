import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js"


// updateCartQuantity()
// loadProductsFetch().then(() => {
//   renderAmazonPage();
// })

renderAmazonPage();

function renderAmazonPage() {
  let productsHtml = "";


    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');

    let filteredProducts = products;
    if (search) {
      filteredProducts = products.filter((product) => {
        let matchingKeyword = false;

        product.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(search.toLowerCase())) {
            matchingKeyword = true;
          }
        })
        return matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase())
        
      });
    }

  filteredProducts.forEach((product) => {
    const { image, name, rating: { stars, count }, price, id } = product;


      productsHtml += `  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src= "${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${count}
            </div>
          </div>

          <div class="product-price">
            ${product.formatCurrency()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

           ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-cart-${id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>


          <button class="add-to-cart-button js-add-to-cart button-primary "
          data-product-id = "${id}">
            Add to Cart
          </button>
        </div>`

      const productGrid = document.querySelector(".js-product-grid")
      productGrid.innerHTML = productsHtml;

    });
  




  // let addedCartTimeoutId = {};

  let addedCartTimeoutId;

  function addedCartMsg(productId) {


    const addedCart = document.querySelector(`.js-added-cart-${productId}`);

    addedCart.classList.add("added-cart-text");



    // const previousTimeoutId = addedCartTimeoutId[productId];

    // if (previousTimeoutId) {
    //   clearTimeout(previousTimeoutId);
    // }


    //   addedCartTimeoutId[productId] = setTimeout(() => {
    //     addedCart.classList.remove("added-cart-text");
    //     console.log(addedCart);
    //   }, 2000);


    if (addedCartTimeoutId) {
      clearTimeout(addedCartTimeoutId);
    }


    addedCartTimeoutId = setTimeout(() => {
      addedCart.classList.remove("added-cart-text");
    }, 2000);


  }





  document.querySelectorAll(".js-add-to-cart")
    .forEach((button) => {

      button.addEventListener('click', () => {
        const { productId } = button.dataset;

        addToCart(productId);
        updateCartQuantity();
        addedCartMsg(productId);

      });
    });
  document.querySelector(".js-search-btn")
    .addEventListener('click', () => {
      const search = document.querySelector(".js-search-bar")
        .value;
      window.location.href = `amazon.html?search=${search}`;
    });

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector(".js-cart-quantity")
      .innerHTML = cartQuantity;
  }
}










