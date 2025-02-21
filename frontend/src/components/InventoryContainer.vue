<template>
  <general-layout>
    <div class="fill-height w-100 inventory-container d-flex flex-column justify-center align-center"
      id="inventory-container">
      <vehicle-list :vehicles="vehicles" @edit-vehicle="handleEditVehicle" />
      <vehicle-options :page="page" :totalPages="totalPages" @decrease-page="handleDecreasePage"
        @increase-page="handleIncreasePage" @add-vehicle="handleAddVehicle" />
      <vehicle-edit-dialog v-if="editingVehicle" :vehicle="editingVehicle" @update-success="handleEditSuccess"
        @cancel="handleEditCancel" />
    </div>
  </general-layout>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { vehicleServices } from '../services/vehicleServices';
import GeneralLayout from '../layouts/GeneralLayout.vue';
import VehicleList from './VehicleList.vue';
import VehicleOptions from './VehicleOptions.vue';
import VehicleEditDialog from './VehicleEditDialog.vue';

const router = useRouter();
const vehicles = ref([]);
const page = ref(1);
const totalPages = ref(1);
const editingVehicle = ref(null);

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
    router.push({ name: 'Login' }); // Redirect to login page
  }
};

onMounted(() => {
  fetchVehicles();
});

const handleEditVehicle = (vehicle) => {
  editingVehicle.value = vehicle;
};

const handleEditSuccess = (updatedVehicle) => {
  const index = vehicles.value.findIndex((v) => v.id === updatedVehicle.id);
  if (index !== -1) {
    vehicles.value[index] = updatedVehicle;
  }
  editingVehicle.value = null;
};

const handleEditCancel = () => {
  editingVehicle.value = null;
};

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
</script>

<style>
.fill-height {
  height: 100vh;
}

.inventory-container {
  max-width: 900px;
}
</style>