import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './AppScreens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import SettingsScreen from './AppScreens/SettingsScreen';
import PlayGameScreen from './AppScreens/PlayGameScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Play" component={PlayGameScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
