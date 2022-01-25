<template>
  <form @submit.prevent="handleSubmit" class="recipe-form">
    <h4>Create New Recipe</h4>
    <!-- Title -->
    <input class="recipe-input" type="text" required placeholder="Recipe title" v-model="title">
    <!-- Title description -->
    <input class="recipe-input" type="text" required placeholder="Title description" v-model="titleDescription">
    <!-- Prep time -->
    <input class="recipe-input" type="number" required placeholder="Preparation time (in minutes)" v-model="prepTime">
    <!-- Difficulty -->
    <div class="difficulty-btns">
      <label class="radio-label">
        <input class="recipe-input" type="radio" v-model="difficulty" value="Easy">
        <span class="radio-btn">Easy</span>
      </label>
      <label class="radio-label">
        <input class="recipe-input" type="radio" v-model="difficulty" value="Medium">
        <span class="radio-btn">Medium</span>
      </label>
      <label class="radio-label">
        <input class="recipe-input" type="radio" v-model="difficulty" value="Hard">
        <span class="radio-btn">Hard</span>
      </label>
    </div>
    <!-- Ingredients -->
    <input class="recipe-input" 
      v-model="ingredient" 
      type="text"
      placeholder="Enter ingredients (separate with Enter key)"
      @keydown.enter.prevent="handleKeydown"
    >
      <div v-for="ingredient in ingredients" :key="ingredient" class="ingredient-pills" @click="handleDeleteIngredient(ingredient)">
        <p>{{ ingredient }}</p> <span class="material-icons delete-icon">clear</span>
      </div>
    <!-- Recipe -->
    <textarea required placeholder="Recipe description" v-model="description"></textarea>
    <!-- Type of dish -->
    <div class="difficulty-btns">
      <div  v-for="item in items" :key="item">
        <label class="radio-label">
          <input class="recipe-input" type="checkbox" v-model="typeOfDishes" :value="item">
          <span class="small-pills">{{ item }}</span>
        </label>
      </div>
    </div>
    <!-- Upload img -->
    <label>Upload Recipe image</label>
    <input  type="file" class="custom-file-input recipe-input" @change="handleChange">

    <div class="error">{{ fileError }}</div>
    <button v-if="!isPending">Create</button>
    <button v-else>Saving...</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '../../composables/useStorage'
import useCollection from '../../composables/useCollection'
import getUser from '../../composables/getUser'
import { timestamp } from '../../firebase/config'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const title = ref('')
    const titleDescription = ref('')
    const description = ref('')
    const prepTime = ref('')
    const difficulty = ref('Easy')
    const items = ref(['Breakfast', 'Lunch', 'Dinner', 'Supper', 'Dessert', 'Fastfood', 'Vege', 'Fit', 'Lactose-free', 'Gluten-free', 'Fish', 'Chicken', 'Beef', 'Pork'])
    const typeOfDishes = ref([])
    const file = ref(null)
    const fileError = ref(null)
    const { filePath, url, uploadImage } = useStorage()
    const { error, addDocument } = useCollection('recipes')
    const { user } = getUser()
    const isPending = ref(false)
    const router = useRouter()
    const ingredient = ref('')
    const ingredients = ref([])

    const handleDeleteIngredient = (id) => {
      ingredients.value = ingredients.value.filter(ingredient => ingredient !== id)
    }

    const handleKeydown = () => {
      if (!ingredients.value.includes(ingredient.value)) {
        ingredients.value.push(ingredient.value)
      }
      ingredient.value = ''
    }

    const handleSubmit = async () => {
      if(file.value) {
        isPending.value = true
        await uploadImage(file.value)
        const res = await addDocument({
          title: title.value,
          description: description.value,
          titleDescription: titleDescription.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          typeOfDishes: typeOfDishes.value,
          coverUrl: url.value,
          filePath: filePath.value,
          ingredients: ingredients.value,
          difficulty: difficulty.value,
          createdAt: timestamp
        })
        isPending.value = false
        if(!error.value) {
          router.push({ name: 'RecipeDetails', params: { id: res.id } })
        }
      }
    }

    const types = ['image/png', 'image/jpeg']

    const handleChange = (e) => {
      const selected = e.target.files[0]

      if(selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = null
      } else {
        file.value = null
        fileError.value = 'Please select and image file (png or jpeg).'
      }
    }

  return { 
    title,
    description,
    titleDescription,
    prepTime, 
    handleSubmit, 
    handleChange, 
    fileError, 
    isPending, 
    difficulty,
    typeOfDishes,
    items,
    ingredient,
    ingredients,
    handleKeydown,
    handleDeleteIngredient }
  }
}
</script>

<style scoped>
  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
  textarea {
    resize: vertical;
    min-height: 100px;
    margin-top: 10px !important;
    
  }
  /* HIDE RADIO */
[type=radio], [type=checkbox] { 
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* IMAGE STYLES */
[type=radio] + .radio-btn, [type=checkbox] + .radio-btn {
  cursor: pointer;
}

/* CHECKED STYLES */
[type=radio]:checked + .radio-btn, [type=checkbox]:checked + .small-pills {
  background: var(--primary);
  color: var(--secondary)
}

.difficulty-btns {
  display: flex;
  flex-wrap: wrap;
}
.radio-btn {
  background: var(--secondary);
  border-radius: 500px;
  padding: 8px 12px;
  font-weight: 600;
  display: inline-block;
}
.radio-label {
  margin-top: 0
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
  cursor: pointer;
}
.ingredient-pills {
  background: var(--secondary);
  border-radius: 500px;
  padding: 8px 12px;
  font-weight: 600;
  display: block;
  padding: 5px 10px;
  margin: 5px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  cursor: pointer;
}
.delete-icon {
  font-size: 13px;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: 'Select your image';
  background: var(--secondary);
  border-radius: 500px;
  padding: 8px 12px;
  font-weight: 600;
  display: inline-block;
  cursor: pointer;
}


</style>