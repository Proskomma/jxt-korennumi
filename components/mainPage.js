import { queryOneChapterOfOneDocSets } from '../graphql/Query/query';
const { Proskomma } = require('proskomma-core');
import { View, ScrollView, Text, StatusBar } from 'react-native';
import bottomTab from '../style/bottomTab';

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
console.log(chapterQuery);

let chapterResult = pk.gqlQuerySync(chapterQuery);



function MainPage() {
  return (
    <ScrollView style={bottomTab.mainContent}>
      <View>
        <Text>Chapitre 1</Text>

        {chapterResult.data.document.cvIndex.verses.map(
          (vers, idvs) => <View key={`verses ${idvs}`}>
            <Text> {idvs}</Text>
            <Text>{vers.verse[0]?.text}</Text>
          </View>)}

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );

}
export { MainPage }

