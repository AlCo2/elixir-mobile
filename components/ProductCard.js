import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { addToCart } from '../utils/addToCart';

const ProductCard = ({product}) =>{
    const navigation = useNavigation();
    const getProduct = () =>{
        navigation.navigate('Product', {product:product})
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
                        onPress={()=>addToCart(product.id)}
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