import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


function SliderComponent() {
    const [sliderValue, setSliderValue] = useState(0);
    const handleTouchStart = event => {
      const { locationX } = event.nativeEvent;
      const newValue = Math.round((locationX / 280) * 100);
      setSliderValue(newValue);
    };
  
    const handleTouchMove = event => {
      const { locationX } = event.nativeEvent;
      const newValue = Math.round((locationX / 280) * 100);
      setSliderValue(newValue);
    };
  
    return (
      <View style={{ width: 280 }}>
        <View
          style={{
            height: 10,
            backgroundColor: 'lightgray',
            borderRadius: 5,
            overflow: 'hidden',
          }}>
          <View
            style={{
              height: '100%',
              backgroundColor: 'blue',
              width: `${sliderValue}%`,
            }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: `${sliderValue}%`,
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: 'blue',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  export  {SliderComponent}