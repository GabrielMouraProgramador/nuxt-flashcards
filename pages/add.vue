<script setup lang="ts">
definePageMeta({
  layout: "empty",
});
</script>

<template>
  <v-card rounded="0" height="100%">
    <v-toolbar>
      <v-btn icon="mdi-arrow-left"></v-btn>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div class="grid">
      <NoCards />
    </div>
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
</style>
