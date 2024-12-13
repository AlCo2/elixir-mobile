import { createContext, useState } from "react";
import { addQToCart } from "../utils/addQToCart";
import * as SecureStore from 'expo-secure-store';
import { deleteFromCart } from "../utils/deleteFromCart";

export const CartContext = createContext(null);

export const CartProvider = ({children}) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartQ, setCartQ] = useState({});

    const deleteItem = (product) =>{
        let cart = SecureStore.getItem('cart');
        if (cart)
        {
          cart = JSON.parse(cart);
          const price = (product.promotion?product.promotion.promotion_price:product.price);
          setTotalPrice(totalPrice - (cart[product.id] * price));
          deleteFromCart(product.id);
          let temp = [...cartProducts];
          let index = temp.indexOf(product);
          temp.splice(index, 1);
          setCartProducts(temp);
        }
      }
    const addToCart = (product) =>
    {
        if (product)
        {
            const temp = cartQ;
            if(!cartProducts.includes(product))
            {
                setCartProducts(cartProducts=>[...cartProducts, product]);
                temp[product.id] = 1;
            }
            else
                temp[product.id] += 1;
            setCartQ(temp);
            const price = product.promotion?product.promotion.promotion_price:product.price;
            setTotalPrice(totalPrice + price);
            addQToCart(product.id)
        }
    }
    return (
    <CartContext.Provider value={{cartProducts, setCartProducts, totalPrice, setTotalPrice, cartQ, setCartQ, addToCart, deleteItem}}>
        {children}        
    </CartContext.Provider>
)}