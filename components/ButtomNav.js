import { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Favourit from "../pages/Favourit";
import Profile from "../pages/Profile";



const NotificationsRoute = () => <Text>Notifications</Text>;

const ButtomNav = ({navigation}) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
        { key: 'favourit', title: 'Favourit', focusedIcon: 'heart', unfocusedIcon:'heart-outline' },
        { key: 'cart', title: 'Cart', focusedIcon: 'cart', unfocusedIcon: 'cart-outline' },
        { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
    ]);
    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        favourit: Favourit,
        cart: Cart,
        profile: Profile,
      });    
  return (
    <BottomNavigation
      shifting={true}
      barStyle={{backgroundColor:'#fa3b7e', height:85}}
      inactiveColor="white"
      activeIndicatorStyle={{backgroundColor:'white'}}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

export default ButtomNav;