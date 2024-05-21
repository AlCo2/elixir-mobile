import { Image, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { deleteFromCart } from '../utils/deleteFromCart';
import { CartContext } from '../context/cartContext';
import { useContext } from 'react';

const CartItem = ({product}) => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  function deleteItem(){
    deleteFromCart(product.id);
    let temp = [...cartProducts];
    let index = temp.indexOf(product);
    temp.splice(index, 1);
    setCartProducts(temp);
  }
  return (
    <View style={{flexDirection:'row', backgroundColor:'white', marginHorizontal:10, borderRadius:10, justifyContent:'space-between', alignItems:'center'}}>
      <View style={{flexDirection:'row'}}>
        <View style={{ height:100, width:100, borderRadius:10}}>
            <Image style={{height:'100%', width:'100%', borderBottomLeftRadius:10, borderTopLeftRadius:10}} source={{uri:product.images[0].url}}/>
        </View>
        <View style={{margin:10, gap:10, width:'50%'}}>
            <Text variant='titleMedium' style={{fontWeight:'bold'}}>{product.title}</Text>
            <Text variant='bodyMedium' style={{color:'#faaea6', fontWeight:'bold'}}>{product.price}DH</Text>
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