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







function ReadingScreen({ onScroll, flatListRef, pk }) {
  const [bible, setBible] = useState('local_test_1')
  const [livre, setLivre] = useState('GEN')


  let documentQuery = `
  {
    document(docSetId: "${bible}" withBook: "${livre}"){
      id
      cIndexes {
        chapter
      }
  }}
  `
  const documentResult =pk.gqlQuerySync(documentQuery)



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
    block: { nb: 1 },
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
  console.log(output)
  config.displayPartOfText.state = 'continue';
  const [shownParas, setShownParas] = useState(output.paras);
  const loadMoreItems = useCallback(() => {
    setShownParas(prevState => {

      if (documentResult?.data.document.cIndexes.length != 0) {
        if (config.block.blocks.length < config.block.nb) {

          config.chapters = [`${documentResult.data.document.cIndexes.shift().chapter}`];
          renderer.renderDocument1({
            docId: documentResult.data.document.id,
            config,
            context,
            workspace,
            output
          });

          return [...shownParas, ...output.paras.slice(shownParas.length, shownParas.length + config.block.nb)]
        }
        else {

          renderer.renderDocument1({
            docId: documentResult.data.document.id,
            config,
            context,
            workspace,
            output
          });

          return [...shownParas, ...output.paras.slice(shownParas.length, shownParas.length + config.block.nb)]
        }
      }
      else {
        if (config.block.blocks.length < config.block.nb) {
          renderer.renderDocument1({
            docId: documentResult.data.document.id,
            config,
            context,
            workspace,
            output
          });

          return [...shownParas, ...output.paras.slice(shownParas.length, shownParas.length + config.block.nb)]
        }
        else {

          renderer.renderDocument1({
            docId: documentResult.data.document.id,
            config,
            context,
            workspace,
            output
          });
          if (config.block.blocks.length === 0) {
            return [sh]

          }
          if (config.block.blocks.length < config.block.nb) {

            config.chapters = [`${documentResult.data.document.cIndexes.shift().chapter}`];
            renderer.renderDocument1({
              docId: documentResult.data.document.id,
              config,
              context,
              workspace,
              output
            });

            return [...shownParas, ...output.paras.slice(shownParas.length, shownParas.length + config.block.nb)]
          }
          else {

            renderer.renderDocument1({
              docId: documentResult.data.document.id,
              config,
              context,
              workspace,
              output
            });

            return [...shownParas, ...output.paras.slice(shownParas.length, shownParas.length + config.block.nb)]
          }
        }

      }
    });
  }, []);

  const renderItem = useCallback(({ item }) => item, []);

  const keyExtractor = useCallback((item, index) => `para-${index}`, []);

  return (
    <View style={{ flex: 1 }}>


      <ConfigDrawer pk={pk} setBibleParent={setBible} bibleParent={bible} livreParent={livre} setLivreParent={setLivre} />

      <FlatList
        style={{ height: '100%', width: '100%' }}
        removeClippedSubviews={true}
        data={shownParas}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ref={flatListRef}
        onScroll={onScroll}
        onEndReached={loadMoreItems}
        scrollEventThrottle={16} // Add scrollEventThrottle for better performance
        onEndReachedThreshold={0.8} // Trigger loadMoreItems when the user reaches 50% from the end
      />
      <StatusBar style="auto" />
    </View>
  );
}

export { ReadingScreen }

