import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { renderStyles as rs, ConvertCssToReactNativeStyle } from './renderStyles';
import { StyleSheet } from 'react-native';
import { Table, Cell, TableWrapper } from 'react-native-reanimated-table';


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
    text: (text, id) => { ; return (<View key={`text_${Math.random()}`} style={{ paddingTop: 20 }}><Text >{text}</Text></View>) },
    chapter_label: number => <View key={Math.random()} ><Text style={{
        ...getStyles('marks', "chapter_label"),
    }}>{number}</Text></View>,
    verses_label: (number, bcv, bcvCallback) =>
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
            <View key={Math.random()} style={{ flexDirection: 'row', paddingTop: 10 }}>
                <Text style={{
                    ...getStyles('marks', "verses_label"),
                    marginRight: 10,
                }}>
                    {number}</Text></View>
    ,
    paragraph: (subType, content, footnoteNo) => {
        let TitleContent = {};

        if (["usfm:mt", "usfm:s"].includes(subType)) {
            const updatedContent = content.map((element, index) => {
                const updatedChildren = React.Children.map(element.props.children, (child, childIndex) => {
                    return React.cloneElement(child, { style: { ...getStyles('paras', subType), display: 'flex', flexDirection: 'column', key: `title_subTitle_${index}_${childIndex}` } });
                });
                return React.cloneElement(element, { key: element.key || `parent_${index}` }, updatedChildren);
            });
            TitleContent = updatedContent;
        }
        return (

            ["usfm:f", "usfm:x"].includes(subType) ?
                <InlineElement
                    key={`inline${Math.random()}`}
                    style={getStyles('paras', subType)}
                    linkText={subType === "usfm:f" ? `${footnoteNo}` : "*"}
                >
                    {content}
                </InlineElement> :
                ["usfm:mt", "usfm:s"].includes(subType) ?
                    <View key={`title ${Math.random()} `} style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start', }}>{TitleContent}</View> :
                    <View key={`title ${Math.random()} `} style={{ ...getStyles('paras', subType), flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start' }}>
                        {content}
                    </View>


        )
    },

    wrapper: (atts, subType, content) => {
        const updatedContent = content.map((element, index) => {
            return React.cloneElement(element, { style: { paddingTop: 0 }, key: `wrapper_content_${index} ` });
        });
        if (["usfm:f", "usfm:ft", "usfm:fr"].includes(subType)) {
            return (<View key={`wrapper_${Math.random()}`} style={{ ...getStyles('wrappers', subType), flexDirection: 'row' }}>{updatedContent}</View>)

        }
        return (
            subType === 'cell' ?
                atts.role === 'body' ?
                    <Cell key={`cell_${Math.random()}`} textStyle={{ textAlign: atts.alignment }}
                        data={updatedContent} />
                    :
                    <Cell key={`cell_${Math.random()}`} textStyle={{ fontWeight: 'bold', textAlign: atts.alignment }} data={updatedContent} />
                :
                <View key={`wrapper_${Math.random()}`} style={getStyles('wrappers', subType)}>{updatedContent}</View>)
    },
    wWrapper: (atts, content) => Object.keys(atts).length === 0 ?
        content :

        <View key={Math.random()}
            style={{
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center'


            }}
        >
            <Text>{content}</Text>
            {
                Object.entries(atts).map(
                    a =>
                        <Text key={`wWrapper_${Math.random()}`}
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
    table: (content) => <View key={Math.random()} style={{ flex: 1 }}><Table borderStyle={{ borderWidth: 1 }} style={{ flexDirection: "column" }}>{content}</Table></View>,
    row: (content) => <TableWrapper key={Math.random()} style={{ flexDirection: "row" }}>{content}</TableWrapper>
}

export { renderers };
