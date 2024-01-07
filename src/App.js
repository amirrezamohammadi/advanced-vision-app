import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useDeviceContext} from 'twrnc';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';

import tw from '../tailwind';
import Home from './screens/Home';
import Result from './screens/Result';
//import {AuthProvider} from './hooks/useAuth';
//import Navigation from './Navigation';

const Stack = createNativeStackNavigator();
const client = new QueryClient({defaultOptions: {queries: {retry: 2}}});

const App = () => {
  useDeviceContext(tw);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <QueryClientProvider client={client}>
      <SafeAreaProvider>
        <StatusBar barStyle={'dark-content'} />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="Result"
              component={Result}
              options={{headerShown: true}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
