import AsyncStorage from '@react-native-async-storage/async-storage';





async function storeDataInApp(key, data) {
    // Store JSON data at the specified key
    try {
        const jsonData = JSON.stringify(data);
        console.log(jsonData)
        await AsyncStorage.setItem(`@MyApp:${key}`, jsonData);
        //console.log('Data stored successfully.');
    } catch (error) {
        console.log('Error storing data:', error);
    }
}



async function retrieveData(key) {
    // Fetch JSON data at the specified key
    try {
        const jsonData = await AsyncStorage.getItem(`@MyApp:${key}`);
        console.log(key)
        console.log(await AsyncStorage.getAllKeys())
        if (jsonData !== null) {
            const data = JSON.parse(jsonData);
            //console.log(`Data retrieved from ${key}.`);
            return data;
        } else {
            //console.log(`No data found at ${key}.`);
            return null;
        }
    } catch (error) {
        console.log('Error retrieving data:', error);
        return null;
    }
}
async function retrieveNote(key, noteName) {
    //fetch note at key position with the name noteName
    const data = await retrieveData(key)
    const note = data.filter(d => d.name === noteName)
    return note[0]

}

function clearAll() {
    //clear all saved data
    const clearAllData = async () => {
        try {
            await AsyncStorage.clear();
            //console.log('All data removed successfully');
        } catch (error) {
            console.log('Error removing data:', error);
        }
    };
    clearAllData()
}
function removeDataWithKey(key) {
    //remove data a key position
    const removeData = async () => {
        try {
            await AsyncStorage.removeItem(key); // Replace 'key' with the actual key you want to remove
            //console.log('Value removed successfully');
        } catch (error) {
            console.log('Error removing value:', error);
        }
    };
    removeData()

}

async function AddData(key, data) {
    //Push data to the array at key position
    let dataRetrieve = await retrieveData(key)

    dataRetrieve = dataRetrieve.filter(d => d.name !== data.name);

    await dataRetrieve.push(data)
    await storeDataInApp(key, dataRetrieve)

}


async function initNoteForBibleBook(bible, book, arrayNoteJson) {
    //init for later use
    const key_current = `${bible}_${book}_current`
    const key_array = `${bible}_${book}_array`

    await storeDataInApp(key_current, { name: "init", data: { 4: "1", 7: "7" } })
    await storeDataInApp(key_array, arrayNoteJson)

}

async function changerCurrentNote(bible, book, noteName) {
    const newNote = await retrieveNote(`${bible}_${book}_array`, noteName)
    const current = await retrieveData(`${bible}_${book}_current`)


    await AddData(`${bible}_${book}_array`, current)
    await storeDataInApp(`${bible}_${book}_current`, newNote)


}
async function addNoteToWord(key, Id, text) {
    console.log(key)
    console.log(text)
    let dataRetrieve = await retrieveData(key)
    dataRetrieve.data[Id] = text
    await storeDataInApp(key, dataRetrieve)
    console.log('done')
}

async function init(bible, livre) {

    await clearAll()
    await initNoteForBibleBook(bible, livre, [{ name: "init", data: { 4: "1", 7: "7" } }, { name: "1", data: { 26: "premier note", 7: "7" } }, { name: "2", data: { 4: "deuxieme note" } }])
    await changerCurrentNote(bible, livre, "1")
}
export { addNoteToWord, init, changerCurrentNote, initNoteForBibleBook, retrieveData, clearAll }