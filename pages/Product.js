import React, { useContext, useEffect, useState } from 'react'
import { Image, ScrollView, View } from 'react-native';
import { Button, Chip, IconButton, Text } from 'react-native-paper';
import { API_URL } from '@env';
import { CartContext } from '../context/cartContext';
import Swiper from 'react-native-swiper';
import * as SecureStore from 'expo-secure-store';
import { addProductToFavourit } from '../api/favourit';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

const Product = ({route}) => {
  const navigation = useNavigation();
  const { addToCart, favourites, setFavourites } = useContext(CartContext);
  const { product } = route.params;
  const [isFavourite, setIsFavourite] = useState(false);

  const addToFav = async () =>{
    console.log('here');
    const token = SecureStore.getItem('token');
    if (token)
    {
        if (isFavourite)
        {
            const updatedFavourites = favourites.filter(p => p.id !== product.id);
            setFavourites(updatedFavourites);
        }
        else
        {
            setFavourites(favourites=>[...favourites, product]);
        }
        setIsFavourite(!isFavourite);
    }
    await addProductToFavourit(token, product.id).catch((error)=>{
        if (error.response.status===401)
        {
            navigation.navigate('Login');
        }
    });
  }
  useEffect(()=>{
    setIsFavourite(favourites.some(p => p.id === product.id))
  }, [favourites])
  return (
    <ScrollView>
      <View style={{position:'absolute', top:300, right:20, zIndex:1}}>
        <IconButton icon="heart" iconColor={isFavourite?"red":"gray"} style={{ borderRadius:10}} size={30} onPress={()=>addToFav()}/>
      </View>
      <Swiper style={{height:400}}>
        <View style={{backgroundColor:'white'}}>
          <Image style={{height:400, width:'100%'}} source={{uri:`${API_URL}${product.images[0].url}`}}/>
        </View>
        <View style={{backgroundColor:'white'}}>
          <Image style={{height:400, width:'100%'}} source={{uri:`${API_URL}${product.images[1].url}`}}/>
        </View>
      </Swiper>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', margin:20}}>
        <Text style={{fontWeight:'bold', width:'75%', fontSize:18}}>{product.title}</Text>
        {product.promotion?
          <View>
            <Text variant='titleSmall' style={{color:'red', fontWeight:'bold', textDecorationLine:'line-through', textAlign:'right', opacity:0.8}}>{product.price}DH</Text>
            <Text variant='titleMedium' style={{color:'black', fontWeight:'bold'}}>{product.promotion.promotion_price}DH</Text>
          </View>
          :
          <Text variant='titleMedium' style={{color:'black', fontWeight:'bold'}}>{product.price}DH</Text>
        }
      </View>
      <View style={{marginHorizontal:20}}>
        <Text variant='bodyMedium' style={{opacity:0.7}}>
          {product.description}
        </Text>
      </View>
      <View style={{margin:20}}>
        <Text variant='titleSmall' style={{opacity:0.6, fontWeight:'bold'}}>Category</Text>
        <View style={{flexDirection:'row', marginTop:5, gap:5}}>
          <Chip>{product.category.name}</Chip>
        </View>
      </View>
      <View  style={{margin:20, alignItems:'center'}}>
          <Button onPress={()=>{addToCart(product);showMessage({message:'success',description:`${product.title} added to cart successfully`, type:'success'})}} style={{backgroundColor:'black', borderRadius:20, width:'100%'}} labelStyle={{fontSize:20, paddingVertical:10, fontWeight:'bold'}} mode='contained'>Add to Cart</Button>
      </View>
    </ScrollView>
  )
}

export default Product;