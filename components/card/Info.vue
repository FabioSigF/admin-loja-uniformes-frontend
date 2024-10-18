<template>
  <div>
    <Container>
      <div>
        <h4 class="uppercase text-surface-400 mb-4">{{ props.title }}</h4>
        <div class="flex items-center gap-4 mb-4">
          <img :src="props.imageName" :alt="props.title" class="w-[48px] h-[48px]">
          <div class="inline-block">
            <span class="text-title text-2xl mr-2">{{ props.info }}</span>
            <span v-if="props.infoComplement">{{ props.infoComplement }}</span>
          </div>
        </div>
        <a v-if="props.link" :href="props.link" class="text-primary underline">{{ props.linkText }}</a>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  imageName: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: false,
  },
  linkText: {
    type: String,
    required: false,
  },
  info: {
    type: String,
    required: true,
  },
  infoComplement: {
    type: String,
    required: false,
  }
})
</script>

<style scoped></style>