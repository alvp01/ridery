<template>
  <auth-form endpoint="/login" redirectPath="/inventory" buttonText="Log In" redirectText="Don't have an account?"
    redirectLink="/signup" />
</template>

<script setup>
import AuthForm from '../components/AuthForm.vue'
</script>
