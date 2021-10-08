<template>
  <div class="add-comment">
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Your comment" v-model="comment">
      <span @click="handleSubmit" class="material-icons add-comment-btn">send</span>  
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useCollection from '../composables/useCollection'
import getUser from '../composables/getUser'
import { timestamp } from '../firebase/config'
import { inject } from '@vue/runtime-core'

export default {
  setup(props, context) {
    const recipeId = inject('recipeId')
    const { error, addDocument } = useCollection(`comments/${recipeId}/comments`)
    const comment = ref('')
    const { user } = getUser()

    const handleSubmit = async () => {
      if(comment.value !== '') {
        const res = await addDocument({
          author: user.value.email,
          content: comment.value,
          createdAt: timestamp,
          userId: user.value.uid,
        })
        context.emit('closeAddComment')
      }

    }
    
    return { handleSubmit, comment }
  }
}
</script>

<style scoped>
  .add-comment {
    width: 100%;
    margin: 0;
    padding: 10px 20px;
    width: auto;
    border-radius: 100px;
    background-color: white;

  }
  input {
    border: none;
    width: 100%;
  }
  input:focus {
    outline: none;
  }
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    margin: 0 0;
    padding: 0px;
    border-radius: 0;
    box-shadow: 0;
    border: 0;
    background: none;
  }
  .add-comment-btn {
    cursor: pointer;
  }
</style>