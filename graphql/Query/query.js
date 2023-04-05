let queryVC = `query Documents{
    docSet(id:  "local_lsg_1") {
    documents {
      cvIndex(chapter: [%idChapter%]) {
        chapter
        verses {
          verse {
            verseRange
            text(normalizeSpace: true)
          }
        }
      }
    }
  }
  
  }`;

export { queryVC };