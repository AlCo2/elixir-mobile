import { Image, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { API_URL } from '@env';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';

const CartItem = ({product, Q}) => {
  const { deleteItem } = useContext(CartContext);
  return (
    <View style={{flexDirection:'row', backgroundColor:'white', marginHorizontal:10, borderRadius:10, justifyContent:'space-between', alignItems:'center'}}>
      <View style={{flexDirection:'row'}}>
        <View style={{ height:100, width:100, borderRadius:10}}>
            <Image style={{height:'100%', width:'100%', borderBottomLeftRadius:10, borderTopLeftRadius:10}} source={{uri:`${API_URL}${product.images[0].url}`}}/>
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
          onPress={()=>deleteItem(product)}
        />
      </View>
    </View>
  )
}

export default CartItem;