<template>
  <v-bottom-sheet v-model="snackbar.active">
    <v-card height="200" class="rounded-t-xl">
      <div class="d-flex justify-space-between pa-2">
        <b class="w-100 text-center">Confirmação de exclusão </b>
      </div>

      <VCardText>
        <p>
          <b> {{ snackbar.text }}</b
          ><br />
          Os dados excluídos serão apagados permanentemente e não poderão ser recuperados.
        </p>
        <div class="d-flex mt-4">
          <VBtn
            width="50%"
            class="mr-1"
            color=""
            height="50"
            variant="tonal"
            @click="snackbar.active = false"
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
            @click="detele()"
          >
            APAGAR
          </VBtn>
        </div>
      </VCardText>
    </v-card>
  </v-bottom-sheet>
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
