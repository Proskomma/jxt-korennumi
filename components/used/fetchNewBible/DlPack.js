import { useEffect, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { Text } from "react-native";
import { createFileIfNotExists, getContentOfFileJeSaisPas, createFolderIfNotExists, getAllInDirectory } from "./BibleManipulationFunction";
import * as FileSystem from 'expo-file-system';
const succint231 = require('../../../succinct/fnT.json')
function useFetchPackFromServer(dataToFetch, client) {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState("Debut du telechargement");

    useEffect(() => {
        const fetchData = async () => {
            try {
                await createFolderIfNotExists('assets');
                await createFolderIfNotExists(`assets/${dataToFetch.title.split(" ").join("_")}`);
                setData(dataToFetch.initalText.split('/'))
                setLoading("Telechargement des bibles depuis internet");
                for (var i = 0; i < dataToFetch.items.length; i++) {
                    console.log(`telechargement de l'objet ${i}`)
                    await fetchBibleFromServer(dataToFetch.items[i], client, dataToFetch.title.split(" ").join("_"));
                }


            } catch (error) {
                setError(error);
            }
            setLoading(null);


        };

        fetchData();

    }, [dataToFetch, client]);

    return { error, data, loading };
}

function fetchBibleFromServer(bibleData, client, title) {
    return client
        .query({
            query: gql`
          {
            localEntry(source: "${bibleData.source}", id: "${bibleData.id}", revision: "${bibleData.revision}") {
              canonResource(type: "succinct") {
                content
              }
            }
          }
        `,
        })
        .then(async (result) => {
            console.log(JSON.stringify(result.data.localEntry.canonResource.content).slice(0, 20));
            await createFileIfNotExists(`assets/${title}/${bibleData.source}_${bibleData.id}_${bibleData.revision}`, JSON.stringify(result.data.localEntry.canonResource.content));
        });
}
export const useParseAssetsFolder = ({ pk }) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState("Parsing");
    const [t, setT] = useState(2);

    useEffect(() => {
        const ParseForPk = async () => {
            try {
                const result = await getAllInDirectory('assets');
                for (const folder of result) {
                    const resultInFolder = await getAllInDirectory(`assets/${folder}`);
                    for (const text of resultInFolder) {
                        console.log(`assets/${folder}/${text}`);
                        const content = await getContentOfFileJeSaisPas(`assets/${folder}/${text}`);
                        const succinct = JSON.parse(content);
                        await pk.loadSuccinctDocSet(succinct);
                        setT((prevT) => prevT - 1);
                    }
                }
            } catch (error) {
                setError(error);
            }
        };

        ParseForPk();
    }, []);

    useEffect(() => {
        if (t === 0) {
            setLoading(null);
            setData('parsed')
            pk.loadSuccinctDocSet(succint231)

        }
    }, [t]);

    return { error, loading, data };
}
export function DLpack({ navigation, route }) {
    const client = useApolloClient();
    const [source] = useState(route.params.source);
    const { error, data, loading } = useFetchPackFromServer(source, client);

    if (loading) {
        return <Text>{loading}.</Text>;
    }

    else if (error) {
        return <Text>{error.toString()}</Text>;
    }
    else {


        console.log(data)
        navigation.navigate('ParseTab', { initialText: data, pk: route.params.pk })
    }
}
