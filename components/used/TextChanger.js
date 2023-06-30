import { useState } from "react"
import { View, Text } from "react-native";
import { ReadingScreen } from "./ReadingScreen"
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import { renderers } from "../../renderer/render2reactNative";
library.add(faGear);

import ConfigDrawer from "./TextConfig/configDrawer"
function TextChanger({ pk, textNumber }) {

    const [bible, setBible] = useState('local_fnT')
    const [livre, setLivre] = useState('TIT')
    const [option, setOption] = useState({
        showWordAtts: false,
        showTitles: false,
        showHeadings: false,
        showIntroductions: false,
        showFootnotes: false,
        showXrefs: false,
        showParaStyles: false,
        showCharacterMarkup: false,
        showChapterLabels: false,
        showVersesLabels: false,
        selectedBcvNotes: [],
        displayPartOfText: { state: 'begin' },
        renderers,
    })
    const [isActive, setIsActive] = useState(true)
    let testChapter = pk.gqlQuerySync(
        `{
            docSet(id: "${bible}") {
              document(bookCode: "${livre}") {
                cvIndexes {
                  chapter
                }
              }
            }
          }`
    );
    if (!testChapter.data.docSet?.document?.cvIndexes) {
        return <>
            <View style={{ height: 100 }}></View>
            <Text>Il ny a pas de texte malheuresement</Text>
            <Button key={Math.random()} style={{ top: 30, position: 'absolute', zIndex: 3 }}
                icon={() => <Icon name="gear" size={20} color="blue" />
                }
                onPress={() => setIsActive(true)} />
            <ConfigDrawer optionParent={option} setOptionParent={setOption} pk={pk} setIsActive={setIsActive} isActive={isActive} setBibleParent={setBible} bibleParent={bible} setLivreParent={setLivre} livreParent={livre} />
        </>
    }
    return (
        <>
            <View style={{ height: 30 }}></View>
            <Button key={Math.random()} style={{ top: 30, position: 'absolute', zIndex: 3 }}
                icon={() => <Icon name="gear" size={20} color="blue" />
                }
                onPress={() => setIsActive(true)} />
            <ConfigDrawer optionParent={option} setOptionParent={setOption} pk={pk} setIsActive={setIsActive} isActive={isActive} setBibleParent={setBible} bibleParent={bible} setLivreParent={setLivre} livreParent={livre} />
            <ReadingScreen option={option} textNumber={textNumber} livre={livre} bible={bible} pk={pk} />
        </>
    )
}

export default TextChanger