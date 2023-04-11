
let queryOneChapterOfOneDocSets = `
{
  document(docSetId: "%docSetId%" withBook: "%bookCode%"){
    id
    cvIndex(chapter: %idChapter%) {
      chapter
      verses {      
        verse {
          verseRange
          text(normalizeSpace: true)
        }
      }
    }
  }
}`
export { queryOneChapterOfOneDocSets };