<template>
  <div>
    <h3 class="text-xl font-semibold mb-8">Últimas vendas</h3>


    <div v-if="props.data" class="flex flex-col gap-4">
      <DataTable :value="props.data.content" tableStyle="min-width: 50rem">
        <Column field="companyId" header="RESUMO">
          <template #body="slotProps">
            <div class="flex flex-col gap-2">
              <span class="font-semibold block">
                {{ slotProps.data.company && truncateText(slotProps.data.company.name, 80) }}
              </span>
              <span class="block text-sm text-gray-500">
                {{ truncateText(formatSummary(slotProps.data.saleItems), 80) }}
              </span>
            </div>
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
              <Button v-tooltip.top="'Ver detalhes da venda'" @click="handleOnClickDetailsProduct(slotProps.data.id)" severity="secondary" outlined>
                <template #icon>
                  <Icon name="mynaui:eye" size="24px" />
                </template>
              </Button>
              <Button v-tooltip.top="'Editar venda'" @click="handleOnClickEditProduct(slotProps.data.id)" severity="info" outlined>
                <template #icon>
                  <Icon name="mynaui:edit-one" size="24px" />
                </template>
              </Button>
              <Button v-tooltip.top="'Remover venda'" @click="handleOnClickRemoveProduct(slotProps.data.id)" severity="danger" outlined>
                <template #icon>
                  <Icon name="mynaui:trash" size="24px" />
                </template>
              </Button>
            </div>
          </template>
        </Column>
      </DataTable>
      <Paginator :rows="props.data.size" :totalRecords="props.data.totalElements" :rowsPerPageOptions="[5, 10, 20]"
        @page="onPageChange" @rowsPerPageChange="onRowsPerPageChange">
      </Paginator>
    </div>
    <div v-else>
      Não foi possível encontrar nenhuma venda
    </div>
  </div>
</template>

<script setup lang="ts">

import { type PagedSaleReceive } from "@/interfaces/receive/Sale";

const props = defineProps<{
  data?: PagedSaleReceive
}>()

const emit = defineEmits<{
  (e: 'pageChange', page: number, limit: number): void
}>();

const onPageChange = (event: any) => {
  emit('pageChange', event.page + 1, event.rows); // Adiciona 1 porque a página é baseada em zero
}

const onRowsPerPageChange = (event: any) => {
  emit('pageChange', 1, event.rows); // Reset to the first page when changing rows per page
}

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