import React, { useState, useCallback, useEffect } from 'react';


function useDocumentQuery(livre, bible, pk) {
    const [documentResult, setDocumentResult] = useState(null)
    useEffect(() => {
        let documentQuery = `
      {
        document(docSetId: "${bible}" withBook: "${livre}"){
          id
          cIndexes {
            chapter
          }
      }}
      `
        const documentResult = pk.gqlQuerySync(documentQuery)
        setDocumentResult(documentResult)
    }, [livre, bible])
    return documentResult
}

function useRenderDocument(documentResult, pk, renderers, SofriaRenderFromProskomma, sofria2WebActions, setData) {
    const [output, setOutput] = useState({})
    useEffect(() => {
        if (documentResult) {

            const renderer = new SofriaRenderFromProskomma({
                proskomma: pk,
                actions: sofria2WebActions,

            });
            console.log(renderer)
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

            console.time()
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
            console.timeEnd()
            setData(output.paras.slice(0, 5))
        }
    }, [documentResult])
    return output
}
export { useDocumentQuery, useRenderDocument }