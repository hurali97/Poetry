import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPasswordScreen from '../../Screens/Authentication/ForgotPasswordScreen';
import LoginScreen from '../../Screens/Authentication/LoginScreen';
import SignupScreen from '../../Screens/Authentication/SignupScreen';

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={() => {
          return {
            animation: 'slide_from_right',
            headerShown: false,
          };
        }}
      />

      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={() => {
          return {
            animation: 'slide_from_right',
            headerShown: false,
          };
        }}
      />

      <AuthStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={() => {
          return {
            animation: 'slide_from_right',
            headerShown: false,
          };
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
