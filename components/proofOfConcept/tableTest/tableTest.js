
import SofriaRenderFromProskomma from '../../used/SofiraRenderFromProskommaNew';
import sofria2WebActions from '../../../renderer/sofria2web';
import { renderers } from '../../../renderer/render2reactNative';

function Tabletest({ pk }) {

  
  let documentQuery = `
  {
    documents {
      docSetId
      id
      
    }
  }`
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
    //block: { nb: 1 },
    //chapters: [`${documentResult.data.document.cIndexes.shift().chapter}`],
    selectedBcvNotes: [],
    //displayPartOfText: { state },
    bcvNotesCallback: (bcv) => {
      setBcvNoteRef(bcv);
    },
    renderers,
  };
    let documentResult = pk.gqlQuerySync(documentQuery)
    documentResult = documentResult.data.documents.filter(d => d.docSetId === '1_web_0')[0]

    const renderer = new SofriaRenderFromProskomma({
        proskomma: pk,
        actions: sofria2WebActions,
    });

    const output = {};
    const context = {};
    const workspace = {};

    renderer.renderDocument1({
      docId: documentResult.id,
      config,
      context,
      workspace,
      output,
    });

    return(output.paras)
}  
export {Tabletest}