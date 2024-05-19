import React from 'react'
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { ScrollView, View } from 'react-native';
import CartItem from '../components/CartItem';
import FavouritItem from '../components/FavouritItem';

const Cart = () => {
  return (
    <ScrollView style={{backgroundColor:'#f5f5f5'}}>
        <SafeAreaView>
            <View style={{margin:20}}>
              <Text variant='headlineLarge' style={{fontWeight:'bold'}}>Favourit</Text>
            </View>
            <View style={{gap:10}}>
              <FavouritItem title={'Ameer Al Oudh Intense Oud'} price={'199.00'} image={'https://parfumstore.ma/wp-content/uploads/2024/04/ameer-al-oudh-intense-oud-lattafa-prix-au-maroc.webp'}/>
              <FavouritItem title={'I Am The King 100ml'} price={'189.00'} image={'https://parfumstore.ma/wp-content/uploads/2024/04/i-am-the-king-ana-al-malik-100ml-pour-homme.webp'}/>
            </View>
        </SafeAreaView>
    </ScrollView>
  )
}

export default Cart;