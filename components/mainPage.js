import { queryOneDocument } from '../graphql/Query/query';
const { Proskomma } = require('proskomma-core');
import { View, ScrollView, Text, StatusBar, FlatList } from 'react-native';
import bottomTab from '../style/bottomTab';
import SofriaRenderFromProskomma from './SofiraRenderFromProskommaNew';
import sofria2WebActions from '../renderer/sofria2web';
import { renderers } from '../renderer/render2reactNative';
import React, { useState, useCallback, useEffect } from 'react';

const succinct = require('../succinct/lsg.json');

const pk = new Proskomma([
  {
    name: "source",
    type: "string",
    regex: "^[^\\s]+$",
  },
  {
    name: "project",
    type: "string",
    regex: "^[^\\s]+$",
  },
  {
    name: "revision",
    type: "string",
    regex: "^[^\\s]+$",
  },
]);

function multipleReplace(query, tabl) {
  let ret = query;
  for (const [s, r] of tabl) {
    ret = ret.replace(s, r);
  }
  return ret
}

pk.loadSuccinctDocSet(succinct);
let documentQuery = multipleReplace(
  queryOneDocument,
  [["%docSetId%", "local_lsg_1"], ["%bookCode%", "TIT"]]);

let documentResult = pk.gqlQuerySync(documentQuery);
const renderer = new SofriaRenderFromProskomma({
  proskomma: pk,
  actions: sofria2WebActions,
});



const state = 'begin';
const config = {
  showWordAtts: true,
  showTitles: true,
  showHeadings: true,
  showIntroductions: true,
  showFootnotes: true,
  showXrefs: true,
  showParaStyles: true,
  showCharacterMarkup: true,
  showChapterLabels: true,
  showVersesLabels: true,
  chapters: [`${documentResult.data.document.cIndexes.shift().chapter}`],
  selectedBcvNotes: [],
  displayPartOfText: { state },
  bcvNotesCallback: (bcv) => {
    setBcvNoteRef(bcv);
  },
  renderers,
};
const output = {};
const context = {};
const workspace = {};
let numberToRender = 1;
try {

  renderer.renderDocument1({
    docId: documentResult.data.document.id,
    config,
    context,
    workspace,
    output,


  });

} catch (err) {
  console.log("Renderer", err);
  throw err;
}

function MainPage() {
  config.displayPartOfText.state = 'begin';
  const [paras, setParas] = useState(output.paras); // Initial set of items
  const [showParas, setShownParas] = useState({ showParas: [], indexPara: 0 });
  const loadInitialParas = () => {
    let newShowParas = [];
    let newIndexPara;

    if (paras.length < 5) {
      newShowParas = paras.slice(0, paras.length);
      newIndexPara = paras.length-1;
    } else {
      newShowParas = paras.slice(0, 5);
      newIndexPara = 4;
    }
    // Update the state using the setShownParas function
    setShownParas({ showParas: newShowParas, indexPara: newIndexPara });
  };
  useEffect(() => {
    loadInitialParas();
    
  }, []);

  const loadMoreItems = useCallback(() => {
    setShownParas(prevState => {
      const prevParas = prevState.showParas;
      const currentIndex = prevState.indexPara;
      console.log(currentIndex);
      if (documentResult.data.document.cIndexes.length !== 0) {
        if (paras.length / 2 <= currentIndex) {
          
          config.chapters = [`${documentResult.data.document.cIndexes.shift().chapter}`];
          renderer.renderDocument1({
            docId: documentResult.data.document.id,
            config,
            context,
            workspace,
            output
          });
          const newParas = output.paras;
          const updatedParas = [...paras, ...newParas];
          setParas(updatedParas)
          if (paras.length < currentIndex + numberToRender) {
            numberToRender = 1;
          }
          console.log(currentIndex);
          const newParaToShow = updatedParas.slice(currentIndex+1, currentIndex +1+ numberToRender);
          const newIndexPara = currentIndex + numberToRender;

          return {
            showParas: [...prevState.showParas,...newParaToShow],
            indexPara: newIndexPara,
          };
        }
        else{
          console.log(currentIndex);
          const newParaToShow = paras.slice(currentIndex+1, currentIndex+1 + numberToRender);
          const newIndexPara = currentIndex + numberToRender;
          console.log(newParaToShow);
          return {
            showParas: [...prevState.showParas,...newParaToShow],
            indexPara: newIndexPara,
          };
        }
      }
      return {
        showParas: prevParas,
        indexPara: currentIndex ,
      };
    });
  }, [showParas]);

  const renderItem = useCallback(({ item }) => item, []);

  const keyExtractor = useCallback((item, index) => `para-${index}`, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>Chapitre 1</Text>
      <FlatList
        style={{ flexGrow: 1 }}
        data={showParas.showParas}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.8} // Trigger loadMoreItems when the user reaches 50% from the end
      />
      <StatusBar style="auto" />
    </View>
  );
}

export { MainPage }

