<template>
  <div>
    <div class="text-xl font-semibold mb-8">Últimas vendas</div>
    <DataTable :value="props.sales" tableStyle="min-width: 50rem">
      <Column field="id" header="ID PEDIDO"></Column>
      <Column header="EMPRESA">
        <template #body="slotProps">
          {{ slotProps.data.company ? slotProps.data.company.name : 'Empresa não definida' }}
        </template>
      </Column>
      <Column field="companyId" header="RESUMO"></Column>
      <Column field="category" header="STATUS"></Column>
      <Column field="quantity" header="PREÇO"></Column>
      <Column field="actions" header="AÇÔES" class="w-[442px]">
        <template #body="slotProps">
          <div class="flex gap-2 items-center">
            <Button label="Detalhes" @click="handleOnClickDetailsProduct(slotProps.data.id)" severity="secondary"
              outlined>
              <template #icon>
                <Icon name="mynaui:eye" size="24px" />
              </template>
            </Button>
            <Button label="Editar" @click="handleOnClickEditProduct(slotProps.data.id)" severity="info" outlined>
              <template #icon>
                <Icon name="mynaui:edit-one" size="24px" />
              </template>
            </Button>
            <Button label="Remover" @click="handleOnClickRemoveProduct(slotProps.data.id)" severity="danger" outlined>
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

</script>

<style scoped></style>