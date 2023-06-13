import {createStackNavigator} from '@react-navigation/stack';
import {Button, Text, View} from 'react-native';
import PlayerListScreen from './PlayerListScreen';
import {NavigationContainer} from '@react-navigation/native';

function HomeScreenContent({navigation}) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Player List"
        onPress={() => navigation.navigate('Player List')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <NavigationContainer independent="true">
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreenContent} />
        <Stack.Screen name="Player List" component={PlayerListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
