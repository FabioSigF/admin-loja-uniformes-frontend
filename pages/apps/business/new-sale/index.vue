<template>
  <div class="flex flex-col gap-8">
    <Container>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="mb-4">Nome empresa - Cadastrar Venda</h2>
          <Breadcrumb :model="breadcrumbItems" />
        </div>
      </div>
    </Container>
    <Container>
      <div class="grid grid-cols-5 items-end gap-8">
        <div>
          <label class="mb-2">Modelo</label>
          <Select v-model="formData.model" :options="models" optionLabel="name" placeholder="Escolha um modelo"
            class="w-full" fluid />
        </div>
        <div>
          <label class="mb-2">Tamanho</label>
          <Select v-model="formData.size" :options="models" optionLabel="name" placeholder="Escolha um tamanho"
            class="w-full" fluid />
        </div>
        <div>
          <label class="mb-2">Cor</label>
          <Select v-model="formData.color" :options="models" optionLabel="name" placeholder="Escolha uma cor"
            class="w-full" fluid />
        </div>
        <div>
          <label class="mb-2">Quantidade</label>
          <InputNumber v-model="formData.amount" :useGrouping="false" fluid />
        </div>
        <Button label="Adicionar ao carrinho" @click="handleOnAddToCart()" />
      </div>
    </Container>
    <Container>
      <div class="grid grid-cols-4 gap-8">
        <div class="col-span-2">
          <h3 class="mb-4">Cadastro de vestuário</h3>
          <span class="block text-sm">Aqui, você irá cadastrar todas as informações referentes ao vestuário da
            empresa.</span>
        </div>
        <div class="col-span-2">
          <h3 class="mb-4">Itens adicionados ao carrinho</h3>
          <span class="block mb-4 text-sm text-gray-400">O carrinho ainda está vazio.</span>
        </div>
      </div>
      <div class="flex pt-6 gap-4 justify-end">
        <Button label="Cancelar" severity="secondary" icon="pi pi-arrow-left" @click="handleOnCancelCreateSale()" />
        <Button label="Cadastrar venda" @click="handleOnCreateSale()" />
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
const breadcrumbItems = ref([
  { label: 'Aplicativos' },
  { label: 'Painel de empresas' },
  { label: 'Cadastrar Venda' },
]);

const formData = ref({
  model: '',
  size: '',
  color: '',
  amount: 0,
});

const models = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);

const handleOnAddToCart = () => {
  console.log('Adicionado ao carrinho');
}

const handleOnCreateSale = () => {
  console.log('Venda cadastrada');
}

const handleOnCancelCreateSale = () => {
  navigateTo('/apps/business');
}
</script>

<style scoped></style>