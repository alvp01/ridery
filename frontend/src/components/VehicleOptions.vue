<template>
  <v-container id="vehicle-options" class="vehicle-options d-flex justify-center align-center">
    <v-row class="w-100">
      <v-col cols="12" class="d-flex justify-content-between align-center">
        <div class="w-100 d-flex justify-space-around align-center ">
          <v-btn class="mr-4" @click="showAddCarDialog = true">Add Car</v-btn>
          <v-dialog v-model="showAddCarDialog" max-width="600px">
            <v-form @submit.prevent="addCar" :validation-schema="validationSchema" ref="form"
              class="bg-white add-car-form">
              <v-container>
                <v-text-field v-model="newCar.make" label="Make" required
                  :rules="vehicleValidationRules.make"></v-text-field>
                <v-text-field v-model="newCar.model" label="Model" required
                  :rules="vehicleValidationRules.model"></v-text-field>
                <v-select v-model="newCar.year" label="Year" :items="yearOptions" required
                  :rules="vehicleValidationRules.year"></v-select>
                <v-select v-model="newCar.status" label="Status" :items="statusOptions" required default="active"
                  :rules="vehicleValidationRules.status"></v-select>
              </v-container>
              <div class="w-100 d-flex align-center justify-space-around pa-4">
                <v-btn class="w-45 mr-2" type="submit" :disabled="!isFormValid">Add</v-btn>
                <v-btn class="w-45" @click="showAddCarDialog = false">Cancel</v-btn>
              </div>
            </v-form>
          </v-dialog>
          <div class="d-flex align-center">
            <v-btn :disabled="page <= 1" @click="emitDecreasePage">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <span>{{ page }} of {{ totalPages }}</span>
            <v-btn :disabled="page >= totalPages" @click="emitIncreasePage">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { vehicleServices } from '../services/vehicleServices';
import { vehicleValidationRules } from '../utils/vehiclesValidation';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

const props = defineProps({
  page: Number,
  totalPages: Number,
});

const emits = defineEmits(['decrease-page', 'increase-page', 'add-vehicle']);

const showAddCarDialog = ref(false);
const newCar = ref({
  make: '',
  model: '',
  year: null,
  status: 'available',
});

const yearOptions = Array.from({ length: 2025 - 1990 + 1 }, (_, i) => 1990 + i);
const statusOptions = ['available', 'maintenance', 'on service'];

const isFormValid = () => {
  return Object.values(newCar).every((field) => field !== '' && field !== null);
};

const validationSchema = {
  make: { required, minLength: minLength(3) },
  model: { required, minLength: minLength(3) },
  year: { required },
  status: { required },
};

const emitDecreasePage = () => {
  if (props.page > 1) {
    emits('decrease-page');
  }
};

const emitIncreasePage = () => {
  if (props.page < props.totalPages) {
    emits('increase-page');
  }
};

const addCar = async () => {
  try {
    const response = await vehicleServices.addVehicle(newCar.value);
    emits('add-vehicle', response.data);
    showAddCarDialog.value = false;
    newCar.value = { make: '', model: '', year: null, status: '' };
  } catch (error) {
    console.error('Error adding vehicle:', error);
  }
};
</script>

<style>
.vehicle-options {
  border: 1px solid black;
  border-radius: 0 0 15px 15px;
  height: 100px;
}

.add-car-form {
  opacity: 0.9;
}

.w-45 {
  width: 45%;
}
</style>