<template>
  <v-toolbar density="compact" color="#201c1d">
    <v-btn to="/">
      <VIcon size="25">mdi-close</VIcon>
    </v-btn>

    <v-spacer></v-spacer>
    <VChip size="small">{{ variables.atual }}/{{ variables.cards.length }}</VChip>
    <v-spacer></v-spacer>

    <v-toolbar-items class="pr-2">
      <Menu
        :menu_items="variables.menuItem"
        @Edit="methodsNewCard.showForm('EDIT', currentCard)"
        @Delete="methodsCards.confirmDeleteCard(currentCard)"
      />
    </v-toolbar-items>
  </v-toolbar>
</template>
<script setup>
import { methods as methodsNewCard } from "@/scrips/formCard";
import { currentCard, variables } from "@/scrips/study";
import { methods as methodsCards } from "@/scrips/listCard";
</script>
