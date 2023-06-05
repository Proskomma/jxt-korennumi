import { useState, View } from "react"
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';

library.add(faGear);

const TrucAutre = ({ pk, flatListRef }) => {
    const [bible, setBible] = useState('local_test_1')
    const [livre, setLivre] = useState('GEN')
    const [isActive, setIsActive] = useState(false)
    return (
        <View>
            <Text>oui</Text>
        </View>
    )
}

export default TrucAutre;
