import React, { useContext } from 'react'
import { Image, ScrollView, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { addToCart } from '../utils/addToCart';
import { CartContext } from '../context/cartContext';
import { ip } from '../utils/const';

const PromotionProduct = ({route}) => {
    const { promotion } = route.params;
    const { cartProducts, setCartProducts } = useContext(CartContext);
    function add()
    {
        if(!cartProducts.includes(promotion.product))
            setCartProducts(cartProducts=>[promotion.product, ...cartProducts]);
        addToCart(promotion.product.id)
    }
  return (
    <ScrollView>
      <View style={{backgroundColor:'white'}}>
        <Image style={{height:400, width:'100%'}} source={{uri:`http://${ip}:8000${product.images[0].url}`}}/>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', margin:20}}>
        <Text variant='titleLarge' style={{fontWeight:'bold', width:'60%'}}>{product.promotion.product.title}</Text>
      </View>
      <View style={{marginHorizontal:20}}>
        <Text variant='bodyMedium' style={{opacity:0.7}}>
          {promotion.product.description}
        </Text>
      </View>
      <View style={{margin:20}}>
        <Text variant='titleSmall' style={{opacity:0.6, fontWeight:'bold'}}>Category</Text>
        <View style={{flexDirection:'row', marginTop:5, gap:5}}>
          <Chip>{promotion.product.category.name}</Chip>
        </View>
      </View>
      <View  style={{margin:20, alignItems:'center'}}>
          <Button onPress={add} style={{backgroundColor:'#faaea6', borderRadius:20, width:'100%'}} labelStyle={{fontSize:20, paddingVertical:10, fontWeight:'bold'}} mode='contained'>Add to Cart</Button>
      </View>
    </ScrollView>
  )
}

export default PromotionProduct;