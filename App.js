import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';

const Stack = createStackNavigator();

const AppContainer = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {backgroundColor: 'red'},
            headerTitleStyle: {color: 'white'},
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Porn" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const App: () => React$Node = () => {
  return <AppContainer />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
