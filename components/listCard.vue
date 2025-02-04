<template>
  <v-card rounded="lg" class="bg-card mt-4">
    <v-list>
      <div>
        <v-list-item
          v-for="card in cards"
          :key="card.frete"
          :subtitle="card.tras"
          :title="card.frete"
        >
          <template v-slot:append>
            <v-btn color="grey-lighten-1" icon="mdi-dots-vertical" variant="text"></v-btn>
          </template>
        </v-list-item>
      </div>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: ["cards"],
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
