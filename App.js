import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { DLpack } from './components/used/fetchNewBible/DlPack';
import { AddingPack } from './components/used/fetchNewBible/ShowPack';
import { EnteringTab } from './components/used/fetchNewBible/EnteringTab';
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import { ResizableTab } from './components/used/ReadingTab/resizableTab';
import { ParsingData } from './components/used/fetchNewBible/ParsingData';
import NoteTab from './components/used/noteTab/NoteTab';
import { TouchableOpacity, Text } from 'react-native';
export default function App() {

  const Stack = createStackNavigator()

  const client = new ApolloClient({
    uri: "https://cjvh.proskomma.bible/graphql",
    cache: new InMemoryCache(),
  });




  return (
    <ApolloProvider client={client}>
      <Provider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home Tab">
            <Stack.Screen name="Telechargement de Pack" component={DLpack} />
            <Stack.Screen name="Selection de Pack" component={AddingPack} />
            <Stack.Screen name="Home Tab" component={EnteringTab} />
            <Stack.Screen
              name="ReadTab"
              component={ResizableTab}
              options={({ navigation, route }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("Home Tab")}><Text>Retour Menu Principale</Text></TouchableOpacity>
                )
              })}
            />
            <Stack.Screen name="ParseTab" component={ParsingData} />
            <Stack.Screen name="NoteTab" component={NoteTab} />

          </Stack.Navigator>
        </NavigationContainer >
      </Provider>
    </ApolloProvider>

  );
}