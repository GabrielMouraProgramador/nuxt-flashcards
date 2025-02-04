<script setup>
definePageMeta({
  layout: "empty",
});
</script>

<template>
  <v-card rounded="0" height="100%" class="bg-page">
    <v-toolbar>
      <v-btn icon="mdi-close"></v-btn>

      <v-spacer></v-spacer>
      <VChip size="small">{{ atual }}/{{ cards.length }}</VChip>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <VCard rounded="xl" class="pa-4 m-4 bg-card">
      <FlipCard @next="liberaDificuldade()" :frete="frete" :tras="tras" class="mb-flip" />
      <Dificuldade @nextCard="nextCatd" ref="dificuldade" />
      <div class="d-flex justify-end">
        <VBtn v-if="next" @click="$refs.dificuldade.sheet = true"> PROXIMO</VBtn>
      </div>
    </VCard>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    cards: [],
    next: false,
    atual: 0,
  }),
  computed: {
    frete() {
      if (this.cards && this.cards.length > 0) {
        return this.cards[this.atual]["frete"];
      }
      return;
    },
    tras() {
      if (this.cards && this.cards.length > 0) {
        return this.cards[this.atual]["tras"];
      }
      return;
    },
  },
  async created() {
    if (this.$route.params.deck_id) {
      this.allCards();
    }
  },
  methods: {
    liberaDificuldade() {
      this.next = true;
      setTimeout(() => {
        if (this.next) {
          this.$refs.dificuldade.sheet = true;
        }
      }, "1000");
    },
    nextCatd() {
      this.$refs.dificuldade.sheet = false;
      this.next = false;

      if (this.atual + 1 == this.cards.length) {
        this.$router.push("/fim");
      }
      this.atual++;
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
