import React, { useState } from 'react';
import ResizableContainer from './ResizableContainer';
import { View } from 'react-native';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

library.add(faPlus);
library.add(faMinus);
import TextChanger from './TextChanger';

function ResizableTab({ pk }) {

  const [numberText, setNumberOfText] = useState(1);



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

        {<TextChanger textNumber={index} pk={pk} />}
      </ResizableContainer >

    )
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        flexDirection: 'row',
        width: Dimensions.get('window').width,

      }}>
        {resizableContainers}


      </View>
      <View style={{ position: 'absolute', right: 20, zIndex: 3 }}>
        {numberText === 1 ?
          <>
            <Button key={Math.random()} style={{ position: 'absolute', top: 30, right: 50, zIndex: 3 }}
              icon={() => <Icon name="minus" size={20} color="grey" />
              }
              onPress={() => { }} />
            <Button key={Math.random()} style={{ position: 'absolute', top: 30, right: 0, zIndex: 3 }}
              icon={() => <Icon name="plus" size={20} color="blue" />
              }
              onPress={() => setNumberOfText(numberText + 1)} /></> : <>
            <Button key={Math.random()} style={{ position: 'absolute', top: 30, right: 50, zIndex: 3 }}
              icon={() => <Icon name="minus" size={20} color="blue" />
              }
              onPress={() => setNumberOfText(numberText - 1)} />
            <Button key={Math.random()} style={{ position: 'absolute', top: 30, right: 0, zIndex: 3 }}
              icon={() => <Icon name="plus" size={20} color="blue" />
              }
              onPress={() => setNumberOfText(numberText + 1)} /></>
        }


      </View>

    </View >);
}

export { ResizableTab };
