<template>
  <v-dialog v-model="dialog" height="auto">
    <v-card rounded="xl">
      <v-toolbar>
        <v-spacer></v-spacer>
        <div>
          <b>Editar cartão</b>
        </div>

        <v-spacer></v-spacer>
      </v-toolbar>
      <div class="pa-4">
        <p class="mx-1 mt-2">Parte frontal</p>
        <v-textarea
          v-model="frete"
          rows="1"
          auto-grow
          density="comfortable"
          variant="solo-filled"
        ></v-textarea>

        <p class="mx-1 mt-4">Parte de trás</p>
        <v-textarea
          v-model="tras"
          rows="1"
          auto-grow
          density="comfortable"
          variant="solo-filled"
        ></v-textarea>

        <VBtn
          :disabled="!frete || !tras"
          @click="updateCard"
          class="mt-5"
          block
          color="success"
          :loading="loading"
          variant="tonal"
          size="50"
        >
          SALVAR</VBtn
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    frete: "",
    tras: "",
    id_card: "",
    loading: false,
  }),

  methods: {
    async updateCard() {
      const { updateCard } = useDeck();
      const data = {
        id_card: this.id_card,
        frete: this.frete,
        tras: this.tras,
      };
      this.loading = true;
      this.dialog = false;
      this.deck = await updateCard(data);
      this.loading = false;
      this.frete = "";
      this.tras = "";
      this.$emit("refresh");
    },
  },
};
</script>

<style scoped>
p {
  font-size: 12px;
}
</style>
