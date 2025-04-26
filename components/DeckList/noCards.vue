<script setup>
import { methods as methodsNewCard } from "@/scrips/formCard";
</script>

<template>
  <div class="grid">
    <div class="d-flex flex-column">
      <VIcon size="40" class="ma-auto">mdi-cards</VIcon>
      <p>Este deck não tem cartões</p>
      <VBtn
        @click="methodsNewCard.showForm('CREATE')"
        color="#ffffff"
        variant="flat"
        rounded="xl"
        class="mt-4"
        ><b>Adicionar cartões</b></VBtn
      >
    </div>
  </div>
</template>
<style scoped>
p {
  font-size: 14px;
  text-align: center;
}
.grid {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
