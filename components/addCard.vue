<template>
  <v-dialog v-model="dialog" height="340px">
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
        <v-text-field density="comfortable" variant="solo-filled"></v-text-field>

        <p class="mx-1 mt-4">Parte de trás</p>
        <v-text-field density="comfortable" variant="solo-filled"></v-text-field>

        <VBtn class="mt-5" block variant="tonal" size="50"> SALVAR</VBtn>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: true,
    };
  },
};
</script>
<style scoped>
p {
  font-size: 12px;
}
</style>
