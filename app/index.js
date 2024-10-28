// app/index.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirebaseFetcher from './components/FirebaseFetcher'; // Adjust the path as needed

const Stack = createStackNavigator();

export default function App() {
  return (
    <FirebaseFetcher />
  );
}
