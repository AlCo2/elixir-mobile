import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { addToCart } from '../utils/addToCart';
import { CartContext } from '../context/cartContext';

const PromotionProductCard = ({promotion}) =>{
    const navigation = useNavigation();
    const { cartProducts, setCartProducts } = useContext(CartContext);
    const getProduct = () =>{
        navigation.navigate('PromotionProduct', {promotion:promotion})
    }
    function add()
    {
        if(!cartProducts.includes(promotion.product))
            setCartProducts(cartProducts=>[promotion.product, ...cartProducts]);
        addToCart(promotion.product.id)
    }
    return (
        <Card mode='contained' style={styles.PromotionproductCard}>
            <Pressable onPress={getProduct}>
                <Card.Cover style={{height:160, width:180}} source={{uri:promotion.product.images[0].url}}/>
            </Pressable>
            <Card.Content style={{height:'100%'}}>
                <TouchableOpacity onPress={getProduct}>
                    <Text variant="titleSmall" style={{marginVertical:5, fontWeight:'bold',height:40}}>{promotion.product.title}</Text>
                </TouchableOpacity>
                <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center', height:30}}>
                    <View>
                        <Text variant="bodySmall" style={{fontWeight:'bold', color:'red', textDecorationLine:'line-through'}}>{promotion.product.price}DH</Text>
                        <Text variant="bodyMedium" style={{fontWeight:'bold', color:'#faaea6'}}>{promotion.promotion_price}DH</Text>
                    </View>
                    <IconButton
                        icon="plus"
                        iconColor={"white"}
                        style={{backgroundColor:'black', borderRadius:10}}
                        size={15}
                        onPress={add}
                    />
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    PromotionproductCard:{
        backgroundColor:'white',
        width:180,
        maxHeight:250,
    }
  });

export default PromotionProductCard;