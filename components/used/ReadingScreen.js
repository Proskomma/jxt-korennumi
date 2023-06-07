import { queryOneDocument } from '../../graphql/Query/query';
import { View, ScrollView, Text, StatusBar, FlatList } from 'react-native';
import SofriaRenderFromProskomma from './SofiraRenderFromProskommaNew';
import sofria2WebActions from '../../renderer/sofria2web';
import { renderers } from '../../renderer/render2reactNative';
import React, { useState, useCallback, useEffect } from 'react';
import ConfigDrawer from './TextConfig/configDrawer';
import { useDocumentQuery, useRenderDocument } from '../../customHooks/RendererHooks';
function ReadingScreen({ livre, bible, pk }) {

  const [data, setData] = useState([])

  const documentResult = useDocumentQuery(livre, bible, pk)
  const output = useRenderDocument(documentResult, pk, renderers, SofriaRenderFromProskomma, sofria2WebActions, setData)
  const renderItem = useCallback(({ item }) => item, []);
  const keyExtractor = useCallback((item, index) => `para-${index}-${livre}-${bible}`, [livre, bible]);
  const loadMoreItems = useCallback(() => {
    console.log([...data, ...output.paras.slice(data.length, data.length + 4)].length),

      setData([...data, ...output.paras.slice(data.length, data.length + 4)])
  })

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ height: '100%', width: '100%' }}
        removeClippedSubviews={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        //ref={flatListRef}
        onEndReached={loadMoreItems}
        scrollEventThrottle={16} // Add scrollEventThrottle for better performance
        onEndReachedThreshold={0.8} // Trigger loadMoreItems when the user reaches 50% from the end
      />
    </View>
  );
}

export { ReadingScreen }

