<template>
  <v-app dark id="e3" toolbar>
  <div id="app">
    <page-header></page-header>
    <main>
        <v-container>
          <transition appear>
            <router-view></router-view>
          </transition>
        </v-container>
    </main>
  </div>
  </v-app>
</template>

<script>
  import PageHeader from './PageHeader.vue'

  export default {
    name: 'page-uspeak',
    components: {
      PageHeader
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  #e3, #e3 .container {
    overflow: hidden;
    z-index: 0;
  }

  #e3 .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }

  #e3 .input-group--focused .input-group__append-icon {
    color: inherit !important;
  }
</style>
