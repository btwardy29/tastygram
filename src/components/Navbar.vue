<template>
  <div class="navbar">
    <nav>
      <router-link :to="{ name: 'Home' }">
        <span class="tasty">Tasty</span><span class="gram">GRAM</span>
      </router-link>
      <div class="links">
        <div v-if="user">
          <router-link :to="{ name: 'UserRecipes' }">My Recipes</router-link>
          <router-link :to="{ name: 'CreateRecipe' }">Create Recipe</router-link>
          <span class="menu-items">Hi there, {{ user.displayName }}</span>
          <button @click="handleLogout" v-if="!isPending">Logout</button>
          <button v-else disabled>Pending...</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{name: 'Signup'}">Signup</router-link>
          <router-link class="btn" :to="{name: 'Login'}">Log in</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from '../composables/useLogout'
import { useRouter } from 'vue-router'
import getUser from '../composables/getUser'

export default {
  setup() {
    const { error, logout, isPending } = useLogout()
    const router = useRouter()
    const { user } = getUser()

    const handleLogout = async () => {
      const res = await logout()
      if (!error.message) {
        router.push({ name: 'Login' })
      }
      return res
    }

    return { handleLogout, isPending, error, user }
  }
}
</script>

<style>
  .navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
  }
  nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  nav img {
    max-height: 60px;
  }
  nav h1 {
    margin-left: 20px;
  }
  nav .links {
    margin-left: auto;
  }
  nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
  }
  span {
    font-size: 14px;
    display: inline-block;
  
  }
  span.tasty {
    color: var(--primary);
    font-size: 2.5rem;
    font-family: 'Great Vibes', cursive;
    
    
  }
  span.gram {
    font-size: 1.5rem;
    font-family: 'DM Serif Text', serif;
    text-transform: uppercase;
  }
  span.menu-items {
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
  }
</style>