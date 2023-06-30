import SofriaRenderFromProskomma from '../components/used/SofiraRenderFromProskommaNew';
import sofria2WebActions from '../renderer/sofria2web';

export default function renderDoc(documentResult, pk, livre, bible, keyOfSurligne, textNumber, option) {
    let output = {};
    let workspace = { textRef: `${bible}_${livre}_$${textNumber}`, textNumber: textNumber, keyOfSurligne: keyOfSurligne };
    let context = {};
    let config = option
    if (documentResult) {
        const renderer = new SofriaRenderFromProskomma({
            proskomma: pk,
            actions: sofria2WebActions,
        });
        try {
            renderer.renderDocument1({
                docId: documentResult.data.document.id,
                config,
                output,
                workspace,
                context,
            });
        } catch (err) {
            console.log("Renderer", err);
            throw err;
        }
    }

    return output;
}
