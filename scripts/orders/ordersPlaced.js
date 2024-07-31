import { getProduct } from "../../data/products.js";
import { orders } from "../../data/orders.js";
import { loadProductsFetch } from "../../data/products.js";
import formatCurrency from "../../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'


function formatDate(dateString) {
  return dayjs(dateString).format('MMMM D');
}


export function renderOrderPlaced () {
  
  let orderPlacedHTML = '';
  let orderPlacedHeader = '';
  let orderPlacedBody = '';


  orders.forEach((order) => {
    console.log(order);

    const orderId = order.id;
    const orderDate = formatDate(order.orderTime);
    const totalCost = formatCurrency(order.totalCostCents); 
    
    orderPlacedHeader += `
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${totalCost}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>
    `;

    order.products.forEach(product => {

      const matchingProduct = getProduct(product.productId);
      const arrivingOn = formatDate(product.estimatedDeliveryTime);
      const {quantity} = product;
      // console.log(matchingProduct);

      
      orderPlacedBody += `
          <div class="order-details-grid">
            <div class= "js-matching-product-container">
              <div class="product-image-container">
                <img src="${matchingProduct.image}">
              </div>
              <div class="product-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
            </div>
              <div class="product-delivery-date">
                Arriving on: ${arrivingOn}
              </div>
              <div class="product-quantity">
                Quantity: ${quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
      `

    });

    orderPlacedHTML = orderPlacedHeader + orderPlacedBody;
    console.log(orderPlacedHTML);

  });

  
  // document.querySelector('.')



}

// renderOrderPlaced();