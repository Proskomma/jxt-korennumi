import React, { useRef, useState } from 'react';
import ResizableContainer from './ResizableContainer';
import { View } from 'react-native';
import { Dimensions } from 'react-native';
import ConfigDrawer from './TextConfig/configDrawer'
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import TextChanger from './TextChanger';

function createRefsArray(length) {
  return Array.from({ length }, () => useRef(null));
}
function ResizableTab({ pk }) {
  const numberText = 1;
  const arrayHooks = [];
  const flatListRefs = createRefsArray(numberText);

  /*
  const [isUserScroll, setIsUserScroll] = useState(true);
  const [scrollLock, setScrollLock] = useState(false);

  const onScroll = (event, currentIndex) => {
    if (scrollLock) return;

    setScrollLock(true);
    const offsetX = event.nativeEvent.contentOffset.x;


    if (isUserScroll) {
      setIsUserScroll(false);
      flatListRefs.forEach((ref, index) => {
        if (index !== currentIndex) {
          ref.current.scrollToOffset({ offset: offsetX, animated: false });
        }
      });
    } else {
      setIsUserScroll(true);
    }

    setTimeout(() => setScrollLock(false), 20); // Release the lock after 100ms
  }; */




  const resizableContainers = Array.from({ length: numberText }, (_, index) => {

    const [isActive, setIsActive] = useState(false)
    const [bible, setBible] = useState('local_test_1')
    const [livre, setLivre] = useState('GEN')
    console.log(Dimensions.get('window').width * (1 / numberText))
    arrayHooks.push([isActive, setIsActive, bible, setBible, livre, setLivre])
    return (
      <ResizableContainer
        key={`resizable-container-${index}`}
        initialWidth={Dimensions.get('window').width * (1 / numberText)}
        canExpand={numberText - 1 === index ? false : true}
        div={numberText}
      >

        <TextChanger pk={pk} flatListRef={flatListRefs[index]} />
      </ResizableContainer >

    )
  });

  return <View style={{ flex: 1 }}>
    <View style={{
      flexDirection: 'row', flex: 1, alignContent: 'space-between', position: 'relative'
    }}>
      {resizableContainers}
    </View>
  </View >;
}

export { ResizableTab };
