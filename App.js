import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider} from 'react-native-paper';
import ButtomNav from './components/ButtomNav';
import Product from './pages/Product';
import Register from './pages/Register';
import PromotionProduct from './pages/PromotionProduct';
import Store from './pages/Store';
import { useState } from 'react';
import { CartContext } from './context/cartContext';
import Notification from './pages/Notification';

const Stack = createNativeStackNavigator();

export default function App() {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartQ, setCartQ] = useState({});
  return (
    <CartContext.Provider value={{cartProducts:cartProducts, setCartProducts:setCartProducts, totalPrice:totalPrice, setTotalPrice:setTotalPrice, cartQ:cartQ, setCartQ:setCartQ }}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name="Home" component={ButtomNav} />
            <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="Product" component={Product} />
            <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="Store" component={Store} />
            <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="Notification" component={Notification} />
            <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="PromotionProduct" component={PromotionProduct} />
            <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </CartContext.Provider>
  );
}
