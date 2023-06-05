import { Text, Checkbox } from 'react-native-paper';
import { useCallback, useEffect, useState, useReducer } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Dimensions } from 'react-native';
import * as ScreenOrientation from "expo-screen-orientation";

console.log(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)

library.add(faCheckSquare);
export const checkboxesReducer = (state, action) => {
  switch (action.type) {
    case 'toggle':
      return { ...state, [action.id]: !state[action.id] };
    default:
      throw new Error();
  }
};

function ChapitreSelection({ pk, bible, livre, chapitre, setChapitre }) {
  if (bible === 'null' || livre === 'null') {

    return <Text>can't render</Text>
  }
  const [checkboxes, dispatch] = useReducer(checkboxesReducer, chapitre.reduce((acc, id) => ({ ...acc, [id]: true }), {}));

  const toggleCheckbox = useCallback((id) => {
    dispatch({ type: 'toggle', id })
    if (checkboxes[id]) {
      setChapitre(chapitre.filter(item => item !== id));
    } else {
      setChapitre([...chapitre, id]);
    }
  }, [dispatch, checkboxes, chapitre]);

  let chapters = pk.gqlQuerySync(
    `{
        docSet(id: "${bible}") {
          document(bookCode: "${livre}") {
            cvIndexes {
              chapter
            }
          }
        }
      }`
  );
  const [data, setData] = useState(chapters?.data?.docSet.document?.cvIndexes?.map((doc, id) => ({
    id: (id + 1).toString(), // start IDs from 1
    num: doc.chapter,
  })));

  useEffect(() => {
    setData(chapters?.data?.docSet.document?.cvIndexes?.map((doc, id) => ({
      id: (id + 1).toString(), // start IDs from 1
      num: doc.chapter,
    })));
  }, [checkboxes]);

  const renderItem = useCallback(
    ({ item }) => {
      const { id, num } = item;
      return (
        <View style={styles.checkboxContainer}>
          <Text style={styles.centeredText}>{num}</Text>
          <View style={styles.centeredCheckbox}>
            <TouchableOpacity style={{ borderWidth: 2, width: 24, height: 24, }} onPress={() => toggleCheckbox(id)}>
              {checkboxes[id] ? <View><FontAwesomeIcon icon={faCheckSquare} size={20} color="blue" /></View>
                : <></>}
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [toggleCheckbox, checkboxes]
  );


  const windowHeight = Dimensions.get('window').height;
  const numCol = Math.floor((windowHeight * 0.4) / 20)

  const keyExtractor = useCallback((item) => `chap-${item.id}`, []);

  if (data.length > 0) {
    return (
      <FlatList
        data={data}
        numColumns={numCol}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    );
  } else {
    return <Text>{`Can't display`}</Text>
  }
}

const styles = StyleSheet.create({
  checkboxContainer: { flexDirection: 'column', width: 50 },
  centeredText: { alignSelf: 'center' },
  centeredCheckbox: { alignSelf: 'center' },
});

export { ChapitreSelection }
