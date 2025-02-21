<template>
  <v-dialog v-model="showDialog" max-width="250px">
    <v-form class="bg-grey-darken-2" @submit.prevent="submit">
      <v-container>
        <v-card class="bg-blue-grey-lighten-3 pa-2" outlined>
          <v-card-title>{{ vehicle.make }}</v-card-title>
          <v-card-subtitle>{{ vehicle.year }} - {{ vehicle.model }}</v-card-subtitle>
        </v-card>
        <v-select v-model="vehicle.status" label="Status" :items="statusOptions" required></v-select>
      </v-container>
      <div class="w-100 d-flex flex-column align-center justify-center px-4">
        <v-btn class="mb-2 w-100" type="submit" :disabled="isSubmitDisabled">Submit</v-btn>
        <v-btn class="w-100" @click="cancel">Cancel</v-btn>
      </div>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, watch } from 'vue';
import { vehicleServices } from '../services/vehicleServices';

const props = defineProps({
  vehicle: Object,
});

const emits = defineEmits(['submit', 'cancel']);

const showDialog = ref(false);
const statusOptions = ['available', 'maintenance', 'on service'];
const originalStatus = ref(null);

watch(() => props.vehicle, (newVehicle) => {
  if (newVehicle) {
    originalStatus.value = newVehicle.status;
    showDialog.value = true;
  }
}, { immediate: false });

const isSubmitDisabled = computed(() => {
  return originalStatus.value === props.vehicle.status;
});

const submit = async () => {
  console.log(props.vehicle);
  try {
    const response = await vehicleServices.updateVehicle(props.vehicle._id, props.vehicle.status);
    showDialog.value = false;
    emits('update-success', response.data);
  } catch (error) {
    console.error('Error updating vehicle status:', error);
  }
};

const cancel = () => {
  showDialog.value = false;
  emits('cancel');
};
</script>
