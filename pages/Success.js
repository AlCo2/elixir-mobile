import { Image, View } from "react-native";
import { Button, Icon, Text } from "react-native-paper";
import image from '../assets/success.webp';
import { useNavigation } from "@react-navigation/native";


const Success = () => {
  const navigation = useNavigation();
  return (
    <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
        <Icon source={'check-circle-outline'} size={100} color="#a6d612"/>
        <Text style={{margin:20}}>Thank you for your order!</Text>
        <Button labelStyle={{color:'white', fontSize:20, fontWeight:'bold'}} mode="contained" style={{borderRadius:5, backgroundColor:'black'}} onPress={() => navigation.navigate('Home')}>
            Continue
        </Button>
    </View>
  )
}

export default Success;