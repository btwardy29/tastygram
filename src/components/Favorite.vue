<template>
  <div class="main">
    <div class="btn-container">
       
      <button v-if="!favorite" class="fav-btn" @click="handleAdd" >
        Add to fav
        <span class="material-icons heart">favorite</span>
      </button>
      <button v-else class="fav-btn" @click="handleRemove" >
        Remove from fav
        <span class="material-icons heart">heart_broken</span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import getDocument from '../composables/getDocument'
import getUser from '../composables/getUser'
import useDocument from '../composables/useDocument'
import useCollection from '../composables/useCollection'
export default {
  props: ['recipeId'],
  setup(props, context) {
    const { user } = getUser()
    const favId = `${user.value.uid}_${props.recipeId}`
    const { _document: favorite } = getDocument('favorites', favId)
    const { deleteDocument } = useDocument('favorites', favId)
    const { setDocument } = useCollection('favorites')
    const randomVal = ref(1)
    const data = {
      userId: user.value.uid,
      recipeId: props.recipeId
    }
    const handleRemove = async () => {
      await deleteDocument()
      context.emit('removeFav')
    }
    
    const handleAdd = async () => {
      await setDocument(data, favId)
      randomVal.value -= 1
      
    }

    return { favorite, handleAdd, handleRemove, randomVal }
  }
}
</script>

<style scoped>

.main {
  display: flex;
  justify-content: center;
}
.fav-btn {
  display: flex;
  align-items: center;
}
button:hover span {
  color: var(--secondary)
}
.heart {
  font-size: 18px;
  padding-left: 5px;
}
</style>