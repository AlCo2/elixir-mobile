import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, List, PaperProvider, Paragraph, Title } from 'react-native-paper';
import Home from './pages/Home';
import ButtomNav from './components/ButtomNav';
import Product from './pages/Product';

const Tab = createMaterialBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="Home" component={ButtomNav} />
          <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="Product" component={Product} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
