import { queryOneChapterOfOneDocSets } from '../graphql/Query/query';
const { Proskomma } = require('proskomma-core');
import { View, ScrollView, Text, StatusBar } from 'react-native';
import bottomTab from '../style/bottomTab';
import {SofriaRenderFromProskomma} from 'proskomma-json-tools'
import sofria2WebActions from '../renderer/sofria2web';
import {renderers} from '../renderer/render2reactNative';

const succinctlsg = require('../succinct/lsg.json');
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

pk.loadSuccinctDocSet(succinctlsg);
let chapterQuery =  multipleReplace(
  queryOneChapterOfOneDocSets,
  [["%idChapter%", "1"], ["%docSetId%", "local_lsg_1"], ["%bookCode%", "TIT"]]);

let chapterResult = pk.gqlQuerySync(chapterQuery);

const renderer = new SofriaRenderFromProskomma({
  proskomma: pk,
  actions: sofria2WebActions,
});

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
  selectedBcvNotes: [],
  bcvNotesCallback: (bcv) => {
    setBcvNoteRef(bcv);
  },
  renderers,
};

const output = {};
try {
  renderer.renderDocument({
      docId: chapterResult.data.document.id,
      config,
      output,
  });
} catch (err) {
  console.log("Renderer", err);
  throw err;
}

function MainPage() {
  return (
    <ScrollView key={'ScrollView'} style={bottomTab.mainContent}>
      <View key={'keyView'}>
        <Text key={'Text'}>Chapitre 1</Text>

        {output.paras}

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );

}
export { MainPage }

