import { queryOneChapterOfOneDocSets } from '../graphql/Query/query';
const { Proskomma } = require('proskomma-core');
import { View, ScrollView, Text, StatusBar, FlatList } from 'react-native';
import bottomTab from '../style/bottomTab';
import SofriaRenderFromProskomma from './SofiraRenderFromProskommaNew';
import sofria2WebActions from '../renderer/sofria2web';
import {renderers} from '../renderer/render2reactNative';
import React, { useState, useCallback } from 'react';

const succinct = require('../succinct/test.json');
const truc2 = null;
const truc = {truc2}
truc.truc2 = 2;
const truc3 = truc
truc3.truc2 = 1
console.log(truc);
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
let chapterQuery =  multipleReplace(
  queryOneChapterOfOneDocSets,
  [["%docSetId%", "local_test_1"], ["%bookCode%", "GEN"]]);

let chapterResult = pk.gqlQuerySync(chapterQuery);
const renderer = new SofriaRenderFromProskomma({
  proskomma: pk,
  actions: sofria2WebActions,
});
const numberBlocks = 10;
const state = 'begin';
const config = {
  showWordAtts: false,
  showTitles: true,
  showHeadings: true,
  showIntroductions: true,
  showFootnotes: true,
  showXrefs: true,
  showParaStyles: true,
  showCharacterMarkup: true,
  showChapterLabels: true,
  showVersesLabels: true,
  selectedBcvNotes: [],
  displayPartOfText: {numberBlocks,state},
  bcvNotesCallback: (bcv) => {
    setBcvNoteRef(bcv);
  },
  renderers,
};

const output = {};
const context = {};
const workspace = {};

try {

  renderer.renderDocument1({
      docId: chapterResult.data.document.id,
      config,
      context,
      workspace,
      output,
      
      
      }) ;

} catch (err) {
  console.log("Renderer", err);
  throw err;
}


function MainPage() {
  config.displayPartOfText.state = 'continue';
  const [paras, setParas] = useState(output.paras.slice(0, 10)); // Initial set of items
  const loadMoreItems = useCallback(() => {
    // Load more items when the user reaches the end of the list
    setParas(prevParas => {
      renderer.renderDocument1({
        docId: chapterResult.data.document.id,
        config,
        context,
        workspace,
        output})

      console.log(context);
      const newParas = output.paras.slice(prevParas.length, prevParas.length +  config.displayPartOfText.numberBlocks);
      return [...prevParas, ...newParas];
    });
  }, []);

  const renderItem = useCallback(({ item }) => item, []);

  const keyExtractor = useCallback((item, index) => `para-${index}`, []);

  return (
    <View style={{flex:1}}>
      <Text>Chapitre 1</Text>
      <FlatList
        style={{flexGrow: 1}}
        data={paras}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5} // Trigger loadMoreItems when the user reaches 10% from the end
      />
      <StatusBar style="auto" />
    </View>
  );
}


export { MainPage }

