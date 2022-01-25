import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreateRecipe from '../views/recipes/CreateRecipe.vue'
import RecipeDetails from '../views/recipes/RecipeDetails.vue'
import UserRecipes from '../views/recipes/UserRecipes.vue'
import Fit from '../views/recipes/Fit.vue'
import Breakfast from '../views/recipes/Breakfast.vue'
import Lunch from '../views/recipes/Lunch.vue'
import Dinner from '../views/recipes/Dinner.vue'
import Supper from '../views/recipes/Supper.vue'
import Dessert from '../views/recipes/Dessert.vue'
import Fastfood from '../views/recipes/Fastfood.vue'
import Vege from '../views/recipes/Vege.vue'
import Fish from '../views/recipes/Fish.vue'
import Chicken from '../views/recipes/Chicken.vue'
import Favourite from '../views/recipes/Favourite.vue'

import { auth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = auth.currentUser

  if(!user) {
    next({ name: 'Login' })
  } else {
    next ()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/recipes/create',
    name: 'CreateRecipe',
    component: CreateRecipe,
    beforeEnter: requireAuth,
  },
  {
    path: '/recipes/:id',
    name: 'RecipeDetails',
    component: RecipeDetails,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/recipes/user',
    name: 'UserRecipes',
    component: UserRecipes,
    beforeEnter: requireAuth,
  },
  {
    path: '/recipes/fit',
    name: 'Fit',
    component: Fit,
    beforeEnter: requireAuth,
  },
  {
    path: '/recipes/breakfast',
    name: 'Breakfast',
    component: Breakfast,
    beforeEnter: requireAuth,
  },
  {
    path: '/recipes/lunch',
    name: 'Lunch',
    component: Lunch,
    beforeEnter: requireAuth,
  },
  {
    path: '/recipes/dinner',
    name: 'Dinner',
    component: Dinner,
    beforeEnter: requireAuth,
  },
  {
    path: '/recipes/supper',
    name: 'Supper',
    component: Supper,
    beforeEnter: requireAuth,
  },
  {
    path: '/recipes/dessert',
    name: 'Dessert',
    component: Dessert,
    beforeEnter: requireAuth,
  },
  {
    path: '/recipes/fastfood',
    name: 'Fastfood',
    component: Fastfood,
    beforeEnter: requireAuth,
  },
  {
    path: '/recipes/vege',
    name: 'Vege',
    component: Vege,
    beforeEnter: requireAuth,
  },
  {
    path: '/recipes/fish',
    name: 'Fish',
    component: Fish,
    beforeEnter: requireAuth,
  },
  {
    path: '/recipes/chicken',
    name: 'Chicken',
    component: Chicken,
    beforeEnter: requireAuth,
  },
  {
    path: '/recipes/favourite',
    name: 'Favourite',
    component: Favourite,
    beforeEnter: requireAuth,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
