<template>
  <div>
    <div v-for="comment in comments" :key="comment.id" class="dashed-line">
      <SingleComment :comment="comment" :recipeId="recipeId" />
    </div>
    <div>
      <button v-if="!commentForm" @click="handleToggle">Add coment</button>
      <div v-else>
        <AddComment @closeAddComment='handleToggle'/>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import SingleComment from '../components/SingleComment.vue'
import AddComment from '../components/AddComment.vue'
import { ref } from '@vue/reactivity'

export default {
  props: ['recipeId'],
  components: { SingleComment, AddComment },
  setup(props) {
    const { documents:comments, error } = getCollection(`comments/${props.recipeId}/comments`)
    const commentForm = ref(false)

    const handleToggle = () => {
      commentForm.value = !commentForm.value
    }

    return { comments, error, handleToggle, commentForm }
  }
}
</script>

<style>
  .dashed-line {
    border-bottom: 1px lightgray dashed
  }
  .dashed-line:nth-last-child(2) {
    border-bottom: none;
  }
</style>