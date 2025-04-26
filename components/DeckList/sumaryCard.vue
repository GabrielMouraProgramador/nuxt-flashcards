<script setup>
import { variables, notStudied } from "@/scrips/studyList";
</script>

<template>
  <VCard rounded="xl" class="pa-4 bg-card mt-4">
    <div class="d-flex justify-space-between align-center mb-2">
      <span class="title">{{ variables.info?.name }}</span>

      <VBtn
        @click="variables.answers = !variables.answers"
        :icon="variables.answers ? 'mdi-eye' : 'mdi-eye-off'"
      >
      </VBtn>
    </div>
    <span class="mode">Modo de aprendizado: <span>Repetição espaçada geral</span></span>
    <h3 class="my-2">Cartões para hoje</h3>
    <div class="d-flex bg-grid">
      <div
        :class="[
          'total-cards',
          { 'total-cards-large': variables.todayCards.length > 99 },
        ]"
      >
        {{ variables.todayCards.length }}
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

          <p class="n-estudado">{{ variables.alreadyStudied.length }}</p>
        </div>
        <p class="descricao">Revisados</p>
      </div>
    </div>
    <VBtn
      :disabled="variables.todayCards.length <= 0"
      :to="`/estudar/${$route.params.deck_id}`"
      rounded="lg"
      class="mt-5"
      block
      variant="flat"
      color="primary"
      size="50"
    >
      <b>Estudar cartões</b></VBtn
    >
    <span v-if="variables.todayCards.length < 1" class="mode"
      ><b>Parabéns:</b> Você está em dia com seus cards e seus estudos 😀</span
    >
  </VCard>
</template>

<style scoped>
.title {
  font-size: 16px;
  font-weight: bold;
}
.mode {
  font-size: 12px;
}
.mode span {
  color: #db6fb5;
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
