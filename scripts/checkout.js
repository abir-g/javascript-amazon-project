import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProducts } from "../data/products.js";
import { loadCart} from "../data/cart.js";


Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1');
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
  
]).then((values) => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader(); 
});

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });


}).then((value) => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });


}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader(); 
});
*/

// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckoutHeader();
//   });
// });