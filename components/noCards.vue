<template>
  <div class="d-flex flex-column">
    <VIcon size="40" class="ma-auto">mdi-cards</VIcon>
    <p>Este deck não tem cartões</p>
    <VBtn
      @click="$emit('clicked')"
      color="#ffffff"
      variant="flat"
      rounded="xl"
      class="mt-4"
      ><b>Adicionar cartões</b></VBtn
    >
  </div>
</template>
<style scoped>
p {
  font-size: 14px;
  text-align: center;
}
</style>
