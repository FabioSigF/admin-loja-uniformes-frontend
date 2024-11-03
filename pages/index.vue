<template>
  <div class="flex flex-col gap-8">
    <Container>
      <div class="flex gap-8 items-center justify-between">
        <div>
          <h2 class="font-semibold mb-4 text-3xl">Bem vindo(a),<br><span class="text-primary">{{ loggedUserNick
              }}</span>
          </h2>
          <p class="mb-8">Confira as principais informações da sua loja. Ou, faça uma nova venda!</p>
          <Button label="Nova venda" @click="handleOnClickCreateSell" />
        </div>
        <img src="../assets//images/vector01.png" alt="People working on admin panel">
      </div>
    </Container>

    <section class="grid grid-cols-4 gap-8">
      <CardInfo v-for="infoCard in infoCards" :key="infoCard.title" :title="infoCard.title"
        :image-name="infoCard.imageName" :info="infoCard.info" :info-complement="infoCard.infoComplement"
        :link="infoCard.link" :link-text="infoCard.linkText" />
    </section>

    <section class="grid grid-cols-10 gap-8">
      <Container class="col-span-6">
        <h3 class="text-xl font-semibold mb-8">Vendas no ano de {{ currentYear }}</h3>
        <ChartSalesBar :sales="saleItems" />
      </Container>
      <Container class="col-span-4">
        <h3 class="text-xl font-semibold mb-8">Empresas que mais faturaram em {{ currentYear }}</h3>
        <ChartSalesDoughnut :sales="saleItems" />
      </Container>
    </section>

    <Container>
      <TableLastSales :data="dataLastSaleItems" @pageChange="fetchLastSales" />
    </Container>

  </div>
</template>

<script setup lang="ts">
//Icons
import checkoutIcon from "@/assets/images/icons/checkout.png"
import invoiceIcon from "@/assets/images/icons/invoice.png"
import fastdeliveryIcon from "@/assets/images/icons/fastdelivery.png"
import bestsellerIcon from "@/assets/images/icons/bestseller.png"

//Types
import { type PagedSaleReceive, type SaleReceive } from "~/interfaces/receive/Sale";

//Pinia
import { useConfigStore } from "~/stores/useConfigStore";

const loggedUserNick = ref('Silvana');
const infoCards = ref([
  {
    title: 'Vendas do mês',
    imageName: checkoutIcon,
    info: '135',
    infoComplement: 'uniformes',
    link: '/sales',
    linkText: 'Ver vendas do mês'
  },
  {
    title: 'Faturamento do mês',
    imageName: invoiceIcon,
    info: 'R$ 27.789,0',
    link: '/sales',
    linkText: 'Ver faturamento do mês'
  },
  {
    title: 'Pedidos feitos hoje',
    imageName: fastdeliveryIcon,
    info: '12',
    infoComplement: 'pedidos',
    link: '/clients',
    linkText: 'Ver pedidos de hoje'
  },
  {
    title: 'Empresa mais lucrativa',
    imageName: bestsellerIcon,
    info: 'Metta',
    link: '/clients',
    linkText: 'Ver empresa estrela do mês'
  }
]);

const router = useRouter();
const saleItems = ref<SaleReceive[]>([]);
const dataLastSaleItems = ref<PagedSaleReceive>();
const config = useRuntimeConfig();

// Pega token de autenticação
const { token } = storeToRefs(useConfigStore());


// Obtém o ano atual
const currentYear = new Date().getFullYear();

// Define o primeiro e o último dia do ano atual
const startDate = `${currentYear}-01-01`;
const endDate = `${currentYear}-12-31`;

// Busca por todas as vendas do ano
const fetchSales = async () => {
  // Lógica para buscar as vendas
  const { execute, data, error } = useFetch<SaleReceive[]>(`${config.public.API_URL}/sale/by-date/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
    params: {
      startDate,
      endDate,
    },
    lazy: true
  });
  await execute();
  if (error.value) {
    console.error('Erro ao buscar vendas:', error.value);
  } else {
    saleItems.value = data.value || [];
  }
}

// Busca por últimas vendas
const fetchLastSales = async (page: number, limit: number) => {
  // Lógica para buscar as vendas com base na nova página
  const { execute, data, error } = useFetch<PagedSaleReceive>(`${config.public.API_URL}/sale/by-date/pagination/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
    params: {
      startDate,
      endDate,
      page,
      limit
    },
    lazy: true
  });

  await execute();

  if (error.value) {
    console.error('Erro ao buscar últimas vendas:', error.value);
  } else {
    dataLastSaleItems.value = data.value || undefined;
  }
};

// Busca vendas quando montar a página
onMounted(async () => {
  await fetchSales();

  await fetchLastSales(1, 5);
});


const handleOnClickCreateSell = () => {
  console.log('Nova venda');
  router.push('apps/business/new-sale');
}


</script>

<style lang="scss" scoped></style>