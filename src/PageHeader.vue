<style></style>

<template>
  <v-toolbar fixed>
    <v-toolbar-title>
      uspeak
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
      label="Search..."
      single-line
      append-icon="search"
      hide-details
    ></v-text-field>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'page-header'
  }
</script>
