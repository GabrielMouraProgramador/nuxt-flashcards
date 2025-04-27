<script setup>
import { variables, methods } from "@/scrips/formCard";
const tab = ref("");

const content = ref(
  "<p>dsadasdasdasdsadasdasd</p><p>das</p><p>dass</p><h1>asds</h1><p>asd</p>"
);

function enviar() {
  // Converte o conteúdo delta para HTML
  const htmlContent = content.value;

  // Exibe o HTML no console
  console.log(htmlContent);

  // Caso queira manipular o texto simples (sem HTML):
  const plainText = content.value.ops.map((op) => op.insert).join("");
  console.log("Texto simples:", plainText);
}
</script>

<template>
  <v-dialog v-model="variables.showDialog" height="auto">
    <v-card rounded="xl">
      <v-toolbar>
        <v-spacer></v-spacer>
        <div>
          <b v-if="variables.typeAction == 'CREATE'">Adicionar cartões</b>
          <b v-if="variables.typeAction == 'EDIT'">Editar cartão</b>
        </div>

        <v-spacer></v-spacer>
      </v-toolbar>
      <div class="pa-4">
        <v-tabs v-model="tab" align-tabs="center" color="primary">
          <v-tab value="frente">Frente</v-tab>
          <v-tab value="tras">Atras</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="frente">
            <v-container fluid>
              <CardFormInputUploadFile
                v-if="variables.typeAction === 'CREATE'"
                label="Parte da frente"
                v-model="variables.front"
              />
              <CardFormInputShowFile
                v-if="variables.typeAction === 'EDIT'"
                label="Parte da frente"
                v-model="variables.front"
              />
            </v-container>
          </v-tabs-window-item>
          <v-tabs-window-item value="tras">
            <v-container fluid>
              <CardFormInputUploadFile
                v-if="variables.typeAction === 'CREATE'"
                label="Parte de trás"
                v-model="variables.behind"
              />
              <CardFormInputShowFile
                v-if="variables.typeAction === 'EDIT'"
                label="Parte da frente"
                v-model="variables.behind"
              />
            </v-container>
          </v-tabs-window-item>
        </v-tabs-window>

        <VBtn
          :disabled="!variables.behind.text || !variables.front.text"
          @click="methods.activeMethod($route.params.deck_id)"
          class="mt-5"
          block
          color="success"
          :loading="variables.loading"
          variant="tonal"
          size="50"
        >
          SALVAR</VBtn
        >
      </div>
    </v-card>
  </v-dialog>
</template>
