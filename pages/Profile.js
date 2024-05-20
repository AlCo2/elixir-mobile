import { View } from 'react-native';
import { Avatar, Button, Icon, IconButton, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './Login';

const user = {
    firstname:'abdou',
    lastname:'lahboub',
    email:'abdou@gmail.com',
    phone:'065544433',
    address:'hayNahda, 172'
}

const Profile = () => {

    if (!user)
    {
        return <Login/>
    }
  return (
    <SafeAreaView>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20, alignItems:'center'}}>
            <Text variant='titleLarge' style={{fontWeight:'bold'}}>Profile</Text>
            <IconButton
                icon="pencil-box-multiple-outline"
                iconColor={"black"}
                size={30}
                onPress={() => console.log('Pressed')}
            />
        </View>
        <View style={{alignItems:'center'}}>
            <View style={{borderWidth:1, borderRadius:'100%', borderColor:'#fa3b7e'}}>
                <Avatar.Text size={100} label="AL" style={{margin:8}} />
            </View>
        </View>
        <View style={{alignItems:'center', marginVertical:10}}>
            <Text variant='titleMedium' style={{fontWeight:'600'}}>{user.firstname + ' ' + user.lastname}</Text>
        </View>
        <View style={{marginHorizontal:20, marginTop:20}}>
            <Text variant='titleMedium' style={{fontWeight:'bold'}}>User Info</Text>
        </View>
        <View style={{margin:20}}>
            <View style={{borderWidth:1, borderTopEndRadius:5, borderTopStartRadius:5,flexDirection:'row', alignItems:'center', padding:15, gap:5, opacity:0.4,}}>
                <Icon size={20} source={'account-outline'}/>
                <Text variant='bodyLarge'>{user.firstname + ' ' + user.lastname}</Text>
            </View>
            <View style={{borderWidth:1, borderTopWidth:0, flexDirection:'row', alignItems:'center', padding:15, gap:5, opacity:0.4}}>
                <Icon size={20} source={'email-outline'}/>
                <Text variant='bodyLarge'>{user.email}</Text>
            </View>
            <View style={{borderWidth:1, borderTopWidth:0, flexDirection:'row', alignItems:'center', padding:15, gap:5, opacity:0.4}}>
                <Icon size={20} source={'phone-outline'}/>
                <Text variant='bodyLarge'>{user.phone}</Text>
            </View>
            <View style={{borderWidth:1, borderTopWidth:0, flexDirection:'row', alignItems:'center', padding:15, gap:5, opacity:0.4}}>
                <Icon size={20} source={'home-outline'}/>
                <Text variant='bodyLarge'>{user.address}</Text>
            </View>
            <View style={{borderWidth:1, borderTopWidth:0, borderBottomLeftRadius:5, borderBottomRightRadius:5,flexDirection:'row', alignItems:'center', padding:15, gap:5, opacity:0.4}}>
                <Icon size={20} source={'key-variant'}/>
                <Text variant='bodyLarge'>**************</Text>
            </View>
        </View>
        <View style={{margin:20}}>
            <Button icon="logout" labelStyle={{color:'red'}} mode="outlined" style={{borderRadius:5}} onPress={() => console.log('Pressed')}>
                Logout
            </Button>
        </View>
    </SafeAreaView>
  )
}

export default Profile;