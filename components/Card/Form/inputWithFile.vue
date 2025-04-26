<template>
  <p class="mx-1 mt-2">{{ props.label }}</p>
  <v-textarea
    rows="3"
    v-model="inputText"
    auto-grow
    density="comfortable"
    variant="solo-filled"
    hide-details
  >
    <template #append-inner>
      <label for="img-frente">
        <VBtn @click="triggerFile" icon="mdi-image-area"> </VBtn>
      </label>
    </template>
  </v-textarea>
  <v-file-upload
    v-if="inputFile"
    v-model="inputFile"
    type="file"
    density="compact"
    variant="compact"
  ></v-file-upload>
  <input
    ref="input-file-handler"
    type="file"
    accept="image/*"
    style="display: none"
    @change="onFileChangeFrente"
  />
</template>
<script setup>
import { VFileUpload } from "vuetify/labs/VFileUpload";
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    text: String,
    file: File,
  },
  label: String,
  file: File,
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

const triggerFile = () => {
  inputFileHandler.value?.click();
};

const onFileChangeFrente = (event) => {
  const file = event.target.files;
  if (file) {
    props.modelValue.file = file[0];
  }
};
</script>

<style scoped>
p {
  font-size: 12px;
}
:deep(.v-file-upload) {
  display: none;
}
</style>
