import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { addToCart } from '../utils/addToCart';
import { CartContext } from '../context/cartContext';

const ProductCard = ({product}) =>{
    const navigation = useNavigation();
    const { cartProducts, setCartProducts } = useContext(CartContext);
    const getProduct = () =>{
        navigation.navigate('Product', {product:product})
    }
    function add()
    {
        if(!cartProducts.includes(product))
            setCartProducts(cartProducts=>[product, ...cartProducts]);
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
                <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center', height:20}}>
                    <Text variant="bodyMedium" style={{fontWeight:'bold', color:'#faaea6'}}>{product.price}DH</Text>
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
    productCard:{
        backgroundColor:'white',
        width:180,
        maxHeight:240,
    }
  });

export default ProductCard;