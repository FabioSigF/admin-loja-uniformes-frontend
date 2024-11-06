<template>
  <Modal v-model:isOpen=newProductIsOpen
    :header="'Novo Modelo de Uniforme - ' + (pageTracker == 0 ? 'Informações' : 'Vestuário')"
    :description="pageTracker == 0 ? 'Cadastre as principais informações do novo modelo de uniforme.' : 'Edite as informações de estoque de cada peça de uniforme.'">
    <!-- Página 1 -->
    <div v-if="pageTracker == 0">
      <form class="flex flex-col gap-4">
        <div class="flex gap-2 flex-col">
          <label class="font-semibold">Nome</label>
          <div class="flex-auto flex flex-col gap-2">
            <InputText autocomplete="off" v-model="newProduct.name" />
          </div>
        </div>
        <div class="flex gap-2 flex-col">
          <label class="font-semibold">Descrição</label>
          <div class="flex-auto flex flex-col gap-2">
            <InputText autocomplete="off" v-model="newProduct.description" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex gap-2 flex-col">
            <label class="font-semibold">Gênero</label>
            <div class="flex-auto flex flex-col gap-2">
              <Select v-model="newProduct.gender" :options="formGenderOptions" optionLabel="label" optionValue="value"
                placeholder="Selecione um gênero" class="w-full" />
            </div>
          </div>
          <div class="flex gap-2 flex-col">
            <label class="font-semibold">Preço Base</label>
            <div class="flex-auto flex flex-col gap-2">
              <InputNumber inputId="currency-us" mode="currency" currency="BRL" locale="pt-BR" autocomplete="off"
                v-model="newProductBasePrice" />
              <span class="text-xs">*Preço base para o produto. Você poderá alterar o preço na próxima página.</span>
            </div>
          </div>
        </div>
        <div class="flex gap-2 flex-col">
          <label class="font-semibold">Estoque Base</label>
          <div class="flex-auto flex flex-col gap-2">
            <InputNumber autocomplete="off" v-model="newProductBaseStockQuantity" />
            <span class="text-xs">*Quantidade base de produtos no estoque.Você poderá alterar esse número na próxima
              página para cada item.</span>
          </div>
        </div>
        <div class="flex gap-2 flex-col">
          <label class="font-semibold">Tamanhos disponíveis</label>
          <div class="flex-auto flex flex-col gap-2">
            <InputText autocomplete="off" v-model="newProductSizes" />
            <span class="text-xs">*Separe os tamanhos por vírgula. Ex: P, M, G, GG...</span>
          </div>
        </div>
        <div class="flex gap-2 flex-col">
          <label class="font-semibold">Cores disponíveis</label>
          <div class="flex-auto flex flex-col gap-2">
            <InputText autocomplete="off" v-model="newProductColors" />
            <span class="text-xs">*Separe as cores por vírgula. Ex: Azul, Amarelo, Vermelho, Laranja...</span>
          </div>
        </div>
        <!-- Botões -->
        <div class="flex justify-end gap-2">
          <Button type="button" label="Cancelar" severity="secondary" @click="handleOnCloseModal"></Button>
          <Button type="button" label="Avançar" @click="handleOnNextPage"></Button>
        </div>
      </form>
    </div>
    <!-- Página 2 -->
    <div v-if="pageTracker == 1">
      <DataTable :value="newProductFeatures" tableStyle="min-width: 50rem">
        <Column field="size" header="TAMANHO" />
        <Column field="color" header="COR" />
        <Column field="price" header="PREÇO">
          <template #body="slotProps">
            <InputNumber inputId="currency-us" mode="currency" currency="BRL" locale="pt-BR" autocomplete="off"
              v-model="slotProps.data.price" />
          </template>
        </Column>
        <Column field="stockQuantity" header="ESTOQUE">
          <template #body="slotProps">
            <InputNumber autocomplete="off" v-model="slotProps.data.stockQuantity" />
          </template>
        </Column>
      </DataTable>
      <!-- Botões -->
      <div class="flex justify-end gap-2 mt-4">
        <Button type="button" label="Voltar" severity="secondary" @click="handleOnBackPage"></Button>
        <Button type="button" label="Finalizar Cadastro" @click="handleOnSubmitForm"></Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import type { ProductSend } from '~/interfaces/send/Product';

const props = defineProps<{
  onAddProduct: (newProduct: ProductSend) => boolean;
}>();

//Pinia Modal Store
const { newProductIsOpen } = storeToRefs(useModalStore());
const { setToggleNewProduct } = useModalStore();

//Armazenar valores do formulário
const newProductColors = ref('');
const newProductSizes = ref('');
const newProductBasePrice = ref(0);
const newProductBaseStockQuantity = ref(0);

const newProductFeatures: ProductSend['features'] = reactive([{
  color: '',
  size: '',
  price: 0,
  stockQuantity: 0,
}])

const newProduct: ProductSend = reactive({
  companyId: '',
  name: '',
  description: '',
  gender: '',
  features: newProductFeatures
})

const pageTracker = ref(0);

const handleOnSubmitForm = async () => {
  // Adicionar o produto antes de resetar os valores do formulário
  if (props.onAddProduct(newProduct)) setToggleNewProduct()
};

const handleOnNextPage = () => {
  // Dividir as strings de cores e tamanhos por vírgulas e remover espaços extras
  const colors = newProductColors.value.split(',').map(color => color.trim());
  const sizes = newProductSizes.value.split(',').map(size => size.trim());

  // Limpar o array `features` usando splice para garantir que seja esvaziado corretamente
  newProduct.features.splice(0, newProduct.features.length);

  // Gerar combinações de cor e tamanho
  colors.forEach(color => {
    sizes.forEach(size => {
      // Verificar se a combinação já existe no array features
      const exists = newProduct.features.some(
        feature => feature.color === color && feature.size === size
      );

      if (!exists) {
        newProduct.features.push({
          color,
          size,
          price: newProductBasePrice.value,
          stockQuantity: newProductBaseStockQuantity.value,
        });
      }
    });
  });

  // Avançar para a próxima página
  pageTracker.value = 1;
};

const handleOnBackPage = () => {
  pageTracker.value = 0;
};

// Função para resetar o formulário
const resetForm = () => {
  pageTracker.value = 0;

  // Resetar o objeto newProduct e valores auxiliares
  newProduct.companyId = '';
  newProduct.name = '';
  newProduct.description = '';
  newProduct.gender = '';
  newProduct.features.splice(0, newProduct.features.length); // Limpar corretamente
  newProductColors.value = '';
  newProductSizes.value = '';
  newProductBasePrice.value = 0;
  newProductBaseStockQuantity.value = 0;
};

const handleOnCloseModal = () => {
  setToggleNewProduct();
};

// Verifica se o modal foi fechado e reseta o formulário
watch(() => newProductIsOpen.value, (value) => {
  if (!value) {
    resetForm();
  }
});


const formGenderOptions = [
  { label: 'Masculino', value: 'MASCULINO' },
  { label: 'Feminino', value: 'FEMININO' },
  { label: 'Unissex', value: 'UNISSEX' },
]

</script>

<style scoped></style>