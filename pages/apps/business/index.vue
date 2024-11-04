<template>
  <div class="flex flex-col gap-8">
    <Container>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="mb-4">Comércio</h2>
          <Breadcrumb :model="items" />
        </div>
        <Button label="Criar nova empresa" @click="handleOnCreateNewCompany" />
      </div>
    </Container>
    <div class="grid grid-cols-4 gap-8">
      <CardInfo v-for="infoCard in infoCards" :key="infoCard.title" :title="infoCard.title"
        :image-name="infoCard.imageName" :info="infoCard.info" :info-complement="infoCard.infoComplement"
        :link="infoCard.link" :link-text="infoCard.linkText" />
    </div>      
    <div class="flex items-center gap-4">
      <InputGroup>
        <InputGroupAddon>
          <Icon name="mynaui:search" size="24px" />
        </InputGroupAddon>
        <InputText v-model="textSearch" placeholder="Buscar..." />
      </InputGroup>
      <Button label="Buscar empresa" @click="handleOnSearchCompany" class="button_search" />
    </div>
    <Container>
      <TableCompanies :companies="companies" @pageChange="fetchCompanies" />
    </Container>
  </div>
</template>

<script setup lang="ts">
//Icons
import shoppinglist from "@/assets/images/icons/shoppinglist.png"
import bestsellerIcon from "@/assets/images/icons/bestseller.png"
import tracking from "@/assets/images/icons/tracking.png"
import ecommerce from "@/assets/images/icons/ecommerce.png"
import type { CompanyReceive, PagedCompanyReceive } from "~/interfaces/receive/Company";


const items = ref([
  { label: 'Inicio' },
  { label: 'Aplicativos' },
  { label: 'Comércio' },
]);

const infoCards = ref([
  {
    title: 'Empresas cadastradas',
    imageName: shoppinglist,
    info: '135',
    infoComplement: 'parceiros',
    link: '/sales',
    linkText: 'Ver todas as empresas'
  },
  {
    title: 'Empresa mais lucrativa',
    imageName: bestsellerIcon,
    info: 'Metta',
    link: '/sales',
    linkText: 'Ver empresa estrela do mês'
  },
  {
    title: 'Novos pedidos do mês',
    imageName: tracking,
    info: '12',
    infoComplement: 'pedidos',
    link: '/clients',
    linkText: 'Ver pedidos do mês'
  },
  {
    title: 'Novos parceiros do mês',
    imageName: ecommerce,
    info: '12',
    infoComplement: 'pedidos',
    link: '/clients',
    linkText: 'Ver novas parceiras'
  }
]);

const router = useRouter();
const companies = ref<PagedCompanyReceive>();
const config = useRuntimeConfig();

// Pega token de autenticação
const { token } = storeToRefs(useConfigStore());

// Busca pelas empresas
const fetchCompanies = async (page: number, limit: number) => {
  const { execute, data, error } = useFetch<PagedCompanyReceive>(`${config.public.API_URL}/companies/pagination/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`,
    },
    params: {
      page,
      limit
    },
    lazy: true
  });

  await execute();

  if (error.value) {
    console.error('Erro ao buscar empresas: ', error.value);
  } else {
    companies.value = data.value || undefined;
  }
}

// Busca vendas quando montar a página
onMounted(async () => {
  await fetchCompanies(1, 5);
});


const handleOnCreateNewCompany = () => {
  navigateTo('/apps/business/new-company');
}

const handleOnSearchCompany = () => {
  console.log('Buscando empresa:', textSearch.value);
}


const textSearch = ref('');
</script>

<style scoped>
.button_search {
  width: 160px!important;
}
</style>