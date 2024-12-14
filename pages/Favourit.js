import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import FavouritItem from '../components/FavouritItem';
import { isUserExist } from '../utils/isUserExist';
import * as SecureStore from 'expo-secure-store';
import { getAuthUser } from '../api/auth';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../context/cartContext';

const Cart = () => {
  const {user, setUser} = useContext(CartContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  async function fetchAuthUser(){
      const token = SecureStore.getItem('token');
      const response = await getAuthUser(token)
      .catch((error)=>{
          setUser(null);
          setLoading(false);
      });
      if (response && response.status == 200)
      {
          setUser(response.data);
          SecureStore.setItemAsync('user',JSON.stringify(response.data));
      }
      setLoading(false);
  }
  useEffect(()=>{
    if (!isUserExist(setUser))
    {
        fetchAuthUser();
    }
  }, [])

  if (!user)
  {
      if (loading)
          return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                      <ActivityIndicator animating={true} size={"large"} style={{width:'100%'}}/>
                  </View>
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
              <FavouritItem title={'Ameer Al Oudh Intense Oud'} price={'199.00'} image={null}/>
              <FavouritItem title={'I Am The King 100ml'} price={'189.00'} image={null}/>
            </View>
        </SafeAreaView>
    </ScrollView>
  )
}

export default Cart;