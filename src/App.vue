<template>
  <Navbar />
  <div class="container">
    <div class="menu-left">
      <LeftMenu />
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  import LeftMenu from './components/LeftMenu.vue'
  
  export default {
    components: { Navbar, LeftMenu }
  }
</script>

<style>

@media only screen and (max-width: 800px) {
    .container {
    display: grid;
    grid-template-columns: 70px 1fr;
    gap: 5px
    }
}
@media only screen and (min-width: 801px) {
  .container {
    display: grid;
    grid-template-columns: 2fr 7fr;
    gap: 5px
  }

}
  .content {
    
    max-width: 100%;
    
  }
  
</style>
