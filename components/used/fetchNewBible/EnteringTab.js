import React, { useEffect, useState } from 'react';
import { getInfoFolder } from './BibleManipulationFunction';
import { TouchableOpacity, View, Text } from 'react-native';
import { deleteAssetsFolder } from './BibleManipulationFunction';
import { Portal, Modal } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
const { Proskomma } = require('proskomma-core');
const Text_Holder = require('../../../assets/language/lang.json')
function EnteringTab({ navigation, route }) {
    const [truc, setTruc] = useState('loading')
    const [modalSurSuprimer, setModalSurSuprimer] = useState(false)
    const [premierFois, setPremierFois] = useState(true)
    const lang = 'fr'
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setTruc('loading')
        });

        return unsubscribe;
    }, [navigation]);

    const [pk, setPk] = useState(new Proskomma([
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
    ]));
    const containerStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        height: '30%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'grey'
    };
    useEffect(() => {
        console.log('ici')
        getInfoFolder('assets').then(resultA => {
            console.log(resultA)
            if (resultA.exists) {
                setTruc(true)
            }
            else {
                setTruc(false)
            }
        })
    })
    console.log(truc)
    if (truc === 'loading') {
        return <Text>{Text_Holder.TEXT_LOADING[lang]}</Text>
    }
    if (truc) {
        return <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} style={{ width: '100%', height: '100%' }}>
            <TouchableOpacity style={{ alignSelf: 'center', borderWidth: 2, borderRadius: 5, padding: 10, margin: 10, width: '80%' }} onPress={() => navigation.navigate("Selection de Pack", { pk })}>
                <View>
                    <Text style={{ fontSize: 32, fontWeight: 'bold', margin: 5, alignSelf: 'center' }}>{Text_Holder.TEXT_ADD[lang]}</Text>
                    <Text style={{ fontSize: 16, color: 'darkgrey', margin: 5, borderWidth: 1, padding: 10, borderColor: 'darkgrey' }}>{Text_Holder.TEXT_ADD_DESC[lang]}</Text>

                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignSelf: 'center', borderWidth: 2, borderRadius: 5, padding: 10, margin: 10, width: '80%' }}
                onPress={() => {
                    if (premierFois) {
                        setPremierFois(false);
                        navigation.navigate('ParseTab', { initialText: ['DCS_69772_1', 'TIT'], pk: pk })
                    } else { navigation.navigate("ReadTab", { initialText: ['eBible_fraLSG_2022-12-26', 'TIT'], pk: pk }) }
                }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold', margin: 5, alignSelf: 'center' }}>{Text_Holder.TEXT_READ[lang]}</Text>
                <Text style={{ fontSize: 16, color: 'darkgrey', margin: 5, borderWidth: 1, padding: 10, borderColor: 'darkgrey' }}>{Text_Holder.TEXT_READ_DESC[lang]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ borderColor: 'red', alignSelf: 'center', borderWidth: 2, borderRadius: 5, padding: 10, margin: 10, width: '80%' }} onPress={() => { setModalSurSuprimer(true) }}>
                <Text style={{ color: 'darkred', fontSize: 32, fontWeight: 'bold', margin: 5, alignSelf: 'center' }}>{Text_Holder.TEXT_DEL[lang]}</Text>
                <Text style={{ fontSize: 16, color: 'darkred', margin: 5, borderWidth: 1, padding: 10, borderColor: 'red' }}>{Text_Holder.TEXT_DEL_DESC[lang]}</Text>
            </TouchableOpacity>
            <Portal>
                <Modal visible={modalSurSuprimer} onDismiss={() => setModalSurSuprimer(false)} contentContainerStyle={containerStyle}>
                    <View style={{ padding: 10, width: '100%', height: '100%', flexDirection: 'column' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 5, alignSelf: 'center' }}>{Text_Holder.TEXT_DEL_WARNING[lang]}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ alignSelf: 'center', borderWidth: 2, borderRadius: 5, padding: 10, margin: 10, width: '40%', borderColor: 'red' }} onPress={() => {
                                deleteAssetsFolder();
                                setTruc(false);
                                setModalSurSuprimer(false)
                            }}>
                                <Text style={{ alignSelf: 'center', color: 'darkred' }}>{Text_Holder.TEXT_DEL_YES[lang]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                alignSelf: 'center', borderWidth: 2, borderRadius: 5, padding: 10, margin: 10, width: '40%'
                            }} onPress={() => setModalSurSuprimer(false)}>
                                <Text style={{ alignSelf: 'center' }
                                } >{Text_Holder.TEXT_DEL_NO[lang]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal >
            </Portal >
        </ScrollView >
    }
    else {
        return <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            <TouchableOpacity style={{ alignSelf: 'center', borderWidth: 2, borderRadius: 5, padding: 10, margin: 10, width: '80%' }} onPress={() => navigation.navigate("Selection de Pack", { pk })}>
                <View>
                    <Text style={{ fontSize: 32, fontWeight: 'bold', margin: 5, alignSelf: 'center' }}>{Text_Holder.TEXT_ADD[lang]}</Text>
                    <Text style={{ fontSize: 16, color: 'darkgrey', margin: 5, borderWidth: 1, padding: 10, borderColor: 'darkgrey' }}>{Text_Holder.TEXT_ADD_DESC[lang]}</Text>

                </View>
            </TouchableOpacity>
        </View>
    }
}



export { EnteringTab };
