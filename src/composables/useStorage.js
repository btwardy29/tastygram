import { ref } from "vue"
import { projectFirestore, projectStorage } from "../firebase/config"
import getUser from '../composables/getUser'
import { getDownloadURL, uploadBytes, ref as reference, deleteObject } from "@firebase/storage"

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)
  const { user } = getUser()

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`
    const storageRef = reference(projectStorage, filePath.value)

    try {
      const res = await uploadBytes(storageRef, file)
      url.value = await getDownloadURL(reference(projectStorage, res.ref)) 
    } catch(err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  const deleteImage = async (path) => {
    const storageRef = reference(projectStorage, path)
    try {
      await deleteObject(storageRef)
    } catch(err) {
      console.log(err)
      error.value = err.messag
    }
  }

  return { url, filePath, error, uploadImage, deleteImage }
}

export default useStorage