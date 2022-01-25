<template>
  <div class="user-recipes">
    <h2>Favorite Recipes</h2>
    <div v-if="recipes && recipes.length">
      <ListView :recipes="recipes" />
    </div>
    <div v-else>
      <p class="warning">You don't have any favorite recipes 😔💔 Maybe add some...?</p>
      <router-link :to="{name: 'CreateRecipe'}" class="btn">Create a new Recipe</router-link>
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'
import ListView from '../../components/ListView.vue'

export default {
  components: { ListView },
  setup() {
    const { user } = getUser()
    const { documents: recipes } = getCollection(
      'favorites',
      ['userId', '==', user.value.uid] 
    )

    return { recipes }
  }
  

}
</script>

<style scoped>
  .warning {
    padding: 20px 0;
  }
</style>