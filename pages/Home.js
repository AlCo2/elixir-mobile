import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Badge, Card, Chip, IconButton, MD3Colors, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import parfum from '../assets/parfum.png';
import ProductCard from "../components/ProductCard";


const Home = () => {
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
                <View style={styles.scrollElement}>
                    <Chip style={{backgroundColor:'black'}} textStyle={{color:'white'}} onPress={() => console.log('Pressed')}>Clocks</Chip>
                </View>
                <View style={styles.scrollElement}>
                    <Chip style={{backgroundColor:'white'}} textStyle={{color:'black', opacity:0.4}} onPress={() => console.log('Pressed')}>Lamps</Chip>
                </View>
                <View style={styles.scrollElement}>
                    <Chip style={{backgroundColor:'white'}} textStyle={{color:'black', opacity:0.4}} onPress={() => console.log('Pressed')}>Paintaing</Chip>
                </View>
                <View style={styles.scrollElement}>
                    <Chip style={{backgroundColor:'white'}} textStyle={{color:'black', opacity:0.4}} onPress={() => console.log('Pressed')}>Sofa</Chip>
                </View>
                <View style={styles.scrollElement}>
                    <Chip style={{backgroundColor:'white'}} textStyle={{color:'black', opacity:0.4}} onPress={() => console.log('Pressed')}>Sofa</Chip>
                </View>
            </ScrollView>
            <View style={styles.newArrival}>
                <Text variant="displaySmall" style={styles.newArrivalText}>New{"\n"}Arrivals</Text>
                <Image style={styles.newArrivalImage} source={parfum}/>
            </View>
            <View style={{margin:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text variant="titleLarge" style={{fontWeight:'bold'}}>Popular Products</Text>
                <Text variant="bodyMedium" style={{color:'#faaea6', fontWeight:'600'}}>See All</Text>
            </View>
            <View style={{marginHorizontal:10, flexDirection:'row', gap:10, flexWrap:'wrap'}}>
                <ProductCard title={'Ameer Al Oudh Intense Oud'} price={'199.00'} image={'https://parfumstore.ma/wp-content/uploads/2024/04/ameer-al-oudh-intense-oud-lattafa-prix-au-maroc.webp'}/>
                <ProductCard title={'Asad Lattafa'} price={'239.00'} image={'https://parfumstore.ma/wp-content/uploads/2024/04/Lattafa-Asad-prix-maroc.webp'}/>
                <ProductCard title={'I Am The King 100ml'} price={'189.00'} image={'https://parfumstore.ma/wp-content/uploads/2024/04/i-am-the-king-ana-al-malik-100ml-pour-homme.webp'}/>
                <ProductCard title={'Badee Al Oud 100ml'} price={'280.00'} image={'https://parfumstore.ma/wp-content/uploads/2024/04/badee-al-oud-lattafa.jpg-1.webp'}/>
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