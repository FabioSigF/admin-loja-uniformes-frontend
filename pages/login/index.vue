<template>
  <div>
    <div class="text-center mb-8">
      <h2 class="text-primary mb-2">Bem vindo de volta!</h2>
      <p class="text-sm text-gray-400">Digite o seu email e senha para entrar no painel.</p>
    </div>
    <form>
      <div class="mb-4">
        <label for="username" class="mb-2">Email</label>
        <InputText id="username" v-model="email" fluid type="email" />
      </div>
      <div class="mb-8">
        <label for="username" class="mb-2">Senha</label>
        <InputText id="username" v-model="senha" fluid type="password" />
      </div>
      <Button label="Entrar" class="mb-8" fluid @click="handleOnClickLogin" />
      <div class="text-center">
        <span class="text-gray-400">Não tem uma conta? <a href="#!" class="text-primary">Cadastre-se</a></span>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">

const email = ref('')
const senha = ref('')

const router = useRouter();
const config = useRuntimeConfig();

const handleOnClickLogin = async () => {
  const { data, error } = await useFetch(`${config.public.API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      login: email.value,
      password: senha.value
    })
  })

  if (error.value) {
    console.error('Erro ao fazer login:', error.value);
  } else {
    // Armazena o token no local storage
    sessionStorage.setItem('token', (data.value as { token: string }).token);

    router.push('/');
  }
}

definePageMeta({
  layout: "authentication"
})

</script>

<style scoped></style>