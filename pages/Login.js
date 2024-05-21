import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

const Login = ({setUser}) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function login()
    {
        setLoading(true);
        const data = {
            email:email,
            password:password,
        }
        const response = await axios.post('http://192.168.1.104:8000/api/login', data)
        .catch((error)=>{
            setLoading(false);
        });
        if (response && response.status == 200)
        {
            SecureStore.setItemAsync('token', response.data);
            const user = await axios.get('http://192.168.1.104:8000/api/user', {headers: {Authorization: `Bearer ${response.data}`}})
            .then((response)=>response.data);
            setUser(user);
            setLoading(false);
        }
        setLoading(false);
    }
    if (loading)
    {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator animating={true} size={"large"} style={{width:'100%'}}/>
            </View>   
        )
    }
  return (
    <SafeAreaView>
        <View style={{alignItems:'center'}}>
            <Text variant='displaySmall'>Login</Text>
        </View>
        <View style={{margin:20, gap:10}}>
            <View style={{gap:10}}>
                <Text>Email</Text>
                <TextInput defaultValue={email} onChangeText={newText =>setEmail(newText)} mode='outlined'/>
            </View>
            <View style={{gap:10}}>
                <Text>Password</Text>
                <TextInput mode='outlined' defaultValue={password} onChangeText={newPassword =>setPassword(newPassword)} secureTextEntry={true}/>
            </View>
        </View>
        <View style={{margin:20}}>
            <Button labelStyle={{color:'white'}} mode="contained-tonal" style={{borderRadius:5, backgroundColor:'#fa3b7e'}} onPress={login}>
                Login
            </Button>
        </View>
        <View style={{alignItems:'center', gap:5}}>
            <Text variant='bodyMedium' style={{opacity:0.4}}>Don't have an account?</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('Register')}}>
                <Text variant='bodyMedium' style={{fontWeight:'bold', opacity:0.8,color:'#fa3b7e'}}>Register</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
export default Login;