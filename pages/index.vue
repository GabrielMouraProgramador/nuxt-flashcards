<template>
  <VCard rounded="xl" class="ma-4 card-height">
    <div>
      <NewDeck @refresh="$refs.listDeck.allDecks()" ref="newDeck" />
      <ListDeck ref="listDeck" />
    </div>
    <VCardActions class="justify-end">
      <VBtn
        color="primary"
        icon="mdi-plus"
        variant="flat"
        class="ma-2"
        @click="$refs.newDeck.sheet = true"
      ></VBtn>
    </VCardActions>
  </VCard>
</template>

<script>
import { Pencil } from "lucide-vue-next";

export default {
  components: {
    Pencil,
  },
  data() {
    return {
      actions: {
        sheetAdd: false,
      },
    };
  },
  methods: {
    teste() {
      alert("aqui");
    },
  },
};
</script>
<style scoped>
.card-height {
  height: calc(100% - 140px) !important;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
