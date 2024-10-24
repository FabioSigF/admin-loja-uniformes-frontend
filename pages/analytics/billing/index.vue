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

const saleItems = ref<SaleReceive[]>(
  [
    {
      "id": "2b3c4d5e",
      "company": {
        "id": "c9d8e7f6",
        "name": "Company A",
        "cnpj": "12.345.678/0001-90",
        "category": "Vestuário",
        "phones": [
          "(11) 1234-5678",
          "(11) 9876-5432"
        ],
        "createdAt": "2024-10-18T08:45:00Z",
        "updatedAt": "2024-10-18T09:15:00Z"
      },
      "createdAt": "2024-10-18T08:45:00Z",
      "updatedAt": "2024-10-18T09:15:00Z",
      "deleted": false,
      "description": "6x Camiseta P Branco, 2x Bermudas M Padrão, 3x Calças M Padrão",
      "saleItems": [
        {
          "id": "item6",
          "product": {
            "productId": "prod6",
            "productName": "Product F",
            "color": "Azul Marinho",
            "size": "M",
            "amount": 2,
            "price": 39.90
          },
          "price": 120.0,
          "amount": 2
        },
        {
          "id": "item7",
          "product": {
            "productId": "prod7",
            "productName": "Product G",
            "color": "Azul Marinho",
            "size": "M",
            "amount": 2,
            "price": 39.90
          },
          "price": 90.0,
          "amount": 3
        }
      ]
    },
    {
      "id": "2b3c4d5e",
      "company": {
        "id": "c9d8e7f6",
        "name": "Company A",
        "cnpj": "12.345.678/0001-90",
        "category": "Vestuário",
        "phones": [
          "(11) 1234-5678",
          "(11) 9876-5432"
        ],
        "createdAt": "2024-10-18T08:45:00Z",
        "updatedAt": "2024-10-18T09:15:00Z"
      },
      "createdAt": "2024-10-18T08:45:00Z",
      "updatedAt": "2024-10-18T09:15:00Z",
      "deleted": false,
      "description": "6x Camiseta P Branco, 2x Bermudas M Padrão, 3x Calças M Padrão",
      "saleItems": [
        {
          "id": "item6",
          "product": {
            "productId": "prod6",
            "productName": "Product F",
            "color": "Azul Marinho",
            "size": "M",
            "amount": 2,
            "price": 39.90
          },
          "price": 120.0,
          "amount": 2
        },
        {
          "id": "item7",
          "product": {
            "productId": "prod7",
            "productName": "Product G",
            "color": "Azul Marinho",
            "size": "M",
            "amount": 2,
            "price": 39.90
          },
          "price": 90.0,
          "amount": 3
        }
      ]
    },
    {
      "id": "2b3c4d5e",
      "company": {
        "id": "c9d8e7f6",
        "name": "Company A",
        "cnpj": "12.345.678/0001-90",
        "category": "Vestuário",
        "phones": [
          "(11) 1234-5678",
          "(11) 9876-5432"
        ],
        "createdAt": "2024-10-18T08:45:00Z",
        "updatedAt": "2024-10-18T09:15:00Z"
      },
      "createdAt": "2024-10-18T08:45:00Z",
      "updatedAt": "2024-10-18T09:15:00Z",
      "deleted": false,
      "description": "6x Camiseta P Branco, 2x Bermudas M Padrão, 3x Calças M Padrão",
      "saleItems": [
        {
          "id": "item6",
          "product": {
            "productId": "prod6",
            "productName": "Product F",
            "color": "Azul Marinho",
            "size": "M",
            "amount": 2,
            "price": 39.90
          },
          "price": 120.0,
          "amount": 2
        },
        {
          "id": "item7",
          "product": {
            "productId": "prod7",
            "productName": "Product G",
            "color": "Azul Marinho",
            "size": "M",
            "amount": 2,
            "price": 39.90
          },
          "price": 90.0,
          "amount": 3
        }
      ]
    },
    {
      "id": "2b3c4d5e",
      "company": {
        "id": "c9d8e7f6",
        "name": "Company A",
        "cnpj": "12.345.678/0001-90",
        "category": "Vestuário",
        "phones": [
          "(11) 1234-5678",
          "(11) 9876-5432"
        ],
        "createdAt": "2024-10-18T08:45:00Z",
        "updatedAt": "2024-10-18T09:15:00Z"
      },
      "createdAt": "2024-10-18T08:45:00Z",
      "updatedAt": "2024-10-18T09:15:00Z",
      "deleted": false,
      "description": "6x Camiseta P Branco, 2x Bermudas M Padrão, 3x Calças M Padrão",
      "saleItems": [
        {
          "id": "item6",
          "product": {
            "productId": "prod6",
            "productName": "Product F",
            "color": "Azul Marinho",
            "size": "M",
            "amount": 2,
            "price": 39.90
          },
          "price": 120.0,
          "amount": 2
        },
        {
          "id": "item7",
          "product": {
            "productId": "prod7",
            "productName": "Product G",
            "color": "Azul Marinho",
            "size": "M",
            "amount": 2,
            "price": 39.90
          },
          "price": 90.0,
          "amount": 3
        }
      ]
    },
  ]

)

</script>

<style scoped></style>