
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { BibleSelection } from './BibleSelection';
import { LivreSelection } from './LivreSelection';
import { ConfigOptionSelection } from './ConfigOptionSelection';
import { ChapitreSelection, checkboxesReducer } from './ChapitreSelection';
import { useReducer } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect, useRef } from 'react';
import { Modal, Text, Button, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AccordionItem from './AccordionItem';
import { Dimensions } from 'react-native';

library.add(faGear);

function changeValueConfig(optionParentToChange, array) {
    const optionParent = optionParentToChange;
    optionParent.showWordAtts = array[0]
    optionParent.showTitles = array[1]
    optionParent.showHeadings = array[2]
    optionParent.showIntroductions = array[3]
    optionParent.showFootnotes = array[4]
    optionParent.showXrefs = array[5]
    optionParent.showParaStyles = array[6]
    optionParent.showCharacterMarkup = array[7]
    optionParent.showVersesLabels = array[8]
    return optionParent
}

const ConfigDrawer = ({ optionParent, setOptionParent, pk, setIsActive, isActive, setBibleParent, bibleParent, setLivreParent, livreParent }) => {
    const [bible, setBible] = useState(bibleParent)
    const [livre, setLivre] = useState(livreParent)
    const [button, setButton] = useState(true)

    const [option, setOption] = useState([
        optionParent.showWordAtts,
        optionParent.showTitles,
        optionParent.showHeadings,
        optionParent.showIntroductions,
        optionParent.showFootnotes,
        optionParent.showXrefs,
        optionParent.showParaStyles,
        optionParent.showCharacterMarkup,
        optionParent.showVersesLabels])

    let config = optionParent;
    config.showWordAtts = option[0]

    const ExecuteFirst = useRef(false)
    useEffect(() => {
        if (ExecuteFirst.current) {
            setLivre('null');
        }
    }, [bible]);

    useEffect(() => {
        if (livre === 'null') {
            setButton(true)
        }
        else {
            setButton(false)
        }
    }, [livre]);

    useEffect(() => {
        ExecuteFirst.current = true
    })
    const containerStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'grey'
    };





    return (

        <Portal>

            <Modal visible={isActive} onDismiss={() => setIsActive(false)} contentContainerStyle={containerStyle}>
                <ScrollView style={{
                    width: '100%',
                }}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <AccordionItem title={`Bible${bible != 'null' ? ' : ' + bible : ''}`}><BibleSelection bible={bible} setBible={setBible} pk={pk} /></AccordionItem>
                    <AccordionItem disable={bible != 'null' ? false : true} title={'Livre'}><LivreSelection pk={pk} bible={bible} livre={livre} setLivre={setLivre} /></AccordionItem>
                    <AccordionItem title={'Options'}><ConfigOptionSelection option={option} setOption={setOption} livre={livre} setLivre={setLivre} /></AccordionItem>
                    <Button disabled={button} mode="contained" onPress={() => {
                        setIsActive(false); setBibleParent(bible); setLivreParent(livre); setOptionParent(changeValueConfig(optionParent, option))
                    }}>
                        Press me
                    </Button>
                </ScrollView>
            </Modal>
        </Portal>
    );
};

export default ConfigDrawer;
