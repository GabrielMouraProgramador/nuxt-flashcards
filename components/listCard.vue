<template>
  <v-card rounded="lg" class="bg-card mt-4">
    <v-list>
      <div>
        <v-list-item v-for="card in cards" :key="card.frete" :title="card.frete">
          <template v-slot:subtitle>
            <p v-if="answers">
              {{ card.tras }}
            </p>
            <p class="pb-4" v-else></p>
          </template>

          <template v-slot:append>
            <Menu
              @clicked="clickedMenuDeck"
              :itemsMenu="menuItem"
              :item="card"
              ref="menuItem"
            />
          </template>
        </v-list-item>
      </div>
    </v-list>
    <ConfirmDelete ref="confirmDelete" @delete="deteleCard" />
    <EditCard @refresh="refresh()" ref="editcard" />
  </v-card>
</template>

<script>
export default {
  props: ["cards", "answers"],
  data() {
    return {
      menuItem: [
        { text: "Editar", icon: "mdi-rename" },
        { text: "Apagar", icon: "mdi-delete" },
      ],
    };
  },
  methods: {
    async deteleCard(card_id) {
      const { deleteCard } = useDeck();
      await deleteCard(card_id);
      this.$emit("refresh");
    },
    clickedMenuDeck(dataMenu) {
      if (dataMenu.text == "Editar") {
        this.$refs.editcard.id_card = dataMenu?.item.id;
        this.$refs.editcard.frete = dataMenu?.item.frete;
        this.$refs.editcard.tras = dataMenu?.item.tras;

        this.$refs.editcard.dialog = true;
      }

      if (dataMenu.text == "Apagar") {
        this.$refs.confirmDelete.confirmDelete(
          dataMenu?.item.id,
          "CARD " + dataMenu?.item.frete
        );
      }
    },
    async refresh() {
      this.loading = true;
      this.cards = this.allCards();
      this.info = this.getInfoDeck();
      this.loading = false;
    },
    async allCards() {
      const { getCardsDeck } = useDeck();
      const result = await getCardsDeck(this.$route.params.deck_id);
      return result;
    },
    async getInfoDeck() {
      const { getDeckById } = useDeck();
      const result = await getDeckById(this.$route.params.deck_id);
      return result;
    },
  },
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
