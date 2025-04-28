<template>
  <p class="mx-1 mt-2">{{ props.label }}</p>
  <QuillEditor
    v-model:content="inputText"
    contentType="html"
    theme="snow"
    toolbar="full"
  />
  <div class="pb-5">
    <v-file-upload
      :id="variables.typeAction === 'EDIT' ? 'edit-v-file-upload' : 'add'"
      :class="['mt-4']"
      v-model="inputFile"
      multiple
      type="file"
      density="compact"
      variant="compact"
    ></v-file-upload>
  </div>
</template>
<script setup>
import { variables } from "@/scrips/formCard";

import { VFileUpload } from "vuetify/labs/VFileUpload";
import { computed } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    text: String,
    file: File,
  },
});

const inputText = computed({
  get() {
    return props.modelValue.text;
  },
  set(text) {
    emit("update:modelValue", { text, file: props.modelValue.file });
  },
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
</style>
