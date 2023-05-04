import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, PanResponder, StyleSheet, Animated } from 'react-native';

const ResizableContainer = ({ children, canExpand = true, initalHeigth=100 }) => {
  const [height, setHeight] = useState(initalHeigth);

  const pan = useRef(new Animated.ValueXY()).current;

   const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderMove: Animated.event([null, { dy: pan.y }], {
      useNativeDriver: false,
      listener: (event)=> {
        setHeight(height + pan.y._value)
        pan.setValue({x:0,y:pan.y._value})
      }
    }),
    onPanResponderEnd: () => {
      pan.setValue({x:0,y:0})
      }
  });

  return (
    <View>
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            backgroundColor: 'red',
            overflow: 'hidden',
            height: height,
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
    width: '100%',
    height: 10,
    borderRadius: 4,
  },
});

export default ResizableContainer;
