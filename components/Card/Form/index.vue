<script setup>
import { CardFormInputFile } from "#components";
import { variables, methods } from "@/scrips/formCard";
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
        <v-tabs v-model="variables.tab" align-tabs="center" color="primary">
          <v-tab value="frente">Frente</v-tab>
          <v-tab value="tras">Atras</v-tab>
        </v-tabs>
        <v-tabs-window v-model="variables.tab">
          <v-tabs-window-item value="frente">
            <v-container fluid>
              <CardFormInputFile label="Parte da frente" v-model="variables.front" />
            </v-container>
          </v-tabs-window-item>
          <v-tabs-window-item value="tras">
            <v-container fluid>
              <CardFormInputFile label="Parte de trás" v-model="variables.behind" />
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
