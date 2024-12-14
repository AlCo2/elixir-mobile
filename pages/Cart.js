import { useContext, useEffect } from 'react'
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';
import CartItem from '../components/CartItem';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { CartContext } from '../context/cartContext';
import { useNavigation } from '@react-navigation/native';
import { getCartPoroducts } from '../api/products';

const Cart = () => {
  const { cartProducts, setCartProducts, totalPrice, setTotalPrice, cartQ, setCartQ } = useContext(CartContext);
  const navigation = useNavigation();
  const fetchProducts = async () => {
    let data = SecureStore.getItem('cart');
    if (data)
    {
      data = JSON.parse(data);
      const response = await getCartPoroducts(data);
      if (response && response.status == 200)
      {
        setTotalPrice(response.data.total);
        setCartProducts(response.data.products);
        setCartQ(data);
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
                  <CartItem key={product.id} product={product} Q={cartQ[product.id]}/>
                )))
              :
              <Text variant='titleLarge' style={{textAlign:'center'}}>Your Cart is Empty</Text>
              }
            </View>
            {cartProducts.length>0?
              <>
                <View style={{margin:20}}>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text variant='titleMedium' style={{fontWeight:'bold', opacity:0.5}}>Discount</Text>
                      <Text variant='titleMedium' style={{fontWeight:'bold'}}>0 DH</Text>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text variant='titleMedium' style={{fontWeight:'bold', opacity:0.5}}>Delivery</Text>
                      <Text variant='titleMedium' style={{fontWeight:'bold'}}>0 DH</Text>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text variant='titleMedium' style={{fontWeight:'bold', opacity:0.5}}>Tax</Text>
                      <Text variant='titleMedium' style={{fontWeight:'bold'}}>0 DH</Text>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text variant='titleMedium' style={{fontWeight:'bold', opacity:0.5}}>Total</Text>
                      <Text variant='titleMedium' style={{fontWeight:'bold'}}>{totalPrice}DH</Text>
                  </View>
                </View>
                <View style={{marginRight:20, alignItems:'flex-end'}}>
                  <Button onPress={()=>fetchProducts()} style={{backgroundColor:'black', borderRadius:5, width:140}} labelStyle={{fontSize:20, paddingVertical:5}} mode='contained'>Checkout</Button>
                </View>
              </>
            :
              <View style={{margin:20, alignItems:'center'}}>
                <Button onPress={()=>navigation.navigate('Store', {data:'featured'})} style={{backgroundColor:'#faaea6', borderRadius:10, width:300}} labelStyle={{fontSize:20, paddingVertical:5}} mode='contained'>Go Buy Something</Button>
              </View>
            }
        </SafeAreaView>
    </ScrollView>
  )
}

export default Cart;