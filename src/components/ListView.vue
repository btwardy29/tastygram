<template>
  <div class="container">
    <div class="element" v-for="recipe in recipes" :key="recipe.id">
      <router-link :to="{ name: 'RecipeDetails', params: { id: recipe.id }}">
        <div class="single">
          <div class="inside">
          <div class="thumbnail">
            <img :src="recipe.coverUrl">
          </div>
          <div class="info">
            <h3>{{ recipe.title }}</h3>
            <p>Created by {{ recipe.userName }}</p>
          </div>
          </div>
          <!-- <div class="rating-circle">
            <span class="rating-num">4.7/5<p class="description">5 votes</p></span>
            
            <span class="dot2"></span>
            <span class="dot"></span>
          </div> -->
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  props: ['recipes']
}
</script>

<style scoped>
@media only screen and (max-width: 1200px) {
  .element {
    width: calc(100% - 100px);
  }
}
@media only screen and (min-width: 1201px) {
.element {
  width: calc(50% - 100px);
  padding: 0 30px;
}
}

.container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}


.description {
  display: block;
  font-size: 10px;
  font-style: italic;
  color: var(--primary);
  text-align: center;
  font-weight: 400;
}

  .single {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-radius: 10px;
    background: white;
    margin: 5px;
    transition: all ease 0.2s;
    width: 100%;
    
  }
  .single:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    transform: translateX(-10px);
    transition: all ease 0.2s;
  }

  .inside {
    display: flex;
    align-items: center;
  }
  .thumbnail {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
  }
  img {
    max-width: 150%;
    max-height: 100%;
    display: block;
  }
  .info {
    margin: 0 30px;
  }
  .rating-circle {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    padding-right: 80px;
    
  }
    
  .dot {
    height: 60px;
    width: 60px;
    background-color: var(--secondary);
    border-radius: 50%;
    display: inline-block;
    box-shadow: inset 0 0 10px #ccc;
  }
  .dot2 {
    height: 40px;
    z-index: 99;
    position: absolute;
    width: 40px;
    background-color: white;
    border-radius: 50%;
    display: inline-block;
  }
  .rating-num {
    position: absolute;
    font-size: 20px;
    color: var(--primary);
    font-weight: 1000;
    z-index: 100;
  }

</style>