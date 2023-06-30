import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useState } from "react"

function ConfigOptionSelection({ option, setOption }) {
  const [optionLabel, setOptionLabel] = useState([
    'showWordAtts',
    'showTitles',
    'showHeadings',
    'showIntroductions',
    'showFootnotes',
    'showXrefs',
    'showParaStyles',
    'showCharacterMarkup',
    'showChapterLabels',
    'showVersesLabels'])


  return <View>{
    option.map((truc, id) =>
      <View key={id} style={{ flexDirection: 'row', }}>
        <Checkbox
          value={option[id]}
          status={true === truc ? 'checked' : 'unchecked'}
          onPress={() => {
            const ar = JSON.parse(JSON.stringify(option))
            ar[id] = !ar[id]
            setOption(ar)
          }} />
        <Text style={{ alignSelf: 'center' }}>{`${optionLabel[id]}`}</Text>

      </View>
    )}
  </View >
}
export { ConfigOptionSelection }
