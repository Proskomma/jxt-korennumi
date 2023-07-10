import { useEffect, useState } from "react"
import { View, Text } from "react-native";
import { ReadingScreen } from "./ReadingScreen"
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import { renderers } from "../../../renderer/render2reactNative";
import { retrieveData } from "../../proofOfConcept/personalNote/NoteChangerFunction";
import { parse, stringify, toJSON, fromJSON } from 'flatted';

var sizeof = require('object-sizeof');

library.add(faGear);

import ConfigDrawer from "../TextConfig/configDrawer"
function TextChanger({ pk, initialText, textNumber, navigation }) {
    const [bible, setBible] = useState(initialText ? initialText[0] : '')
    const [livre, setLivre] = useState(initialText ? initialText[1] : '')
    const [isActive, setIsActive] = useState(false)
    useEffect(() => {
        option.bcvNotesCallback = (bcv) => {
            console.log(bcv)
            navigation.navigate("NoteTab", { bible: bible, pk: pk, bcv: bcv })
        }
    }, [bible])
    const [option, setOption] = useState({
        showWordAtts: false,
        showTitles: true,
        showHeadings: true,
        showIntroductions: true,
        showFootnotes: true,
        showXrefs: true,
        showParaStyles: true,
        showCharacterMarkup: true,
        showVersesLabels: true,
        showChapterLabels: true,
        selectedBcvNotes: [1],
        bcvNotesCallback: (bcv) => {
            console.log(bcv)
            navigation.navigate("NoteTab", { bible: bible, pk: pk, bcv: bcv })
        },
        displayPartOfText: { state: 'begin' },
        renderers,
    })
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