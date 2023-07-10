import React, { useEffect } from 'react';
import AccordionItem from '../TextConfig/AccordionItem';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useParseAssetsFolder } from './DlPack';
// Assuming that packJson is an object with a "pack" property

function ParsingData({ navigation, route }) {
    const { error, data, loading } = useParseAssetsFolder({ pk: route.params.pk })
    if (loading) {
        return <Text>Parsing Data</Text>
    }
    if (data) {
        console.log(route.params.initialText)
        navigation.navigate("ReadTab", { initialText: route.params.initialText, pk: route.params.pk })
    }
}

export { ParsingData };