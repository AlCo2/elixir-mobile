import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import FavouritItem from '../components/FavouritItem';
import { isUserExist } from '../utils/isUserExist';
import * as SecureStore from 'expo-secure-store';
import { getAuthUser } from '../api/auth';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../context/cartContext';
import { getFavouritProducts } from '../api/favourit';
import { API_URL } from '@env';


const Cart = () => {
  const {user, setUser} = useContext(CartContext);
  const navigation = useNavigation();
  const [favourits, setFavourits] = useState(null);

  async function fetchProducts()
  {
    const token = SecureStore.getItem('token');
    const response = await getFavouritProducts(token)
    .catch((error)=>
    {
      console.log(error);
    });
    if (response && response.status == 200)
    {
      setFavourits(response.data);
    }
  }
  async function fetchAuthUser(){
      const token = SecureStore.getItem('token');
      const response = await getAuthUser(token)
      .catch((error)=>{
          setUser(null);
      });
      if (response && response.status == 200)
      {
          setUser(response.data);
          SecureStore.setItemAsync('user',JSON.stringify(response.data));
          fetchProducts();
      }
  }
  useEffect(()=>{
    if (!isUserExist(setUser))
    {
        fetchAuthUser();
    }else
      fetchProducts();
  }, [])

  if (!user)
  {
    return  <SafeAreaView style={{alignItems:'center', justifyContent:'center', height:300, gap:30}}>
              <Text style={{fontSize:18, fontWeight:'bold'}}>Login to add items to your favourites</Text>
              <View style={{flexDirection:'row'}}>
              <Text variant='bodyMedium' style={{opacity:0.4}}>click here to </Text>
              <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                <Text variant='bodyMedium' style={{fontWeight:'bold', opacity:0.8,color:'black'}}>Login</Text>
              </TouchableOpacity>
              <Text variant='bodyMedium' style={{opacity:0.4}}> or </Text>
              <TouchableOpacity onPress={()=>{navigation.navigate('Register')}}>
                <Text variant='bodyMedium' style={{fontWeight:'bold', opacity:0.8,color:'black'}}>Register</Text>
              </TouchableOpacity>
              </View>
            </SafeAreaView>
  }
  return (
    <ScrollView style={{backgroundColor:'#f5f5f5'}}>
        <SafeAreaView>
            <View style={{margin:20}}>
              <Text variant='headlineLarge' style={{fontWeight:'bold'}}>Favourit</Text>
            </View>
            <View style={{gap:10}}>
              {favourits && favourits.length>0?
                favourits.map((favourit)=>(
                  <FavouritItem key={favourit.id} title={favourit.title} price={favourit.promotion && favourit.promotion.active?favourit.promotion.promotion_price:favourit.price} image={`${API_URL}${favourit.images[0].url}`}/>
                ))  
                :
                <Text variant='titleLarge' style={{textAlign:'center', fontWeight:'bold', opacity:0.5}}>You Favourit list is Empty</Text>
              }
            </View>
        </SafeAreaView>
    </ScrollView>
  )
}

export default Cart;