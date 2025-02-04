<script setup lang="ts">
definePageMeta({
  layout: "empty",
});
</script>

<template>
  <v-card rounded="0" height="100%" class="bg-card">
    <v-toolbar>
      <v-btn icon="mdi-arrow-left"></v-btn>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <div class="pa-2">
      <SumaryCard />
      <CardProgress />
      <ListCard />
    </div>
    <div class="grid d-none">
      <NoCards />
    </div>
    <AddCard />
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
.bg-card {
  background: #0f0f0f;
}
</style>
