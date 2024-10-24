<template>
  <div class="flex flex-col gap-8">
    <Container>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="mb-4">Cadastrar Empresa</h2>
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
    <InputGroup>
      <InputGroupAddon>
        <Icon name="mynaui:search" size="24px" />
      </InputGroupAddon>
      <InputText v-model="textSearch" placeholder="Buscar..." />
    </InputGroup>

    <Container>
      <TableCompanies :companies="companyItems"/>
    </Container>
  </div>
</template>

<script setup lang="ts">
//Icons
import shoppinglist from "@/assets/images/icons/shoppinglist.png"
import bestsellerIcon from "@/assets/images/icons/bestseller.png"
import tracking from "@/assets/images/icons/tracking.png"
import ecommerce from "@/assets/images/icons/ecommerce.png"
import type { CompanyReceive } from "~/interfaces/receive/Company";


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

const companyItems = ref < CompanyReceive[] > (
  [
  {
    "id": "1",
    "name": "Alpha Uniformes",
    "cnpj": "12.345.678/0001-90",
    "category": "Vestuário",
    "phones": ["+55 11 98765-4321", "+55 11 12345-6789"],
    "createdAt": "2023-01-15T10:30:00",
    "updatedAt": "2023-10-12T14:50:00"
  },
  {
    "id": "2",
    "name": "Bravo Confecções",
    "cnpj": "98.765.432/0001-55",
    "category": "Vestuário",
    "phones": ["+55 21 98765-4321"],
    "createdAt": "2023-02-20T11:00:00",
    "updatedAt": "2023-10-10T09:30:00"
  },
  {
    "id": "3",
    "name": "Charlie Uniformes Industriais",
    "cnpj": "12.567.890/0001-43",
    "category": "Indústria",
    "phones": ["+55 31 91234-5678", "+55 31 93456-7890"],
    "createdAt": "2023-03-05T15:20:00",
    "updatedAt": "2023-09-22T17:45:00"
  },
  {
    "id": "4",
    "name": "Delta Moda",
    "cnpj": "45.678.910/0001-22",
    "category": "Moda",
    "phones": ["+55 41 95678-4321"],
    "createdAt": "2023-04-18T09:15:00",
    "updatedAt": "2023-10-03T08:00:00"
  },
  {
    "id": "5",
    "name": "Echo Uniformes Escolares",
    "cnpj": "67.890.123/0001-77",
    "category": "Educação",
    "phones": ["+55 51 98765-4321", "+55 51 12345-6789"],
    "createdAt": "2023-05-10T14:40:00",
    "updatedAt": "2023-10-14T13:30:00"
  },
  {
    "id": "6",
    "name": "Foxtrot Fardas Profissionais",
    "cnpj": "34.567.890/0001-99",
    "category": "Serviços",
    "phones": ["+55 61 91234-5678"],
    "createdAt": "2023-06-22T12:50:00",
    "updatedAt": "2023-09-30T16:10:00"
  },
  {
    "id": "7",
    "name": "Golf Uniformes Corporativos",
    "cnpj": "12.987.654/0001-88",
    "category": "Corporativo",
    "phones": ["+55 71 98765-1234", "+55 71 93456-7890"],
    "createdAt": "2023-07-12T13:20:00",
    "updatedAt": "2023-10-16T11:45:00"
  },
  {
    "id": "8",
    "name": "Hotel Confecções",
    "cnpj": "56.789.012/0001-33",
    "category": "Vestuário",
    "phones": ["+55 81 92345-6789"],
    "createdAt": "2023-08-05T14:30:00",
    "updatedAt": "2023-10-02T09:50:00"
  },
  {
    "id": "9",
    "name": "India Uniformes Militares",
    "cnpj": "89.012.345/0001-44",
    "category": "Militar",
    "phones": ["+55 91 98765-4321"],
    "createdAt": "2023-09-01T17:00:00",
    "updatedAt": "2023-10-01T10:30:00"
  },
  {
    "id": "10",
    "name": "Juliet Uniformes Médicos",
    "cnpj": "11.234.567/0001-11",
    "category": "Saúde",
    "phones": ["+55 31 92345-1234", "+55 31 98765-9876"],
    "createdAt": "2023-09-25T11:45:00",
    "updatedAt": "2023-10-15T15:20:00"
  }
]
)

const handleOnCreateNewCompany = () => {
  navigateTo('/apps/business/new-company');
}


const textSearch = ref('');
</script>

<style scoped></style>