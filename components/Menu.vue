<template>
  <v-menu v-model="menu" location="end">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <VIcon size="25">mdi-dots-vertical</VIcon>
      </v-btn>
    </template>

    <v-card class="bg-card elevation-9" rounded="xl" width="300">
      <v-list class="bg-card">
        <v-list-subheader>AÇÕES</v-list-subheader>

        <v-list-item v-for="item in items" :key="item.text" @click="setAcao(item)">
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
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
      selected: null,
      items: [],
    };
  },
  methods: {
    setAcao(item) {
      this.$emit("clicked", item.text);
    },
  },
};
</script>
<style scoped>
.bg-card {
  background: #282725 !important;
}
</style>
