import * as SecureStore from 'expo-secure-store';

export const deleteFromCart = (product_id, setCartQ) =>{
    let cart = SecureStore.getItem('cart');
    if (cart)
    {
        cart = JSON.parse(cart);
        if(cart.hasOwnProperty(product_id))
        {
            delete cart[product_id];
        }
        setCartQ(cart);
        SecureStore.setItem('cart', JSON.stringify(cart));
    }
}