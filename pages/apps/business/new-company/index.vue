<template>
  <div class="flex flex-col gap-8">
    <Container>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="mb-4">Comércio</h2>
          <Breadcrumb :model="breadcrumbItems" />
        </div>
        <Button label="Criar nova empresa" />
      </div>
    </Container>

    <Stepper value="1">
      <Container class="mb-8">
        <StepList class="!max-w-[400px]">
          <Step value="1">Informações</Step>
          <Step value="2">Vestuário</Step>
        </StepList>
      </Container>
      <Container>
        <StepPanels>
          <!-- INFORMAÇÕES -->
          <StepPanel v-slot="{ activateCallback }" value="1">
            <div class="grid grid-cols-4 gap-8">
              <div class="col-span-2">
                <h3 class="mb-4">Informações da Empresa</h3>
                <span class="block text-sm">Aqui você irá cadastrar todas as informações da sua nova parceira.</span>
              </div>
              <div class="col-span-2">
                <form>
                  <div class="mb-4">
                    <label for="username" class="mb-2">Nome</label>
                    <InputText id="username" v-model="formData.name" aria-describedby="username-help" fluid />
                  </div>
                  <div class="mb-4">
                    <label for="username" class="mb-2">Email</label>
                    <InputText id="username" v-model="formData.cnpj" fluid />
                  </div>
                  <div class="mb-4">
                    <label for="username" class="mb-2">Categoria</label>
                    <InputText id="username" v-model="formData.category" fluid />
                  </div>
                  <div class="flex-auto">
                    <label for="phone" class="font-bold block mb-2">Telefone de contato</label>
                    <InputMask id="phone" v-model="formData.contact" mask="(99) 99999-9999"
                      placeholder="(99) 99999-9999" fluid />
                  </div>
                </form>
              </div>
            </div>
            <div class="flex pt-6 gap-4 justify-end">
              <Button label="Cancelar" severity="secondary" @click="handleOnCancelCreateCompany()" />
              <Button label="Avançar" @click="activateCallback('2')" />
            </div>
          </StepPanel>
          <!-- VESTUÁRIO -->
          <StepPanel v-slot="{ activateCallback }" value="2">
            <div class="grid grid-cols-4 gap-8">
              <div class="col-span-2">
                <h3 class="mb-4">Cadastro de vestuário</h3>
                <span class="block text-sm">Aqui, você irá cadastrar todas as informações referentes ao vestuário da
                  empresa.</span>
              </div>
              <div class="col-span-2">
                <h3 class="mb-4">Lista do vestuário</h3>
                <span class="block mb-4 text-sm text-gray-400">Ainda não existem peças no vestuário.</span>
                <Button label="Cadastrar novo produto" @click="handleOnCreateProduct()" />
              </div>
            </div>
            <div class="flex pt-6 gap-4 justify-end">
              <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
              <Button label="Cadastrar empresa" @click="handleOnCreateCompany()" />
            </div>
          </StepPanel>
        </StepPanels>
      </Container>
    </Stepper>
  </div>
</template>

<script setup lang="ts">;
const breadcrumbItems = ref([
  { label: 'Aplicativos' },
  { label: 'Painel de empresas' },
  { label: 'Cadastrar empresa' },
]);

const formData = ref({
  name: '',
  cnpj: '',
  category: '',
  contact: '',
});

const handleOnCreateCompany = () => {
  console.log(formData);
};

const handleOnCancelCreateCompany = () => {
  navigateTo('/apps/business');
};

const handleOnCreateProduct = () => {
  console.log("Abrir modal");
};
</script>

<style scoped></style>