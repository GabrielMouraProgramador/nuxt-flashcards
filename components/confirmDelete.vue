<template>
  <VSnackbar v-model="snackbar.active" color="#201c1d" class="mb-5" timeout="2500">
    {{ snackbar.text }}
    <template v-slot:actions>
      <VBtn color="" variant="text" @click="snackbar.active = false"> CANCELAR </VBtn>
      <VBtn prepend-icon="mdi-delete" color="error" variant="text" @click="detele()">
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
      this.$emit("delete", this.snackbar.value);
      this.snackbar = {
        active: false,
        text: "",
        value: "",
      };
    },
  },
};
</script>
