<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet">
      <v-card height="200" class="rounded-t-xl">
        <div class="d-flex justify-space-between pa-2">
          <b class="w-100 text-center">Novo Deck</b>
        </div>

        <VCardText>
          <p>
            <b>Crie seu próprio deck.</b>
            Você obtém os melhore resultados com os cartões que você mesmo cria.
          </p>

          <v-text-field
            v-model="name"
            class="my-2"
            density="comfortable"
            variant="solo-filled"
          ></v-text-field>

          <VBtn
            block
            color="primary"
            :loading="loading"
            :disabled="!name"
            @click="newDeck"
            size="50"
          >
            Criar novo deck</VBtn
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
      name: "",
      sheet: false,
      loading: false,
      decks: [],
    };
  },

  methods: {
    async newDeck() {
      this.loading = true;
      const { addDeck } = useDeck();
      if (this.name) {
        await addDeck(this.name);
        this.sheet = false;
        this.name = "";
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
