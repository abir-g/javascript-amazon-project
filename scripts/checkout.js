import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";


async function loadPage() {
  try{

    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);

  } catch (error) {
    console.log('unexpected error. please try again later');
  }
  
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader(); 
}

loadPage();


/*
Promise.all([
  loadProductsFetch(),
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