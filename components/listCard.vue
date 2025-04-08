<template>
  <v-card rounded="lg" class="bg-card mt-4">
    <v-list>
      <v-text-field
        v-model="search"
        class="mx-3 mt-1 mb-3"
        label="Buscar"
        variant="outlined"
      />
      <div>
        <v-list-item v-for="card in searched" :title="card.frete">
          <template v-slot:title>
            <p class="capitalize">
              {{ card.frete }}
            </p>
          </template>

          <template v-slot:subtitle>
            <p class="capitalize" v-if="answers">
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
    <EditCard @refresh="refreshPage()" ref="editcard" />
  </v-card>
</template>

<script>
export default {
  props: ["cards", "answers"],
  data() {
    return {
      search: "",
      menuItem: [
        { text: "Editar", icon: "mdi-rename" },
        { text: "Apagar", icon: "mdi-delete" },
      ],
    };
  },
  computed: {
    searched() {
      if (!this.search || this.search == "") {
        return this.cards;
      }
      // Função para remover caracteres especiais e acentuação
      const normalizeString = (str) => {
        return str
          .normalize("NFD") // Decomposição de caracteres (ex: "á" vira "a" + "́")
          .replace(/[\u0300-\u036f]/g, "") // Remove os sinais diacríticos (acentos)
          .toLowerCase(); // Converte para minúsculo
      };

      return this.cards.filter((obj) => {
        // Concatena e normaliza os campos 'frete' e 'tras'
        const texto = `${obj.frete || ""} ${obj.tras || ""}`.toLowerCase();

        // Normaliza tanto o texto de busca quanto os dados para ignorar acentuação
        return normalizeString(texto).includes(normalizeString(this.search));
      });
    },
  },
  methods: {
    refreshPage() {
      this.$router.go(0);
    },
    async deteleCard(card_id) {
      const { deleteCard } = useDeck();
      await deleteCard(card_id);
      this.refreshPage();
    },
    clickedMenuDeck(dataMenu) {
      if (dataMenu.text == "Editar") {
        this.$refs.editcard.id_card = dataMenu?.item.id;
        this.$refs.editcard.frete = dataMenu?.item.frete;
        this.$refs.editcard.tras = dataMenu?.item.tras;
        this.$refs.editcard.card = dataMenu?.item;

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
.capitalize {
  text-transform: capitalize !important;
}
</style>
