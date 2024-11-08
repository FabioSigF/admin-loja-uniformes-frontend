<template>
  <div>
    <div class="flex flex-col gap-8">
      <Container>
        <div class="flex justify-between items-center">
          <div>
            <h2 class="mb-4">Comércio</h2>
            <Breadcrumb :model="breadcrumbItems" />
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
    <Toast />
  </div>
</template>

<script setup lang="ts">
//Icons
import shoppinglist from "@/assets/images/icons/shoppinglist.png"
import bestsellerIcon from "@/assets/images/icons/bestseller.png"
import tracking from "@/assets/images/icons/tracking.png"
import ecommerce from "@/assets/images/icons/ecommerce.png"
import type { CompanyReceive, PagedCompanyReceive } from "~/interfaces/receive/Company";
import { useToastStore } from "~/stores/useToastStore";

//Breadcrumb Items
const breadcrumbItems = ref([
  { label: 'Inicio' },
  { label: 'Aplicativos' },
  { label: 'Comércio' },
]);

//InfoCard data
const mostProfitableCompany = ref<CompanyReceive>();
const amountOfCompaniesCreatedOnMonth = ref<number>(0);
const amountOfCompanies = ref<number>(0);
const amountOfSales = ref<number>(0);

const companies = ref<PagedCompanyReceive>();

console.log(mostProfitableCompany.value)
const infoCards = computed(() => [
  {
    title: 'Empresas cadastradas',
    imageName: shoppinglist,
    info: amountOfCompanies.value.toString(),
    infoComplement: 'parceiros',
    link: '/sales',
    linkText: 'Ver todas as empresas'
  },
  {
    title: 'Empresa mais lucrativa',
    imageName: bestsellerIcon,
    info: mostProfitableCompany.value?.name || 'Desconhecido',
    link: '/sales',
    linkText: 'Ver empresa estrela do mês'
  },
  {
    title: 'Novos pedidos do mês',
    imageName: tracking,
    info: amountOfSales.value.toString(),
    infoComplement: 'pedidos',
    link: '/clients',
    linkText: 'Ver pedidos do mês'
  },
  {
    title: 'Novos parceiros no mês',
    imageName: ecommerce,
    info: amountOfCompaniesCreatedOnMonth.value.toString(),
    infoComplement: 'pedidos',
    link: '/clients',
    linkText: 'Ver novas parceiras'
  }
]);

// Obtém o ano atual
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

// Define o primeiro e o último dia do ano atual
const startDate = `${currentYear}-01-01`;
const endDate = `${currentYear}-12-31`;

const startMonth = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
const endMonth = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${lastDayOfMonth}`;


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

const fetchMostProfitableCompany = async () => {
  const { execute, data, error } = await useFetch<CompanyReceive>(`${config.public.API_URL}/companies/most-profitable-company`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`,
    },
    params: {
      startDate,
      endDate,
    }
  });

  await execute();

  if (error.value) {
    console.error('Erro ao buscar empresa mais lucrativa: ', error.value);
  } else {
    mostProfitableCompany.value = data.value || undefined;
  }
}

const fetchAmountOfCompaniesCreatedOnMonth = async () => {
  const { execute, data, error } = await useFetch<number>(`${config.public.API_URL}/companies/created-in-date-range`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`,
    },
    params: {
      startDate: startMonth,
      endDate: endMonth,
    }
  });

  await execute();

  if (error.value) {
    console.error('Erro ao buscar quantidade de empresas criadas no mês: ', error.value);
  } else {
    amountOfCompaniesCreatedOnMonth.value = data.value || 0;
  }
}

const fetchAmountOfCompanies = async () => {
  const { execute, data, error } = await useFetch<number>(`${config.public.API_URL}/companies/amount`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`,
    }
  });

  await execute();

  if (error.value) {
    console.error('Erro ao buscar quantidade de empresas cadastradas: ', error.value);
  } else {
    amountOfCompanies.value = data.value || 0;
  }
}

const fetchAmountOfSales = async () => {
  const { execute, data, error } = await useFetch<number>(`${config.public.API_URL}/sale/amount-in-date-range`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`,
    },
    params: {
      startDate: startMonth,
      endDate: endMonth,
    }
  });

  await execute();

  if (error.value) {
    console.error('Erro ao buscar quantidade de vendas realizadas: ', error.value);
  } else {
    amountOfSales.value = data.value || 0;
  }
}

// Busca vendas quando montar a página
onMounted(async () => {
  await fetchCompanies(1, 5);
  await fetchMostProfitableCompany();
  await fetchAmountOfCompaniesCreatedOnMonth();
  await fetchAmountOfCompanies();
  await fetchAmountOfSales();
});


const handleOnCreateNewCompany = () => {
  navigateTo('/apps/business/new-company');
}

const handleOnSearchCompany = () => {
  console.log('Buscando empresa:', textSearch.value);
}

const textSearch = ref('');

//Toast config
const toast = useToast();

const { companyWasCreatedInfo, getCompanyWasCreatedStatus, setToggleCompanyWasCreated } = useToastStore();
onMounted(() => {
  if (getCompanyWasCreatedStatus) {
    toast.add({ severity: companyWasCreatedInfo.severity, summary: companyWasCreatedInfo.summary, life: companyWasCreatedInfo.life });
    setToggleCompanyWasCreated();
  }
});
</script>

<style scoped>
.button_search {
  width: 160px !important;
}
</style>