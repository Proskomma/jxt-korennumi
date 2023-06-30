import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, PanResponder, StyleSheet, Animated } from 'react-native';

const ResizableContainer = ({ children, canExpand = true, initialWidth }) => {
  console.log('ResizableContainer')

  console.log(initialWidth)
  const [width, setWidth] = useState(initialWidth);
  useEffect(() => {
    setWidth(initialWidth);
  }, [initialWidth]);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderMove: Animated.event([null, { dx: pan.x }], {
      useNativeDriver: false,
      listener: (event) => {
        pan.setValue({ x: pan.x._value, y: 0 })
      }
    }),
    onPanResponderEnd: () => {
      setWidth(width + pan.x._value)

      pan.setValue({ x: 0, y: 0 })
    }
  });
  const s = !canExpand ? { flex: 1, flexGrow: 1 } : {}
  const styleText = !canExpand ? {
    height: '100%',
    borderRadius: 10,
  } : {
    height: '100%',
    width: width - 20,
    borderRadius: 10,
  }
  const styleContainer = {
    flex: 1,
    width: initialWidth
  }
  console.log(styleContainer)
  return (

    <View style={[{ flexDirection: 'row', borderRadius: 5 }, canExpand ? {} : { flex: 1 }]}>
      <View style={canExpand ? {
        width: width - 20
      } : { flex: 1 }}>
        <View
          style={styleText}
        >
          {children}
        </View>

      </View>
      {canExpand ? (
        <View>
          <View
            style={[
              styles.box2,
            ]}
          />
          <Animated.View
            {...panResponder.panHandlers}
            style={[pan.getLayout(), styles.box]}
          />
        </View>
      ) : <View />}
    </View>
  );
};

const styles = StyleSheet.create({
  box2: {
    backgroundColor: '#61dafb',
    opacity: 0.6,
    height: '100%',
    width: 20,
    position: 'absolute',
    borderRadius: 5,
    borderWidth: 1
  },
  box: {
    backgroundColor: '#61dafb',
    height: '100%',
    width: 20,
    borderRadius: 5,
    borderWidth: 1,
    zIndex: 3,
  },
});

export default ResizableContainer;
