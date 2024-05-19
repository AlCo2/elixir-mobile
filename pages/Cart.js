import React from 'react'
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { ScrollView, View } from 'react-native';
import CartItem from '../components/CartItem';

const Cart = () => {
  return (
    <ScrollView style={{backgroundColor:'#f5f5f5'}}>
        <SafeAreaView>
            <View style={{margin:20}}>
              <Text variant='headlineLarge' style={{fontWeight:'bold'}}>Cart</Text>
            </View>
            <View style={{gap:10}}>
              <CartItem title={'Ameer Al Oudh Intense Oud'} price={'199.00'} image={'https://parfumstore.ma/wp-content/uploads/2024/04/ameer-al-oudh-intense-oud-lattafa-prix-au-maroc.webp'}/>
              <CartItem title={'Asad Lattafa'} price={'239.00'} image={'https://parfumstore.ma/wp-content/uploads/2024/04/Lattafa-Asad-prix-maroc.webp'}/>
              <CartItem title={'I Am The King 100ml'} price={'189.00'} image={'https://parfumstore.ma/wp-content/uploads/2024/04/i-am-the-king-ana-al-malik-100ml-pour-homme.webp'}/>
            </View>
            <View style={{margin:20, flexDirection:'row', justifyContent:'space-between'}}>
                <Text variant='titleMedium' style={{fontWeight:'bold'}}>Total</Text>
                <Text variant='titleMedium' style={{fontWeight:'bold', color:'#faaea6'}}>399DH</Text>
            </View>
            <View style={{margin:20, alignItems:'center'}}>
                <Button onPress={()=>console.log('checkout')} style={{backgroundColor:'#faaea6', borderRadius:10, width:200}} labelStyle={{fontSize:20, paddingVertical:5}} mode='contained'>Checkout</Button>
            </View>
        </SafeAreaView>
    </ScrollView>
  )
}

export default Cart;