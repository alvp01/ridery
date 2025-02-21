<template>
  <v-container class="d-flex justify-center align-center">
    <v-row>
      <v-col cols="12" md="6">
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
