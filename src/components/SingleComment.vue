<template>
<div class="comment-style" v-if="!isEdited">
  <div>
    <h4>{{ comment.author }}</h4>
    <h5>{{ timeAgo }}</h5>
    <p>{{ comment.content }}</p>
  </div>
  <div v-if="ownership">
    <div v-if="!modal">
      <button @click="handleToggleEdit">Edit</button>
      <button @click="handleToggleModal">Delete</button>
    </div>
    <div v-else>
      <button @click="handleDeleteComment">Are you sure?</button>
    </div>
  </div>
</div>
<div v-else class="comment-style">
  <input type="text" v-model="commentContent">
  <button @click="handleEditComment">Save changes</button>
</div>
</template>

<script>
import getUser from '../composables/getUser'
import { formatDistanceToNow } from 'date-fns'
import { computed } from 'vue'
import useDocument from '../composables/useDocument'
import { ref } from 'vue'
export default {
  props: ['comment', 'recipeId'],
  setup(props) {
    const commentContent = ref(props.comment.content)
    
    const modal = ref(false)
    const isEdited = ref(false)
    const { user } = getUser()
    const { deleteDocument, updateDocument } = useDocument(`comments/${props.recipeId}/comments`, props.comment.id)
    let timeAgo = ''
    const date = props.comment.createdAt.toDate()
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
    const ownership = computed(() => {
      return user.value && props.comment && user.value.uid == props.comment.userId
    })

    const handleDeleteComment = async () => {
      await deleteDocument()
    }
    
    const handleEditComment = async () => {
      const update = {
        ...props.comment,
        content: commentContent.value
      }
      await updateDocument(update)
      handleToggleEdit()
    }

    const handleToggleEdit = () => {
      isEdited.value = !isEdited.value
    }
    
    const handleToggleModal = () => {
      modal.value = !modal.value
      setTimeout(() => {
        modal.value = !modal.value
      }, 2000)
    }

    return { 
      ownership, 
      commentContent, 
      timeAgo, 
      handleDeleteComment, 
      handleToggleModal,
      handleEditComment, 
      modal, 
      isEdited, 
      handleToggleEdit}
  }
}
</script>

<style scoped>
  .comment-style {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    border-radius: 3px;
    /* border-left: 3px lightgray solid; */
    margin: 0px 10px;
    padding: 20px 0;
    
  }
  h5 {
    font-style: italic;
    color:rgb(148, 148, 148);
    font-weight: 400;
    padding: 4px 15px;
  }

  input {
  border: none;
  width: 100%;
  }
</style>