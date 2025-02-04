<script setup lang="ts">
definePageMeta({
  layout: "empty",
});
</script>

<template>
  <v-card rounded="0" height="100%" class="bg-page">
    <v-toolbar>
      <v-btn icon="mdi-close"></v-btn>

      <v-spacer></v-spacer>
      <VChip size="small">0/2</VChip>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <VCard rounded="xl" class="pa-4 m-4 bg-card">
      <FlipCard class="mb-flip" />
      <Dificuldade />
    </VCard>
  </v-card>
</template>
<style scoped>
.grid {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bg-page {
  background: #0f0f0f;
  height: 100%;
}
.bg-card {
  background: #0f0f0f;
  height: calc(100% - 80px);
}
.mb-flip {
  margin-bottom: 100px;
}
</style>
