<template>
  <div class="menu-container">
    <!-- My recipes -->
    <router-link :to="{ name: 'UserRecipes' }" class="nav-link">
      <span class="material-icons icon">person</span>
      <span class="description">My Recipes</span>
    </router-link>
    <!-- My recipes -->
    <router-link :to="{ name: 'Fit' }" class="nav-link">
      <span class="material-icons icon">fitness_center</span>
      <span class="description">Fit</span>
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