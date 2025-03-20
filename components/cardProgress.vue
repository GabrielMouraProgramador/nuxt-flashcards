<template>
  <h3 class="mt-2">Cartões no deck ({{ allCards }})</h3>
  <v-progress-linear
    buffer-value="60"
    :color="(studiedCards * 100) / allCards == 100 ? 'success' : '#282725'"
    :model-value="(studiedCards * 100) / allCards"
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
      <span> {{ studiedCards }} Estudados </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["allCards", "studiedCards", "notStudied"],
};
</script>
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
