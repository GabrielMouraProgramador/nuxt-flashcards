<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="end">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <VIcon size="25">mdi-dots-vertical</VIcon>
      </v-btn>
    </template>

    <v-card class="mx-auto mt-2 mr-2 bg-card elevation-9" rounded="xl" width="300">
      {{ selected }}
      <v-list v-model="selected" class="bg-card" disabled>
        <v-list-subheader>AÇÕES</v-list-subheader>

        <v-list-item v-for="item in items" :value="item.text" :key="item.text">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    selected: null,
    items: [
      { text: "Renomear ", icon: "mdi-rename" },
      { text: "Apagar ", icon: "mdi-delete" },
    ],
  }),
  methods: {
    setAcao(item) {
      console.log(item);
    },
  },
};
</script>
<style scoped>
.bg-card {
  background: #282725 !important;
}
</style>
