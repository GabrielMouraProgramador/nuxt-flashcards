<template>
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
