import React from 'react'
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';
import FavouritItem from '../components/FavouritItem';

const Cart = () => {
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