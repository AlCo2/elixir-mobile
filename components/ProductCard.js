import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';

const ProductCard = ({title, price, image}) =>{
    const navigation = useNavigation();
    const getProduct = () =>{
        navigation.navigate('Product', {title:title, price:price, image:image})
    }
    return (
        <Card mode='contained' style={styles.productCard}>
            <Pressable onPress={getProduct}>
            <Card.Cover style={{height:160, width:180}} source={{uri:image}}/>
            </Pressable>
            <Card.Content style={{height:'100%'}}>
                <TouchableOpacity onPress={getProduct}>
                    <Text variant="titleSmall" style={{marginVertical:5, fontWeight:'bold',height:40}}>{title}</Text>
                </TouchableOpacity>
                <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center', height:20}}>
                    <Text variant="bodyMedium" style={{fontWeight:'bold', color:'#faaea6'}}>{price}DH</Text>
                    <IconButton
                        icon="plus"
                        iconColor={"white"}
                        style={{backgroundColor:'black', borderRadius:10}}
                        size={15}
                        onPress={() => console.log('Pressed')}
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