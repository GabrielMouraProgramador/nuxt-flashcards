<script setup>
import { variables, methods } from "@/scrips/studyList";
onMounted(() => {
  const route = useRoute();
  methods.refresh(route.params.deck_id);
});
</script>
<template>
  <v-card rounded="0" height="100%" class="bg-card">
    <DeckListToolbar />
    <div v-if="!variables.loading">
      <DeckListBody v-if="variables.allCards && variables.allCards.length" />
      <DeckListNoCards v-else />
    </div>
    <DeckListSkeleton v-else />
    <CardForm />
    <DeckListRenameDeck />
    <ConfirmDelete />
  </v-card>
</template>

<style scoped>
.bg-card {
  background: #0f0f0f;
}
</style>
