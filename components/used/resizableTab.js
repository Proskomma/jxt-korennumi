import React, { useRef, useState } from 'react';
import ResizableContainer from './ResizableContainer';
import { View } from 'react-native';
import { Dimensions } from 'react-native';
import ConfigDrawer from './TextConfig/configDrawer'
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

library.add(faPlus);
library.add(faMinus);
import TextChanger from './TextChanger';
import { initial } from 'lodash';

function ResizableTab({ pk }) {

  const [numberText, setNumberOfText] = useState(1);
  const arrayHooks = [];

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
    console.log(Dimensions.get('window').width * (1 / numberText))
    return (
      <ResizableContainer
        key={`resizable-container-${index}`}
        initialWidth={Dimensions.get('window').width * (1 / numberText)}
        canExpand={numberText - 1 === index ? false : true
        }
        div={numberText}
      >

        <TextChanger pk={pk} />
      </ResizableContainer >

    )
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        flexDirection: 'row', flex: 1, alignContent: 'space-between', position: 'relative'
      }}>
        {resizableContainers}
      </View>
      <View style={{ position: 'absolute', right: 20, zIndex: 3 }}>
        {numberText === 1 ?
          <>
            <Button key={Math.random()} style={{ position: 'absolute', right: 50, zIndex: 3 }}
              icon={() => <Icon name="minus" size={20} color="grey" />
              }
              onPress={() => { }} />
            <Button key={Math.random()} style={{ position: 'absolute', right: 0, zIndex: 3 }}
              icon={() => <Icon name="plus" size={20} color="blue" />
              }
              onPress={() => setNumberOfText(numberText + 1)} /></> : <>
            <Button key={Math.random()} style={{ position: 'absolute', right: 50, zIndex: 3 }}
              icon={() => <Icon name="minus" size={20} color="blue" />
              }
              onPress={() => setNumberOfText(numberText - 1)} />
            <Button key={Math.random()} style={{ position: 'absolute', right: 0, zIndex: 3 }}
              icon={() => <Icon name="plus" size={20} color="blue" />
              }
              onPress={() => setNumberOfText(numberText + 1)} /></>
        }


      </View>

    </View >);
}

export { ResizableTab };
