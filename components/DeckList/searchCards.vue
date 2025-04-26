<script setup>
import { variables, methods, searched } from "@/scrips/listCard";
import { variables as variablesCards, methods as methodsCards } from "@/scrips/studyList";
import { methods as methodsNewCard } from "@/scrips/formCard";

onMounted(() => {
  const route = useRoute();
  methods.refresh(route.params.deck_id);
});
</script>

<template>
  <v-card rounded="lg" class="bg-card mt-4">
    <v-list>
      <v-text-field
        v-model="variables.search"
        class="mx-3 mt-1 mb-3"
        label="Buscar"
        variant="outlined"
      />
      <div>
        <v-list-item v-for="card in searched" :title="card.front">
          <template v-slot:title>
            <p class="capitalize">
              {{ card.front }}
            </p>
          </template>

          <template v-slot:subtitle>
            <p class="capitalize" v-if="variablesCards.answers">
              {{ card.behind }}
            </p>
            <p class="pb-4" v-else></p>
          </template>
          <template v-slot:append>
            <Menu
              @EditCard="methodsNewCard.showForm('EDIT')"
              @DeleteCard="methods.confirmDeleteCard"
              :menu_items="variables.menuDeck"
              :value="card"
            />
          </template>
        </v-list-item>
      </div>
    </v-list>
  </v-card>
</template>

<style scoped>
.grid {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bg-grid {
  background: #282725;
  padding: 10px;
  justify-content: space-around;
  border-radius: 20px;
}
.capitalize {
  text-transform: capitalize !important;
}
</style>
