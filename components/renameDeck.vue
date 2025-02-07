<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet">
      <v-card height="200" class="rounded-t-xl">
        <div class="d-flex justify-space-between pa-2">
          <b class="w-100 text-center">Renomear Deck</b>
        </div>

        <VCardText>
          <p>
            <b>Renomeie seu deck</b>
            e organize seus cards da maneira que preferir.
          </p>

          <v-text-field
            v-model="newName"
            class="my-2"
            density="comfortable"
            variant="solo-filled"
          ></v-text-field>

          <VBtn
            block
            color="primary"
            :loading="loading"
            :disabled="!newName"
            @click="newDeck"
            size="50"
          >
            Renomear Deck</VBtn
          >
        </VCardText>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newName: "",
      sheet: true,
      loading: false,
      decks: [],
    };
  },

  methods: {
    async newDeck() {
      this.loading = true;
      const { renameDeck } = useDeck();
      if (this.newName) {
        await renameDeck(this.$route.params.deck_id, this.newName);
        this.sheet = false;
        this.newName = "";
        this.$emit("refresh");
      }
      this.loading = false;
    },
  },
};
</script>
<style scoped>
p {
  font-size: 10px;
}
</style>
