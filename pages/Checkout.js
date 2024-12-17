import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartContext } from "../context/cartContext";
import SelectDropdown from "react-native-select-dropdown";
import { fetchCountries_api } from "../api/country";
import { createOrder } from "../api/order";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

const Checkout = () => {
    const { user, cartProducts, totalPrice, cartQ, setCartQ, setCartProducts} = useContext(CartContext);
    const [error, setError] = useState(false);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState(user?user.firstname:'');
    const [lastName, setlastName] = useState(user?user.lastname:'');
    const [email, setEmail] = useState(user?user.email:'');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState(user?user.phone:'');
    const [address, setAddress] = useState(user?user.address:'');
    const [zipCode, setZipCode] = useState('');

    async function fetchCountries(){
        const response = await fetchCountries_api()
        .catch((error)=>{
            console.log(error);
        })
        if (response && response.status == 200)
            setCountries(response.data);
    }
    function handleCountryChange(value) {
        setCountry(value.country);
        setCities(value.cities);
        setCity('');
    }

    async function handleSubmit()
    {
        setLoading(true);
        const data = {
            user_id:user?user.id:null,
            firstname: firstName,
            lastname: lastName,
            email: email,
            country: country,
            city: city,
            phone: phone,
            address: address,
            zip: zipCode,
            order: {cart:cartQ, products: cartProducts,total: totalPrice}
        }
        const response = await createOrder(data)
        .catch((error)=>{
            console.log(error);
        })
        if (response && response.status === 200)
        {
            SecureStore.deleteItemAsync('cart');
            setCartQ({});
            setCartProducts([]);
            navigation.navigate('Success');
            setLoading(false);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchCountries();
    }, [])
    if (loading)
    {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator animating={true} size={"large"} style={{width:'100%'}}/>
            </View>   
        )
    }
  return (
    <ScrollView style={{backgroundColor:'#f5f5f5'}}>
        <SafeAreaView>
            <View style={{alignItems:'center'}}>
              <Text variant='headlineLarge' style={{fontWeight:'bold'}}>Checkout</Text>
            </View>
            <View style={{margin:20}}>
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
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <SelectDropdown
                        data={countries}
                        onSelect={(selectedItem, index) => {
                            handleCountryChange(selectedItem);
                        }}
                        renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>
                                <Button style={{width:150}} icon={isOpened ? 'chevron-up' : 'chevron-down'} contentStyle={{flexDirection:'row-reverse'}} mode="contained-tonal" buttonColor="white">{(selectedItem && selectedItem.country) || 'Select Country'}</Button>
                            </View>
                        );
                        }}
                        renderItem={(item, index, isSelected) => {
                        return (
                            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item.country}</Text>
                            </View>
                        );
                            }}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                </View>
                <View style={{gap:10}}>
                    <SelectDropdown
                        data={cities}
                        onSelect={(selectedItem, index) => {
                            setCity(selectedItem);
                        }}
                        renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>
                                <Button style={{width:150}} icon={isOpened ? 'chevron-up' : 'chevron-down'} contentStyle={{flexDirection:'row-reverse'}} mode="contained-tonal" buttonColor="white">{(city && city) || 'Select City'}</Button>
                            </View>
                        );
                        }}
                        renderItem={(item, index, isSelected) => {
                        return (
                            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                            </View>
                        );
                            }}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                </View>
                </View>
                <View style={{gap:10}}>
                    <Text>Phone</Text>
                    <TextInput mode='outlined' value={phone} onChangeText={setPhone}/>
                </View>
                <View style={{gap:10}}>
                    <Text>Address</Text>
                    <TextInput mode='outlined' value={address} onChangeText={setAddress} />
                </View>
                <View style={{gap:10}}>
                    <Text>ZipCode</Text>
                    <TextInput mode='outlined' value={zipCode} onChangeText={setZipCode} />
                </View>
            </View>
            {error &&
                <Text style={{marginLeft:20, color:'red', fontWeight:'bold'}}>an Error happened while creating the account</Text>
            }
            <View style={{margin:20}}>
                <Button labelStyle={{color:'white'}} mode="contained" style={{borderRadius:5, backgroundColor:'black'}} onPress={() => handleSubmit()}>
                    Continue
                </Button>
            </View>
            </View>
        </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    dropdownButtonStyle: {
      height: 50,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });
export default Checkout;