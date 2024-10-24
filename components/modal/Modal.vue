<template>
  <div>
    <Dialog :visible="props.isOpen" :header="props.header" modal @update:visible="updateIsOpen">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ props.description }}</span>
      <slot></slot>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

// Definindo os eventos que o modal pode emitir
const emit = defineEmits(['update:isOpen']);

// Função para emitir a atualização de visibilidade
const updateIsOpen = (value: boolean) => {
  emit('update:isOpen', value);
};

</script>

<style scoped></style>