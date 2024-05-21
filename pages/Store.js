import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Button, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { ip } from "../utils/const";

const Store = ({ route }) => {
    const { data } = route.params;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchProducts()
    {
        const response = await axios.get(`http://${ip}:8000/api/`+data).catch((error)=>setLoading(false));
        if (response && response.status == 200)
            setProducts(response.data);
        setLoading(false);
    }
    useEffect(()=>{
        fetchProducts();
    }, [])

  return (
    <SafeAreaView>
    <ScrollView>
        <View style={{alignItems:'center', marginTop:10}}>
            <Text variant="titleLarge" style={{fontWeight:'bold'}}>{data=='promotions'?'Promotions':'Popular Product'}</Text>
        </View>
        <View style={{alignItems:'center', marginTop:20, marginHorizontal:10}}>
            <Searchbar
                placeholder="Search Product"
                style={{backgroundColor:'white', width:'100%'}}
            />
        </View>
        <View  style={{marginHorizontal:10, marginVertical:20, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
            <Text variant="titleSmall" style={{opacity:0.6, fontWeight:'bold'}}>{products.length} Product</Text>
            <Button icon={"chevron-down"} contentStyle={{flexDirection:'row-reverse'}} mode="contained-tonal" buttonColor="white">Sort By</Button>
        </View>
        <View style={{marginHorizontal:10, flexDirection:'row', gap:10, flexWrap:'wrap'}}>
            {products.length>0?
                products.map((product)=>(
                    <ProductCard key={product.id} product={product}/>
            ))
            :
            loading?
                <ActivityIndicator animating={true} size={"large"} style={{width:'100%'}}/>
                :
                <Text style={{textAlign:'center',width:'100%'}}>There is no product Available</Text>
            }
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Store;