import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
import { renderTrackingPage } from "./tracking/trackingPage.js";

async function loadPage() {
  try{

    await Promise.all([
      loadProductsFetch(),
      // loadCartFetch()
    ]);

  } catch (error) {
    console.log('unexpected error. please try again later');
  }
  
  renderTrackingPage();  

}

loadPage();
