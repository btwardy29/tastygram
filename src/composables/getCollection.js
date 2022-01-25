import { ref, watchEffect } from 'vue'
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'
import { projectFirestore } from '../firebase/config'


const getCollection = (_collection, _query) => {
  const documents = ref(null)
  const error = ref(null)

  const collectionRef = collection(projectFirestore, _collection)
  let q = query(collectionRef, orderBy('createdAt', 'desc'))

  if(_query) {
    q = query(collectionRef, orderBy('createdAt', 'desc'), where(..._query))
  }

  const unsub = onSnapshot(q, (snap) => {
    const results = []
    snap.docs.forEach(doc => {
      doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
    })
    documents.value = results
    error.value = null
  }, (err) => {
    documents.value = null
    error.value = 'Could not fetch data.'
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents, error }
  
}

export default getCollection