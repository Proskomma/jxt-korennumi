import { View, FlatList, Text } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useDocumentQuery } from '../../../customHooks/useDocumentQuery';
import { useRenderDocument } from '../../../customHooks/useRenderDocument';
import NoteModal from '../../proofOfConcept/personalNote/NoteModal';
import { retrieveData } from '../../proofOfConcept/personalNote/NoteChangerFunction';
import renderDoc from '../../../customFunction/renderDocument';
import sizeof from 'object-sizeof';
function ReadingScreen({ option, livre, bible, pk, textNumber = 0 }) {



  const [data, setData] = useState([]);
  const [keyOfSurligne, setKeyOfSurligne] = useState([]);
  const [output, setOutput] = useState(null);

  const [index, setIndex] = useState(20)
  useEffect(() => {
    retrieveData(`${bible}_${livre}_current`)
      .then(result => {
        setKeyOfSurligne(Object.keys(result.data).filter(k => result.data[k] != null));
      })
      .catch(error => {
        setKeyOfSurligne([]);
      });
  }, [bible, livre]);

  const documentResult = useDocumentQuery(livre, bible, pk);
  const renderItem = useCallback(({ item }) => item, []);
  const keyExtractor = useCallback(
    (item, index) => `para-${index}-${item}-${livre}-${bible}`,
    [livre, bible]
  );

  const loadMoreItems = () => {
    if (output?.paras) {
      const newData = output.paras.slice(index, index + 4);
      setData(prevData => [...prevData, ...newData]);
      setIndex(prevIndex => prevIndex + 4);
    }
  };
  useEffect(() => {
    setOutput(renderDoc(documentResult, pk, bible, livre, keyOfSurligne, textNumber, option));

  }, [keyOfSurligne, documentResult, option.showWordAtts, option.showTitles, option.showHeadings, option.showIntroductions, option.showFootnotes, option.showXrefs, option.showParaStyles, option.showCharacterMarkup, option.showChapterLabels, option.showVersesLabels, option.selectedBcvNotes, option.displayPartOfText, option.renderers]);

  useEffect(() => {
    if (output?.paras) {
      setData(output.paras.slice(0, data.length || 20));
    }
  }, [output]);

  return (
    <View style={{ flex: 1 }}>
      <NoteModal textNumber={textNumber} livre={livre} bible={bible} setKeyOfSurligne={setKeyOfSurligne} keyOfSurligne={keyOfSurligne} />
      <FlatList
        style={{ height: '100%', width: '100%' }}
        removeClippedSubviews={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={loadMoreItems}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
}

export { ReadingScreen };
