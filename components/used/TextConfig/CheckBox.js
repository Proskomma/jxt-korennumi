import { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

library.add(faCheckSquare);

const CheckboxMe = (() => {
  const [isCheck, setIsCheck] = useState(false)


  return (
    <TouchableOpacity style={{ borderWidth: 2, width: 24, height: 24, }} onPress={() => setIsCheck(!isCheck)}>

      {isCheck ? <View><FontAwesomeIcon icon={faCheckSquare} size={20} color="blue" /></View>
        : <></>}
    </TouchableOpacity>
  );
});

export { CheckboxMe }
