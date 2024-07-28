import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";

let cartSummaryHTML = "";

// console.log(cart);

let matchingProduct;

cart.forEach((cartItem) => {
	const productId = cartItem.productId;


	products.forEach((product) => {
		if (product.id === productId) {
			matchingProduct = product;
			// console.log(matchingProduct.id);
		}
	});
	if (matchingProduct) {
		// console.log("Before using in HTML:", matchingProduct?.id);
			cartSummaryHTML += `
			<div class="cart-item-container 
			js-class-item-container-${matchingProduct.id}">
				<div class="delivery-date">
					Delivery date: Tuesday, June 21
				</div>
					<div class="cart-item-details-grid">
						<img class="product-image"
							src="${matchingProduct.image}"
						<div class="cart-item-details">
							<div class="product-name">
								${matchingProduct.name}
							</div>
							<div class="product-price">
								$${formatCurrency(matchingProduct.priceCents)}
							</div>
							<div class="product-quantity">
								<span>
									Quantity: <span class="quantity-label">${cartItem.quantity}</span>
								</span>
								<span class="update-quantity-link link-primary 
								js-update-quantity-link" data-product-id= "${matchingProduct.id}">
									Update
								</span>
								<input class= "quantity-input">
								<span class= "save-quantity-link link-primary 
								js-save-quantity-link" data-product-id= "${matchingProduct.id}">
								Save
								</span>
								<span class="delete-quantity-link link-primary js-delete-link"
								data-product-id= "${matchingProduct.id}">
									Delete
								</span>
							</div>
						</div>

						<div class="delivery-options">
							<div class="delivery-options-title">
								Choose a delivery option:
							</div>
							<div class="delivery-option">
								<input type="radio" checked
									class="delivery-option-input"
									name="delivery-option-${matchingProduct.id}">
								<div>
									<div class="delivery-option-date">
										Tuesday, June 21
									</div>
									<div class="delivery-option-price">
										FREE Shipping
									</div>
								</div>
							</div>
							<div class="delivery-option">
								<input type="radio"
									class="delivery-option-input"
									name="delivery-option-${matchingProduct.id}">
								<div>
									<div class="delivery-option-date">
										Wednesday, June 15
									</div>
									<div class="delivery-option-price">
										$4.99 - Shipping
									</div>
								</div>
							</div>
							<div class="delivery-option">
								<input type="radio"
									class="delivery-option-input"
									name="delivery-option-${matchingProduct.id}">
								<div>
									<div class="delivery-option-date">
										Monday, June 13
									</div>
									<div class="delivery-option-price">
										$9.99 - Shipping
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			`;}
	});


document.querySelector(".js-order-summary")
	.innerHTML = cartSummaryHTML;


// functionality when delete button is clicked
document.querySelectorAll(".js-delete-link")
	.forEach((link) => {
		link.addEventListener('click', () => {
			const {productId} = link.dataset;

			// remove the product from the cart JSON
			removeFromCart(productId);
		
		const container = document.querySelector(`.js-class-item-container-${productId}`);
		console.log(container);
		container.remove();

		// update the cart quantity on the page header
		updateCartQuantity();

		});
	});

/**
 * Updates the displayed cart quantity on the page.
 * 
 * This function calculates the total quantity of items in the cart
 * and updates the text content of the element with the class
 * 'js-return-to-home-link' to reflect this quantity.
 * 
 * @returns {void}
 * 
 * @example
 * // After adding an item to the cart
 * updateCartQuantity();
 */
function updateCartQuantity () {
	document.querySelector('.js-return-to-home-link')
		.innerHTML = calculateCartQuantity();
};

updateCartQuantity();


document.querySelectorAll('.js-update-quantity-link')
	.forEach((link) => {
		link.addEventListener('click', () => {
			const {productId} = link.dataset;
			// console.log(productId);
			const container = document.querySelector(`.js-class-item-container-${productId}`);
			
			container.classList.add("is-editing-quantity");
			
		});
	});



/*
document.querySelectorAll('.js-save-quantity-link')
	.forEach((link) => {
		link.addEventListener('click', () => {
			const {productId} = link.dataset;
			// console.log(productId);

			const container = document.querySelector(`.js-class-item-container-${productId}`);		
			container.classList.remove("is-editing-quantity");

			const newQuantity = Number(document.querySelector('.quantity-input').value);
			// console.log(newQuantity);
			
			updateQuantity(productId, newQuantity);

			document.querySelector('.quantity-label')
				.innerHTML = newQuantity;
			
			updateCartQuantity();			
			
		});
	});
*/

document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
			/**
			 * Saves the new quantity for a product in the cart and updates the UI.
			 * @description
			 *  This function is designed to be used as an event handler for click events
 			 * on elements with the class 'js-save-quantity-link'.
			 * @requires updateQuantity - function to update the quantity in cart data.
			 * @requires updateCartQuantity - function to update the quantity in UI. 
			 */
        function saveQuantity() {
            const {productId} = link.dataset;
            const container = document.querySelector(`.js-class-item-container-${productId}`);        
            container.classList.remove("is-editing-quantity");

            const newQuantity = Number(container.querySelector('.quantity-input').value);
            
            updateQuantity(productId, newQuantity);

            container.querySelector('.quantity-label')
							.innerHTML = newQuantity;
            
            updateCartQuantity();           
        };

        link.addEventListener('click', saveQuantity);

        const quantityInput = document.querySelector(`.js-class-item-container-${link.dataset.productId} .quantity-input`);
        quantityInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                saveQuantity();
                event.preventDefault();
            }
        });
    });