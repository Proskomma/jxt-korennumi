import { useState, useEffect } from "react"
import { View, Text, ScrollView } from "react-native";
import { createFolderIfNotExists, deleteNoteFolder, getAllInDirectory } from "../fetchNewBible/BibleManipulationFunction";
import AccordionItem from "../TextConfig/AccordionItem"
import { width } from "@fortawesome/free-solid-svg-icons/faGear";
const packJSON = require('../../../assets/PackToDl/pack.json')
function NoteTab({ navigation, route }) {



    bcv = { chapter: route.params.bcv[1], book: route.params.bcv[0], verse: route.params.bcv[2] }

    let documentQuery = `
      {
        document(docSetId: "${route.params.bible}" withBook: "${bcv.book}"){
          id
      }}
      `
    const documentResult = route.params.pk.gqlQuerySync(documentQuery)
    let textBCV = route.params.pk.gqlQuerySync(`{
        document(id: "${documentResult.data.document.id}") {
              cv(chapter: "${bcv.chapter}", verses: "${bcv.verse}") {
                text
              }
            }
          }`);
    const { error, dataToRead, loading } = useCreatNoteFolder(route.params.pk, bcv)

    if (loading) {
        return <Text>loading</Text>
    }
    if (error) {
        return <Text>${error.toString()}</Text>

    }
    else {
        console.log('ic', dataToRead.data.docSets)
        return <ScrollView style={{ width: '100%' }}>
            <View style={{ alignSelf: 'center', borderWidth: 2, borderRadius: 5, padding: 10, margin: 10, width: '80%' }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{bcv.chapter} </Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{bcv.verse} </Text>
                    <Text style={{ flexDirection: 'column', flex: 1 }}>{textBCV.data.document.cv[0].text.split("\n").join(" ")}</Text>
                </View>

            </View>
            <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {dataToRead.data.docSets.map(ds =>
                    <AccordionItem containerStyle={{ width: '90%', padding: 10 }} disable={false} title={ds.tags[0].split(':')[1]}>{ds.documents.map(doc => doc.tableSequences.map((ts, id) =>
                        <View style={{ width: '100%' }}>
                            {
                                ts.rows.filter(r => r.length === 3).map(r =>
                                    <View style={{ width: '100%', flexWrap: 'wrap', flexDirection: 'row' }}>
                                        <Text >{r[0].text} - </Text>
                                        <Text >{r[1].text} - </Text>
                                        <Text style={{ flexWrap: 'wrap' }}>{r[2].text}</Text>
                                    </View>)
                            }
                        </View>
                    ))}
                    </AccordionItem>
                )}
            </View></ScrollView>
    }
}

export default NoteTab

function useCreatNoteFolder(pk, bcv) {
    const [error, setError] = useState(null);
    const [dataToRead, setDataToRead] = useState(null);
    const [loading, setLoading] = useState("En train de chercher les notes");

    useEffect(() => {
        const fetchData = async () => {
            try {
                await createFolderIfNotExists('note');
                await createFolderIfNotExists(`note/${bcv.book}`);
                await createFolderIfNotExists(`note/${bcv.book}/${bcv.chapter}`);
                await createFolderIfNotExists(`note/${bcv.book}/${bcv.chapter}/${bcv.verse}`);
                await getAllInDirectory('assets').then(result => {
                    let Idn = []
                    result.map(pTitle => {
                        packJSON.pack.filter(p => p.title === pTitle.split('_').join(" ")).map(pack => {
                            pack.Notes.map(n => {
                                if (Idn.indexOf(n) < 0) {
                                    Idn.push(n)
                                }
                            })
                        })
                    })
                    console.log('change', Idn)
                    setDataToRead(pk.gqlQuerySync(`{ docSets(ids: [${Idn.map(id => `"${id}"`)}]){
                        tags
                        documents {
                        tableSequences {
                        rows(matches: [{colN:0,matching:"${bcv.book} ${bcv.chapter}:${bcv.verse}"}], columns: [0,1,3]) {
                        text
                    }
                            }
                        }
                    }}`))
                })



            } catch (error) {
                setError(error);
            }
            setLoading(null);


        };

        fetchData();

    }, []);

    return { error, dataToRead, loading };
}




