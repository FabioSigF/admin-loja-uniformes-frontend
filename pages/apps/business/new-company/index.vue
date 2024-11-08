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
                <div class="col-span-2 flex flex-col gap-4">
                  <h3>Cadastro de vestuário</h3>
                  <span v-if="formData.products.length == 0" class="block text-sm">Aqui, você irá cadastrar todas as
                    informações referentes ao vestuário da
                    empresa.</span>
                  <div v-else class="flex flex-col w-full border-t border-gray-200">
                    <div v-for="(item, index) in formData.products" :key="item.name" class="border-b border-gray-200">
                      <Button fluid link @click="handleOnSelectProduct(item, index)"
                        :class="{ active: activeProductIndex === index }">
                        {{ item.name }}
                      </Button>
                    </div>
                  </div>
                  <Button label="Cadastrar novo produto" @click="handleOnCreateProduct()" />
                </div>
                <div class="col-span-2">
                  <h3 class="mb-4">Lista do vestuário {{ formData.products.length > 0 &&
                    ' : ' + formData.products[activeProductIndex].name }}</h3>
                  <span v-if="formData.products.length == 0" class="block mb-4 text-sm text-gray-400">Ainda não existem
                    peças no vestuário.</span>
                  <div v-else>
                    <DataTable :value="selectedProductData.features">
                      <Column field="color" header="COR" class="w-full"></Column>
                      <Column field="size" header="TAMANHO"></Column>
                      <Column field="price" header="PREÇO"></Column>
                      <Column field="stockQuantity" header="ESTOQUE"></Column>
                      <Column>
                        <template #body="slotProps">
                          <div class="flex gap-2 items-center">
                            <Button v-tooltip.top="'Editar venda'"
                              @click="handleOnClickEditProductFeature(slotProps.data.index)" severity="info" outlined>
                              <template #icon>
                                <Icon name="mynaui:edit-one" size="24px" />
                              </template>
                            </Button>
                            <Button v-tooltip.top="'Remover venda'"
                              @click="handleOnClickRemoveProductFeature(slotProps.data.index)" severity="danger"
                              outlined>
                              <template #icon>
                                <Icon name="mynaui:trash" size="24px" />
                              </template>
                            </Button>
                          </div>
                        </template>
                      </Column>
                    </DataTable>
                  </div>
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
  products: [
    {
      id: "6cc30269-5dfc-44c6-b4f2-5a15e206a6a1",
      companyId: "5b0eda0d-f730-4b9d-af30-ed9d076e2e33",
      name: "Camisa",
      description: "",
      gender: "FEMININO",
      features: [
        {
          id: "182253d2-be5d-42de-9577-4816082660b4",
          color: "Azul",
          size: "P",
          price: 10.0,
          stockQuantity: 5,
          isAvailable: true,
          isDeleted: false,
          productId: "6cc30269-5dfc-44c6-b4f2-5a15e206a6a1"
        },
        {
          id: "56f66528-c6f5-4c95-b264-0eea914b8ab8",
          color: "Amarelo",
          size: "G",
          price: 10.0,
          stockQuantity: 5,
          isAvailable: true,
          isDeleted: false,
          productId: "6cc30269-5dfc-44c6-b4f2-5a15e206a6a1"
        },
        {
          id: "10ae3312-8cd8-4878-abfc-c014f092668a",
          color: "Amarelo",
          size: "M",
          price: 10.0,
          stockQuantity: 5,
          isAvailable: true,
          isDeleted: false,
          productId: "6cc30269-5dfc-44c6-b4f2-5a15e206a6a1"
        },
        {
          id: "c929a869-f3db-4016-a316-56d6f017c6c0",
          color: "Azul",
          size: "G",
          price: 10.0,
          stockQuantity: 5,
          isAvailable: true,
          isDeleted: false,
          productId: "6cc30269-5dfc-44c6-b4f2-5a15e206a6a1"
        },
        {
          id: "46c0169e-6cc6-41bc-8341-944f02c9a61b",
          color: "Azul",
          size: "M",
          price: 10.0,
          stockQuantity: 5,
          isAvailable: true,
          isDeleted: false,
          productId: "6cc30269-5dfc-44c6-b4f2-5a15e206a6a1"
        },
        {
          id: "8bdbf700-a645-42cf-a25c-0fb12de59edd",
          color: "Amarelo",
          size: "P",
          price: 10.0,
          stockQuantity: 5,
          isAvailable: true,
          isDeleted: false,
          productId: "6cc30269-5dfc-44c6-b4f2-5a15e206a6a1"
        }
      ]
    },
    {
      id: "6cc30269-5dfc-44c6-b4f2-5a15e206a6a1",
      companyId: "5b0eda0d-f730-4b9d-af30-ed9d076e2e33",
      name: "Camisa Manga longa",
      description: "",
      gender: "FEMININO",
      features: [
        {
          id: "56f66528-c6f5-4c95-b264-0eea914b8ab8",
          color: "Amarelo",
          size: "G",
          price: 10.0,
          stockQuantity: 5,
          isAvailable: true,
          isDeleted: false,
          productId: "6cc30269-5dfc-44c6-b4f2-5a15e206a6a1"
        },
        {
          id: "10ae3312-8cd8-4878-abfc-c014f092668a",
          color: "Amarelo",
          size: "M",
          price: 10.0,
          stockQuantity: 5,
          isAvailable: true,
          isDeleted: false,
          productId: "6cc30269-5dfc-44c6-b4f2-5a15e206a6a1"
        },
        {
          id: "c929a869-f3db-4016-a316-56d6f017c6c0",
          color: "Azul",
          size: "G",
          price: 10.0,
          stockQuantity: 5,
          isAvailable: true,
          isDeleted: false,
          productId: "6cc30269-5dfc-44c6-b4f2-5a15e206a6a1"
        },
        {
          id: "46c0169e-6cc6-41bc-8341-944f02c9a61b",
          color: "Azul",
          size: "M",
          price: 10.0,
          stockQuantity: 5,
          isAvailable: true,
          isDeleted: false,
          productId: "6cc30269-5dfc-44c6-b4f2-5a15e206a6a1"
        }
      ]
    },
  ]
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

const activeProductIndex = ref(0);

let selectedProductData: ProductSend = reactive({
  companyId: '',
  name: '',
  description: '',
  gender: '',
  features: []
});

onMounted(() => {
  if (formData.products.length > 0)
    selectedProductData = { ...formData.products[0] };
})

const handleOnSelectProduct = (product: ProductSend, index: number) => {
  // Define o índice do produto ativo para adicionar a classe "active"
  activeProductIndex.value = index;

  // Salva os dados do produto selecionado para uso posterior
  selectedProductData = { ...product };
};

const handleOnClickEditProductFeature = (index: number) => {
  console.log(index)
};

const handleOnClickRemoveProductFeature = (index: number) => {
  console.log(index)
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

<style scoped>
.p-button-link {
  justify-content: start !important;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;

  &:hover,
  &.active {
    background-color: #eff6ff;
    color: var(--primary-400) !important;
  }

}
</style>