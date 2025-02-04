<template>
  <v-list>
    <div v-for="deck in deckList" :key="deck.title">
      <v-list-item
        :v-for="deck in deckList"
        :key="deck.name"
        :subtitle="useFormat.date(deck.created_at)"
        :title="deck.name"
      >
        <template v-slot:append>
          <v-btn color="grey-lighten-1" icon="mdi-chevron-right" variant="text"></v-btn>
        </template>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    deckList: [],
  }),
  mounted() {
    this.allDecks();
  },
  methods: {
    async allDecks() {
      const { getAllDecks } = useDeck();
      this.deckList = await getAllDecks();
    },
  },
};
</script>
