import { renderOrderPlaced } from "./orders/ordersPlaced.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";


async function loadPage() {
  try{

    await Promise.all([
      loadProductsFetch(),
      // loadCartFetch()
    ]);

  } catch (error) {
    console.log('unexpected error. please try again later');
  }
  
  renderOrderPlaced();

}

loadPage();
