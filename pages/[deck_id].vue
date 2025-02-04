<script setup>
definePageMeta({
  layout: "empty",
});
</script>

<template>
  <v-card rounded="0" height="100%" class="bg-card">
    <v-toolbar>
      <v-btn to="/" icon="mdi-arrow-left"></v-btn>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <div v-if="cards.length > 0" class="pa-2">
      <SumaryCard :info="info" :cards="cards" />
      <CardProgress />
      <ListCard :cards="cards" />
    </div>
    <div v-else class="grid">
      <NoCards @clicked="$refs.addcard.dialog = true" />
    </div>
    <AddCard @refresh="refresh()" ref="addcard" />
  </v-card>
</template>

<script>
export default {
  data: () => ({
    cards: [],
    info: {},
  }),
  async created() {
    if (this.$route.params.deck_id) {
      this.refresh();
    }
  },
  methods: {
    async refresh() {
      try {
        const [cards, deckInfo] = await Promise.all([
          this.allCards(),
          this.getInfoDeck(),
        ]);
        this.cards = cards;
        this.info = deckInfo;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    },
    async allCards() {
      const { getCardsDeck } = useDeck();
      this.cards = await getCardsDeck(this.$route.params.deck_id);
    },
    async getInfoDeck() {
      const { getDeckById } = useDeck();
      this.info = await getDeckById(this.$route.params.deck_id);
    },
  },
};
</script>

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
