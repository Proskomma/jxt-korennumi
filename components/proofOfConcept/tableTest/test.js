import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Col, Cols, Cell } from 'react-native-reanimated-table';

export default class ExampleFive extends Component {
  constructor(props) {
    super(props);
    const elementButton = (value) => (
      <TouchableOpacity onPress={() => this._alertIndex(value)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );

    this.state = {
      tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
      tableData: [
        [elementButton('1'), 'a', 'b', 'c', 'd'],
        [elementButton('2'), '1', '2', '3', '4'],
        [elementButton('3'), 'a', 'b', 'c', 'd']
      ]
    };
  }

  _alertIndex(value) {
    Alert.alert(`This is column ${value}`);
  }

  render() {
    const test = [<Cell data={<View><Text>caca</Text></View>}></Cell>,
    <Cell data="2"></Cell>,
    <Cell data="3"></Cell>]
    console.log(test)
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table style={{ flexDirection: 'column' }} borderStyle={{ borderWidth: 1 }}>
          
          <TableWrapper style={{ flexDirection: 'row' }}>
            {test}
          </TableWrapper>
          <TableWrapper style={{ flexDirection: 'row' }}>
            <Cell data="4"></Cell>
            <Cell data="5"></Cell>
            <Cell data="6"></Cell>
          </TableWrapper>
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
  head: { flex: 1, backgroundColor: '#c8e1ff' },
  title: { flex: 2, backgroundColor: '#f6f8fa' },
  titleText: { marginRight: 6, textAlign: 'right' },
  text: { textAlign: 'center' },
  btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center' }
});
