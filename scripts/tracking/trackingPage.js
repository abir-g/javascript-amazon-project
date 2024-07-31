import { updateCartQuantity } from "../orders/ordersPlaced.js";
import { getProduct } from "../../data/products.js";
import { getOrder, orders } from "../../data/orders.js";
import { getProductFromOrders } from "../../data/orders.js";
import { formatDate } from "../orders/ordersPlaced.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


/**
 * Calculates the shipping status as a percentage.
 * @param {string|Date} deliveryDate - The expected delivery date.
 * @param {string|Date} orderDate - The date when the order was placed.
 * @returns {number} The shipping status as a percentage, capped at 100%.
 */
function calculateShippingStatus(deliveryDate, orderDate) {
  const now = dayjs();
  const delivery = dayjs(deliveryDate);
  const order = dayjs(orderDate);

  if (now.isBefore(order)) {
    return 0;
  }

  if (now.isAfter(delivery)) {
    return 100;
  }

  const totalDuration = delivery.diff(order);
  const elapsedDuration = now.diff(order);

  const percentage = (elapsedDuration / totalDuration) * 100;

  // return Math.min(Math.max(percentage, 0), 100);
  return percentage;
}

export function renderTrackingPage() {
  // updateCartQuantity();
  // console.log(percentageProgress);
  let trackingPageHTML = "";

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  
  const order = getOrder(orderId);

  console.log(order);
  // console.log(productId);

  const matchingProductOrder = getProductFromOrders(productId);

  const deliveryDate = formatDate(matchingProductOrder.estimatedDeliveryTime);

  const matchingProduct = getProduct(productId);

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(matchingProductOrder.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
  console.log(percentProgress);

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
        <div class="progress-label ${percentProgress < 50 ? 'current-status': ''}">
          Preparing
        </div>
        <div class="progress-label ${percentProgress >= 50 && percentProgress < 100 ? 'current-status': ''}">
          Shipped
        </div>
        <div class="progress-label" ${percentProgress >= 100 ? 'current-status': ''}>
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${percentProgress}%;"></div>
      </div>
    </div>
  `;

  document.querySelector('.js-order-tracking')
    .innerHTML = trackingPageHTML;
}

