import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProductsFetch, loadProducts } from "../data/products.js";
import { loadCart} from "../data/cart.js";


async function loadPage() {
  try{
    // throw 'error1';
    await loadProductsFetch();
    
    await new Promise((resolve, reject) => {
      // throw 'error2';
      loadCart(() => {
        // reject('error 3');
        resolve();
      });
    })
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