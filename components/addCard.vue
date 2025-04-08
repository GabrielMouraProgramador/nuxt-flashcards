<script setup>
import { VFileUpload } from "vuetify/labs/VFileUpload";
</script>
<template>
  <v-dialog v-model="dialog" height="auto">
    <v-card rounded="xl">
      <v-toolbar>
        <v-spacer></v-spacer>
        <div>
          <b>Adicionar cartões</b>
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
        <v-file-upload v-model="file" density="compact" variant="compact"></v-file-upload>

        <VBtn
          :disabled="!frete || !tras"
          @click="addCard"
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
    file: null,
    loading: false,
  }),

  methods: {
    async addCard() {
      const { addCard } = useDeck();
      const data = {
        deck_id: this.$route.params.deck_id,
        frete: this.frete,
        tras: this.tras,
        image: this.file,
      };
      this.loading = true;
      this.deck = await addCard(data);
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
