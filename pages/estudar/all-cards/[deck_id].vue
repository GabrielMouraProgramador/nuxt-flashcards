<script setup>
definePageMeta({
  layout: "empty",
});
</script>

<template>
  <v-card rounded="0" height="100%" class="bg-page">
    <v-toolbar density="compact" color="#201c1d">
      <v-btn to="/">
        <VIcon size="25">mdi-close</VIcon>
      </v-btn>

      <v-spacer></v-spacer>
      <VChip size="small">{{ atual }}/{{ cards.length }}</VChip>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <VCard rounded="xl" class="pa-4 m-4 bg-card">
      <FlipCard
        ref="flip"
        @next="liberaDificuldade"
        :card="currentCard"
        class="mb-flip"
      />
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
    currentCard() {
      if (this.cards && this.cards.length > 0 && this.cards.length > this.atual) {
        const current = this.cards[this.atual];

        const difficulty_times = this.getNextTime(
          current.difficulty,
          current.ultimo_tempo,
          current.difficulty
        );
        console.log(
          difficulty_times,
          current.difficulty,
          current.ultimo_tempo,
          current.difficulty
        );
        this.$refs.dificuldade.facil = difficulty_times.facil;
        this.$refs.dificuldade.bom = difficulty_times.bom;
        this.$refs.dificuldade.dificil = difficulty_times.dificil;
        this.$refs.dificuldade.agora = difficulty_times.agora;

        return current;
      }
      return "";
    },
  },
  async created() {
    if (this.$route.params.deck_id) {
      this.allCards();
    }
  },
  methods: {
    liberaDificuldade(data_card) {
      this.$refs.dificuldade.card_id = data_card.id;

      this.next = true;
      setTimeout(() => {
        if (this.next) {
          this.$refs.dificuldade.sheet = true;
        }
      }, "1000");
    },
    getNextTime(dificuldade_atual, time_atual, dificuldade_antiga) {
      // Converte tempo para minutos
      const parseTime = (time) => {
        const match = time.match(/(\d+)([dhm])/);
        if (!match) return 0;

        const value = parseInt(match[1]);
        const unit = match[2];

        if (unit === "d") return value * 24 * 60; // Dias para minutos
        if (unit === "h") return value * 60; // Horas para minutos
        if (unit === "m") return value; // Minutos

        return 0;
      };

      // Formata o tempo de volta para string
      const formatTime = (minutes) => {
        if (minutes >= 1440) return `${Math.floor(minutes / 1440)}d`; // Dias
        if (minutes >= 60) return `${Math.floor(minutes / 60)}h`; // Horas
        return `${minutes}m`; // Minutos
      };

      // Tempo base
      let time_facil = 3 * 24 * 60; // 3d em minutos
      let time_bom = 15; // 15m
      let time_dificil = 8; // 8m

      let time_atual_min = parseTime(time_atual);

      if (dificuldade_atual === dificuldade_antiga) {
        time_facil = Math.min(time_atual_min * 7, 64800); // Máx 45 dias
        time_bom = Math.min(time_atual_min + 15, 21600); // Máx 15 dias
      } else {
        if (dificuldade_atual === "facil") {
          time_facil = Math.min(time_atual_min * 4, 64800); // Máx 45 dias
        }
        if (["bom", "dificil"].includes(dificuldade_atual)) {
          time_facil = Math.min(time_atual_min + 1440, 64800); // Máx 45 dias
          time_bom = Math.min(time_atual_min + 30, 21600); // Máx 15 dias
        }
      }

      return {
        facil: formatTime(time_facil),
        bom: formatTime(time_bom),
        dificil: formatTime(time_dificil),
        agora: "agora",
      };
    },

    async nextCatd(data) {
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
      this.$refs.flip.rotate = false;

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
