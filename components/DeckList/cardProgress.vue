<script setup>
import { variables, notStudied } from "@/scrips/studyList";
</script>
<template>
  <h3 class="mt-2">Cartões no deck ({{ variables.allCards.length }})</h3>
  <v-progress-linear
    buffer-value="60"
    :color="
      (variables.alreadyStudied.length * 100) / variables.allCards.length == 100
        ? 'success'
        : '#282725'
    "
    :model-value="(variables.alreadyStudied.length * 100) / variables.allCards.length"
    :height="10"
    rounded
    stream
  ></v-progress-linear>
  <div class="d-flex mt-2">
    <div class="n-estudado d-flex mr-5">
      <p></p>
      <span> {{ notStudied }} Não estudado </span>
    </div>
    <div class="p-revisar d-flex">
      <p></p>
      <span> {{ variables.alreadyStudied.length }} Estudados </span>
    </div>
  </div>
</template>

<style scoped>
.n-estudado p {
  width: 10px;
  height: 10px;
  margin-top: 5px;
  margin-right: 10px;
  background: #282725;
  border-radius: 50%;
}
.p-revisar p {
  width: 10px;
  height: 10px;
  margin-top: 5px;
  margin-right: 10px;
  background: rgb(0, 255, 8);
  border-radius: 10px;
}
</style>
