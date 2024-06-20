import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "../screens/onboarding/Onboarding";
import RootStack from "../components/RootStack";
import Toast from 'react-native-toast-message';
import { Text } from 'react-native'; // Import Text component from react-native

const Stack = createNativeStackNavigator();

const App = () => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (toastRef.current) {
      Toast.setRef(toastRef.current);
    }
  }, [toastRef]);

  return (
    <NavigationContainer independent={true}>
      <RootStack />
      <Toast ref={toastRef} />
    </NavigationContainer>
  );
};

export default App;