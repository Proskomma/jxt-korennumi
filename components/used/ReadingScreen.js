import { View, FlatList } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useDocumentQuery } from '../../customHooks/useDocumentQuery';
import { useRenderDocument } from '../../customHooks/useRenderDocument';
function ReadingScreen({ livre, bible, pk }) {

  const [data, setData] = useState([])

  const documentResult = useDocumentQuery(livre, bible, pk)
  const output = useRenderDocument(documentResult, pk, setData)
  const renderItem = useCallback(({ item }) => item, []);
  const keyExtractor = useCallback((item, index) => `para-${index}-${item}-${livre}-${bible}`, [livre, bible]);
  const loadMoreItems = useCallback(() => {

    setData([...data, ...output.paras.slice(data.length, data.length + 4)])
  })
  console.log(data)
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
        onEndReachedThreshold={0.8} // Tr igger loadMoreItems when the user reaches 50% from the end
      />
    </View>
  );
}

export { ReadingScreen }

