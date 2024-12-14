import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react'
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { API_URL } from '@env';
import { CartContext } from '../context/cartContext';

const ProductCard = ({product}) =>{
    const navigation = useNavigation();
    const { addToCart } = useContext(CartContext);
    const getProduct = () =>{
        navigation.navigate('Product', {product:product})
    }
    
    return (
        <Card mode='contained' style={styles.productCard} >
            <Pressable onPress={getProduct}>
            <Image style={{height:160, width:180}} source={{uri:`${API_URL}${product.images[0].url}`}}/>
            </Pressable>
            <Card.Content style={{height:'100%'}}>
                <TouchableOpacity onPress={getProduct}>
                    <Text style={{marginVertical:5, fontWeight:'bold',height:43, fontSize:12, opacity:0.8}}>{product.title}</Text>
                </TouchableOpacity>
                {product.promotion?
                <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center', height:30}}>
                    <View>
                        <Text variant="bodySmall" style={{fontWeight:'bold', color:'red', textDecorationLine:'line-through'}}>{product.price}DH</Text>
                        <Text variant="bodyMedium" style={{fontWeight:'bold', color:'black'}}>{product.promotion.promotion_price}DH</Text>
                    </View>
                    <IconButton
                        icon="plus"
                        iconColor={"white"}
                        style={{backgroundColor:'black', borderRadius:10}}
                        size={20}
                        onPress={()=>addToCart(product)}
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
                        onPress={()=>addToCart(product)}
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