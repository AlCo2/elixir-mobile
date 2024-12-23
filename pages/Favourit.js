import React, { useContext, useEffect } from 'react'
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import FavouritItem from '../components/FavouritItem';
import { useNavigation } from '@react-navigation/native';
import { getFavouritProducts } from '../api/favourit';
import { FavouritContext } from '../context/favouriteContext';
import { UserContext } from '../context/userContext';
import { isAuth } from '../utils/user/isAuth';


const Favourit = () => {
  const { user } = useContext(UserContext);
  const { favourites, setFavourites } = useContext(FavouritContext);
  const navigation = useNavigation();
  async function fetchFavouritesProducts()
  {
    const response = await getFavouritProducts().catch((error)=>{console.log(error);});
    if (response && response.status == 200)
    {
      setFavourites(response.data);
    }
  }

  useEffect(()=>{
    fetchFavouritesProducts();
  }, [user])

  if (!isAuth())
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
              {favourites && favourites.length>0?
                favourites.map((favourit)=>(
                  <FavouritItem key={favourit.id} product={favourit} favourites={favourites} setFavourites={setFavourites}/>
                ))  
                :
                <Text variant='titleLarge' style={{textAlign:'center', fontWeight:'bold', opacity:0.5}}>You Favourit list is Empty</Text>
              }
            </View>
        </SafeAreaView>
    </ScrollView>
  )
}

export default Favourit;