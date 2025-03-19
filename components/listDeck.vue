<template>
  <div id="deck-list">
    <v-list v-if="!loading">
      <div v-for="deck in deckList" :key="deck.title">
        <v-list-item
          :v-for="deck in deckList"
          :key="deck.name"
          :subtitle="useFormat.date(deck.created_at)"
          :title="deck.name"
          :to="`/${deck.id}`"
        >
          <template v-slot:append>
            <v-btn color="grey-lighten-1" icon="mdi-chevron-right" variant="text"></v-btn>
          </template>
        </v-list-item>
      </div>
    </v-list>
    <v-skeleton-loader
      width="350px"
      v-for="index in 4"
      :key="index"
      v-if="loading"
      type="list-item-two-line"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    deckList: [],
    loading: true,
  }),
  mounted() {
    this.allDecks();
  },
  methods: {
    async allDecks() {
      this.loading = true;
      const { getAllDecks } = useDeck();
      this.deckList = await getAllDecks();
      this.loading = false;
    },
  },
};
</script>
<style>
#deck-list .v-skeleton-loader__text {
  height: 7px !important;
}
</style>
