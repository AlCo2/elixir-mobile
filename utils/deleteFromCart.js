import * as SecureStore from 'expo-secure-store';

export const deleteFromCart = (product_id) =>{
    let cart = SecureStore.getItem('cart');
    if (cart)
    {
        cart = JSON.parse(cart);
        if(cart.hasOwnProperty(product_id))
        {
            delete cart[product_id];
        }
        SecureStore.setItem('cart', JSON.stringify(cart));
    }
}