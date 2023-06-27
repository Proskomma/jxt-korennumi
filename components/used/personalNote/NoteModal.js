import { Button, Modal, TextInput } from 'react-native-paper';
import { getState } from './stateManager';
import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { init, retrieveData, addNoteToWord } from './NoteChangerFunction';
import { useRenderDocument } from '../../../customHooks/useRenderDocument';




export default function NodeModal({ livre, bible, setKeyOfSurligne, keyOfSurligne }) {



    const [isActive, setIsActive] = useState(false);
    const [positionX, setPositionX] = useState(0)
    const [positionY, setPositionY] = useState(0)
    const [textDisplayed, setDisplayText] = useState('')
    const [isChanging, setIsChanging] = useState(false)
    const [idItem, setIdItem] = useState(null)


    const containerStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '30%',
        height: '30%',
        top: positionY,
        left: positionX,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'grey',
        zIndex: 9,
    };

    useEffect(() => {
        // Listen for changes in the state
        const handleChange = (newValue) => {

            setIsActive(newValue[0]);
            setPositionX(newValue[1].nativeEvent.pageX)
            setPositionY(newValue[1].nativeEvent.pageY)
            setIdItem(newValue[2])

            const retrieveDat = async (id) => {
                try {
                    const value = await retrieveData(`${bible}_${livre}_current`)
                    console.log(`${bible}_${livre}_current`)
                    console.log(value)
                    if (value !== null) {
                        setDisplayText(value.data[newValue[2]])
                    } else {
                        console.log('No data found.');
                        setDisplayText('No data found.')
                    }
                } catch (error) {
                    console.log('Error retrieving data:', error);
                }
            };
            retrieveDat()

        };

        // Subscribe to state changes
        getState.subscribe(handleChange);

        // Unsubscribe from state changes when the component unmounts
        return () => {
            getState.unsubscribe(handleChange);
        };
    }, []);

    return (
        <View style={isActive ? { height: '100%', width: '100%', position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, zIndex: 2 } : { disable: true }}>
            <Modal theme={{ colors: { backdrop: 'transparent', }, }} visible={isActive} onDismiss={() => setIsActive(false)} contentContainerStyle={containerStyle}>
                {isChanging ?
                    <View>
                        <TextInput
                            value={textDisplayed}
                            onChangeText={text => setDisplayText(text)} />
                        <Button mode="contained" onPress={async () => {
                            if (textDisplayed != '') {
                                console.log('laaaa')
                                if (keyOfSurligne.indexOf(idItem) < 0) {
                                    await addNoteToWord(`${bible}_${livre}_current`, idItem, textDisplayed);
                                    setKeyOfSurligne([...keyOfSurligne, idItem.toString()])
                                }
                                setIsChanging(false)
                            }
                            else {

                                await addNoteToWord(`${bible}_${livre}_current`, idItem, null);
                                setKeyOfSurligne(keyOfSurligne.filter(e => e != idItem))
                                setIsChanging(false)
                            }


                        }}>
                            Valider
                        </Button>
                    </View>
                    :
                    <View>
                        <Text>
                            {textDisplayed}
                        </Text>
                        <Button mode="contained" onPress={() => setIsChanging(true)}>
                            modifier
                        </Button>
                    </View>
                }
            </Modal >
        </View >)
}

