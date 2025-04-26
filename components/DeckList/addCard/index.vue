<script setup>
import { variables, methods } from "@/scrips/createCard";
</script>

<template>
  <v-dialog v-model="variables.showDialog" height="auto">
    <v-card rounded="xl">
      <v-toolbar>
        <v-spacer></v-spacer>
        <div>
          <b>Adicionar cartões</b>
        </div>

        <v-spacer></v-spacer>
      </v-toolbar>
      <div class="pa-4">
        <DeckListAddCardInputWithFile label="Parte da frente" v-model="variables.front" />
        <DeckListAddCardInputWithFile label="Parte de trás" v-model="variables.behind" />

        <VBtn
          :disabled="!variables.behind.text || !variables.front.text"
          @click="methods.addCard($route.params.deck_id)"
          class="mt-5"
          block
          color="success"
          :loading="variables.loading"
          variant="tonal"
          size="50"
        >
          SALVAR</VBtn
        >
      </div>
    </v-card>
  </v-dialog>
</template>
