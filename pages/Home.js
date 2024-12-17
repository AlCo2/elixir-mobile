import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Badge, IconButton, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import parfum from '../assets/parfum.png';
import ProductCard from "../components/ProductCard";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getFeaturedProducts, getManProducts, getWomanProducts } from "../api/products";
import { setUserFromJson } from "../utils/user/setUserFromJson";
import { FavouritContext } from "../context/favouriteContext";
import { UserContext } from "../context/userContext";

const Home = () => {
    const navigation = useNavigation();
    const { setUser } = useContext(UserContext);
    const { fetchFavourites } = useContext(FavouritContext);
    const [search, setSearch] = useState('');
    const [featured, setFeatured] = useState([]);
    const [manProducts, setManProducts] = useState([]);
    const [womanProducts, setWomanProducts] = useState([]);

    function handleSearch()
    {
        navigation.navigate('Store', {data:'featured', value:search})
    }

    async function fetchData(){
        const featuredResponse = await getFeaturedProducts();
        const manResponse = await getManProducts();
        const womanResponse = await getWomanProducts();
        if (featuredResponse.status == 200)
            setFeatured(featuredResponse.data);
        if (featuredResponse.status == 200)
            setManProducts(manResponse.data);
        if (featuredResponse.status == 200)
            setWomanProducts(womanResponse.data);
    }
    
    useEffect(()=>{
        setUserFromJson(setUser);
        fetchFavourites();
        fetchData();
    }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#f5f5f5'}}>
        <SafeAreaView style={{flex:1,backgroundColor:'#f5f5f5'}}>
            <View style={styles.header}>
                <View>
                    <Badge style={{position:'absolute', backgroundColor:'black', right:5, top:5}} size={16}>2</Badge>
                    <IconButton
                        icon="bell"
                        iconColor={'gray'}
                        size={25}
                        onPress={() => navigation.navigate('Notification')}
                    />
                </View>
            </View>
            <View style={{alignItems:'center', marginHorizontal:10}}>
                <Searchbar
                    placeholder="Search Product"
                    style={{backgroundColor:'white', width:'100%'}}
                    value={search}
                    onChangeText={setSearch}
                    onSubmitEditing={()=>handleSearch()}
                />
            </View>
            <View style={styles.newArrival}>
                <Text variant="displaySmall" style={styles.newArrivalText}>New{"\n"}Arrivals</Text>
                <Image style={styles.newArrivalImage} source={parfum}/>
            </View>
            <View style={{margin:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text variant="titleLarge" style={{fontWeight:'bold'}}>Featured Products</Text>
                <Pressable onPress={()=>navigation.navigate('Store', {data:'featured'})}>
                    <Text variant="bodyMedium" style={{fontWeight:'600', opacity:0.6}}>See All</Text>
                </Pressable>
            </View>
            <View style={{marginHorizontal:10, flexDirection:'row', gap:10, flexWrap:'wrap'}}>
                {featured.length>0?
                    featured.map((product)=>(
                        <ProductCard key={product.id} product={product} />
                ))
                :
                <Text style={{textAlign:'center',width:'100%'}}>There is no product Available</Text>
                }
            </View>
            <View style={{margin:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text variant="titleLarge" style={{fontWeight:'bold'}}>Woman</Text>
                <Pressable onPress={()=>navigation.navigate('Store', {data:'woman'})}>
                    <Text variant="bodyMedium" style={{fontWeight:'600', opacity:0.6}}>See All</Text>
                </Pressable>
            </View>
            <View style={{marginHorizontal:10, flexDirection:'row', gap:10, flexWrap:'wrap'}}>
                {womanProducts.length>0?
                    womanProducts.map((product)=>(
                    <ProductCard key={product.id} product={product}/>
                ))
                :
                <Text style={{textAlign:'center',width:'100%'}}>There is no product Available</Text>
                }
            </View>
            <View style={{margin:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text variant="titleLarge" style={{fontWeight:'bold'}}>Man</Text>
                <Pressable onPress={()=>navigation.navigate('Store', {data:'man'})}>
                    <Text variant="bodyMedium" style={{fontWeight:'600', opacity:0.6}}>See All</Text>
                </Pressable>
            </View>
            <View style={{marginHorizontal:10, flexDirection:'row', gap:10, flexWrap:'wrap'}}>
                {manProducts.length>0?
                    manProducts.map((product)=>(
                    <ProductCard key={product.id} product={product} />
                ))
                :
                <Text style={{textAlign:'center',width:'100%'}}>There is no product Available</Text>
                }
            </View>
        </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    header: {
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingHorizontal:10
    },
    scrollElement:{
        marginHorizontal:10,
    },
    newArrival:{
        marginTop:20,
        marginHorizontal:10,
        backgroundColor:'black',
        padding:20,
        justifyContent:'flex-start',
        flexDirection:'row',
        borderRadius:10
    },
    newArrivalImage:{
        height:150,
        width:150,
        position:'absolute',
        right:0,
        top:-20,
    },
    newArrivalText:{
        fontWeight:'bold',
        textAlign:'center',
        marginLeft:30,
        color:'white',
    },
  });
  

export default Home;