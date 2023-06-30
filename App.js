import React, { useState, useEffect } from 'react';
import { ResizableTab } from './components/used/resizableTab'
import { View, ScrollView, Text, Button, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const { Proskomma } = require('proskomma-core');
import { Provider } from 'react-native-paper';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
const succinct = require('./succinct/test.json');
const succinct2 = require('./succinct/fnT.json');
const { usfm } = require('./components/proofOfConcept/tableTest/mat')
import FetchBible from './components/used/fetchNewBible/DlPack';
import { AddingPack } from './components/used/fetchNewBible/ShowPack';
import EntriesScreen from './components/used/fetchNewBible/navigationEntries';
const Tab = createBottomTabNavigator();

export default function App() {


  const client = new ApolloClient({
    uri: "https://diegesis.bible/graphql",
    cache: new InMemoryCache(),
  });

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
  // pk.importDocument({ 'source': '1', 'project': 'web', 'revision': '0' }, 'usfm', usfm);


  return (
    <ApolloProvider client={client}>
      <Provider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Entries"
            screenOptions={{
              headerShown: false,

            }}>
            <Tab.Screen key={Math.random()} name="Entries">
              {() => <EntriesScreen />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer >
      </Provider>
    </ApolloProvider>

  );
}