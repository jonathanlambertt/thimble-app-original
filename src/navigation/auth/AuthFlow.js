import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/auth/HomeScreen";
import SignupScreen from "../../screens/auth/SignupScreen";
import LoginScreen from "../../screens/auth/LoginScreen";

const AuthFlow = createStackNavigator();

const AuthFlowStack = () => (
  <AuthFlow.Navigator>
    <AuthFlow.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <AuthFlow.Screen
      name="Signup"
      component={SignupScreen}
      options={{ headerShown: false }}
    />
    <AuthFlow.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
  </AuthFlow.Navigator>
);

export default AuthFlowStack;
