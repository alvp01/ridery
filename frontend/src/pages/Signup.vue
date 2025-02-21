<template>
  <auth-form endpoint="/signup" redirectPath="/login" buttonText="Sign Up" redirectText="Already have an account?"
    redirectLink="/login" />
</template>

<script setup>
import AuthForm from '../components/AuthForm.vue'
</script>
