<template>
  <v-container id="vehicle-list" class="vehicles-list">
    <v-row v-if="vehicles.length > 0">
      <v-col cols="12" sm="6" md="6" lg="3" v-for="vehicle in vehicles" :key="vehicle.id">
        <v-card class="ma-2 d-flex flex-column justify-center align-center pa-4" @click="editVehicle(vehicle)">
          <v-card-title>{{ vehicle.make }}</v-card-title>
          <v-card-subtitle>{{ vehicle.year }} - {{ vehicle.model }}</v-card-subtitle>
          <v-chip label>{{ vehicle.status }}</v-chip>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else class="h-100 d-flex justify-center align-center">
      <v-col cols="12" class="h-100 w-100 d-flex justify-center align-center">
        <v-card class="d-flex flex-column justify-center align-center pa-4 h-100 w-100">
          <v-card-title>No Vehicles Found</v-card-title>
          <v-card-subtitle>Please add vehicles to your inventory.</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  vehicles: {
    type: Array,
    required: true
  }
});

const emits = defineEmits(['edit-vehicle']);

const editVehicle = (vehicle) => {
  emits('edit-vehicle', vehicle);
};
</script>

<style>
.vehicles-list {
  overflow-y: auto;
  border: 1px solid black;
  border-radius: 15px 15px 0 0;
  height: 400px;
  border-bottom: 0;
}
</style>
