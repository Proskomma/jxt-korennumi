
let queryOneDocument = `
{
  document(docSetId: "%docSetId%" withBook: "%bookCode%"){
    id
    cIndexes {
      chapter
    }
}}
`
export { queryOneDocument };