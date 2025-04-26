<template>
  <v-toolbar density="compact" color="#201c1d">
    <v-btn to="/">
      <VIcon size="25">mdi-arrow-left</VIcon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-toolbar-items class="pr-2">
      <Menu @newCard="clickedMenuDeck" :menu_items="variables.menuDeck" />
    </v-toolbar-items>
  </v-toolbar>
</template>
<script setup>
import { variables } from "@/scrips/studyList";
</script>
