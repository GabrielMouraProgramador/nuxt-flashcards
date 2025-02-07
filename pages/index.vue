<template>
  <VCard rounded="xl" class="ma-4 card-height">
    <div class="overflow-y-auto">
      <NewDeck @refresh="$refs.listDeck.allDecks()" ref="newDeck" />
      <ListDeck ref="listDeck" />
    </div>
    <VBtn
      color="primary"
      icon="mdi-plus"
      variant="flat"
      class="ma-2 add-float"
      @click="$refs.newDeck.sheet = true"
    ></VBtn>
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
};
</script>
<style scoped>
.card-height {
  height: 100%;
  max-height: calc(100vh - 150px);
  margin-top: 70px !important;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
}
.add-float {
  position: absolute;
  bottom: 0px;
  right: 25px;
}
</style>
