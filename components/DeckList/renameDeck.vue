<script setup>
import { variables, methods } from "@/scrips/renameDeck";
</script>

<template>
  <div class="text-center">
    <v-bottom-sheet v-model="variables.showDialog">
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
            v-model="variables.newName"
            class="my-2"
            density="comfortable"
            variant="solo-filled"
          ></v-text-field>

          <VBtn
            block
            color="primary"
            :loading="variables.loading"
            :disabled="!variables.newName"
            @click="methods.renameDeck($route.params.deck_id)"
            size="50"
          >
            Renomear Deck</VBtn
          >
        </VCardText>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<style scoped>
p {
  font-size: 10px;
}
</style>
