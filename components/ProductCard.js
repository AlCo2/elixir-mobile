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
            <Image style={{height:160, width:180, borderRadius:10}} source={{uri:`${API_URL}${product.images[0].url}`}}/>
            </Pressable>
            <Card.Content style={{height:'100%'}}>
                <TouchableOpacity onPress={getProduct}>
                    <Text style={{marginVertical:5, fontWeight:'bold',height:43, fontSize:12, opacity:0.8}}>{product.title}</Text>
                </TouchableOpacity>
                <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center', height:30}}>
                    {product.promotion?
                        <View>
                            <Text variant="bodySmall" style={{fontWeight:'bold', color:'red', textDecorationLine:'line-through', opacity:0.8}}>{product.price} DH</Text>
                            <Text variant="bodyMedium" style={{fontWeight:'bold', color:'black'}}>{product.promotion.promotion_price} DH</Text>
                        </View>
                    :
                        <Text variant="bodyMedium" style={{fontWeight:'bold', color:'black'}}>{product.price} DH</Text>
                    }
                    <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center', height:30}}>
                        <IconButton icon="cart" iconColor={"white"} style={{backgroundColor:'#a6d612', borderRadius:10}} size={20}onPress={()=>addToCart(product)}/>
                    </View>
                </View>                
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