import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, PanResponder, StyleSheet, Animated } from 'react-native';

const ResizableContainer = ({ children, canExpand = true, initalHeigth=100 }) => {
  const [height, setHeight] = useState(initalHeigth);

  const pan = useRef(new Animated.ValueXY()).current;

   const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderMove: Animated.event([null, { dx: pan.x }], {
      useNativeDriver: false,
      listener: (event)=> {
        setHeight(height + pan.x._value)
        pan.setValue({x:pan.x._value,y:0})
      }
    }),
    onPanResponderEnd: () => {
      pan.setValue({x:0,y:0})
      }
  });

  return (
    <View style={{flexDirection:'row'}}>
      <View style={styles.container}>
        <View
          style={{
            height: '100%',
            overflow: 'hidden',
            width: height,
            borderRadius: 10,
          }}
        >
          {children}
        </View>

      </View>
      {canExpand? 
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.box]}
      /> : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  
  box: {
    backgroundColor: '#61dafb',
    height: '100%',
    width: 10,
    borderRadius: 4,
  },
});

export default ResizableContainer;
