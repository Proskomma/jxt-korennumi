import { Text } from 'react-native-paper';
import * as React from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useRef, useEffect } from 'react';
function LivreSelection({ pk, bible, livre, setLivre }) {
  const [checked, setChecked] = React.useState(livre);
  
  let livres = useRef(pk.gqlQuerySync(
    `{
      docSet(id: "${bible}"){
        id
        documents {
          header(id: "bookCode")

      }
      }
    }`));
    useEffect(() => {livres.current = pk.gqlQuerySync(
      `{
        docSet(id: "${bible}"){
          id
          documents {
            header(id: "bookCode")
  
        }
        }
      }`)},[bible])
  return <View>{livres.current.data.docSet.documents.map((doc, id) =>
    <View key={id} style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
      <Text style={{ alignSelf: 'center' }}>{doc.header}</Text>
      <RadioButton
        style={{ alignSelf: 'end' }}
        value={doc.header}
        status={checked === `${doc.header}` ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(`${doc.header}`);
          setLivre(doc.header)
        }} />
    </View>)}</View>
}
export { LivreSelection }
