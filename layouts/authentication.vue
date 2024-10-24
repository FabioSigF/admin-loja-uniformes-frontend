<template>
  <div class="flex gap-[20%] items-center justify-center h-[100vh] primary_linear">
    <Container>
      <slot />
    </Container>
    <img :src="logo" alt="Admin Uniformes">
  </div>
</template>

<script setup lang="ts">
import logo from '../../../assets/images/logo_white.png'
</script>

<style lang="scss" scoped></style>