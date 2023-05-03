import React, { useState } from 'react';
import {ReadingScreen} from './components/used/ReadingScreen'
import {ResizableTab} from './components/proofOfConcept/resizableTab'
import bottomTab from './style/bottomTab'
import { View, ScrollView,Text,Button,TouchableOpacity} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SliderComponent } from './components/proofOfConcept/SliderComponent';



function AnotherScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Another Tab!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          
        }}>
        <Tab.Screen 
        name="ReadingScreen" 
        component={SliderComponent} 
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