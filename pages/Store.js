import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Button, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/products";


const Store = ({ route }) => {
    const { data } = route.params;
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    
    async function fetchProducts()
    {
        const response = await getProducts(data).catch((error)=>{
            setError(true);
            setLoading(false)
        }
        );
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
            <Text variant="titleLarge" style={{fontWeight:'bold', textTransform:'capitalize'}}>{data}</Text>
        </View>
        <View style={{alignItems:'center', marginTop:20, marginHorizontal:10}}>
            <Searchbar
                placeholder="Search Product"
                style={{backgroundColor:'white', width:'100%'}}
            />
        </View>
        <View style={{marginHorizontal:10, marginVertical:20, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
            <Text variant="titleSmall" style={{opacity:0.6, fontWeight:'bold'}}>{products.length} Product</Text>
            <Button icon={"chevron-down"} contentStyle={{flexDirection:'row-reverse'}} mode="contained-tonal" buttonColor="white">Sort By</Button>
        </View>
        <View style={{marginHorizontal:10, flexDirection:'row', gap:10, flexWrap:'wrap'}}>
            {loading?
                <ActivityIndicator animating={true} size={"large"} style={{width:'100%'}}/>
            :
                error?
                    <Text style={{textAlign:'center',width:'100%', color:'red'}}>Error: an error happened while fetching data</Text>
                :
                    products && products.length>0?
                        products.map((product)=>(
                            <ProductCard key={product.id} product={product}/>
                            ))
                    :
                        <Text style={{textAlign:'center',width:'100%'}}>There is no product Available</Text>
            }
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Store;