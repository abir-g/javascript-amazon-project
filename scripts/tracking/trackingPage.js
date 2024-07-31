import { updateCartQuantity } from "../orders/ordersPlaced.js";
import { getProduct } from "../../data/products.js";
import { orders } from "../../data/orders.js";
import { getProductFromOrders } from "../../data/orders.js";
import { formatDate } from "../orders/ordersPlaced.js";



export function renderTrackingPage() {
  // updateCartQuantity();

  let trackingPageHTML = "";

  const url = new URL(window.location.href);
  const productId = url.searchParams.get('productId');

  // console.log(orders);
  // console.log(productId);

  const matchingProductOrder = getProductFromOrders(productId);

  const deliveryDate = formatDate(matchingProductOrder.estimatedDeliveryTime);

  const matchingProduct = getProduct(productId);

  trackingPageHTML += `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${deliveryDate}
      </div>

      <div class="product-info">
        ${matchingProduct.name}
      </div>

      <div class="product-info">
        Quantity: ${matchingProductOrder.quantity}
      </div>

      <img class="product-image" src="${matchingProduct.image}">

      <div class="progress-labels-container">
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-label current-status">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    </div>
  `;

  document.querySelector('.js-order-tracking')
    .innerHTML = trackingPageHTML;
}

