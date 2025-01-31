<template>
  <v-app-bar density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <div class="d-flex">
      <VBtn variant="flat" color="primary" rounded="xl"> NOVA DECK </VBtn>
    </div>

    <template v-slot:append>
      <v-btn>
        <VIcon>
          <Pencil />
        </VIcon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { Pencil } from "lucide-vue-next";

export default {
  components: {
    Pencil,
  },
};
</script>
