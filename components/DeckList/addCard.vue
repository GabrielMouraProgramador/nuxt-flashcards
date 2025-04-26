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
          rows="3"
          auto-grow
          density="comfortable"
          variant="solo-filled"
          hide-details
        >
          <template #append-inner>
            <label for="img-frente">
              <VBtn icon="mdi-image-area" @click="triggerFileFente"> </VBtn>
            </label>
          </template>
        </v-textarea>
        <v-file-upload
          v-if="fileFrente"
          type="file"
          v-model="fileFrente"
          density="compact"
          variant="compact"
        ></v-file-upload>
        <input
          ref="fileInputFrente"
          type="file"
          accept="image/*"
          style="display: none"
          @change="onFileChangeFrente"
        />

        <p class="mx-1 mt-10">Parte de trás</p>
        <v-textarea
          v-model="tras"
          rows="3"
          auto-grow
          density="comfortable"
          variant="solo-filled"
          hide-details
        >
          <template #append-inner>
            <label for="img-frente">
              <VBtn icon="mdi-image-area" @click="triggerFileTras"> </VBtn>
            </label>
          </template>
        </v-textarea>
        <v-file-upload
          v-if="fileTras"
          type="file"
          v-model="fileTras"
          density="compact"
          variant="compact"
        ></v-file-upload>
        <input
          ref="fileInputTras"
          type="file"
          accept="image/*"
          style="display: none"
          @change="onFileChangeTras"
        />

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
import { VFileUpload } from "vuetify/labs/VFileUpload";

export default {
  components: {
    VFileUpload,
  },
  data: () => ({
    dialog: false,
    frete: "",
    tras: "",
    fileFrente: null,
    fileTras: null,
    loading: false,
  }),

  methods: {
    triggerFileFente() {
      this.$refs.fileInputFrente?.click();
    },
    triggerFileTras() {
      this.$refs.fileInputTras?.click();
    },
    onFileChangeFrente(event) {
      const file = event.target.files;
      if (file) {
        this.fileFrente = file[0];
      }
    },
    onFileChangeTras(event) {
      const file = event.target.files[0];
      if (file) {
        this.fileTras = file;
      }
    },
    async addCard() {
      const { addCard } = useDeck();
      const data = {
        deck_id: this.$route.params.deck_id,
        frete: this.frete,
        tras: this.tras,
        imageFrente: this.fileFrente,
        imageTras: this.fileTras,
      };
      this.loading = true;
      this.deck = await addCard(data);
      this.loading = false;
      this.frete = "";
      this.tras = "";
      this.fileFrente = null;
      this.fileTras = null;
      this.$emit("refresh");
    },
  },
};
</script>

<style scoped>
p {
  font-size: 12px;
}
:deep(.v-file-upload) {
  display: none;
}
</style>
