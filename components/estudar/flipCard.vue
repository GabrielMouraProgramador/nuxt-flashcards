<script setup lang="ts">
import type { CardDTO } from "~/domain/interfaces/ICardRepository";
import { variables, methods } from "@/scrips/study";
const emit = defineEmits(["next"]);
defineProps<{
  card: CardDTO;
  imgFront: string;
  imgBehind: string;
}>();
</script>

<template>
  <div class="flip-card" @click="methods.flip()">
    <div class="flip-card-inner" :class="{ rotated: variables.flip.rotate }">
      <VCard rounded="xl" class="flip-card-front">
        <div class="w-100 pa-4">
          <p class="mb-10">
            {{ card.front }}
          </p>
          <v-img
            v-if="imgFront"
            :src="imgFront"
            :max-width="800"
            aspect-ratio="16/9"
            cover
            class="mx-auto img"
          ></v-img>
        </div>
      </VCard>
      <VCard rounded="xl" class="flip-card-back">
        <div class="w-100 pa-4">
          <p class="mb-10">
            {{ card.behind }}
          </p>
          <div>
            <v-img
              v-if="imgBehind"
              :src="imgBehind"
              aspect-ratio="16/9"
              cover
              class="mx-auto img"
            ></v-img>
          </div>
        </div>
      </VCard>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  background-color: transparent;
  width: 100%;
  height: 80%;
  inset: 0;
  margin: auto;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.rotated {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: 50px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background: #282725;
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
}

.flip-card-back {
  background-color: #626262;
  color: white;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
}

.img {
  border-radius: 30px;
  max-width: 350px !important;
}
@media (max-width: 480px) {
  .img {
    border-radius: 30px;
    max-width: 90% !important;
  }
}
</style>
