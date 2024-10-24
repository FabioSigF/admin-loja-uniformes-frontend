<template>
  <div class="flex flex-col gap-8">
    <Container>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="mb-4">Empresas</h2>
          <Breadcrumb :model="breadcrumbItems" />
        </div>
      </div>
    </Container>

    <div class="grid grid-cols-4 gap-8">
      <CardInfo v-for="infoCard in infoCards" :key="infoCard.title" :title="infoCard.title"
        :image-name="infoCard.imageName" :info="infoCard.info" :info-complement="infoCard.infoComplement" />
    </div>
  </div>
</template>

<script setup lang="ts">
//Icons
import tracking from "@/assets/images/icons/tracking.png"
import ewallet from "@/assets/images/icons/ewallet.png"
import suit from "@/assets/images/icons/suit.png"
import invoice from "@/assets/images/icons/invoice.png"

const breadcrumbItems = ref([
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
</script>

<style scoped></style>