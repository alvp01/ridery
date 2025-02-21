<template>
  <general-layout>
    <v-container>
      <v-row class="d-flex justify-center align-center">
        <v-col cols="12" class="d-flex justify-center align-center">
          <v-form v-model="valid" ref="form" class="auth-form px-8 py-4 d-flex justify-center align-center">
            <div>
              <v-text-field v-model="email" label="Email" :rules="emailRules"></v-text-field>
              <v-text-field v-model="password" type="password" label="Password" :rules="passwordRules"></v-text-field>
              <v-btn :disabled="!valid" @click="handleSubmit" class="mr-2">{{ buttonText }}</v-btn>
              <v-btn text @click="navigateToRedirect">{{ redirectText }}</v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>

  </general-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GeneralLayout from '../layouts/GeneralLayout.vue'
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

<style>
.auth-form {
  border: 1px solid black;
  border-radius: 15px;
  height: 350px !important;
}

.auth-form div {
  width: 100%;
}
</style>
