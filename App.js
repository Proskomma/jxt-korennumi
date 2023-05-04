import React, { useState, useEffect } from 'react';
import {ReadingScreen} from './components/used/ReadingScreen'
import {ResizableTab} from './components/used/resizableTab'
import bottomTab from './style/bottomTab'
import { View, ScrollView,Text,Button,TouchableOpacity} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SliderComponent } from './components/proofOfConcept/SliderComponent';
import * as ScreenOrientation from "expo-screen-orientation";
import MyComponent from "./components/proofOfConcept/configDrawer";



const Tab = createBottomTabNavigator();

export default function App() {
  function AnotherScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() =>
            changeOrientation(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
          }><Text>Another Tab!</Text></TouchableOpacity>
      </View>
    );
  }
  
  const [orientation, setOrientation] = useState(null);
  useEffect(() => {
    checkOrientation();
    const subscription = ScreenOrientation.addOrientationChangeListener(
      handleOrientationChange
    );
    return () => {
      ScreenOrientation.removeOrientationChangeListeners(subscription);
    };
  }, []);
  const checkOrientation = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    setOrientation(orientation);
  };
  const changeOrientation = async (newOrientation) => {
    console.log("newOrientation: ", newOrientation);
    await ScreenOrientation.lockAsync(newOrientation);
  };
  const handleOrientationChange = (o) => {
    setOrientation(o.orientationInfo.orientation);
  };
  console.log(orientation);
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          
        }}>
        <Tab.Screen 
        name="ReadingScreen" 
        component={MyComponent} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="book" color={color} size={size} />
          ),
          
        
        }}/>
        <Tab.Screen name="resizableTab" component={ResizableTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}