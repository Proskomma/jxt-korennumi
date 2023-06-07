
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { BibleSelection } from './BibleSelection';
import { LivreSelection } from './LivreSelection';
import { ChapitreSelection, checkboxesReducer } from './ChapitreSelection';
import { useReducer } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect, useRef } from 'react';
import { Modal, Text, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AccordionItem from './AccordionItem';
import { Dimensions } from 'react-native';
library.add(faGear);

const ConfigDrawer = ({ pk, setIsActive, isActive, setBibleParent, bibleParent, setLivreParent, livreParent }) => {
    const [bible, setBible] = useState(bibleParent)
    const [livre, setLivre] = useState(livreParent)
    const [chapitre, setChapitre] = useState([])
    const [button, setButton] = useState(true)

    const ExecuteFirst = useRef(false)
    useEffect(() => {
        if (ExecuteFirst.current) {
            setLivre('null');
            setChapitre([]);
            console.log('on passe ici')
        }

    }, [bible]);

    useEffect(() => {
        if (ExecuteFirst.current) {
            if (chapitre.length != 0) {
                setButton(false)
            }
            else {
                setButton(true)
            }
        }

    }, [chapitre]);

    useEffect(() => {
        setChapitre([]);
        setButton(true)
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

    const viewStyle = isActive ? {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: '100%',
        rigth: 0,
        top: 0,
        buttom: 0,
        alignSelf: 'flex-end',
        /* align-self: center; */
        zIndex: 2,
    } : { disable: true };



    return (


        <View style={viewStyle}>

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
                    <AccordionItem disable={(livre != 'null') ? false : true} title={"Chapitre"}><ChapitreSelection setChapitre={setChapitre} chapitre={chapitre} pk={pk} bible={bible} livre={livre} /></AccordionItem>
                    <Button disabled={button} mode="contained" onPress={() => { setBibleParent(bible); setLivreParent(livre) }}>
                        Press me
                    </Button>
                </ScrollView>
            </Modal>
        </View>

    );
};

export default ConfigDrawer;
