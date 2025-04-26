<script setup>
import { variables, methods, currentCard } from "@/scrips/study";

onMounted(() => {
  const route = useRoute();
  methods.cardsToday(route.params.deck_id);
});
</script>

<template>
  <v-card rounded="0" height="100%" class="bg-page">
    <EstudarToobar />
    <VCard rounded="xl" class="pa-4 m-4 bg-card">
      <EstudarFlipCard :card="currentCard" class="mb-flip" />
      <EstudarDificuldade />
      <EstudarActions />
    </VCard>
    <ConfirmDelete />
    <CardForm />
  </v-card>
</template>

<script>
export default {
  data: () => ({
    cards: [],
    next: false,
    atual: 0,
    menuItem: [
      { text: "Editar", icon: "mdi-rename" },
      { text: "Apagar", icon: "mdi-delete" },
    ],
  }),
  // computed: {
  //   currentCard() {
  //     if (this.cards && this.cards.length > 0 && this.cards.length > this.atual) {
  //       const current = this.cards[this.atual];

  //       const difficulty_times = getNextTime(
  //         current.difficulty,
  //         current.ultimo_tempo,
  //         current.difficulty
  //       );

  //       this.$refs.dificuldade.facil = difficulty_times.facil;
  //       this.$refs.dificuldade.bom = difficulty_times.bom;
  //       this.$refs.dificuldade.dificil = difficulty_times.dificil;
  //       this.$refs.dificuldade.agora = difficulty_times.agora;

  //       return current;
  //     }
  //     return "";
  //   },
  // },
  async created() {
    if (this.$route.params.deck_id) {
      // this.cardsToday();
    }
  },
  mounted() {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", this.handleKeyDown);
    }
  },
  unmounted() {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", this.handleKeyDown);
    }
  },
  methods: {
    refresh() {
      this.$router.go(0);
    },
    clickedMenuDeck(dataMenu) {
      if (dataMenu.text == "Editar") {
        this.$refs.editcard.id_card = dataMenu?.item.id;
        this.$refs.editcard.frete = dataMenu?.item.frete;
        this.$refs.editcard.tras = dataMenu?.item.tras;
        this.$refs.editcard.card = dataMenu?.item;

        this.$refs.editcard.dialog = true;
      }

      if (dataMenu.text == "Apagar") {
        this.$refs.confirmDelete.confirmDelete(
          dataMenu?.item.id,
          "CARD " + dataMenu?.item.frete
        );
      }
    },

    handleKeyDown(event) {
      if (
        this.$refs.editcard.dialog == false &&
        this.$refs.confirmDelete.snackbar.active == false
      ) {
        if (event.key === "Enter") {
          this.$refs.flip.rotate = true;
          this.$refs.dificuldade.sheet = true;
        }
        if (event.key === "d" || event.key === "D") {
          this.$refs.dificuldade.sheet = !this.$refs.dificuldade.sheet;
        }
        if (event.key === " ") {
          this.$refs.flip.flip();
        }

        const keyDifficulty = ["1", "2", "3", "4"];
        if (keyDifficulty.includes(event.key)) {
          this.$refs.dificuldade.handleKey(event.key);
        }
      }
    },
    async deteleCard(card_id) {
      const { deleteCard } = useDeck();
      await deleteCard(card_id);
      this.refresh();
    },
    backCard() {
      this.$refs.flip.rotate = false;
    },
    liberaDificuldade(data_card) {
      this.$refs.dificuldade.card_id = data_card.id;

      this.next = true;
      setTimeout(() => {
        if (this.next) {
          this.$refs.dificuldade.sheet = true;
        }
      }, "1000");
    },

    async nextCatd(data) {
      this.$refs.flip.rotate = false;

      const { difficulty, card_id } = data;
      const { dificuldade, time } = difficulty;
      const { setDifficultyCard } = useDeck();
      await setDifficultyCard({
        difficulty: dificuldade,
        next_game: this.addTimeToNow(time),
        time,
        card_id,
      });

      this.$refs.dificuldade.sheet = false;
      this.next = false;

      if (this.atual + 1 == this.cards.length) {
        this.$router.push("/fim");
      }
      this.atual++;
    },
    addTimeToNow(duration) {
      const now = new Date();

      // Regex para extrair valor e unidade
      const match = duration.match(/(\d+)([dhm])/);
      if (!match) throw new Error("Formato de duração inválido");

      const value = parseInt(match[1]);
      const unit = match[2];

      if (unit === "d") now.setDate(now.getDate() + value);
      if (unit === "h") now.setHours(now.getHours() + value);
      if (unit === "m") now.setMinutes(now.getMinutes() + value);

      // Formatar para o padrão desejado
      const formatted = now.toISOString().replace("T", " ").replace("Z", "").slice(0, -3); // Removendo 'Z' e reduzindo precisão

      return formatted;
    },
    async cardsToday() {
      const { getCardsToday } = useDeck();
      this.cards = await getCardsToday(this.$route.params.deck_id);
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
