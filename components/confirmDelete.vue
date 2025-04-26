<script setup>
import { variables, methods } from "@/scrips/confirmDelete";

const emit = defineEmits(["delete"]);

const handleDelete = () => {
  methods.deleteItem(emit);
};
</script>

<template>
  <v-bottom-sheet v-model="variables.active">
    <v-card height="200" class="rounded-t-xl">
      <div class="d-flex justify-space-between pa-2">
        <b class="w-100 text-center">Confirmação de exclusão</b>
      </div>

      <VCardText>
        <p>
          <b>{{ variables.text }}</b
          ><br />
          Os dados excluídos serão apagados permanentemente.
        </p>
        <div class="d-flex mt-4">
          <VBtn
            width="50%"
            class="mr-1"
            color=""
            height="50"
            variant="tonal"
            @click="variables.active = false"
          >
            CANCELAR
          </VBtn>
          <VBtn
            width="50%"
            class="ml-1"
            prepend-icon="mdi-delete"
            color="error"
            height="50"
            variant="tonal"
            @click="handleDelete"
          >
            APAGAR
          </VBtn>
        </div>
      </VCardText>
    </v-card>
  </v-bottom-sheet>
</template>
