import { queryVC } from '../graphql/Query/query';
const { Proskomma } = require('proskomma-core');
import { View, ScrollView,Text,StatusBar } from 'react-native';
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

pk.loadSuccinctDocSet(succinctlsg);
let book = pk.gqlQuerySync(queryVC.replace("[%idChapter%]", "1"));





function MainPage() {
  return (
    <ScrollView style={bottomTab.mainContent}>
    <View>
      {book.data.docSet.documents.map(
        (doc, idd) => (<View><Text key={`chapter ${idd}`}>Chapitre {idd+1}</Text>
          {doc.cvIndex.verses.map(
          (vers, idvs) => ( 
          <View>
          <Text key={`verses ${idd}-${idvs}`}> {idvs}</Text>
          <Text key={`chapeter-verser ${idd}-${idvs}`}>{vers.verse[0]?.text}</Text>
          </View>))}
          </View>))}
      <StatusBar style="auto" />
    </View>
    </ScrollView>
  );

}
export {MainPage}

