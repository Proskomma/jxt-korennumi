import { View, FlatList, Text } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useDocumentQuery } from '../../customHooks/useDocumentQuery';
import { useRenderDocument } from '../../customHooks/useRenderDocument';
import NoteModal from './personalNote/NoteModal';
import { retrieveData } from './personalNote/NoteChangerFunction';
import renderDoc from '../../customFunction/renderDocument';
function ReadingScreen({ livre, bible, pk, textNumber = 0 }) {
  console.log(textNumber)
  const [data, setData] = useState([])
  const [keyOfSurligne, setKeyOfSurligne] = useState([]);
  const [output, setOutput] = useState(null)
  useEffect(() => {

    retrieveData(`${bible}_${livre}_current`)
      .then(result => {

        setKeyOfSurligne(Object.keys(result.data).filter(k => result.data[k] != null))

      })
      .catch(error => {
        setKeyOfSurligne([]);
      });
  }, [bible, livre]);

  const documentResult = useDocumentQuery(livre, bible, pk)
  //const output = useRenderDocument(documentResult, pk, setData, livre, bible, keyOfSurligne)
  const renderItem = useCallback(({ item }) => item, []);
  const keyExtractor = useCallback((item, index) => `para-${index}-${item}-${livre}-${bible}`, [livre, bible]);
  const loadMoreItems = useCallback(() => {
    if (output.paras) {
      setData([...data, ...output.paras.slice(data.length, data.length + 4)])
    }
  })

  useEffect(() => {
    setOutput(renderDoc(documentResult, pk, bible, livre, keyOfSurligne, textNumber))


  }, [keyOfSurligne, documentResult])

  useEffect(() => {
    if (output?.paras) {
      if (data.length != 0) {
        setData(output.paras.slice(0, data.length))
      }
      else {
        setData(output.paras.slice(0, 20))

      }
    }
  }, [output])
  return (

    <View style={{ flex: 1 }}>
      <NoteModal textNumber={textNumber} livre={livre} bible={bible} setKeyOfSurligne={setKeyOfSurligne} keyOfSurligne={keyOfSurligne}></NoteModal>
      <FlatList
        style={{ height: '100%', width: '100%' }}
        removeClippedSubviews={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        //ref={flatListRef}
        onEndReached={loadMoreItems}
        scrollEventThrottle={16} // Add scrollEventThrottle for better performance
        onEndReachedThreshold={0.5} // Trigger loadMoreItems when the user reaches 50% from the end
      /></View>


  );
}

export { ReadingScreen }

