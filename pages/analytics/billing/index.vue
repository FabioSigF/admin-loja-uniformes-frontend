<template>
  <div class="flex flex-col gap-8">
    <Container>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="mb-4">Faturamento</h2>
          <Breadcrumb :model="items" />
        </div>
        <Button label="Criar nova empresa" />
      </div>
    </Container>
    <div class="grid grid-cols-4 gap-8">
      <CardInfo v-for="infoCard in infoCards" :key="infoCard.title" :title="infoCard.title"
        :image-name="infoCard.imageName" :info="infoCard.info" :info-complement="infoCard.infoComplement" />
    </div>

    <Container>
      <TableLastSells :sales="saleItems" />
    </Container>
  </div>
</template>

<script setup lang="ts">
//Icons
import tracking from "@/assets/images/icons/tracking.png"
import ewallet from "@/assets/images/icons/ewallet.png"
import suit from "@/assets/images/icons/suit.png"
import invoice from "@/assets/images/icons/invoice.png"
import { type SaleReceive } from "~/interfaces/receive/Sale";


const items = ref([
  { label: 'Analítico' },
  { label: 'Faturamento' },
]);

const infoCards = ref([
  {
    title: 'Novos pedidos do mês',
    imageName: tracking,
    info: '12',
    infoComplement: 'pedidos',
  },
  {
    title: 'Faturamento do mês',
    imageName: ewallet,
    info: 'R$ 8.900,00',
  },
  {
    title: 'Empresa mais lucrativa',
    imageName: suit,
    info: '255',
    infoComplement: 'peças',
  },
  {
    title: 'Faturamento do ano',
    imageName: invoice,
    info: 'R$ 27.900,00',
  }
]);

const saleItems = ref<SaleReceive[]>([]);
const config = useRuntimeConfig();

// Pega token de autenticação
const { token } = storeToRefs(useConfigStore());

// Busca por vendas
const { execute, data, error } = useFetch<SaleReceive[]>(`${config.public.API_URL}/sale`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token.value}`
  },
  lazy: true
});

// Busca vendas quando montar a página
onMounted(async () => {
  await execute();
  if (error.value) {
    console.error('Erro ao buscar vendas:', error.value);
  } else {
    saleItems.value = data.value || [];
    console.log('Vendas:', saleItems.value);
  }
});

</script>

<style scoped></style>