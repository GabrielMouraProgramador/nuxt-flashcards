<template>
  <v-menu v-model="menu">
    <template v-slot:activator="{ props }">
      <v-btn :ripple="false" v-bind="props">
        <VIcon size="25">mdi-dots-vertical</VIcon>
      </v-btn>
    </template>

    <v-card
      :elevation="10"
      class="bg-card elevation-9 mt-2 mr-4"
      rounded="lg"
      width="200"
    >
      <v-list density="compact" class="bg-card">
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
  props: ["itemsMenu", "item"],
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
      selected: null,
      items: this.itemsMenu || [],
    };
  },
  methods: {
    setAcao(item) {
      this.$emit(
        "clicked",
        this.item != undefined ? { text: item.text, item: this.item } : item.text
      );
    },
  },
};
</script>
<style scoped>
.bg-card {
  background: #282725 !important;
}
</style>
