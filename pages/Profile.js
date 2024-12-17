import { View } from 'react-native';
import { ActivityIndicator, Avatar, Button, Icon, IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './Login';
import { useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getAuthUser, logout } from '../api/auth';
import { isUserExist } from '../utils/user/isUserExist';
import { UserContext } from '../context/userContext';

const Profile = () => {
    const { user, setUser} = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    function logoutUser()
    {
        setLoading(true);
        const token = SecureStore.getItem('token');
        logout(token).catch((error)=>console.log(error));
        SecureStore.deleteItemAsync('token');
        SecureStore.deleteItemAsync('user');
        setUser(null);
        setLoading(false);
    }
    
    async function fetchAuthUser(){
        const token = SecureStore.getItem('token');
        const response = await getAuthUser(token)
        .catch((error)=>{
            setUser(null);
            setLoading(false);
        });
        if (response && response.status == 200)
        {
            setUser(response.data);
            SecureStore.setItemAsync('user',JSON.stringify(response.data));
        }
        setLoading(false);
    }
    useEffect(()=>{
        if (!isUserExist(setUser))
        {
            fetchAuthUser();
        }
    }, [])
    if (!user)
    {
        if (loading)
            return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <ActivityIndicator animating={true} size={"large"} style={{width:'100%'}}/>
                    </View>
        return <Login setUser={setUser}/>
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
            <Button icon="logout" labelStyle={{color:'red'}} mode="outlined" style={{borderRadius:5}} onPress={logoutUser}>
                Logout
            </Button>
        </View>
    </SafeAreaView>
  )
}

export default Profile;