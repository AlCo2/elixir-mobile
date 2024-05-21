import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Badge, Card, Chip, IconButton, MD3Colors, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import parfum from '../assets/parfum.png';
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import PromotionProductCard from "../components/PromotionProductCard";
import { useNavigation } from "@react-navigation/native";
import { ip } from "../utils/const";

const categories = ['Clocks', 'Lamps', 'Paintains', 'Sofa', 'House'];

const Home = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [promotion, setPromotion] = useState([]);
    const [popular, setPopular] = useState([]);
    
    async function fetchCategories()
    {
        const response = await axios.get(`http://${ip}:8000/api/categories`);
        if (response.status == 200)
            setCategories(response.data);
    }
    async function fetchPromotion()
    {
        const response = await axios.get(`http://${ip}:8000/api/promotion`);
        if (response.status == 200)
            setPromotion(response.data);
    }
    
    async function fetchPopular()
    {
        const response = await axios.get(`http://${ip}:8000/api/popular`);
        if (response.status == 200)
            setPopular(response.data);
    }
    
    useEffect(()=>{
        fetchCategories();
        fetchPromotion();
        fetchPopular();
    }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#f5f5f5'}}>
        <SafeAreaView style={{flex:1,backgroundColor:'#f5f5f5'}}>
            <View style={styles.header}>
                <IconButton
                    icon="menu"
                    iconColor={MD3Colors.error0}
                    size={30}
                    onPress={() => console.log('Pressed')}
                />
                <View>
                    <Badge style={{position:'absolute', backgroundColor:'black', right:5, top:5}} size={16}>2</Badge>
                    <IconButton
                        icon="bell"
                        iconColor={'#faaea6'}
                        size={25}
                        onPress={() => console.log('Pressed')}
                    />
                </View>
            </View>
            <View style={{alignItems:'center', marginTop:20, marginHorizontal:10}}>
                <Searchbar
                    placeholder="Search Product"
                    style={{backgroundColor:'white', width:'100%'}}
                />
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{margin:10, marginTop:20, marginBottom:25, maxHeight:40}}>
                {categories.length>0?
                 categories.map((category)=>(
                    <View key={category.id} style={styles.scrollElement}>
                        <Chip style={{backgroundColor:category.name==selectedCategory?'black':'white'}} textStyle={{color:category.name==selectedCategory?'white':'black'}} onPress={() => setSelectedCategory(category.name)}>{category.name}</Chip>
                    </View>
                ))
                :
                null
                }
            </ScrollView>
            <View style={styles.newArrival}>
                <Text variant="displaySmall" style={styles.newArrivalText}>New{"\n"}Arrivals</Text>
                <Image style={styles.newArrivalImage} source={parfum}/>
            </View>
            <View style={{margin:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text variant="titleLarge" style={{fontWeight:'bold'}}>promotions</Text>
                <Pressable onPress={()=>navigation.navigate('Store', {data:'promotions'})}>
                    <Text variant="bodyMedium" style={{color:'#faaea6', fontWeight:'600'}}>See All</Text>
                </Pressable>
            </View>
            <View style={{marginHorizontal:10, flexDirection:'row', gap:10, flexWrap:'wrap'}}>
                {promotion.length>0?
                    promotion.map((promo)=>(
                    <PromotionProductCard key={promo.id} promotion={promo}/>
                ))
                :
                <Text style={{textAlign:'center',width:'100%'}}>There is no product Available</Text>
                }
            </View>
            <View style={{margin:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text variant="titleLarge" style={{fontWeight:'bold'}}>Popular Products</Text>
                <Pressable onPress={()=>navigation.navigate('Store', {data:'products'})}>
                    <Text variant="bodyMedium" style={{color:'#faaea6', fontWeight:'600'}}>See All</Text>
                </Pressable>
            </View>
            <View style={{marginHorizontal:10, flexDirection:'row', gap:10, flexWrap:'wrap'}}>
                {popular.length>0?
                    popular.map((product)=>(
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
        justifyContent:'space-between',
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