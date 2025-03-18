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
        <Menu @clicked="clickedMenuDeck" :itemsMenu="menuDeck" ref="menuDeck" />
      </v-toolbar-items>
    </v-toolbar>
    <div v-if="!loading">
      <div v-if="allCards && allCards.length" class="pa-2">
        <SumaryCard
          @eye="setAnswers"
          :info="info"
          :todayCards="todayCards.length"
          :notStudied="allCards.length - todayCards.length"
          :review="alreadyStudied.length"
        />

        <CardProgress :allCards="allCards.length" :studiedCards="alreadyStudied.length" />
        <ListCard @refresh="refresh()" :cards="allCards" :answers="answers" />
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
      answers: false,
      allCards: [],
      alreadyStudied: [],
      todayCards: [],
      teste: {},
      info: {},
      loading: true,
      menuDeck: [
        { text: "Novo Card", icon: "mdi-plus" },
        { text: "Renomear", icon: "mdi-rename" },
        { text: "Apagar", icon: "mdi-delete" },
        { text: "Estudar Todos", icon: "mdi-account-school" },
      ],
    };
  },

  async created() {
    if (this.$route.params.deck_id) {
      this.refresh();
    }
  },

  methods: {
    setAnswers(newAnswersMode) {
      this.answers = newAnswersMode;
    },
    async deteleDeck(deck_id) {
      const { deleteDeck } = useDeck();
      await deleteDeck(deck_id);
      this.$router.push("/");
    },
    clickedMenuDeck(funcaoName) {
      if (funcaoName == "Novo Card") {
        this.$refs.addcard.dialog = true;
      }

      if (funcaoName == "Renomear") {
        this.$refs.renameDeck.sheet = true;
        this.refresh();
      }
      if (funcaoName == "Estudar Todos") {
        this.$router.push(`/estudar/all-cards/${this.$route.params.deck_id}`);
      }

      if (funcaoName == "Apagar") {
        this.$refs.confirmDelete.confirmDelete(
          this.$route.params.deck_id,
          "DECK " + this.info?.name
        );
      }
    },
    async refresh() {
      const {
        getCardsDeck,
        getDeckById,
        getCardsToday,
        getCardsAlreadyStudied,
      } = useDeck();

      this.allCards = await getCardsDeck(this.$route.params.deck_id);
      this.info = await getDeckById(this.$route.params.deck_id);
      this.todayCards = await getCardsToday(this.$route.params.deck_id);
      this.alreadyStudied = await getCardsAlreadyStudied(this.$route.params.deck_id);
      this.loading = false;
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
