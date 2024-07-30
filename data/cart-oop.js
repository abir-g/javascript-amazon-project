function Cart(localStoreKey) {
  const cart = {
    cartItems: undefined,
      
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStoreKey));
  
      if (!this.cartItems) {
        this.cartItems = [{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2, 
            deliveryOptionId : '1'
        }, {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId : '2'
        }];
      }
    },
    
    saveToStorage() {
      localStorage.setItem(localStoreKey, JSON.stringify(this.cartItems));
    },
  
    addToCart(productId, quantity) {
      let matchingItem;
  
      this.cartItems.forEach((item) => {
          if (productId === item.productId) {
              matchingItem = item;
          }
      });
      // if the item already exists in the cart,
      //  we need to push the updated qty, else add it to the cart
      if (matchingItem) {
          matchingItem.quantity += quantity;
      } else {
          this.cartItems.push({
              productId,
              quantity : quantity,
              deliveryOptionId : '1'
  
          });
      }
      this.saveToStorage();
    },
      
    /**
     * Removes a specific product from the cart.
     *
     * @function removeFromCart
     * @param {string|number} productId - The unique identifier of the product to be removed.
     * 
     * @description
     * This function creates a new cart array excluding the item with the specified productId.
     * It then replaces the original cart with this new array and saves the updated cart to storage.
     * 
     * @requires cart - A global or module-level array containing cart items.
     * @requires saveToStorage - A function that persists the cart data to storage.
     *
     * @example
     * removeFromCart('product123');
     * // Removes the product with id 'product123' from the cart and updates storage.
     *
     * @sideeffects
     * - Modifies the global or module-level 'cart' variable.
     * - Calls saveToStorage() to update persistent storage.
     */
    removeFromCart (productId) {
      const newCart = [];
  
      this.cartItems.forEach((cartItem) => {
          if (cartItem.productId !== productId){
              newCart.push(cartItem);
          } 
      });
  
      this.cartItems = newCart;
      this.saveToStorage();
    },
  
    /**
   * Updates the delivery option for a specific product in the cart.
   *
   * @function updateDeliveryOption
   * @param {string} productId - The unique identifier of the product.
   * @param {string} deliveryOptionId - The id of the selected delivery option.
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
    updateDeliveryOption(productId, deliveryOptionId) {
      const options = ['1', '2', '3'];
      
      if(!options.includes(deliveryOptionId)){
          return;
      }
      
      let matchingItem;
      this.cartItems.forEach((item) => {
          if (productId === item.productId) {
              matchingItem = item;
          }
      });
  
      if (!matchingItem) {
          return
          
      } else {
          matchingItem.deliveryOptionId = deliveryOptionId;
          this.saveToStorage();
      }
    },
  
    /**
   * Calculates the total quantity of items in the cart.
   * @returns {number} The total quantity of items in the cart.
   */
    calculateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((item) => {
          cartQuantity += item.quantity;
      });
      // console.log(cartQuantity);
      return cartQuantity;
    }, 
  
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
    updateQuantity(productId, newQuantity) {
  
      this.cartItems.forEach((cartItem) => {
          if (cartItem.productId === productId) {
              cartItem.quantity = newQuantity;
          }
  
          console.log(cartItem.quantity);
          this.saveToStorage();
      });
    } 
  };
  
  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');


businessCart.loadFromStorage();
cart.loadFromStorage();

console.log(businessCart);
console.log(cart);