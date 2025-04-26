<script setup>
import { Pencil } from "lucide-vue-next";
import { variables } from "@/scrips/home";
</script>
<template>
  <div>
    <NewDeck />

    <v-app-bar density="compact">
      <template v-slot:prepend>
        <v-btn>
          <VIcon size="25"> mdi-menu </VIcon>
        </v-btn>
      </template>

      <div class="d-flex">
        <VBtn
          @click="variables.showNewDeck = true"
          variant="flat"
          color="primary"
          size="small"
          rounded="xl"
        >
          NOVO DECK
        </VBtn>
      </div>

      <template v-slot:append>
        <v-btn>
          <VIcon>
            <Pencil />
          </VIcon>
        </v-btn>
      </template>
    </v-app-bar>
  </div>
</template>
