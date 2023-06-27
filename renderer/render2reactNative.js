import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { renderStyles as rs, ConvertCssToReactNativeStyle } from './renderStyles';
import { StyleSheet } from 'react-native';
import { Table, Cell, TableWrapper } from 'react-native-reanimated-table';
import { updateState } from '../components/used/personalNote/stateManager';
let convertedStyleSheet = ConvertCssToReactNativeStyle(rs);
const styles = StyleSheet.create(convertedStyleSheet);

const getStyles = (type, subType) => {
    if (!styles[type]) {
        throw new Error(`Unknown style type '${type}'`);
    }
    if (!styles[type][subType]) {
        console.log(`No styles for ${type}/${subType}`)
        return styles[type].default;
    }
    return { ...styles[type].default, ...styles[type][subType] };
}



function InlineElement(props) {
    const [display, setDisplay] = useState(false);
    const toggleDisplay = () => setDisplay(!display);
    if (display) {
        return <Text
            key={`Inline ${Math.random()} `}
            style={{
                marginLeft: '10%',
                marginRight: '10%',
                marginTop: '5%',
                marginBottom: '5%',
                backgroundColor: "#CCC",
                marginBottom: 16,
                borderWidth: 1,
                borderRadius: 4,
                width: '80%',
                flexDirection: 'row',


            }}
            onPress={toggleDisplay}
        >
            {props.children}

        </Text>
    } else {
        return <Text
            key={`Inline_${Math.random()}`}
            style={{
                verticalAlign: 'top',
                fontSize: 10,
                fontWeight: "bold",
                marginRight: 4,
                marginLeft: 4,
                marginTop: 15,
                padding: 2,
                backgroundColor: "#CCC"
            }}
            onPress={toggleDisplay}
        >
            {props.linkText}
        </Text>
    }
}
const renderers = {
    text: ({ word, idWord, workspace }) => {
        let styles = {}

        if (workspace.keyOfSurligne?.includes(idWord.toString())) {
            styles = { color: 'lightgrey' }
        }

        return (
            <View key={`text_${idWord}`} style={{ paddingTop: 20 }}>
                <Text
                    style={styles}
                    onPress={(event) => {
                        updateState([true, event, idWord, workspace.textNumber])
                    }}>
                    {word}
                </Text>
            </View>
        )
    },
    chapter_label: (number, id) => <View key={`chapter_label_${id}`} ><Text style={{
        ...getStyles('marks', "chapter_label"),
    }}>{number}</Text></View>,
    verses_label: (number, bcv, bcvCallback, id) =>
        bcv && bcv.length === 3 ?
            <Text
                onClick={() => bcvCallback(bcv)} style={{
                    ...getStyles('marks', "verses_label"),
                    textDecoration: "underline",
                    color: "#00D"
                }}
            >
                {number}
            </Text> :
            <View key={`versesLabel_${id}`} style={{ flexDirection: 'row', paddingTop: 10 }}>
                <Text style={{
                    ...getStyles('marks', "verses_label"),
                    marginRight: 10,
                }}>
                    {number}</Text></View>
    ,
    paragraph: (subType, content, footnoteNo, id) => {
        let TitleContent = {};

        if (["usfm:mt", "usfm:s"].includes(subType)) {
            const updatedContent = content.map((element, index) => {
                const updatedChildren = React.Children.map(element.props.children, (child, childIndex) => {
                    return React.cloneElement(child, { style: { ...getStyles('paras', subType), display: 'flex', flexDirection: 'column' }, key: `title_subTitle_${index}_${childIndex}` });
                });
                return React.cloneElement(element, { key: element.key || `parent_${index}` }, updatedChildren);
            });
            TitleContent = updatedContent;
        }
        return (

            ["usfm:f", "usfm:x"].includes(subType) ?
                <InlineElement
                    key={`paragraph_${id}`}
                    style={getStyles('paras', subType)}
                    linkText={subType === "usfm:f" ? `${footnoteNo}` : "*"}
                >
                    {content}
                </InlineElement> :
                ["usfm:mt", "usfm:s"].includes(subType) ?
                    <View key={`paraphraphe_${id} `} style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start', }}>{TitleContent}</View>
                    :
                    <View key={`parapgraphe_${id} `} style={{ ...getStyles('paras', subType), flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start' }}>
                        {content}
                    </View>


        )
    },

    wrapper: (atts, subType, content, id) => {
        const updatedContent = content.map((element, index) => {
            return React.cloneElement(element, { style: { paddingTop: 0 }, key: `wrapper_content_${index} ` });
        });
        if (["usfm:f", "usfm:ft", "usfm:fr"].includes(subType)) {
            return (<View key={`wrapper_${id}`} style={{ ...getStyles('wrappers', subType), flexDirection: 'row' }}>{updatedContent}</View>)

        }
        return (
            subType === 'cell' ?
                atts.role === 'body' ?
                    <Cell key={`cell_${id}`} textStyle={{ textAlign: atts.alignment }}
                        data={updatedContent} />
                    :
                    <Cell key={`cell_${id}`} textStyle={{ fontWeight: 'bold', textAlign: atts.alignment }} data={updatedContent} />
                :
                <View key={`wrapper_${id}`} style={getStyles('wrappers', subType)}>{updatedContent}</View>)
    },
    wWrapper: (atts, content, id) => Object.keys(atts).length === 0 ?
        content :

        <View key={`wWrapper_${id}`}
            style={{
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center'


            }}
        >
            <Text key={`Text_wWrapper_${id}`} >{content}</Text>
            {
                Object.entries(atts).map(
                    a =>
                        <Text key={`wWrapper_${id}`}
                            style={{
                                fontSize: 9,
                                fontWeight: "bold",
                                textAlign: 'center'

                            }}
                        >
                            {`${a[0]} = ${a[1]} `}
                        </Text>
                )
            }
        </View>,
    mergeParas: paras => paras,
    table: (content, id) => <View key={`table_${id}`} style={{ flex: 1 }}><Table borderStyle={{ borderWidth: 1 }} style={{ flexDirection: "column" }}>{content}</Table></View>,
    row: (content, id) => <TableWrapper key={`row_${id}`} style={{ flexDirection: "row" }}>{content}</TableWrapper>
}

export { renderers };
