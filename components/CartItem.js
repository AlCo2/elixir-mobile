import { Image, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { deleteFromCart } from '../utils/deleteFromCart';

const CartItem = ({product, Q, products, setProducts, setTotal, total}) => {
  function deleteItem(){
    deleteFromCart(product.id);
    let temp = [...products];
    let index = temp.indexOf(product);
    temp.splice(index, 1);
    setProducts(temp);
    setTotal(total - (product.price * Q));
  }
  return (
    <View style={{flexDirection:'row', backgroundColor:'white', marginHorizontal:10, borderRadius:10, justifyContent:'space-between', alignItems:'center'}}>
      <View style={{flexDirection:'row'}}>
        <View style={{ height:100, width:100, borderRadius:10}}>
            <Image style={{height:'100%', width:'100%', borderBottomLeftRadius:10, borderTopLeftRadius:10}} source={{uri:product.images[0].url}}/>
        </View>
        <View style={{margin:10, gap:10, width:'50%'}}>
            <Text variant='titleMedium' style={{fontWeight:'bold'}}>{product.title}</Text>
            <Text variant='bodyMedium' style={{color:'#faaea6', fontWeight:'bold'}}>{product.price * Q}DH</Text>
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