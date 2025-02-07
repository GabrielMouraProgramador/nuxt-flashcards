<template>
  <VSnackbar v-model="snackbar.active" timeout="2500">
    {{ snackbar.text }}
    <template v-slot:actions>
      <VBtn color="warning" variant="text" @click="snackbar.active = false">
        CANCELAR
      </VBtn>
      <VBtn prepend-icon="mdi-delete" color="red" variant="text" @click="detele()">
        APAGAR
      </VBtn>
    </template>
  </VSnackbar>
</template>

<script>
export default {
  data() {
    return {
      snackbar: {
        active: false,
        text: "",
        value: "",
      },
    };
  },
  methods: {
    confirmDelete(id, name) {
      this.snackbar = {
        active: true,
        text: `Tem certeza de que deseja excluir: ${name} ?`,
        value: id,
      };
    },
    detele() {
      this.$emit("detele", this.snackbar.value);
      this.snackbar = {
        active: false,
        text: "",
        value: "",
      };
    },
  },
};
</script>
