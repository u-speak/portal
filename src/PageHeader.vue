<style></style>

<template>
  <v-toolbar fixed>
    <v-toolbar-title>
      <v-btn flat icon to='/'>
        <v-icon>home</v-icon>
      </v-btn>
      uspeak
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
      label="Search..."
      single-line
      append-icon="search"
      hide-details
      v-on:keyup.enter="search($event.target.value)"
    ></v-text-field>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'page-header',
    methods: {
      search (text) {
        this.$bus.$emit('search', text)
      }
    }
  }
</script>
