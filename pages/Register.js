import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuthUser, register_api } from '../api/auth';
import * as SecureStore from 'expo-secure-store';
import { UserContext } from '../context/userContext';

const Register = () => {
    const { setUser } = useContext(UserContext);
    const navigation = useNavigation();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    async function handleSubmit()
    {
        setLoading(true);
        const data = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            phone: phone,
            address: address,
            password: password,
            password_confirmation: passwordConfirmation
        }
        const response = await register_api(data)
        .catch((error)=>{
            console.log(error);
            setError(true);
            setLoading(false);
        });
        if (response && response.status == 200)
        {
            const token = response.data;
            SecureStore.setItemAsync('token', token);
            const user = await getAuthUser(token)
            .then((response)=>response.data);
            setUser(user);
            setLoading(false);
            navigation.navigate('Home');
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
            <Text variant='displaySmall'>Register</Text>
        </View>
        <View style={{margin:20, gap:10}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{width:'48%'}}>
                    <Text>FirstName</Text>
                    <TextInput mode='outlined' value={firstName} onChangeText={setFirstName}/>
                </View>
                <View style={{width:'48%'}}>
                    <Text>LastName</Text>
                    <TextInput mode='outlined' value={lastName} onChangeText={setlastName} />
                </View>
            </View>
            <View style={{gap:10}}>
                <Text>Email</Text>
                <TextInput mode='outlined' value={email} onChangeText={setEmail}/>
            </View>
            <View style={{gap:10}}>
                <Text>Password</Text>
                <TextInput mode='outlined' secureTextEntry={true} value={password} onChangeText={setPassword}/>
            </View>
            <View style={{gap:10}}>
                <Text>Confirm Password</Text>
                <TextInput mode='outlined' secureTextEntry={true} value={passwordConfirmation} onChangeText={setPasswordConfirmation} />
            </View>
            <View style={{gap:10}}>
                <Text>Phone</Text>
                <TextInput mode='outlined' value={phone} onChangeText={setPhone}/>
            </View>
            <View style={{gap:10}}>
                <Text>Address</Text>
                <TextInput mode='outlined' value={address} onChangeText={setAddress} />
            </View>
        </View>
        {error &&
            <Text style={{marginLeft:20, color:'red', fontWeight:'bold'}}>an Error happened while creating the account</Text>
        }
        <View style={{margin:20}}>
            <Button labelStyle={{color:'white'}} mode="contained" style={{borderRadius:5, backgroundColor:'black'}} onPress={() => handleSubmit()}>
                Register
            </Button>
        </View>
        <View style={{alignItems:'center', gap:5}}>
            <Text variant='bodyMedium' style={{opacity:0.4}}>Already have an account?</Text>
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <Text variant='bodyMedium' style={{fontWeight:'bold', opacity:0.8,color:'black'}}>Login</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
export default Register;