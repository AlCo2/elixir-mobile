import { Image, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { deleteFromCart } from '../utils/deleteFromCart';
import { CartContext } from '../context/cartContext';
import { useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

const CartItem = ({product, Q}) => {
  const { cartProducts, setCartProducts, totalPrice, setTotalPrice } = useContext(CartContext);
  function deleteItem(){
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
  return (
    <View style={{flexDirection:'row', backgroundColor:'white', marginHorizontal:10, borderRadius:10, justifyContent:'space-between', alignItems:'center'}}>
      <View style={{flexDirection:'row'}}>
        <View style={{ height:100, width:100, borderRadius:10}}>
            <Image style={{height:'100%', width:'100%', borderBottomLeftRadius:10, borderTopLeftRadius:10}} source={{uri:product.images[0].url}}/>
        </View>
        <View style={{margin:10, gap:10, width:'50%'}}>
            <Text variant='titleMedium' style={{fontWeight:'bold'}}>{product.title}</Text>
            <Text variant='bodyMedium' style={{color:'#faaea6', fontWeight:'bold'}}>{product.promotion?product.promotion.promotion_price * Q:product.price * Q}DH</Text>
        </View>
      </View>
      <View>
        <IconButton
          icon="delete"
          iconColor={"red"}
          size={30}
          onPress={deleteItem}
        />
      </View>
    </View>
  )
}

export default CartItem;