<template>
  <NuxtLayout>
    <v-app>
      <!-- <v-pull-to-refresh :pull-down-threshold="pullDownThreshold" @load="load">
        <NuxtPage />
      </v-pull-to-refresh> -->
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router"; // Importa o useRouter
import { useHead } from "#imports";

const route = useRoute();
const router = useRouter(); // Aqui, você acessa o router

useHead({
  bodyAttrs: {
    id: () => route.name || route.path.replace(/\//g, "") || "home",
  },
});

async function load({ done }) {
  await new Promise((resolve) => setTimeout(() => resolve(), 2000));

  router.go(0); // Isso recarrega a página

  done("ok");
}
</script>
<style>
.bg {
  background: black !important;
}
</style>
