<script setup>
import { variables } from "@/scrips/study";
</script>
<template>
  <v-toolbar density="compact" color="#201c1d">
    <v-btn to="/">
      <VIcon size="25">mdi-close</VIcon>
    </v-btn>

    <v-spacer></v-spacer>
    <VChip size="small">{{ variables.atual }}/{{ variables.cards.length }}</VChip>
    <v-spacer></v-spacer>

    <v-toolbar-items class="pr-2">
      <Menu :menu_items="variables.menuItem" />
    </v-toolbar-items>
  </v-toolbar>
</template>
