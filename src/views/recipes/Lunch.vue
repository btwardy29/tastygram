<template>
  <div class="user-recipes">
    <h2>Lunch Recipes</h2>
    <div v-if="recipes">
      <ListView :recipes="recipes" />
    </div>
    <div v-else>
      <p class="warning">There's no recipe matching this criteria. Maybe add some...?</p>
      <router-link :to="{name: 'CreateRecipe'}" class="btn">Create a new Recipe</router-link>
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import ListView from '../../components/ListView.vue'

export default {
  components: { ListView },
  setup() {
    const { documents: recipes } = getCollection(
      'recipes',
      ['typeOfDishes', 'array-contains', 'Lunch'] 
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