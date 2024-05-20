import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider} from 'react-native-paper';
import ButtomNav from './components/ButtomNav';
import Product from './pages/Product';
import Register from './pages/Register';
import PromotionProduct from './pages/PromotionProduct';

const Tab = createMaterialBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="Home" component={ButtomNav} />
          <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="Product" component={Product} />
          <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="PromotionProduct" component={PromotionProduct} />
          <Stack.Screen options={{headerTitle:'', headerTransparent:true, headerBackTitleVisible:false}} name="Register" component={Register} />          
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
