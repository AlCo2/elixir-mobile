import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { addToCart } from '../utils/addToCart';
import { CartContext } from '../context/cartContext';

const ProductCard = ({product}) =>{
    const navigation = useNavigation();
    const { cartProducts, setCartProducts, totalPrice, setTotalPrice, cartQ, setCartQ } = useContext(CartContext);

    const getProduct = () =>{
        navigation.navigate('Product', {product:product})
    }
    function add()
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
        addToCart(product.id)
    }

    return (
        <Card mode='contained' style={styles.productCard}>
            <Pressable onPress={getProduct}>
            <Card.Cover style={{height:160, width:180}} source={{uri:product.images[0].url}}/>
            </Pressable>
            <Card.Content style={{height:'100%'}}>
                <TouchableOpacity onPress={getProduct}>
                    <Text variant="titleSmall" style={{marginVertical:5, fontWeight:'bold',height:40}}>{product.title}</Text>
                </TouchableOpacity>
                {product.promotion?
                <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center', height:30}}>
                    <View>
                        <Text variant="bodySmall" style={{fontWeight:'bold', color:'red', textDecorationLine:'line-through'}}>{product.price}DH</Text>
                        <Text variant="bodyMedium" style={{fontWeight:'bold', color:'#faaea6'}}>{product.promotion.promotion_price}DH</Text>
                    </View>
                    <IconButton
                        icon="plus"
                        iconColor={"white"}
                        style={{backgroundColor:'black', borderRadius:10}}
                        size={20}
                        onPress={add}
                    />
                </View>
                :
                <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center', height:30}}>
                    <Text variant="bodyMedium" style={{fontWeight:'bold', color:'#faaea6'}}>{product.price}DH</Text>
                    <IconButton
                        icon="plus"
                        iconColor={"white"}
                        style={{backgroundColor:'black', borderRadius:10}}
                        size={20}
                        onPress={add}
                    />
                </View>
                }
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    productCard:{
        backgroundColor:'white',
        width:180,
        maxHeight:250,
    }
  });

export default ProductCard;