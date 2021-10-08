<template>
  <form class="recipe-form" @submit.prevent="handleSubmit">
    <h3>Log in</h3>
    <input class="recipe-input" type="email" placeholder="Email" v-model="email">
    <input class="recipe-input" type="password" placeholder="Password" v-model="password">
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-else disabled>Processing</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const { login, error, isPending } = useLogin()
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if (!error.value) {
        router.push({ name: 'UserRecipes' })
      }
      return res
    }

    return { email, password, handleSubmit, error, isPending }
  }
}
</script>

<style>

</style>