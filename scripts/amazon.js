import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js"
import { formatCurrency } from "../utils/money.js";

loadProducts(renderProductsGrid);

function renderProductsGrid() {
    let productsHTML = "";
    let filteredProducts = products;

    const url = new URL(window.location.href);
    const searchParam = url.searchParams.get('search');
    const search = searchParam ?searchParam.toLocaleLowerCase() : null;

    console.log(search);

    if (search) {
        filteredProducts = products.filter((product) => {
            return product.name.toLocaleLowerCase().includes(search);
        });
    }

    filteredProducts.forEach((product) => {
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
                    src=${product.getStarsUrl()}>
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${product.getPrice()}
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

                ${product.extraInfoHTML()}

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

    // pulling the products from the products dataset and generating the HTML
    document.querySelector(".js-products-grid")
        .innerHTML = productsHTML;

    updateCartQuantity();

    // update the cart quantity on the page 
    function updateCartQuantity () {
                // updating the cart quantity on the top right once something has been added. 
                document.querySelector(".js-cart-quantity")
                    .innerHTML = calculateCartQuantity();
    }
    // display added to cart for 2 seconds ( broken functionality on re-click of button)
    function displayAddedToCart (productId) {

        let addedMessageTimeoutId;

        const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`)
                    
        addedMessage.classList.add('added-to-cart-true')

        
        if (addedMessageTimeoutId) {
            clearTimeout(addedMessageTimeoutId);
        };

        const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-true');
        }, 2000);

        addedMessageTimeoutId = timeoutId;
    }

    // adding the functionality once the add to cart butotn is clicked.
    document.querySelectorAll('.js-add-to-cart')
        .forEach((button) => {

            button.addEventListener('click', () => {

                const {productId} = button.dataset;            
                const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
                const quantity = Number(quantitySelector.value);
                // console.log(quantity);

                addToCart(productId, quantity);
                updateCartQuantity();
                displayAddedToCart(productId);


            });
    });

    document.querySelector('.js-search-button')
        .addEventListener('click', () => {
            const search = document.querySelector('.js-search-bar').value;
            window.location.href = `amazon.html?search=${search}`;
        });

    document.querySelector('.js-search-bar')
        .addEventListener('keydown', (event) => {
            if(event.key === "Enter"){
                const search = document.querySelector('.js-search-bar').value;
                window.location.href = `amazon.html?search=${search}`;
            }
        });
}
