<!-- src/pages/Inventory.vue -->
<template>
  <inventory-layout>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="6" lg="3" v-for="vehicle in vehicles" :key="vehicle.id">
          <v-card class="ma-2">
            <v-card-title>{{ vehicle.name }}</v-card-title>
            <v-card-subtitle>{{ vehicle.model }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </inventory-layout>
</template>

<script setup>
import { ref } from 'vue'
import InventoryLayout from '../layouts/InventoryLayout.vue'
import { vehicleServices } from '../services/vehicleServices'

const response = vehicleServices.getAllTheVehicles()

const vehicles = ref([
  { id: 1, name: 'Car A', model: 'Model X' },
  { id: 2, name: 'Car B', model: 'Model Y' },
  { id: 3, name: 'Car C', model: 'Model Z' },
])
</script>
