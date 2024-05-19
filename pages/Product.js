import React from 'react'
import { Image, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Product = ({route}) => {
    const { title, price, image } = route.params;
  return (
    <View>
      <View style={{paddingTop:30, backgroundColor:'white'}}>
        <Image style={{height:400, width:'100%'}} source={{uri:image}}/>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', margin:20}}>
        <Text variant='titleLarge' style={{fontWeight:'bold', width:'60%'}}>{title}</Text>
        <Text variant='titleMedium' style={{color:'#faaea6', fontWeight:'bold'}}>{price}DH</Text>
      </View>
      <View style={{marginHorizontal:20}}>
        <Text variant='bodyMedium' style={{opacity:0.7}}>a long text just to make a description that describe something that doesn't exist
        a long text just to make a description that describe something that doesn't exist
        a long text just to make a description that describe something that doesn't exist
        </Text>
      </View>
      <View style={{margin:20}}>
        <Text variant='titleSmall' style={{opacity:0.6, fontWeight:'bold'}}>Category</Text>
        <View style={{flexDirection:'row', marginTop:5, gap:5}}>
          <Chip>Parfum</Chip>
        </View>
      </View>
      <View style={{margin:20, alignItems:'center'}}>
          <Button onPress={()=>console.log('addToCart')} style={{backgroundColor:'#faaea6', borderRadius:20, width:'100%'}} labelStyle={{fontSize:20, paddingVertical:10, fontWeight:'bold'}} mode='contained'>Add to Cart</Button>
      </View>
    </View>
  )
}

export default Product;