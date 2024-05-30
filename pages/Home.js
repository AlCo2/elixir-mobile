import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Badge, Card, Chip, IconButton, MD3Colors, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import parfum from '../assets/parfum.png';
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ip } from "../utils/const";

const categories = ['Clocks', 'Lamps', 'Paintains', 'Sofa', 'House'];

const Home = () => {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [featured, setFeatured] = useState([]);
    const [manProducts, setManProducts] = useState([]);
    const [womanProducts, setWomanProducts] = useState([]);

    async function fetchFeatured()
    {
        const response = await axios.get(`http://${ip}:8000/api/product/featured`);
        if (response.status == 200)
            setFeatured(response.data);
    }
    
    async function fetchMan()
    {
        const response = await axios.get(`http://${ip}:8000/api/product/man`);
        if (response.status == 200)
            setManProducts(response.data);
    }

    async function fetchWoman()
    {
        const response = await axios.get(`http://${ip}:8000/api/product/woman`);
        if (response.status == 200)
            setWomanProducts(response.data);
    }

    useEffect(()=>{
        fetchFeatured();
        fetchMan();
        fetchWoman();
    }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#f5f5f5'}}>
        <SafeAreaView style={{flex:1,backgroundColor:'#f5f5f5'}}>
            <View style={styles.header}>
                <View>
                    <Badge style={{position:'absolute', backgroundColor:'black', right:5, top:5}} size={16}>2</Badge>
                    <IconButton
                        icon="bell"
                        iconColor={'#faaea6'}
                        size={25}
                        onPress={() => navigation.navigate('Notification')}
                    />
                </View>
            </View>
            <View style={{alignItems:'center', marginTop:20, marginHorizontal:10}}>
                <Searchbar
                    placeholder="Search Product"
                    style={{backgroundColor:'white', width:'100%'}}
                />
            </View>
            <View style={styles.newArrival}>
                <Text variant="displaySmall" style={styles.newArrivalText}>New{"\n"}Arrivals</Text>
                <Image style={styles.newArrivalImage} source={parfum}/>
            </View>
            <View style={{margin:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text variant="titleLarge" style={{fontWeight:'bold'}}>Featured Products</Text>
                <Pressable onPress={()=>navigation.navigate('Store', {data:'featured'})}>
                    <Text variant="bodyMedium" style={{color:'#faaea6', fontWeight:'600'}}>See All</Text>
                </Pressable>
            </View>
            <View style={{marginHorizontal:10, flexDirection:'row', gap:10, flexWrap:'wrap'}}>
                {featured.length>0?
                    featured.map((product)=>(
                        <ProductCard key={product.id} product={product}/>
                ))
                :
                <Text style={{textAlign:'center',width:'100%'}}>There is no product Available</Text>
                }
            </View>
            <View style={{margin:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text variant="titleLarge" style={{fontWeight:'bold'}}>Woman</Text>
                <Pressable onPress={()=>navigation.navigate('Store', {data:'woman'})}>
                    <Text variant="bodyMedium" style={{color:'#faaea6', fontWeight:'600'}}>See All</Text>
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
                    <Text variant="bodyMedium" style={{color:'#faaea6', fontWeight:'600'}}>See All</Text>
                </Pressable>
            </View>
            <View style={{marginHorizontal:10, flexDirection:'row', gap:10, flexWrap:'wrap'}}>
                {manProducts.length>0?
                    manProducts.map((product)=>(
                    <ProductCard key={product.id} product={product}/>
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
        marginHorizontal:10,
        backgroundColor:'#fa3b7e',
        padding:20,
        justifyContent:'flex-start',
        flexDirection:'row',
        borderRadius:20
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