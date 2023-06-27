import { useState, useEffect } from 'react';


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


export { useDocumentQuery }