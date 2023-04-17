import React, { useState } from 'react';
import {MainPage} from './components/mainPage';
import bottomTab from './style/bottomTab'
import { View, ScrollView,Text,Button,TouchableOpacity} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




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
        name="MainPage" 
        component={MainPage} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="book" color={color} size={size} />
          ),
          
        
        }}/>
        <Tab.Screen name="Another Tab" component={AnotherScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}