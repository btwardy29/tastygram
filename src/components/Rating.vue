<template>
  <div class="rate-content">
    <p class="rate-title">Rate this recipe!</p>
  <form >
    <div class="rate">
      
      <input type="radio" id="star5" value="5" v-model="number" @change.prevent="handleSubmit" />
      <label for="star5" title="text">5 stars</label>
      <input type="radio" id="star4" value="4" v-model="number" @change.prevent="handleSubmit" />
      <label for="star4" title="text">4 stars</label>
      <input type="radio" id="star3" value="3" v-model="number" @change.prevent="handleSubmit" />
      <label for="star3" title="text">3 stars</label>
      <input type="radio" id="star2" value="2" v-model="number" @change.prevent="handleSubmit" />
      <label for="star2" title="text">2 stars</label>
      <input type="radio" id="star1" value="1" v-model="number" @change.prevent="handleSubmit" />
      <label for="star1" title="text">1 star</label>
    </div>
  </form>
    <p class="rate-title">Average: <span class="bold">{{ avgMark && avgMark.toFixed(1) }}</span></p>
    <p class="rate-title up">Total votes: <span class="bold">{{ markCount }}</span></p>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import getRating from '../composables/getRating'
import useCollection from '../composables/useCollection'
import getUser from '../composables/getUser'


export default {
  props: ['recipeId'],
  setup(props) {
    const { user } = getUser()
    const docId = `${user.value.uid}_${props.recipeId}`
    const { avgMark, myMark, markCount } = getRating('rating', props.recipeId, user.value.uid)
    const { setDocument } = useCollection('rating')
    const number = ref(myMark)
    const handleSubmit = async () => {
      await setDocument({
        mark: parseFloat(number.value),
        recipeId: props.recipeId,
        userId: user.value.uid,
      }, docId)
    }
   
    return { avgMark, handleSubmit, number, myMark, markCount }
  }
}
</script>

<style scoped>

.rate-title {
  margin-top: 25px;
}

*{
    margin: 0;
    padding: 0;
}
.rate {
  width:150px;
  margin: 0 auto;
  padding: 10px;
}
.rate:not(:checked) > input {
    position:absolute;
    top:-9999px;
}
.rate:not(:checked) > label {
    float:right;
    width:1em;
    overflow:hidden;
    white-space:nowrap;
    cursor:pointer;
    font-size:30px;
    color: var(--secondary)
}
.rate:not(:checked) > label:before {
    content: '★ ';
}
.rate > input:checked ~ label {
    color: rgb(145, 145, 145)
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
    color: var(--prmiary) 
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
    color: var(--primary)
}
span.bold {
  font-weight: 600;
}
.rate-title.up {
  margin-top: 0;
  margin-bottom: 20px;
}

</style>