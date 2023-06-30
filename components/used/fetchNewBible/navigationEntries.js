import { createStackNavigator } from "@react-navigation/stack";
import { DLpack } from "./DlPack";
import { AddingPack } from "./ShowPack";
import { EnteringTab } from "./EnteringTab";
import { deleteAssetsFolder } from "./BibleManipulationFunction";
export default function EntriesScreen() {
    deleteAssetsFolder()
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Selection de Pack">
            <Stack.Screen name="Telechargement de Pack" component={DLpack} />
            <Stack.Screen name="Selection de Pack" component={AddingPack} />
            <Stack.Screen name="Home Tab" component={EnteringTab} />
        </Stack.Navigator>
    );
}