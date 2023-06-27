import { useState, } from "react"
import { View } from "react-native";
import { ReadingScreen } from "./ReadingScreen"
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';

library.add(faGear);

import ConfigDrawer from "./TextConfig/configDrawer"
function TextChanger({ pk }) {
    const [bible, setBible] = useState('local_fnT_1')
    const [livre, setLivre] = useState('TIT')
    const [isActive, setIsActive] = useState(false)
    const [truc, machin] = useState()
    return (
        <>
            <Button key={Math.random()} style={{ position: 'absolute', zIndex: 3 }}
                icon={() => <Icon name="gear" size={20} color="blue" />
                }
                onPress={() => setIsActive(true)} />
            <ConfigDrawer pk={pk} setIsActive={setIsActive} isActive={isActive} setBibleParent={setBible} bibleParent={bible} setLivreParent={setLivre} livreParent={livre} />
            <ReadingScreen livre={livre} bible={bible} pk={pk} />
        </>
    )
}

export default TextChanger