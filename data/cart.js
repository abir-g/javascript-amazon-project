export const cart = [];


export function addToCart(productId, quantity) {
    let matchingItem;

            cart.forEach((item) => {
                if (productId === item.productId) {
                    matchingItem = item;
                }
            });
            // if the item already exists in the cart,
            //  we need to push the updated qty, else add it to the cart



            if (matchingItem) {
                matchingItem.quantity += quantity;
            } else {
                cart.push({
                    productId,
                    quantity : quantity
    
                });
            }

}
