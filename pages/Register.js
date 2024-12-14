import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Register = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView>
        <View style={{alignItems:'center'}}>
            <Text variant='displaySmall'>Register</Text>
        </View>
        <View style={{margin:20, gap:10}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{width:'48%'}}>
                    <Text>FirstName</Text>
                    <TextInput mode='outlined'/>
                </View>
                <View style={{width:'48%'}}>
                    <Text>LastName</Text>
                    <TextInput mode='outlined'/>
                </View>
            </View>
            <View style={{gap:10}}>
                <Text>Password</Text>
                <TextInput mode='outlined' secureTextEntry={true}/>
            </View>
            <View style={{gap:10}}>
                <Text>Confirm Password</Text>
                <TextInput mode='outlined' secureTextEntry={true}/>
            </View>
            <View style={{gap:10}}>
                <Text>Phone</Text>
                <TextInput mode='outlined'/>
            </View>
            <View style={{gap:10}}>
                <Text>Address</Text>
                <TextInput mode='outlined'/>
            </View>
        </View>
        <View style={{margin:20}}>
            <Button labelStyle={{color:'white'}} mode="contained" style={{borderRadius:5, backgroundColor:'black'}} onPress={() => console.log('Pressed')}>
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