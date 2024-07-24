export const cart = [{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
}, {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
}];


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
