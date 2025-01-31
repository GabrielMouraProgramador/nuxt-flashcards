<template>
  <v-bottom-navigation>
    <v-btn class="d-flex ga-1">
      <template v-slot:prepend>
        <v-icon><Home /></v-icon>
      </template>
      <span>Meus decks</span>
    </v-btn>

    <v-btn class="d-flex ga-1">
      <template v-slot:prepend>
        <v-icon>mdi-heart</v-icon>
      </template>
      <span>Biblioteca</span>
    </v-btn>

    <v-btn class="d-flex ga-1">
      <template v-slot:prepend>
        <v-icon>mdi-cog</v-icon>
      </template>
      <span>Configurações</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { Home } from "lucide-vue-next";

export default {
  components: {
    Home,
  },
};
</script>
