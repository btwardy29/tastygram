import { ref, watchEffect } from 'vue'
import { onSnapshot, doc } from 'firebase/firestore'
import { projectFirestore } from '../firebase/config'


const getDocument = (_collection, id) => {
  const _document = ref(null)
  const error = ref(null)

  const documentRef = doc(projectFirestore, _collection, id)
  const unsub = onSnapshot(documentRef, (doc) => {
    if(doc.data()) {
      _document.value = { ...doc.data(), id: doc.id }
      error.value = null
    } else {
      error.value = 'That document does not exist.'
    }
  }, (err) => {
    console.log(err.message)
    error.value = 'Could not fetch data.'
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { _document, error }
  
}

export default getDocument