import { Image, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

const FavouritItem = ({title, price, image}) => {
  return (
    <View style={{flexDirection:'row', backgroundColor:'white', marginHorizontal:10, borderRadius:10, justifyContent:'space-between', alignItems:'center'}}>
      <View style={{flexDirection:'row'}}>
        <View style={{ height:100, width:100, paddingHorizontal:10}}>
            <Image style={{height:'100%', width:'100%'}} source={{uri:image}}/>
        </View>
        <View style={{margin:10, gap:10, width:'50%'}}>
            <Text variant='titleMedium' style={{fontWeight:'bold'}}>{title}</Text>
            <Text variant='bodyMedium' style={{color:'#faaea6', fontWeight:'bold'}}>{price}DH</Text>
        </View>
      </View>
      <View>
        <IconButton
          icon="heart"
          iconColor={"red"}
          size={30}
          onPress={() => console.log('Pressed')}
        />
      </View>
    </View>
  )
}

export default FavouritItem;