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

  </div>
</template>

<script setup>
//Icons
import checkoutIcon from "@/assets/images/icons/checkout.png"
import invoiceIcon from "@/assets/images/icons/invoice.png"
import fastdeliveryIcon from "@/assets/images/icons/fastdelivery.png"
import bestsellerIcon from "@/assets/images/icons/bestseller.png"

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

</script>

<style lang="scss" scoped></style>