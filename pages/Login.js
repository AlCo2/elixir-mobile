import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../context/userContext';

const Login = () => {
    const { auth } = useContext(UserContext);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    async function login()
    {
        setLoading(true);
        const status = await auth(email, password);
        if (status == 200)
        {
            setLoading(false);
            navigation.navigate('Home');
        }
        else
            setError(true);
        setLoading(false);
    }
    if (loading)
    {
        return  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator animating={true} size={"large"} style={{width:'100%'}}/>
                </View>
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
        {error &&
        <Text style={{marginLeft:20, color:'red', fontWeight:'bold'}}>Your Email or Password is invalide</Text>
        }
        <View style={{margin:20}}>
            <Button labelStyle={{color:'white'}} mode="contained-tonal" style={{borderRadius:5, backgroundColor:'black'}} onPress={login}>
                Login
            </Button>
        </View>
        <View style={{alignItems:'center', gap:5}}>
            <Text variant='bodyMedium' style={{opacity:0.4}}>Don't have an account?</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('Register')}}>
                <Text variant='bodyMedium' style={{fontWeight:'bold', opacity:0.8,color:'black'}}>Register</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
export default Login;