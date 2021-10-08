import { ref, watchEffect } from 'vue'
import { collection, query, onSnapshot, where, doc } from 'firebase/firestore'
import { projectFirestore } from '../firebase/config'


const getRating = (_collection, recipeId, userId) => {
  const avgMark = ref(null)
  const markCount = ref(null)
  const myMark = ref(null)
  const error = ref(null)
  const docId = `${userId}_${recipeId}`

  const collectionRef = collection(projectFirestore, _collection)
  let q = query(collectionRef, where('recipeId', '==', recipeId))

  const unsub = onSnapshot(q, (snap) => {
    const results = []
    const ratings = []
    snap.docs.forEach(doc => {
      results.push(doc.data())
    })
    results.map(res => ratings.push(res.mark))
    avgMark.value = ratings.reduce((a,b) => a+b) / ratings.length
    markCount.value = ratings.length
    error.value = null
  }, (err) => {
    console.log(err.message)
    avgMark.value = null
    error.value = 'Could not fetch data.'
  })

    const documentRef = doc(projectFirestore, _collection, docId)
    const unsub2 = onSnapshot(documentRef, (doc) => {
    if(doc.data()) {
      myMark.value = doc.data().mark
      error.value = null
    } else {
      error.value = 'That document does not exist.'
    }
    console.log(myMark.value)
  })
  
  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      unsub()
      unsub2()
    });
  });

  return { avgMark, error, myMark, markCount }
  
}

export default getRating