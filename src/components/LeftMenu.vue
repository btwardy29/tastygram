<template>
  <div class="menu-container">
    <!-- My recipes -->
    <router-link :to="{ name: 'UserRecipes' }" class="nav-link">
      <span class="material-icons icon">person</span>
      <span class="description">My Recipes</span>
    </router-link>
    <!-- Fit recipes -->
    <router-link :to="{ name: 'Fit' }" class="nav-link">
      <span class="material-icons icon">fitness_center</span>
      <span class="description">Fit</span>
    </router-link>
    <!-- Breakfast recipes -->
    <router-link :to="{ name: 'Breakfast' }" class="nav-link">
      <span class="material-icons icon">bakery_dining</span>
      <span class="description">Breakfast</span>
    </router-link>
    <!-- Lunch recipes -->
    <router-link :to="{ name: 'Lunch' }" class="nav-link">
      <span class="material-icons icon">set_meal</span>
      <span class="description">Lunch</span>
    </router-link>
    <!-- Dinner recipes -->
    <router-link :to="{ name: 'Dinner' }" class="nav-link">
      <span class="material-icons icon">dinner_dining</span>
      <span class="description">Dinner</span>
    </router-link>
    <!-- Supper recipes -->
    <router-link :to="{ name: 'Supper' }" class="nav-link">
      <span class="material-icons icon">brunch_dining</span>
      <span class="description">Supper</span>
    </router-link>
    <!-- Dessert recipes -->
    <router-link :to="{ name: 'Dessert' }" class="nav-link">
      <span class="material-icons icon">icecream</span>
      <span class="description">Dessert</span>
    </router-link>
    <!-- Fastfood recipes -->
    <router-link :to="{ name: 'Fastfood' }" class="nav-link">
      <span class="material-icons icon">lunch_dining</span>
      <span class="description">Fastfood</span>
    </router-link>
    <!-- Vege recipes -->
    <router-link :to="{ name: 'Vege' }" class="nav-link">
      <span class="material-icons icon">spa</span>
      <span class="description">Vege</span>
    </router-link>
    <!-- Fish recipes -->
    <router-link :to="{ name: 'Fish' }" class="nav-link">
      <span class="material-icons icon">set_meal</span>
      <span class="description">Fish</span>
    </router-link>
    <!-- Chicken recipes -->
    <router-link :to="{ name: 'Chicken' }" class="nav-link">
      <span class="material-icons icon">restaurant</span>
      <span class="description">Chicken</span>
    </router-link>
    <!-- Favourite recipes -->
    <router-link :to="{ name: 'Favourite' }" class="nav-link">
      <span class="material-icons icon">favorite</span>
      <span class="description">Favorites</span>
    </router-link>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@media only screen and (max-width: 800px) {
  .description {
    display: none;
  }
  .nav-link {
    width: 30px
  }
}

  .nav-link {
    display: flex;
    align-items: center;
    max-width: 100%;
    padding: 10px;
    margin: 10px 20px;
    border-bottom: 1px dashed #ccc;
    transition: all ease 0.2s;

  }

  .router-link-active {
    padding-left: 20px;
  }

  .nav-link:hover {
    padding-left: 20px;
    transition: all ease 0.2s;
  }

  .icon {
    font-size: 20px;
    padding-right: 10px;
  }
</style>