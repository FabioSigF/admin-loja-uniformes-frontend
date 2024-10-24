<template>
  <div class="flex flex-col gap-8">
    <Container>
      <div class="flex gap-8 items-center justify-between">
        <div>
          <h2 class="font-semibold mb-4 text-3xl">Bem vindo(a),<br><span class="text-primary">{{ loggedUserNick
              }}</span>
          </h2>
          <p class="mb-4">Confira as principais informações da sua loja. Ou, faça uma nova venda!</p>
          <Button label="Nova venda" />
        </div>
        <img src="../assets//images/vector01.png" alt="People working on admin panel">
      </div>
    </Container>

    <div class="grid grid-cols-4 gap-8">
      <CardInfo v-for="infoCard in infoCards" :key="infoCard.title" :title="infoCard.title"
        :image-name="infoCard.imageName" :info="infoCard.info" :info-complement="infoCard.infoComplement"
        :link="infoCard.link" :link-text="infoCard.linkText" />
    </div>

    <Container>
      <TableLastSells :sales="saleItems" />
    </Container>

  </div>
</template>

<script setup lang="ts">
//Icons
import checkoutIcon from "@/assets/images/icons/checkout.png"
import invoiceIcon from "@/assets/images/icons/invoice.png"
import fastdeliveryIcon from "@/assets/images/icons/fastdelivery.png"
import bestsellerIcon from "@/assets/images/icons/bestseller.png"
import { type SaleReceive } from "~/interfaces/receive/Sale";

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

// const saleItems = ref < SaleReceive[] > (
//   [
//     {
//       "id": "2b3c4d5e",
//       "companyId": "c9d8e7f6",
//       "createdAt": "2024-10-18T08:45:00Z",
//       "updatedAt": "2024-10-18T09:15:00Z",
//       "deleted": false,
//       "saleItems": [
//         {
//           "id": "item6",
//           "product": {
//             "productId": "prod6",
//             "productName": "Product F",
//             "color": "Azul Marinho",
//             "size": "M",
//             "amount": 2,
//             "price": 39.90
//           },
//           "price": 120.0,
//           "amount": 2
//         },
//         {
//           "id": "item7",
//           "product": {
//             "productId": "prod7",
//             "productName": "Product G",
//             "color": "Azul Marinho",
//             "size": "M",
//             "amount": 2,
//             "price": 39.90
//           },
//           "price": 90.0,
//           "amount": 3
//         }
//       ]
//     },
//     {
//       "id": "3c4d5e6f",
//       "companyId": "a7b6c5d4",
//       "createdAt": "2024-10-17T10:20:00Z",
//       "updatedAt": "2024-10-17T10:45:00Z",
//       "deleted": false,
//       "saleItems": [
//         {
//           "id": "item8",
//           "product": {
//             "productId": "prod8",
//             "productName": "Product H",
//             "color": "Azul Marinho",
//             "size": "M",
//             "amount": 2,
//             "price": 39.90
//           },
//           "price": 60.0,
//           "amount": 1
//         },
//         {
//           "id": "item9",
//           "product": {
//             "productId": "prod9",
//             "productName": "Product I",
//             "color": "Azul Marinho",
//             "size": "M",
//             "amount": 2,
//             "price": 39.90
//           },
//           "price": 80.0,
//           "amount": 5
//         },
//         {
//           "id": "item10",
//           "product": {
//             "productId": "prod10",
//             "productName": "Product J",
//             "color": "Azul Marinho",
//             "size": "M",
//             "amount": 2,
//             "price": 39.90
//           },
//           "price": 100.0,
//           "amount": 1
//         }
//       ]
//     },
//     {
//       "id": "4d5e6f7g",
//       "companyId": "e8f7g6h5",
//       "createdAt": "2024-10-16T14:00:00Z",
//       "updatedAt": "2024-10-16T14:30:00Z",
//       "deleted": true,
//       "saleItems": [
//         {
//           "id": "item11",
//           "product": {
//             "productId": "prod11",
//             "productName": "Product K",
//             "color": "Azul Marinho",
//             "size": "M",
//             "amount": 2,
//             "price": 39.90
//           },
//           "price": 110.0,
//           "amount": 2
//         }
//       ]
//     },
//     {
//       "id": "5e6f7g8h",
//       "companyId": "b4c3d2e1",
//       "createdAt": "2024-10-15T11:00:00Z",
//       "updatedAt": "2024-10-15T11:20:00Z",
//       "deleted": false,
//       "saleItems": [
//         {
//           "id": "item12",
//           "product": {
//             "productId": "prod12",
//             "productName": "Product L",
//             "color": "Azul Marinho",
//             "size": "M",
//             "amount": 2,
//             "price": 39.90
//           },
//           "price": 250.0,
//           "amount": 1
//         },
//         {
//           "id": "item13",
//           "product": {
//             "productId": "prod13",
//             "productName": "Product M",
//             "color": "Azul Marinho",
//             "size": "M",
//             "amount": 2,
//             "price": 39.90
//           },
//           "price": 300.0,
//           "amount": 3
//         }
//       ]
//     },
//     {
//       "id": "6f7g8h9i",
//       "companyId": "f1g2h3i4",
//       "createdAt": "2024-10-14T09:30:00Z",
//       "updatedAt": "2024-10-14T10:00:00Z",
//       "deleted": false,
//       "saleItems": [
//         {
//           "id": "item14",
//           "product": {
//             "productId": "prod14",
//             "productName": "Product N",
//             "color": "Azul Marinho",
//             "size": "M",
//             "amount": 2,
//             "price": 39.90
//           },
//           "price": 180.0,
//           "amount": 2
//         },
//         {
//           "id": "item15",
//           "product": {
//             "productId": "prod15",
//             "productName": "Product O",
//             "color": "Azul Marinho",
//             "size": "M",
//             "amount": 2,
//             "price": 39.90
//           },
//           "price": 75.0,
//           "amount": 4
//         }
//       ]
//     }
//   ]

// )

const saleItems = ref<SaleReceive[]>([]);

onMounted(async () => {
  const response = await fetch('/api/sale'); // Faz uma chamada para o endpoint que você criou
  if (response.ok) {
    saleItems.value = await response.json();
    console.log('Vendas:', saleItems.value);
  } else {
    console.error('Erro ao buscar vendas:', response.statusText);
  }
});

</script>

<style lang="scss" scoped></style>