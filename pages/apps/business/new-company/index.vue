<template>
  <div>
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
                      <label class="mb-2">Nome</label>
                      <InputText v-model="formData.name" fluid />
                    </div>
                    <div class="mb-4">
                      <label class="mb-2">CNPJ</label>
                      <InputText v-model="formData.cnpj" fluid />
                    </div>
                    <div class="mb-4">
                      <label class="mb-2">Categoria</label>
                      <Select v-model="formData.category" :options="formCategoryOptions" optionValue="value"
                        optionLabel="label" placeholder="Selecione um gênero" class="w-full" />
                    </div>
                    <div class="flex-auto">
                      <label for="phone" class="font-bold block mb-2">Telefone de contato</label>
                      <InputMask id="phone" v-model="formData.phones[0].number" mask="(99) 99999-9999"
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
    <ModalBusinessNewProduct :onAddProduct="handleOnAddProduct" />
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import type { CompanySend } from '~/interfaces/send/Company';
import type { ProductSend } from '~/interfaces/send/Product';
import { useToastStore } from '~/stores/useToastStore';

;
const breadcrumbItems = ref([
  { label: 'Aplicativos' },
  { label: 'Painel de empresas' },
  { label: 'Cadastrar empresa' },
]);

const formProductFeaturesData: ProductSend['features'] = reactive([{
  color: '',
  size: '',
  price: 0,
  stockQuantity: 0,
}])

const formProductData: ProductSend = reactive({
  companyId: '',
  name: '',
  description: '',
  gender: '',
  features: formProductFeaturesData
})


const formData: CompanySend = reactive({
  name: '',
  cnpj: '',
  category: '',
  phones: [{ number: '', deleted: false }],
  products: []
});

// Toast setup
const toast = useToast();

const handleOnAddProduct = (newProduct: ProductSend) => {
  formData.products.push({
    ...newProduct,
    features: newProduct.features.map(feature => ({ ...feature }))
  });
  return true;
};

const handleOnCreateCompany = async () => {
  try {
    //Remove caracteres não numéricos de cada phone
    formData.phones = formData.phones.map(phone => {
      phone.number.replace(/\D/g, '')
      phone.deleted = false
      return phone;
    });

    const { token } = storeToRefs(useConfigStore());
    const config = useRuntimeConfig();
    const response = await useFetch(`${config.public.API_URL}/companies`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
    });

    if (!response.error.value) {
      // Show success toast
      const { setToggleCompanyWasCreated } = useToastStore();
      setToggleCompanyWasCreated();
      navigateTo('/apps/business');
    } else {
      toast.add({ severity: 'error', summary: 'Erro ao cadastrar empresa', life: 3000 });
      console.error(response.error.value);
    }
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
};

const handleOnCancelCreateCompany = () => {
  navigateTo('/apps/business');
};

const handleOnCreateProduct = () => {
  const { setToggleNewProduct } = useModalStore();
  setToggleNewProduct();
};

const formCategoryOptions = [
  { label: 'Alimentação e Bebidas', value: 'ALIMENTACAO' },
  { label: 'Construção', value: 'CONSTRUCAO' },
  { label: 'Educação', value: 'EDUCACAO' },
  { label: 'Entretenimento', value: 'ENTRETENIMENTO' },
  { label: 'Informática', value: 'INFORMATICA' },
  { label: 'Saúde', value: 'SAUDE' },
  { label: 'Serviços especializados', value: 'SERVICOSESP' },
  { label: 'Serviços pessoais', value: 'SERVICOSPES' },
  { label: 'Vendas e marketing', value: 'VENDAS' },
  { label: 'Vestuário e calçados', value: 'VESTUARIO' },
  { label: 'Outros', value: 'OUTROS' },
]
</script>

<style scoped></style>