import { Text, Checkbox } from 'react-native-paper';
import { useCallback, useState } from 'react';
import { View, FlatList } from 'react-native';
import { memo } from 'react';
import { set } from 'lodash';
const CheckboxMe = memo(({ num, checked, setChecked }) => {
  
    const handleCheckboxPress = useCallback(() => {
      setChecked(prevChecked => !prevChecked);
    }, [setChecked]);
  
    return (
      <View style={{ flexDirection: 'column', width: 50 }}>
        <Text style={{ alignSelf: 'center' }}>{num}</Text>
        <View style={{ alignSelf: 'center' }}>
          <Checkbox
            style={{ alignSelf: 'center' }}
            value={num}
            status={checked ? 'checked' : 'unchecked'}
            onPress={handleCheckboxPress}
          />
        </View>
      </View>
    );
  });
  
export { CheckboxMe }
