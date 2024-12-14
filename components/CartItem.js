import { Image, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { API_URL } from '@env';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';

const CartItem = ({product, Q}) => {
  const { deleteItem, cartQ, addToCart, subtractFromCart } = useContext(CartContext);
  return (
    <View style={{flexDirection:'row', backgroundColor:'white', marginHorizontal:10, borderRadius:10}}>
      <View style={{flexDirection:'row', width:'75%'}}>
        <View style={{ height:100, width:100, borderRadius:10}}>
            <Image style={{height:'100%', width:'100%', borderBottomLeftRadius:10, borderTopLeftRadius:10}} source={{uri:`${API_URL}${product.images[0].url}`}}/>
        </View>
        <View style={{paddingTop:10, paddingLeft:10, gap:5, width:'65%'}}>
            <Text style={{fontWeight:'600', fontSize:14,opacity:0.5}}>{product.title}</Text>
            <Text variant='bodyMedium' style={{color:'black', fontWeight:'bold'}}>{product.promotion?product.promotion.promotion_price * Q:product.price * Q} DH</Text>
        </View>
      </View>
      <View style={{height:100}}>
        <View style={{ height:'50%', alignItems:'flex-end'}}>
          <IconButton icon="delete" iconColor={"red"} size={20} onPress={()=>deleteItem(product)}/>
        </View>
        <View style={{ height:'50%', flexDirection:'row', alignItems:'center', gap:5}}>
          <IconButton style={{borderRadius:5}} icon='minus' size={10} mode='outlined' onPress={()=>subtractFromCart(product)}></IconButton> 
          <Text>{cartQ[product.id]}</Text>
          <IconButton style={{borderRadius:5}} icon='plus' size={10} mode='outlined' onPress={()=>addToCart(product)}></IconButton>
        </View>
      </View>
    </View>
  )
}

export default CartItem;