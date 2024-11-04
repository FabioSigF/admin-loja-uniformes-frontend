<template>
  <div>
    <div class="text-xl font-semibold mb-8">Empresas</div>
    <div v-if="props.companies" class="flex flex-col gap-4">
      <DataTable :value="props.companies?.content" tableStyle="min-width: 50rem">
        <Column field="name" header="EMPRESA" class="w-full"></Column>
        <Column field="category" header="STATUS"></Column>
        <Column field="actions" header="AÇÔES">
          <template #body="slotProps">
            <div class="flex gap-2 items-center">
              <Button v-tooltip.top="'Ver detalhes da empresa'" @click="handleOnClickDetailsProduct(slotProps.data.id)"
                severity="secondary" outlined>
                <template #icon>
                  <Icon name="mynaui:eye" size="24px" />
                </template>
              </Button>
              <Button v-tooltip.top="'Editar empresa'" @click="handleOnClickEditProduct(slotProps.data.id)"
                severity="info" outlined>
                <template #icon>
                  <Icon name="mynaui:edit-one" size="24px" />
                </template>
              </Button>
              <Button v-tooltip.top="'Remover empresa'" @click="handleOnClickRemoveProduct(slotProps.data.id)"
                severity="danger" outlined>
                <template #icon>
                  <Icon name="mynaui:trash" size="24px" />
                </template>
              </Button>
              <Button label="Criar nova venda" @click="handleOnClickCreateSale(slotProps.data.id)" outlined />
            </div>
          </template>
        </Column>
      </DataTable>
      <Paginator :rows="props.companies.size" :totalRecords="props.companies.totalElements"
        :rowsPerPageOptions="[5, 10, 20]" @page="onPageChange" @rowsPerPageChange="onRowsPerPageChange">
      </Paginator>
    </div>
    <div v-else>
      Não foi possível encontrar nenhuma venda
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PagedCompanyReceive } from "~/interfaces/receive/Company";

const props = defineProps<{
  companies?: PagedCompanyReceive
}>()
console.log(props.companies)
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

const handleOnClickCreateSale = (id: number) => {
  console.log(id)
}

</script>

<style scoped></style>