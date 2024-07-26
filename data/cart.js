export let cart = JSON.parse(localStorage.getItem('cart'));
// console.log(cart);

if (!cart) {
    cart = [{
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    }, {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
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
                    quantity : quantity
    
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
    console.log(cartQuantity);
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
