<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>
<script setup>
import { useRoute } from "vue-router";
import { useHead } from "#imports";

const route = useRoute();

useHead({
  bodyAttrs: {
    id: () => route.name || route.path.replace(/\//g, "") || "home",
  },
});
</script>
