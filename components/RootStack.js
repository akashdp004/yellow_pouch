import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Login from './../screens/Auth/Login';
import Signup from './../screens/Auth/Signup';
import Welcome from './../screens/welcomeScreen/welcome';
import Home from '../screens/Screen-list/Home';
import Category from '../screens/Screen-list/Category';
import Cart from '../screens/Screen-list/Cart';
import Profile from '../screens/Screen-list/Profile';
import OnboardingScreen from '../screens/onboarding/Onboarding';
import { Colors } from './Styles';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { primary, tertiary } = Colors;

const Stack = createNativeStackNavigator();

const RootStack =async () => {
  const isInitialized = await AsyncStorage.getItem('isInitialized');
  let route;
  if(isInitialized){
    route = 'Login';
  } else {
    route = 'Onboarding';
  }
  return (
    <Stack.Navigator initialRouteName='Onboarding'>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }}/>
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          headerShown: true,
          headerTitle: "Profile",
          headerRight: () => (
            <View>
                <TouchableOpacity style={{marginRight: 15}}>
                    <MaterialCommunityIcons name='dots-vertical' size={28} color='#000'/>
                </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: primary || '#00e4d0',
            shadowColor: '#000',
            elevation: 25
          }
        }}
      />
      <Stack.Screen name="Category" component={Category} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default RootStack;