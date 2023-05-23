
import { View } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { BibleSelection } from './BibleSelection';
import { LivreSelection } from './LivreSelection';
import { ChapitreSelection, checkboxesReducer } from './ChapitreSelection';
import { useReducer } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { Modal, Text, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AccordionItem from './AccordionItem';
library.add(faGear);

const ConfigDrawer = ({ pk, setBibleParent, bibleParent, setLivreParent, livreParent }) => {
    const [visible, setVisible] = useState(false);
    const [bible, setBible] = useState('null')
    const [livre, setLivre] = useState('null')
    const [chapitre, setChapitre] = useState([])
    const [button, setButton] = useState(true)

    useEffect(() => {

        setLivre('null');
        setChapitre([]);
    }, [bible]);

    useEffect(() => {
        if (chapitre.length != 0) {
            setButton(false)
        }
        else {
            setButton(true)
        }
    }, [chapitre]);

    useEffect(() => {
        setChapitre([]);
    }, [livre]);


    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
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

    const viewStyle = visible ?   [StyleSheet.absoluteFill,{zIndex:2}] : { position: 'relative', zIndex: 2};



    return (
        <View style={viewStyle}>
            <Button style={{ position: 'absolute' }}
                icon={() => <Icon name="gear" size={20} color="blue" />
                }
                onPress={showModal} />
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <AccordionItem title={`Bible${bible != 'null' ? ' : ' + bible : ''}`}><BibleSelection bible={bible} setBible={setBible} pk={pk} /></AccordionItem>
                <AccordionItem disable={bible != 'null' ? false : true} title={'Livre'}><LivreSelection pk={pk} bible={bible} livre={livre} setLivre={setLivre} /></AccordionItem>
                <AccordionItem disable={(livre != 'null') ? false : true} title={"Chapitre"}><ChapitreSelection setChapitre={setChapitre} chapitre={chapitre} pk={pk} bible={bible} livre={livre} /></AccordionItem>
                <Button disabled={button} mode="contained" onPress={() => {setBibleParent(bible); setLivreParent(livre)}}>
                    Press me
                </Button>
            </Modal>

        </View>
    );
};

export default ConfigDrawer;
