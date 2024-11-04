// app/index.js

import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirebaseFetcher from './components/FirebaseFetcher'; // Adjust the path as needed
import { GradebookContext } from './components/GradebookContext';
import GradebookScreen from './components/GradebookScreen';

const Stack = createStackNavigator();

export default function App() {
  const [aPlusThreshold, setAPlusThreshold] = useState(97.5);
  const [aThreshold, setAThreshold] = useState(93);
  const [aminusThreshold, setaminusThreshold] = useState(90);
  const [bThreshold, setBThreshold] = useState(86);

  return (
    <GradebookContext.Provider  value={{ aPlusThreshold, setAPlusThreshold, aThreshold, setAThreshold, bThreshold, setBThreshold,aminusThreshold,setaminusThreshold }}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={FirebaseFetcher} options={{ headerShown: false }}/>
        <Stack.Screen name="Gradebook" component={GradebookScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  </GradebookContext.Provider>
  );
}
//imports FirebaseFetcher from components
