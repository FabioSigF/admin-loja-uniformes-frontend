<template>
  <main>
    <aside id="sidebar" class="fixed top-0 bg-white h-screen w-[300px] px-6 shadow-md overflow-auto">
      <!-- Header -->
      <section class="pt-3 pb-6 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <a href="/">
            <img src="../assets/images/logo.png" alt="Painel Admin Loja Uniformes">
          </a>
        </div>
      </section>

      <!-- Menu-->
      <section>
        <Menu :model="routeList" class="w-full overflow-auto">
          <template #item="{ item, props }">
            <nuxt-link v-if="item.url" v-slot="{ href, navigate }" :to="item.url" custom>
              <a :href="href" @click="navigate">
                <Icon :name="item.icon ?? 'default-icon-name'" size="24px" />
                <span data-pc-section="itemLabel">{{ item.label }}</span>
              </a>
            </nuxt-link>
          </template>
        </Menu>
      </section>
    </aside>

    <div class="ml-[300px]">
      <div class="p-6 w-full">
        <div class="flex items-center gap-8 mb-8">
          <InputGroup>
            <InputGroupAddon>
              <Icon name="mynaui:search" size="24px" />
            </InputGroupAddon>
            <InputText v-model="textSearch" placeholder="Buscar..." />
          </InputGroup>
          <div class="flex items-center gap-4">
            <Button class="!rounded-full">
              <template #icon>
                <Icon name="mynaui:bell" size="24px" />
              </template>
            </Button>
            <Button class="!rounded-full">
              <template #icon>
                <Icon name="mynaui:config" size="24px" />
              </template>
            </Button>
            <Button class="!rounded-full">
              <template #icon>
                <Icon name="mynaui:user" size="24px" />
              </template>
            </Button>
          </div>
        </div>
        <NuxtPage></NuxtPage>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
//Pinia
import { storeToRefs } from 'pinia';
import { useRoutesStore } from '~/stores/useRoutesStore';

//Components
import Menu from 'primevue/menu';

//States
const { routeList } = storeToRefs(useRoutesStore());

const textSearch = ref('');

</script>

<style lang="css" scoped></style>