import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'
import { addDoc, collection, setDoc, doc } from 'firebase/firestore'

const useCollection = (_collection) => {

  const error = ref(null)
  const isPending = ref(false)

  const addDocument = async (doc) => {
    error.value = null
    isPending.value = true

    try {
      const res = await addDoc(collection(projectFirestore, _collection), doc)
      isPending.value = false
      return res
    } catch(err) {
      console.log(err.message)
      error.value = 'Could not send message.'
      isPending.value = false
    }
  }

  const setDocument = async (data, docId) => {
    error.value = null
    isPending.value = true

    try {
      const res = await setDoc(doc(projectFirestore, _collection, docId), data)

      return res
    } catch(err) {
      console.log(err)
    }
  }

  return { error, addDocument, isPending, setDocument }
}

export default useCollection