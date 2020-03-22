import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import {store} from './src/store';

const Stack = createStackNavigator();

const AppContainer = () => {
  return (
    <Provider store={store}>
      <Root>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {backgroundColor: '#3F51B5'},
                headerTitleStyle: {color: 'white'},
              }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Porn" component={DetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Root>
    </Provider>
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
