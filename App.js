import React, { useState } from 'react';
import {MainPage} from './components/mainPage';
import bottomTab from './style/bottomTab'
import { View, ScrollView,Text,Button,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function MyButton({ title, onPress }) {
  return (
    <TouchableOpacity style={bottomTab.button} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}



export default function App() {
  const [view1,setView1] = useState(true);
  const [view2,setView2] = useState(false);



  return (
    <View>
      <MyButton  
      title="Button 1" 
      onPress={() => console.log('Button 1 pressed')}/>
      <MyButton  
      title="Button 1" 
      onPress={() => console.log('Button 1 pressed')}/>
    <MainPage/>
    <View style={bottomTab.bar}>
      
    </View>
    </View>
  )}
