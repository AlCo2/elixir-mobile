import { Image, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { API_URL } from '@env';
import { useContext } from 'react';
import { FavouritContext } from '../context/favouriteContext';

const FavouritItem = ({ product }) => {
  const { deleteFromFavourites } = useContext(FavouritContext);

  return (
    <View style={{flexDirection:'row', backgroundColor:'white', marginHorizontal:10, borderRadius:10, justifyContent:'space-between', alignItems:'center'}}>
      <View style={{flexDirection:'row', width:'75%'}}>
        <View style={{ height:100, width:100, paddingHorizontal:10}}>
            <Image style={{height:'100%', width:'100%'}} source={{uri:`${API_URL}${product.images[0].url}`}}/>
        </View>
        <View style={{paddingTop:10, paddingLeft:10, gap:5, width:'65%'}}>
            <Text variant='titleMedium' style={{fontWeight:'bold', opacity:0.6, fontSize:14}}>{product.title}</Text>
            <Text variant='bodyMedium' style={{color:'black', fontWeight:'bold'}}>{product.promotion && product.promotion.active?product.promotion.promotion_price:product.price} DH</Text>
        </View>
      </View>
      <View>
        <IconButton
          icon="heart"
          iconColor={"red"}
          size={30}
          onPress={() => deleteFromFavourites(product)}
        />
      </View>
    </View>
  )
}

export default FavouritItem;