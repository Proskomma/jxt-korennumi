import React, { useState, useEffect } from 'react';
import ResizableContainer from './ResizableContainer';
import { View, Text } from 'react-native';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { useParseAssetsFolder } from '../fetchNewBible/DlPack';
import * as ScreenOrientation from "expo-screen-orientation";
const succint = require(`../../../succinct/fnT.json`)
library.add(faPlus);
library.add(faMinus);
import TextChanger from './TextChanger';

function ResizableTab({ navigation, route }) {
  const [orientation, setOrientation] = useState(null);
  useEffect(() => {
    checkOrientation();
    const subscription = ScreenOrientation.addOrientationChangeListener(
      handleOrientationChange
    );
    return () => {
      ScreenOrientation.removeOrientationChangeListeners(subscription);
    };
  }, []);
  const checkOrientation = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    setOrientation(orientation);
  };
  const handleOrientationChange = (o) => {
    setOrientation(o.orientationInfo.orientation);
  };

  const [numberText, setNumberOfText] = useState(1);
  const resizableContainers = Array.from({ length: numberText }, (_, index) => {
    return (
      <ResizableContainer
        key={`resizable-container-${index}`}
        initialWidth={Dimensions.get('window').width * (1 / numberText)}
        canExpand={numberText - 1 === index ? false : true
        }
        div={numberText}
      >

        {<TextChanger navigation={navigation} textNumber={index} initialText={route.params.initialText} pk={route.params.pk} />}
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

        {orientation > 2 ?
          numberText === 1 ?
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
          :
          <></>
        }


      </View>

    </View >);
}


export { ResizableTab };
