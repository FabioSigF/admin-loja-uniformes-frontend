<template>
  <div>
    <div class="text-center mb-8">
      <h2 class="text-primary mb-2">Bem vindo de volta!</h2>
      <p class="text-sm text-gray-400">Digite o seu email e senha para entrar no painel.</p>
    </div>
    <form>
      <div class="mb-4">
        <label for="username" class="mb-2">Email</label>
        <InputText id="username" v-model="email" aria-describedby="username-help" fluid />
      </div>
      <div class="mb-8">
        <label for="username" class="mb-2">Senha</label>
        <InputText id="username" v-model="senha" aria-describedby="username-help" fluid/>
      </div>
      <Button label="Entrar" class="mb-8" fluid />
      <div class="text-center">
        <span class="text-gray-400">Não tem uma conta? <a href="#!" class="text-primary">Cadastre-se</a></span>
      </div>
    </form>

  </div>
</template>

<script setup lang="ts">

const email = ref('')
const senha = ref('')

definePageMeta({
  layout: 'authentication'
})
</script>

<style scoped></style>