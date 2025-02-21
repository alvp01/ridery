<template>
  <sessions-layout>
    <v-form v-model="valid" ref="form">
      <v-text-field v-model="email" label="Email" :rules="emailRules"></v-text-field>
      <v-text-field v-model="password" type="password" label="Password" :rules="passwordRules"></v-text-field>
      <v-btn :disabled="!valid" @click="handleSubmit">{{ buttonText }}</v-btn>
    </v-form>
    <v-btn text @click="navigateToRedirect">{{ redirectText }}</v-btn>
  </sessions-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SessionsLayout from '../layouts/SessionsLayout.vue'
import { emailRules, passwordRules } from '../utils/sessionValidation'
import { sessionServices } from '../services/sessionServices'

const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
  redirectPath: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
    default: 'Submit',
  },
  redirectText: {
    type: String,
    required: true,
  },
  redirectLink: {
    type: String,
    required: true,
  },
})

const email = ref('')
const password = ref('')
const valid = ref(false)
const router = useRouter()

const handleSubmit = async () => {
  if (valid.value) {
    try {
      if (props.endpoint === '/login') {
        await sessionServices.logIn({ email: email.value, password: password.value })
      } else if (props.endpoint === '/signup') {
        await sessionServices.signUp({ email: email.value, password: password.value })
      }
      router.push(props.redirectPath)
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

const navigateToRedirect = () => {
  router.push(props.redirectLink)
}
</script>
