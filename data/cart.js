export let cart = JSON.parse(localStorage.getItem('cart'));
// console.log(cart);

if (!cart) {
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2, 
        deliveryOptionId : '1'
    }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId : '2'
    }];

}

export function addToCart(productId, quantity) {
    let matchingItem;

            cart.forEach((item) => {
                if (productId === item.productId) {
                    matchingItem = item;
                }
            });
            // if the item already exists in the cart,
            //  we need to push the updated qty, else add it to the cart



            if (matchingItem) {
                matchingItem.quantity += quantity;
            } else {
                cart.push({
                    productId,
                    quantity : quantity,
                    deliveryOptionId : '1'
    
                });
            }
        
    saveToStorage();

}

export function removeFromCart (productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId){
            newCart.push(cartItem);
        } 
    });

    cart = newCart;
    console.log(cart);
    saveToStorage();
};

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Updated in local storage")
};



/**
 * Calculates the total quantity of items in the cart.
 * @returns {number} The total quantity of items in the cart.
 */
export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });
    // console.log(cartQuantity);
    return cartQuantity;
};

calculateCartQuantity();


/**
 * Updates the quantity of a specific product in the cart.
 * 
 * @param {string|number} productId - The unique identifier of the product to update.
 * @param {number} newQuantity - The new quantity to set for the product.
 * 
 * @description
 * This function iterates through the cart, finds the item with the matching productId,
 * and updates its quantity. After updating, it logs the new quantity and saves the cart to storage.
 * 
 * @example
 * updateQuantity('prod123', 5);
 */
export function updateQuantity(productId, newQuantity) {

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity = newQuantity;
        }

        console.log(cartItem.quantity);
        saveToStorage();
    });
};


/**
 * Updates the delivery option for a specific product in the cart.
 *
 * @function updateDeliveryOption
 * @param {string|number} productId - The unique identifier of the product.
 * @param {string|number} deliveryOptionId - The id of the selected delivery option.
 * @throws {Error} If the product is not found in the cart.
 * 
 * @description
 * This function searches for a product in the cart by its ID and
 * updates its delivery option. If the product is found, it updates
 * the delivery option and saves the changes to storage. If the 
 * product is not found, it throws an error.
 * 
 * @requires cart - An array of cart items.
 * @requires saveToStorage - Function to persist cart changes.
 */
export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    if (matchingItem) {
        matchingItem.deliveryOptionId = deliveryOptionId;
        saveToStorage();
    } else {
        throw new Error(`Product with ID ${productId} not found in cart`);
    }
}
