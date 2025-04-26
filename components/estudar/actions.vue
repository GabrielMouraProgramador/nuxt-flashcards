<template>
  <div class="d-flex justify-end">
    <VBtn
      v-if="variables.next"
      @click="variables.difficulty.sheet = true"
      icon="mdi-chevron-right"
    >
    </VBtn>
  </div>
</template>
<script setup>
import { variables, methods } from "@/scrips/study";
</script>
