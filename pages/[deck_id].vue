<script setup>
definePageMeta({
  layout: "empty",
});
</script>

<template>
  <v-card rounded="0" height="100%" class="bg-card">
    <v-toolbar density="compact" color="#201c1d">
      <v-btn to="/">
        <VIcon size="25">mdi-arrow-left</VIcon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <Menu @clicked="clickedMenuDeck" ref="menuDeck" />
      </v-toolbar-items>
    </v-toolbar>
    <div v-if="!loading">
      <div v-if="cards && cards.length" class="pa-2">
        <SumaryCard :info="info" :cards="cards" />

        <CardProgress />
        <ListCard :cards="cards" />
      </div>
      <div v-else class="grid">
        <NoCards @clicked="$refs.addcard.dialog = true" />
      </div>
      <AddCard @refresh="refresh()" ref="addcard" />
    </div>
    <VCard v-else rounded="xl" class="ma-2 mt-5">
      <v-skeleton-loader
        type="list-item-two-line, image, table-tfoot"
      ></v-skeleton-loader>
    </VCard>
    <RenameDeck ref="renameDeck" />
    <ConfirmDelete ref="confirmDelete" @delete="deteleDeck" />
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      cards: [],
      info: {},
      loading: true,
      menuDeck: [
        { text: "Renomear", icon: "mdi-rename" },
        { text: "Apagar", icon: "mdi-delete" },
      ],
    };
  },
  mounted() {
    this.$refs.menuDeck.items = this.menuDeck;
  },
  async created() {
    if (this.$route.params.deck_id) {
      this.refresh();
    }
  },

  methods: {
    async deteleDeck(deck_id) {
      const { deleteDeck } = useDeck();
      await deleteDeck(deck_id);
      this.$router.push("/");
    },
    clickedMenuDeck(funcaoName) {
      if (funcaoName == "Renomear") {
        this.$refs.renameDeck.sheet = true;
        this.refresh();
      }

      if (funcaoName == "Apagar") {
        this.$refs.confirmDelete.confirmDelete(
          this.$route.params.deck_id,
          "DECK " + this.info?.name
        );
      }
    },
    async refresh() {
      this.cards = await this.allCards();
      this.info = await this.getInfoDeck();
      this.loading = false;
    },
    async allCards() {
      const { getCardsDeck } = useDeck();
      return await getCardsDeck(this.$route.params.deck_id);
    },
    async getInfoDeck() {
      const { getDeckById } = useDeck();
      return await getDeckById(this.$route.params.deck_id);
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
