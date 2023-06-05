import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

library.add(faChevronDown)
library.add(faCircleChevronUp)
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  accordContainer: {
    padding: 10,
    width: '70%',


  },
  accordHeader: {
    padding: 12,
    backgroundColor: 'ghostwhite',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey'
  },
  accordHeaderDisplay: {
    padding: 12,
    backgroundColor: 'ghostwhite',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

  },
  accordHeaderDisable: {
    padding: 12,
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey'

  },
  accordTitle: {
    fontSize: 20,
  },
  accordBody: {
    padding: 12,
    backgroundColor: 'ghostwhite',
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0
  },
  textSmall: {
    fontSize: 16
  },
  seperator: {
    height: 12
  }
});


function AccordionItem({ children, title, disable }) {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (disable) {
      setExpanded(false)
    }
  }, [disable]);
  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{children}</View>;

  return (
    disable ?
      <View style={styles.accordContainer}>
        <View style={styles.accordHeaderDisable}>
          <Text style={styles.accordTitle}>{title}</Text>
          <FontAwesomeIcon icon={expanded ? faChevronDown : faCircleChevronUp} size={20} color="black" />
        </View></View>
      :
      <View style={styles.accordContainer}>
        <TouchableOpacity style={expanded ? styles.accordHeaderDisplay : styles.accordHeader} onPress={toggleItem}>
          <Text style={styles.accordTitle}>{title}</Text>
          <FontAwesomeIcon icon={expanded ? faChevronDown : faCircleChevronUp} size={20} color="black" />
        </TouchableOpacity>
        {expanded && body}
      </View>
  );
}

export default AccordionItem;
