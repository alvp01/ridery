<!-- src/components/InventoryContainer.vue -->
<template>
  <general-layout>
    <div class="fill-height w-100 inventory-container d-flex flex-column justify-center align-center"
      id="inventory-container">
      <vehicle-list :vehicles="vehicles" />
      <vehicle-options :page="page" :totalPages="totalPages" @decrease-page="handleDecreasePage"
        @increase-page="handleIncreasePage" @add-vehicle="handleAddVehicle" />
    </div>
  </general-layout>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { vehicleServices } from '../services/vehicleServices';
import GeneralLayout from '../layouts/GeneralLayout.vue';
import VehicleList from './VehicleList.vue';
import VehicleOptions from './VehicleOptions.vue';
import { useRouter } from 'vue-router';

const vehicles = ref([]);
const page = ref(1);
const totalPages = ref(1);
const router = useRouter();

const fetchVehicles = async (updatedPage) => {
  if (updatedPage !== undefined) {
    page.value = updatedPage;
  }

  try {
    const params = {
      page: page.value,
    };

    const response = await vehicleServices.getAllTheVehicles(params);
    vehicles.value = response.data.vehicles;
    totalPages.value = response.data.totalPages;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    router.push({ name: 'Login' });
  }
};

// Fetch vehicles when the component mounts
fetchVehicles();

const handleDecreasePage = () => {
  if (page.value > 1) {
    page.value--;
    fetchVehicles(page.value);
  }
};

const handleIncreasePage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    fetchVehicles(page.value);
  }
};

const handleAddVehicle = async (newVehicle) => {
  vehicles.value.unshift(newVehicle);
  totalPages.value += 1;
};

// Watch for changes in the page number and fetch data accordingly
watchEffect(() => {
  if (page.value > totalPages.value) {
    page.value = totalPages.value;
  } else if (page.value < 1) {
    page.value = 1;
  }
});
</script>