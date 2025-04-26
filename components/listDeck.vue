<script setup>
import { variables, methods } from "@/scrips/home";

onMounted(() => {
  methods.allDecks();
});
</script>

<template>
  <div id="deck-list">
    <v-list v-if="!variables.list.loading">
      <div>
        <v-list-item
          v-for="deck in variables.list.decks"
          :key="deck.name"
          :subtitle="useFormat.date(deck.created_at)"
          :title="deck.name"
          :to="`/deck-list/${deck.id}`"
        >
          <template v-slot:append>
            <v-btn color="grey-lighten-1" icon="mdi-chevron-right" variant="text"></v-btn>
          </template>
        </v-list-item>
      </div>
    </v-list>
    <v-skeleton-loader
      v-if="variables.list.loading"
      width="350px"
      v-for="index in 4"
      :key="index"
      type="list-item-two-line"
    />
  </div>
</template>

<style>
#deck-list .v-skeleton-loader__text {
  height: 7px !important;
}
</style>
