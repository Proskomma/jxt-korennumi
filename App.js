import React, { useState, useEffect } from 'react';
import { ResizableTab } from './components/used/resizableTab'
import { View, ScrollView, Text, Button, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as ScreenOrientation from "expo-screen-orientation";
const { Proskomma } = require('proskomma-core');
import { CheckboxMe } from './components/used/TextConfig/CheckBox';
const succinct = require('./succinct/test.json');
const succinct2 = require('./succinct/fnT.json');
import { Tabletest } from './components/proofOfConcept/tableTest/tableTest';
const { usfm } = require('./components/proofOfConcept/tableTest/mat')
const Tab = createBottomTabNavigator();

export default function App() {
  const pk = new Proskomma([
    {
      name: "source",
      type: "string",
      regex: "^[^\\s]+$",
    },
    {
      name: "project",
      type: "string",
      regex: "^[^\\s]+$",
    },
    {
      name: "revision",
      type: "string",
      regex: "^[^\\s]+$",
    },
  ]);
  pk.loadSuccinctDocSet(succinct);
  pk.loadSuccinctDocSet(succinct2);

  pk.importDocument({ 'source': '1', 'project': 'web', 'revision': '0' }, 'usfm', usfm);



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
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,

        }}>
        <Tab.Screen
          name="ReadingScreen" options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon name="book" color={color} size={size} />)
          }}>
          {() => <CheckboxMe />}
        </Tab.Screen>
        <Tab.Screen name="resizableTab">
          {() => <ResizableTab pk={pk} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer >
  );
}