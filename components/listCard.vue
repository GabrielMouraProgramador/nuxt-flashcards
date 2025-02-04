<template>
  <v-card rounded="lg" class="bg-card mt-4">
    <v-list>
      <div v-for="deck in deckList" :key="deck.title">
        <v-list-item
          :v-for="deck in deckList"
          :key="deck.title"
          :subtitle="deck.subtitle"
          :title="deck.title"
        >
          <template v-slot:append>
            <v-btn color="grey-lighten-1" icon="mdi-chevron-right" variant="text"></v-btn>
          </template>
        </v-list-item>
      </div>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    deckList: [
      {
        subtitle: "Jan 9, 2014",
        title: "Photos",
      },
      {
        subtitle: "Jan 17, 2014",
        title: "Recipes",
      },
      {
        subtitle: "Jan 28, 2014",
        title: "Work",
      },
    ],
  }),
};
</script>
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
</style>
