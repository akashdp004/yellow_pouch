import React from 'react';
import { Colors } from '../../components/Styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Category from '../Screen-list/Category';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Home from '../Screen-list/Home';
import Cart from '../Screen-list/Cart';
import Profile from '../Screen-list/Profile';
// import BottomTabs from '../navigators/BottomTabs';
const Tab = createBottomTabNavigator();
const Welcome = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 15,
          right: 15,
          elevation: 5, // Changed from hex to numeric value, elevation is a number
          borderRadius: 15,
          height: 60,
          backgroundColor: Colors.brand, // Ensure background color is set
        },
      }}
    >
        <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: Colors.white },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={20} color={Colors.white} />
            ) : (
              <AntDesign name="home" size={20} color={Colors.white} />
            ),
        }}
      />
      <Tab.Screen
        name="List"
        component={Cart}
        options={{
          tabBarLabel: "List",
          tabBarLabelStyle: { color:  Colors.white },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="add-to-list" size={20} color={Colors.white} />
            ) : (
              <Entypo name="list" size={20} color={Colors.white} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color:  Colors.white },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={20} color={Colors.white} />
            ) : (
              <Ionicons name="person-outline" size={20} color={Colors.white} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Welcome;