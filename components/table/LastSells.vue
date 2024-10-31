<template>
  <div>
    <h3 class="text-xl font-semibold mb-8">Últimas vendas</h3>
    <DataTable :value="props.sales" tableStyle="min-width: 50rem">
      <Column header="EMPRESA">
        <template #body="slotProps">
          {{ slotProps.data.company && truncateText(slotProps.data.company.name, 25) }}
        </template>
      </Column>
      <Column field="companyId" header="RESUMO">
        <template #body="slotProps">
          {{ truncateText(formatSummary(slotProps.data.saleItems), 60) }}
        </template>
      </Column>
      <Column field="totalPrice" header="PREÇO">
        <template #body="slotProps">
          <span class="block whitespace-nowrap">
            R$ {{ slotProps.data.totalPrice && slotProps.data.totalPrice.toFixed(2) }}
          </span>
        </template>
      </Column>
      <Column field="createdAt" header="DATA">
        <template #body="slotProps">
          {{ formatDateToMMM(slotProps.data.createdAt) }}
        </template>
      </Column>
      <Column field="actions" header="AÇÔES">
        <template #body="slotProps">
          <div class="flex gap-2 items-center">
            <Button @click="handleOnClickDetailsProduct(slotProps.data.id)" severity="secondary" outlined>
              <template #icon>
                <Icon name="mynaui:eye" size="24px" />
              </template>
            </Button>
            <Button @click="handleOnClickEditProduct(slotProps.data.id)" severity="info" outlined>
              <template #icon>
                <Icon name="mynaui:edit-one" size="24px" />
              </template>
            </Button>
            <Button @click="handleOnClickRemoveProduct(slotProps.data.id)" severity="danger" outlined>
              <template #icon>
                <Icon name="mynaui:trash" size="24px" />
              </template>
            </Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">

import { type SaleReceive } from "@/interfaces/receive/Sale";

const props = defineProps({
  sales: {
    type: Array as PropType<SaleReceive[]>,
    required: true
  }
})

const handleOnClickDetailsProduct = (id: number) => {
  console.log(id)
}

const handleOnClickEditProduct = (id: number) => {
  console.log(id)
}

const handleOnClickRemoveProduct = (id: number) => {
  console.log(id)
}

const formatSummary = (saleItems: any[]) => {
  return saleItems
    .map(item => `${item.amount}x ${item.product.productName}`) // Formata a string
    .join(', '); // Junta os itens com vírgula
}


</script>

<style scoped></style>