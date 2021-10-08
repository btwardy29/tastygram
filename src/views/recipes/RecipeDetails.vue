<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="recipe" class="recipe-details">
    <!-- recipe information -->
    <div class="recipe-info">
      <div class="cover">
        <img :src="recipe.coverUrl">
      </div>
      <h2>{{ recipe.title }}</h2>
      <p class="username">Created by {{ recipe.userName }}</p>
      <p class="description">{{ recipe.titleDescription }}</p>
      <div class="types">
        <span class="small-pills" v-for="type in recipe.typeOfDishes" :key="type" >
          {{ type }}
        </span>
      </div>
      <button v-if="ownership" @click="handleDelete">Delete recipe</button>
      <Rating :recipeId="recipeId" />
      <Favorite :recipeId="recipeId" @removeFav="removeFav" :key="randomVal"/>
    </div>
    <div class="song-list">
      <h2>Ingredients</h2>
      <ul>
      <div v-for="ingredient in recipe.ingredients" :key="ingredient">
        <li>{{ingredient}}</li>
      </div>
      </ul>
      <h2>Preparation:</h2>
      <p>{{ recipe.description }}</p>
      <h2>Comments</h2>
      <CommentsList :recipeId="recipeId" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import getDocument from '../../composables/getDocument'
import getUser from '../../composables/getUser'
import useDocument from '../../composables/useDocument'
import useStorage from '../../composables/useStorage'
import { useRouter } from 'vue-router'
import CommentsList from '../../components/CommentsList.vue'
import Rating from '../../components/Rating.vue'
import Favorite from '../../components/Favorite.vue'
import { provide } from 'vue'


export default {
  props: ['id'],
  
  components: { CommentsList, Rating, Favorite }, 
    setup(props) {
    const randomVal = ref(1)
    const { error, _document:recipe } = getDocument('recipes', props.id)
    const { user } = getUser()
    const { deleteDocument, updateDocument } = useDocument('recipes', props.id)
    const { deleteImage } = useStorage()
    const router = useRouter()
    const recipeId = props.id
    provide('recipeId', recipeId)
    const ownership = computed(() => {
      return user.value && recipe.value && user.value.uid == recipe.value.userId
    })

    const handleDelete = async () => {
      await deleteImage(recipe.value.filePath)
      await deleteDocument()
      router.push({ name: 'Home' })
    }

    const handleClick = async (id) => {
      const filteredSongs = recipe.value.songs.filter(song => song.id !== id)
      await updateDocument({
        songs: filteredSongs
      })
    }

    const removeFav = () => {
      randomVal.value = !randomVal.value
    }

    return { error, recipe, user, ownership, handleDelete, handleClick, recipeId, randomVal, removeFav }
  },
}
</script>

<style scoped>
 .recipe-details {
    width: 95%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 100%;
    max-height: 200%;
  }
  .recipe-info {
    text-align: center;
  }
  .recipe-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .recipe-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
  ul {
    list-style: none;
    padding: 10px 0;
  }

  ul li:before {
    content: '✓';
    padding: 0 15px;
  }
  li {
    margin: 15px 0;
  }
  p {
    margin: 15px 0;
  }
  .small-pills {
    background: var(--secondary);
    border-radius: 500px;
    padding: 8px 12px;
    font-weight: 600;
    display: inline-block;
    padding: 5px;
    margin: 5px;
    font-size: 10px;
  }
  .types {
    display: block;
  }

</style>