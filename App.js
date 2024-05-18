import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, List, PaperProvider, Paragraph, Title } from 'react-native-paper';
import Home from './pages/Home';
import ButtomNav from './components/ButtomNav';

const Tab = createMaterialBottomTabNavigator();
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <ButtomNav/>
      </NavigationContainer>
    </PaperProvider>
  );
}
