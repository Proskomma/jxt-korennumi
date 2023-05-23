import React, {useRef,useState} from 'react';
import { ReadingScreen } from '../used/ReadingScreen';
import ResizableContainer from './ResizableContainer';
import { View } from 'react-native';
import {Dimensions} from 'react-native';
import { debounce } from 'lodash';

function createRefsArray(length) {
  return Array.from({ length }, () => useRef(null));
}
function ResizableTab({pk}) {
  const numberText = 2;
  const flatListRefs = createRefsArray(numberText);
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
  };
  
  
  
  
  const resizableContainers = Array.from({ length: numberText }, (_, index) => (

    <ResizableContainer
    key={`resizable-container-${index}`}
    initalHeigth={Dimensions.get('window').height / numberText}
  >
    <ReadingScreen
      key={`reading-screen-${index}`}
      onScroll={(event) => onScroll(event, index)}
      flatListRef={flatListRefs[index]}
      pk={pk}
    />
  </ResizableContainer>
));

return <View style={{flexDirection:'row', flex: 1 }}>{resizableContainers}</View>;
}

export { ResizableTab };