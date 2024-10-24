<template>
  <div>
    <div class="text-xl font-semibold mb-8">Empresas</div>
    <DataTable :value="props.companies" tableStyle="min-width: 50rem">
      <Column field="name" header="EMPRESA"></Column>
      <Column field="category" header="STATUS"></Column>
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
import type { CompanyReceive } from "~/interfaces/receive/Company";

const props = defineProps({
  companies: {
    type: Array as PropType<CompanyReceive[]>,
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