import { doc, deleteDoc, updateDoc } from '@firebase/firestore'
import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useDocument = (collection, id) => {
  const error = ref(null)
  const isPending = ref(false)


  let docRef = doc(projectFirestore, collection, id)


  const deleteDocument = async () => {
    isPending.value = true
    error.value = null
    try {
      const res = await deleteDoc(docRef)
      isPending.value = false

      return res

    } catch(err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'Could not delete the document.'
    }
    
  }
  const updateDocument = async (updates) => {
    isPending.value = true
    error.value = null
    try {
      const res = await updateDoc(docRef, updates)
      isPending.value = false

      return res

    } catch(err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'Could not update the document.'
    }
    
  }

  return { error, isPending, deleteDocument, updateDocument }
}

export default useDocument