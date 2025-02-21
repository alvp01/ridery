<template>
  <v-container class="d-flex justify-center align-center" id="general-layout">
    <v-row class="d-flex justify-center w-100">
      <v-col class="d-flex justify-center align-center w-100">
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { VContainer, VCard } from 'vuetify/components'
</script>

<style scoped>
.v-container {
  height: 100vh;
}
</style>
