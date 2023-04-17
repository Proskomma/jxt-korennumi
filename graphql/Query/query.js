
let queryOneChapterOfOneDocSets = `
{
  document(docSetId: "%docSetId%" withBook: "%bookCode%"){
    id
}}`
export { queryOneChapterOfOneDocSets };