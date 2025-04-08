<script setup lang="ts"></script>
<template>
  <div>
    <AppBar />
    <VCard rounded="xl" class="ma-4 card-height">
      <div class="overflow-y-auto">
        <NewDeck @refresh="$refs.listDeck.allDecks()" ref="newDeck" />
        <ListDeck ref="listDeck" />
      </div>
      <VBtn
        elevation="5"
        color="primary"
        icon="mdi-plus"
        variant="flat"
        class="ma-2 add-float"
        @click="$refs.newDeck.sheet = true"
      ></VBtn>
    </VCard>
  </div>
</template>

<script>
export default {
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
  bottom: 13px;
  right: 17px;
}
</style>
