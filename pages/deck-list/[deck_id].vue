<script setup>
import { variables } from "@/scrips/studyList";
</script>
<template>
  <v-card rounded="0" height="100%" class="bg-card">
    <DeckListToolbar />
    <div v-if="!variables.loading">
      <DeckListBody v-if="variables.allCards && variables.allCards.length" />
      <DeckListNoCards v-else />
    </div>
    <DeckListSkeleton v-else />
    <DeckListAddCard @refresh="refresh()" ref="addcard" />
    <DeckListRenameDeck ref="renameDeck" @refresh="refreshPage()" />
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
      // this.refresh();
    }
  },

  methods: {
    refreshPage() {
      this.$router.go(0);
    },
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
.bg-card {
  background: #0f0f0f;
}
</style>
