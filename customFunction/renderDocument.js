import SofriaRenderFromProskomma from '../components/used/SofiraRenderFromProskommaNew';
import sofria2WebActions from '../renderer/sofria2web';
import { renderers } from '../renderer/render2reactNative';

export default function renderDoc(documentResult, pk, livre, bible, keyOfSurligne) {
    let output = {};
    let workspace = { textRef: `${bible}_${livre}_`, keyOfSurligne: keyOfSurligne };
    let context = {};

    if (documentResult) {
        const renderer = new SofriaRenderFromProskomma({
            proskomma: pk,
            actions: sofria2WebActions,
        });
        const state = 'begin';
        const config = {
            showWordAtts: false,
            showTitles: true,
            showHeadings: true,
            showIntroductions: true,
            showFootnotes: true,
            showXrefs: true,
            showParaStyles: true,
            showCharacterMarkup: true,
            showChapterLabels: true,
            showVersesLabels: true,
            selectedBcvNotes: [],
            displayPartOfText: { state },
            renderers,
        };

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
