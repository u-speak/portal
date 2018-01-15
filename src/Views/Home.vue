<style></style>

<template>
  <div>
    <posts v-if="!$store.state.bSwitch"></posts>
    <h1 v-else>TODO IMAGE CHAIN</h1>
  </div>
</template>

<script>
  import Posts from './Posts.vue'

  export default {
    components: {
      Posts
    }
  }
</script>
