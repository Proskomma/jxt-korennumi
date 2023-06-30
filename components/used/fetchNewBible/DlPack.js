import { useEffect, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { ScrollView, Text, View } from "react-native";
import { deleteAssetsFolder, createFileIfNotExists, createFolderIfNotExists, crea, getAllInDirectory, getFilesInDirectory, createFolder, getContentOfFile, createAssetsFolder, creatFileInFolder } from "./BibleManipulationFunction";



function useFetchPackFromServer(dataToFetch, client) {
    const [error, setError] = useState(null)
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState("Telechargement des bibles depuis internet")
    createFolderIfNotExists('assets').then(result => {
        console.log(result);
        createFolderIfNotExists(`assets/${dataToFetch.title.split(" ").join("_")}`)
        for (var i = 0; i < dataToFetch.items.length; i++) {

            FetchBibleFromServer(dataToFetch.items[i], client, dataToFetch.title.split(" ").join("_"))


        }
        setLoading("Parsing des donnees")
    })

    // console.log({ error, data, loading })
    return { error, data, loading }

}
function FetchBibleFromServer(bibleData, client, title) {


    client.query({
        query: gql`
            {
                localEntry(source: "${bibleData.source}", id: "${bibleData.id}", revision: "${bibleData.revision}") {
                  canonResource(type: "succinct") {
                    content
                  }
                }
              }
        
          `
    }).then(result => {
        createFileIfNotExists(`assets/${title}/${bibleData.source}_${bibleData.id}_${bibleData.revision}`, JSON.stringify(result))
    }

    )



}
export function DLpack({ navigation, route }) {
    const client = useApolloClient()
    const [source] = useState(route.params.source);
    const { error, data, loading } = useFetchPackFromServer(source, client)
    if (loading) {
        return <Text>{loading}.</Text>
    }
    if (error) {
        return <Text>error</Text>
    }

    return <Text>good !!</Text>
}