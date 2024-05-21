import { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';
import CartItem from '../components/CartItem';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { CartContext } from '../context/cartContext';
import { ip } from '../utils/const';


const Cart = () => {
  const { cartProducts, setCartProducts } = useContext(CartContext);

  const fetchProducts = async () => {
    let data = SecureStore.getItem('cart');
    if (data)
    {
      data = JSON.parse(data);
      const response = await axios.post(`http://${ip}:8000/api/cartproducts`, {data:data});
      if (response && response.status == 200)
      {
        setCartProducts(response.data.products);
      }
    }
  
  }
  useEffect(()=>{
    fetchProducts();
  }, [])
  return (
    <ScrollView style={{backgroundColor:'#f5f5f5'}}>
        <SafeAreaView>
            <View style={{margin:20}}>
              <Text variant='headlineLarge' style={{fontWeight:'bold'}}>Cart</Text>
            </View>
            <View style={{gap:10}}>
              {cartProducts.length>0?
                cartProducts.map(((product)=>(
                  <CartItem key={product.id} product={product}/>
                )))
              :
              <Text variant='titleLarge' style={{textAlign:'center'}}>Your Cart is Empty</Text>
              }
            </View>
            {cartProducts.length>0?
              <>
                <View style={{margin:20, flexDirection:'row', justifyContent:'space-between'}}>
                    <Text variant='titleMedium' style={{fontWeight:'bold'}}>Total</Text>
                    <Text variant='titleMedium' style={{fontWeight:'bold', color:'#faaea6'}}>0DH</Text>
                </View>
                <View style={{margin:20, alignItems:'center'}}>
                    <Button onPress={()=>fetchProducts()} style={{backgroundColor:'#faaea6', borderRadius:10, width:200}} labelStyle={{fontSize:20, paddingVertical:5}} mode='contained'>Checkout</Button>
                </View>
              </>
            :
              <View style={{margin:20, alignItems:'center'}}>
                  <Button onPress={()=>fetchProducts()} style={{backgroundColor:'#faaea6', borderRadius:10, width:300}} labelStyle={{fontSize:20, paddingVertical:5}} mode='contained'>Go Buy Something</Button>
              </View>
            }
        </SafeAreaView>
    </ScrollView>
  )
}

export default Cart;