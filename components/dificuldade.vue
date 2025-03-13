<template>
  <v-bottom-sheet v-model="sheet">
    <v-card class="rounded-t-xl">
      <div class="d-flex justify-space-between pa-2">
        <b class="w-100 text-center">Dificuldade do card </b>
      </div>
      <VCardText class="d-flex ga-2 height">
        <VCard
          @click="setDificuldade({ dificuldade: 'agora', time: agora })"
          rounded="lg"
          class="m-4 d-novo d-flex flex-column justify-center"
        >
          <p>De novo</p>
          <span>{{ agora }}</span>
        </VCard>
        <VCard
          @click="setDificuldade({ dificuldade: 'Dificil', time: dificil })"
          rounded="lg"
          class="m-4 d-dificil d-flex flex-column justify-center"
        >
          <p>Dificil</p>
          <span> {{ dificil }}</span>
        </VCard>
        <VCard
          @click="setDificuldade({ dificuldade: 'Bom', time: bom })"
          rounded="lg"
          class="m-4 d-bom d-flex flex-column justify-center"
        >
          <p>Bom</p>
          <span> {{ bom }}</span>
        </VCard>
        <VCard
          @click="setDificuldade({ dificuldade: 'Facil', time: facil })"
          rounded="lg"
          class="m-4 d-facil d-flex flex-column justify-center"
        >
          <p>Facil</p>
          <span> {{ facil }}</span>
        </VCard>
      </VCardText>
    </v-card>
  </v-bottom-sheet>
</template>
<script>
export default {
  data() {
    return {
      sheet: false,
      facil: "4d",
      bom: "15m",
      dificil: "8m",
      agora: "agora",
      card_id: "",
    };
  },
  methods: {
    setDificuldade(difficulty) {
      this.$emit("nextCard", { difficulty, card_id: this.card_id });
    },
  },
};
</script>

<style>
.v-overlay__scrim {
  background: transparent !important; /* Remove o fundo escuro */
}
</style>
<style scoped>
.card {
  background: #282725;
}
.d-novo {
  background: #351f20;
  width: 25%;
  height: 50px;
}
.d-dificil {
  background: #3f3720;
  width: 25%;
  height: 50px;
}

.d-bom {
  background: #2c361b;
  width: 25%;
  height: 50px;
}
.d-facil {
  background: #232833;
  width: 25%;
  height: 50px;
}
p {
  font-size: 12px;
  text-align: center;
}
span {
  font-size: 10px;
  text-align: center;
  width: 100%;
  line-height: 1;
}
.height {
  height: 130px;
}
</style>
