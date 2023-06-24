import { useState, useEffect } from 'react';
import SofriaRenderFromProskomma from '../components/used/SofiraRenderFromProskommaNew';
import sofria2WebActions from '../renderer/sofria2web';
import { renderers } from '../renderer/render2reactNative';

function useRenderDocument(documentResult, pk, setData, livre, bible) {
    const [output, setOutput] = useState({})
    let workspace = { textRef: `${bible}_${livre}_` }
    let context = {}
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
            setData(output.paras.slice(0, 20))
        }
    }, [documentResult])
    return output
}

export { useRenderDocument }