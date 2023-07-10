import React, { useEffect } from 'react';
import AccordionItem from '../TextConfig/AccordionItem';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useFetchPackFromServer } from './DlPack';
// Assuming that packJson is an object with a "pack" property
const packJson = require('../../../assets/PackToDl/pack.json')

function AddingPack({ navigation, route }) {
    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} style={{ height: '100%', width: '100%' }}>
            <View style={{ height: 60 }}></View>
            {packJson.pack.map((pack) => (
                <AccordionItem key={pack.title} title={pack.title}>
                    <View style={{ justifyContent: 'center' }}>
                        {pack.items.map((elements, id) => (
                            <View key={id} style={{ borderWidth: 1, borderRadius: 4, borderColor: 'lightgrey', padding: 10, margin: 5 }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{elements.title}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Source: </Text>
                                        <Text>{elements.source}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Type: </Text>
                                        <Text>{elements.type}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Langue: </Text>
                                        <Text>{elements.langue}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Revision: </Text>
                                        <Text>{elements.revision}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                        <View key='Dl Button' style={{ alignItems: 'center', margin: 10 }}>
                            <TouchableOpacity onPress={() => {
                                const source = pack;
                                navigation.navigate("Telechargement de Pack", {
                                    source,
                                    pk: route.params.pk

                                });
                            }} style={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 4, padding: 10 }}  >
                                <Text style={{ fontWeight: 'bold' }}>Telecharger ce pack</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </AccordionItem>
            ))
            }
        </ScrollView >
    );
}

export { AddingPack };