
let queryOneChapterOfOneDocSets = `
{
  document(docSetId: "%docSetId%" withBook: "%bookCode%"){
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