<template>
  <div class="home">
    <div v-if="documents">
      <ListView :recipes="documents" />
    </div>
    <div v-if="error" class="error">{{ error.message }}</div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import ListView from '../components/ListView.vue'

export default {
  components: { ListView },
  setup() {
    const { documents, error } = getCollection('recipes')

    return { documents, error }
  }
}

</script>
