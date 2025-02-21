<!-- src/layouts/InventoryLayout.vue -->
<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Vehicle Inventory</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script setup>
import { VApp, VAppBar, VMain, VToolbarTitle } from 'vuetify/components'
</script>
