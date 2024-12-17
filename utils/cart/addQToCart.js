import * as SecureStore from 'expo-secure-store';

export const addQToCart = (product_id, setCartQ) =>{
    let cart = SecureStore.getItem('cart');
    if (!cart)
    {
        cart = {};
    }
    else
        cart = JSON.parse(cart);
    if(cart.hasOwnProperty(product_id))
    {
        cart[product_id] += 1;
    }
    else
    {
        cart[product_id] = 1;
    }
    setCartQ(cart);
    SecureStore.setItem('cart', JSON.stringify(cart));
}