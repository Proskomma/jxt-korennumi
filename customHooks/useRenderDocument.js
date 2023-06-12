import { useState, useEffect } from 'react';
import SofriaRenderFromProskomma from '../components/used/SofiraRenderFromProskommaNew';
import sofria2WebActions from '../renderer/sofria2web';
import { renderers } from '../renderer/render2reactNative';

function useRenderDocument(documentResult, pk, setData) {
    const [output, setOutput] = useState({})
    useEffect(() => {
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
                bcvNotesCallback: (bcv) => {
                    setBcvNoteRef(bcv);
                },
                renderers,
            };

            try {

                renderer.renderDocument({
                    docId: documentResult.data.document.id,
                    config,
                    output,
                });

            } catch (err) {
                console.log("Renderer", err);
                throw err;
            }
            setData(output.paras.slice(0, 7))
        }
    }, [documentResult])
    return output
}

export { useRenderDocument }