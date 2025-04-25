<script setup lang="ts">
import { variables, methods } from "@/scrips/home";
</script>

<template>
  <div class="text-center">
    <v-bottom-sheet v-model="variables.showNewDeck">
      <v-card height="200" class="rounded-t-xl">
        <div class="d-flex justify-space-between pa-2">
          <b class="w-100 text-center">Novo Deck</b>
        </div>

        <VCardText>
          <p>
            <b>Crie seu próprio deck.</b>
            Você obtém os melhores resultados com os cartões que você mesmo cria.
          </p>

          <v-text-field
            v-model="variables.newDeck.name"
            class="my-2"
            density="comfortable"
            variant="solo-filled"
          ></v-text-field>

          <VBtn
            block
            color="primary"
            :loading="variables.newDeck.loading"
            :disabled="!variables.newDeck.name"
            @click="methods.newDeck()"
            size="50"
          >
            Criar deck</VBtn
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
