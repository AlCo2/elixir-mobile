import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Icon, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProductsByName } from "../api/products";
import * as SecureStore from 'expo-secure-store';
import { getFavouritProducts } from "../api/favourit";
import { CartContext } from "../context/cartContext";
import SelectDropdown from "react-native-select-dropdown";
import StoreProductCard from "../components/StoreProductCard";

const emojisWithIcons = [
    {title: 'Best Match', value: 1},
    {title: 'Price Low - High', value: 2},
    {title: 'Price High - Low', value: 3},
    {title: 'Latest', value: 4}
  ];

const Store = ({ route }) => {
    const { data, value } = route.params;
    const { favourites, setFavourites } = useContext(CartContext);
    const [sort, setSort] = useState(1);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    async function fetchFavourites(){
        const token = SecureStore.getItem('token');
        const response = await getFavouritProducts(token);
        if (response && response.status == 200)
            setFavourites(response.data);
    }

    async function handleSearchByValue()
    {
        setLoading(true)
        let title = null
        let sortValue = null;
        if (sort !== 1)
            sortValue = sort;
        if (search)
            title = search;
        else if (value)
        {
            title = value;
            setSearch(value);
        }
        const response = await getProductsByName(title, sortValue).catch((error)=>{
            console.log(error);
            setError(true)
            setLoading(false);
        });
        if (response && response.status == 200)
            setProducts(response.data);
        setLoading(false);
    }

    useEffect(()=>{
        fetchFavourites();
        handleSearchByValue();
    }, [sort])

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
                value={search}
                onChangeText={setSearch}
                onSubmitEditing={()=>handleSearchByValue()}
            />
        </View>
        <View style={{marginHorizontal:10, marginVertical:20, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
            <Text variant="titleSmall" style={{opacity:0.6, fontWeight:'bold'}}>{products.length} Product</Text>
            <SelectDropdown
                data={emojisWithIcons}
                onSelect={(selectedItem, index) => {
                    setSort(selectedItem.value);
                }}
                renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
                        <Button icon={isOpened ? 'chevron-up' : 'chevron-down'} contentStyle={{flexDirection:'row-reverse'}} mode="contained-tonal" buttonColor="white">{(selectedItem && selectedItem.title) || 'Sort By'}</Button>
                    </View>
                );
                }}
                renderItem={(item, index, isSelected) => {
                return (
                    <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                    </View>
                );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                />
            <Icon />
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
                            <StoreProductCard key={product.id} product={product} favourites={favourites}/>
                            ))
                    :
                        <Text style={{textAlign:'center',width:'100%'}}>There is no product Available</Text>
            }
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    dropdownButtonStyle: {
      height: 50,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });
export default Store;