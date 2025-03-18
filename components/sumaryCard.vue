<template>
  <VCard rounded="xl" class="pa-4 bg-card mt-4">
    <div class="d-flex justify-space-between">
      <span class="title">{{ info?.name }}</span>

      <VBtn @click="setEye()" :icon="eye ? 'mdi-eye' : 'mdi-eye-off'"> </VBtn>
    </div>

    <br />
    <span class="mode">Modo de aprendizado: <span>Repetição espaçada geral</span></span>
    <h3 class="my-2">Cartões para hoje</h3>
    <div class="d-flex bg-grid">
      <div :class="['total-cards', { 'total-cards-large': todayCards > 99 }]">
        {{ todayCards }}
      </div>
      <div class="mx-4 center">
        <div class="d-flex">
          <VIcon size="35" color="#6f6e6c" class="mr-1">mdi-cards-playing-outline</VIcon>
          <p class="n-estudado">{{ notStudied }}</p>
        </div>
        <p class="descricao">Não estudado</p>
      </div>

      <div class="mx-4 center">
        <div class="d-flex">
          <VIcon size="35" color="success" class="mr-1">mdi-school</VIcon>

          <p class="n-estudado">{{ review }}</p>
        </div>
        <p class="descricao">Revisados</p>
      </div>
    </div>
    <VBtn
      :disabled="todayCards <= 0"
      :to="`/estudar/${$route.params.deck_id}`"
      rounded="lg"
      class="mt-5"
      block
      variant="flat"
      color="#73c8ff"
      size="50"
    >
      <b>Estudar cartões</b></VBtn
    >
    <span v-if="todayCards < 1" class="mode"
      ><b>Parabéns:</b> Você está em dia com seus cards e seus estudos 😀</span
    >
  </VCard>
</template>
<script>
export default {
  props: ["info", "todayCards", "notStudied", "review"],
  data() {
    return {
      eye: false,
    };
  },
  methods: {
    setEye() {
      this.eye = !this.eye;
      this.$emit("eye", this.eye);
    },
  },
};
</script>
<style scoped>
.title {
  font-size: 16px;
  font-weight: bold;
}
.mode {
  font-size: 12px;
}
.mode span {
  color: #187dbc;
}
.bg-card {
  background: #1e1d1b !important;
}
.total-cards {
  background: #282725;
  font-size: 43px;
  width: 80px;
  height: 80px;
  text-align: center;
  border: solid #6f6e6c 10px;
  border-radius: 50%;
  margin: 0 30px;
  font-weight: bold;
}
.total-cards-large {
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg-grid {
  background: #282725;
  padding: 10px;
  justify-content: space-around;
  border-radius: 20px;
}
.n-estudado {
  font-size: 25px;
}

.descricao {
  font-size: 10px;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
