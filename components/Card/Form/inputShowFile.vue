<template>
  <p class="mx-1 mt-2">{{ props.label }}</p>
  <v-textarea
    rows="3"
    v-model="inputText"
    auto-grow
    density="comfortable"
    class="mb-4"
    variant="solo-filled"
    hide-details
  >
  </v-textarea>

  <v-file-upload
    :class="['mt-4']"
    v-model="inputFile"
    multiple
    type="file"
    density="compact"
    variant="compact"
  ></v-file-upload>
</template>
<script setup>
import { VFileUpload } from "vuetify/labs/VFileUpload";
import { variables } from "@/scrips/formCard";
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    text: String,
    file: File,
  },
});

const emit = defineEmits(["update:modelValue"]);
const inputFileHandler = useTemplateRef("input-file-handler");

const inputText = computed({
  get: () => props.modelValue.text,
  set: (text) => emit("update:modelValue", { text: text, file: props.modelValue.file }),
});

const inputFile = computed({
  get: () => props.modelValue.file,
  set: (file) =>
    emit("update:modelValue", {
      text: props.modelValue.text,
      file: file,
    }),
});
</script>

<style>
p {
  font-size: 12px;
}
:deep(.v-file-upload) {
  display: none;
}
.v-file-upload--density-compact {
  display: none !important;
}
</style>
