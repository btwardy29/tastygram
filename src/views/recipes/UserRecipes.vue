<template>
  <div class="user-recipes">
   <h2>My Recipes</h2>
   <div v-if="recipes">
     <ListView :recipes="recipes" />
   </div>
   <router-link :to="{name: 'CreateRecipe'}" class="btn">Create a new Recipe</router-link>
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
      'recipes',
      ['userId', '==', user.value.uid] 
    )
    console.log(recipes)

    return { recipes }
  }
  

}
</script>

<style>

</style>