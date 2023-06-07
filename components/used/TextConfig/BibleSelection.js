import { Text } from 'react-native-paper';
import * as React from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useRef } from 'react';

function BibleSelection({ pk, bible, setBible }) {
  const [checked, setChecked] = React.useState(bible);
  let docSetids = useRef(pk.gqlQuerySync(
    `{
      docSets 
      {
        id
      }
    }`));
  return <View>{docSetids.current.data.docSets.map((doc, id) =>
    <View key={id} style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
      <Text style={{ alignSelf: 'center' }}>{doc.id}</Text>
      <RadioButton
        style={{ alignSelf: 'end' }}
        value={doc.id}
        status={checked === `${doc.id}` ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(`${doc.id}`);
          setBible(doc.id)
        }} />
    </View>)}</View>
}
export { BibleSelection }
