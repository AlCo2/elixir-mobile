import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider} from 'react-native-paper';
import ButtomNav from './components/ButtomNav';
import Product from './pages/Product';
import Register from './pages/Register';
import Store from './pages/Store';
import { CartProvider } from './context/cartContext';
import Notification from './pages/Notification';
import Login from './pages/Login';
import FlashMessage from "react-native-flash-message";
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import { FavouritProvider } from './context/favouriteContext';
import { UserProvider } from './context/userContext';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <UserProvider>
      <FavouritProvider>
        <CartProvider>
          <PaperProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen options={{headerShown:false}} name="Home" component={ButtomNav} />
                <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="Product" component={Product} />
                <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="Store" component={Store} />
                <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="Notification" component={Notification} />
                <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="Login" component={Login} />
                <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="Register" component={Register} />
                <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="Checkout" component={Checkout} />
                <Stack.Screen options={{headerShown:false}} name="Success" component={Success} />
              </Stack.Navigator>
            </NavigationContainer>
            <FlashMessage position='top'/>
          </PaperProvider>
        </CartProvider>
      </FavouritProvider>
    </UserProvider>
  );
}
