<template>
  <VCard rounded="xl" class="ma-4 card-height"> teste</VCard>
</template>

<script>
import { Pencil } from "lucide-vue-next";

export default {
  components: {
    Pencil,
  },
};
</script>
<style scoped>
.card-height {
  height: calc(100% - 140px) !important;
}
</style>
