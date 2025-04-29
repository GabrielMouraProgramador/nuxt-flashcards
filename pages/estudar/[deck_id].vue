<script setup>
import { variables, methods, currentCard } from "@/scrips/study";

const route = useRoute();
onMounted(() => {
  methods.resetData();
  if (route?.query?.studymode == "allcards") {
    methods.allCards(route.params.deck_id);
  } else {
    methods.cardsToday(route.params.deck_id);
  }
});
</script>

<template>
  <v-card rounded="0" height="100%" class="bg-page">
    <EstudarToobar />
    <VCard rounded="xl" class="pa-4 m-4 bg-card">
      <EstudarFlipCard
        :card="currentCard"
        :imgsFront="variables.imgsFront"
        :imgsBehind="variables.imgsBehind"
        class="mb-flip"
      />
      <EstudarShowImages
        :title="!variables.flip.rotate ? 'IMAGENS DA FRENTE' : 'IMAGENS DE TRAS'"
        :images="!variables.flip.rotate ? variables.imgsFront : variables.imgsBehind"
      />
      <EstudarDificuldade />
      <EstudarActions />
    </VCard>
    <ConfirmDelete />
    <CardForm />
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
