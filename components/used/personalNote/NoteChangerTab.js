import { TextInput } from 'react-native-paper';
import { getState } from './stateManager';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { init, retrieveData, changerCurrentNote } from './NoteChangerFunction';
import AccordionItem from '../TextConfig/AccordionItem';

export default function NoteChangerTab({ pk }) {
    const [notesInSystem, setNotesInSystem] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const fetchedNotes = [];

            const livres = pk.gqlQuerySync(`
                {
                    docSets {
                        id
                        documents {
                            header(id: "bookCode")
                        }
                    }
                }
            `);

            for (const ds of livres.data.docSets) {
                const data = { id: ds.id, headers: [] };

                for (const d of ds.documents) {
                    const bookInfo = { header: d.header, notes: [], current: '' };
                    const result = await retrieveData(`${ds.id}_${d.header}_array`);
                    const resultCurrent = await retrieveData(`${ds.id}_${d.header}_current`);

                    if (result) {
                        result.map(n => bookInfo.notes.push({
                            noteName: n.name
                        }));

                        bookInfo.current = resultCurrent.name;
                    }

                    data.headers.push(bookInfo);
                }

                fetchedNotes.push(data);
            }

            setNotesInSystem(fetchedNotes);
        };

        fetchData();
    }, [forceUpdate]);

    const handleNotePress = async (docSetId, header, noteName) => {
        await changerCurrentNote(docSetId, header, noteName);
        setForceUpdate(!forceUpdate)
        console.log(notesInSystem)
    };

    useEffect(() => {
        console.log(notesInSystem);
    }, [notesInSystem]);

    return (
        <View
            style={{
                height: '80%',
                width: '80%',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'grey',
                justifyContent: 'center'
            }}
        >
            {notesInSystem.map(b => (
                <View key={b.id}>
                    <Text style={{ fontSize: 32 }}>{b.id}</Text>
                    {b.headers.map(h => (
                        <View key={h.header}>
                            <Text style={{ fontSize: 24 }}>  -{h.header}</Text>
                            {h.notes.map(nn => (
                                <TouchableOpacity
                                    style={h.current === nn.noteName ? { backgroundColor: 'grey' } : {}}
                                    key={nn.noteName}
                                    onPress={() => handleNotePress(b.id, h.header, nn.noteName)}
                                >
                                    <Text>{nn.noteName}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
}
