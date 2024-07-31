export const orders = JSON.parse(localStorage.getItem('orders')) || [];


export function addOrder (orderObject) {
  orders.unshift(orderObject);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders)
  )
}


/**
 * Retrieves an order by its ID from the orders array.
 *
 * @param {string} orderId - The ID of the order to retrieve.
 * @returns {Object|undefined} The matching order object, or undefined if no match is found.
 */
export function getOrder (orderId) {
   
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}

/**
 * Retrieves a product by its ID from the orders object.
 *
 * @param {string} productId - The ID of the product to retrieve.
 * @returns {Object|undefined} The matching product object, or undefined if no match is found.
 */
export function getProductFromOrders(productId) {
  let matchingProduct;

  orders.forEach((order) => {
    order.products.forEach((product) => {
      if (product.productId === productId) {
        matchingProduct = product;
      }
    });
  });

  return matchingProduct;
}
