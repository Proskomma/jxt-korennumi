import { queryOneDocument } from '../../graphql/Query/query';
import { View, ScrollView, Text, StatusBar, FlatList } from 'react-native';
import SofriaRenderFromProskomma from './SofiraRenderFromProskommaNew';
import sofria2WebActions from '../../renderer/sofria2web';
import { renderers } from '../../renderer/render2reactNative';
import React, { useState, useCallback, useEffect } from 'react';
import ConfigDrawer from './TextConfig/configDrawer';


function multipleReplace(query, tabl) {
  let ret = query;
  for (const [s, r] of tabl) {
    ret = ret.replace(s, r);
  }
  return ret
}







function ReadingScreen({ livre, bible, flatListRef, pk }) {



  let documentQuery = `
  {
    document(docSetId: "${bible}" withBook: "${livre}"){
      id
      cIndexes {
        chapter
      }
  }}
  `
  const documentResult = pk.gqlQuerySync(documentQuery)
  console.log(documentResult)


  const renderer = new SofriaRenderFromProskomma({
    proskomma: pk,
    actions: sofria2WebActions,

  });

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
    nbBlock: 1,
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
  console.log(output)
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
  config.displayPartOfText.state = 'continue';
  console.log(output.paras)
  const [shownParas, setShownParas] = useState(output.paras);
  useEffect(() => {
    setShownParas(output.paras)
  }, [bible, livre])

  const loadMoreItems = useCallback(() => {
    setShownParas(prevState => {

      if (documentResult?.data.document.cIndexes.length != 0) {
        if (workspace.blockId.length < config.nbBlock) {

          workspace.chapters = [`${documentResult.data.document.cIndexes.shift().chapter}`];
          renderer.renderDocument1({
            docId: documentResult.data.document.id,
            config,
            context,
            workspace,
            output
          });

          return [...shownParas, ...output.paras.slice(shownParas.length, shownParas.length + config.nbBlock)]
        }
        else {

          renderer.renderDocument1({
            docId: documentResult.data.document.id,
            config,
            context,
            workspace,
            output
          });

          return [...shownParas, ...output.paras.slice(shownParas.length, shownParas.length + config.nbBlock)]
        }
      }
      else {
        if (workspace.blockId.length < config.nbBlock) {
          renderer.renderDocument1({
            docId: documentResult.data.document.id,
            config,
            context,
            workspace,
            output
          });

          return [...shownParas, ...output.paras.slice(shownParas.length, shownParas.length + config.nbBlock)]
        }
        else {

          renderer.renderDocument1({
            docId: documentResult.data.document.id,
            config,
            context,
            workspace,
            output
          });
          if (workspace.blockId.length === 0) {
            return [sh]

          }
          if (workspace.blockId.length < config.nbBlock) {

            workspace.chapters = [`${documentResult.data.document.cIndexes.shift().chapter}`];
            renderer.renderDocument1({
              docId: documentResult.data.document.id,
              config,
              context,
              workspace,
              output
            });

            return [...shownParas, ...output.paras.slice(shownParas.length, shownParas.length + config.nbBlock)]
          }
          else {

            renderer.renderDocument1({
              docId: documentResult.data.document.id,
              config,
              context,
              workspace,
              output
            });

            return [...shownParas, ...output.paras.slice(shownParas.length, shownParas.length + config.nbBlock)]
          }
        }

      }
    });
  }, []);

  const renderItem = useCallback(({ item }) => item, []);

  const keyExtractor = useCallback((item, index) => `para-${index}-${livre}-${bible}`, [livre, bible]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ height: '100%', width: '100%' }}
        removeClippedSubviews={true}
        data={shownParas}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        //ref={flatListRef}
        onEndReached={loadMoreItems}
        scrollEventThrottle={16} // Add scrollEventThrottle for better performance
        onEndReachedThreshold={0.8} // Trigger loadMoreItems when the user reaches 50% from the end
      />
      <StatusBar style="auto" />
    </View>
  );
}

export { ReadingScreen }

