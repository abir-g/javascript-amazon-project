import { cart } from "../data/cart.js";
import { products } from "../data/products.js"

let productsHTML = "";

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
                <select class= "js-quantity-selector-${product.id}">
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

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;
});

// pulling tthe products from the products dataset and generating the HTML
document.querySelector(".js-products-grid")
    .innerHTML = productsHTML;

// adding the functionality once the add to cart butotn is clicked.
document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {

        let adddedMessageTimeoutId;


        button.addEventListener('click', () => {

            const {productId} = button.dataset;

            let matchingItem;

            cart.forEach((item) => {
                if (productId === item.productId) {
                    matchingItem = item;
                }
            });
            // if the item already exists in the cart,
            //  we need to push the updated qty, else add it to the cart

            const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
            const quantity = Number(quantitySelector.value);
            console.log(quantity);


            if (matchingItem) {
                matchingItem.quantity += quantity;
            } else {
                cart.push({
                    productId,
                    quantity
    
                });
            }

            let cartQuantity = 0;

            // skip the first iteration as it is providing an example obeject with Undefined value. 
            let skippedFirst = false;
            cart.forEach((item) => {
                if (!skippedFirst) {
                    skippedFirst = true;
                    return;
                }
                cartQuantity += item.quantity;
            });

            // updating the cart quantity on the top right once something has been added. 
            document.querySelector(".js-cart-quantity")
                .innerHTML = cartQuantity;

            const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`)
                
            addedMessage.classList.add('added-to-cart-true')

            
            if (adddedMessageTimeoutId) {
                clearTimeout(adddedMessageTimeoutId);
            };

            const timeoutId = setTimeout(() => {
            addedMessage.classList.remove('added-to-cart-true');
            }, 2000);

            adddedMessageTimeoutId = timeoutId;

        });
    });