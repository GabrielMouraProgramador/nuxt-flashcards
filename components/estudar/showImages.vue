<script setup>
import { variables } from "@/scrips/study";
import { CircleX } from "lucide-vue-next";
</script>

<template>
  <v-bottom-sheet v-model="variables.showBigImagen" fullscreen>
    <v-card class="bottom-sheet-content">
      <div class="sheetHeader">
        <p class="d-flex justify-space-between align-center sheetTitle">
          {{ title }}
          <v-icon @click="variables.showBigImagen = false" style="cursor: pointer">
            <CircleX />
          </v-icon>
        </p>
      </div>
      <v-carousel v-model="selectedIndex" hide-delimiters cycle class="Carousel" s>
        <v-carousel-item v-for="(image, index) in images" :key="index">
          <v-img :src="image" class="zoomable-img my-auto" />
        </v-carousel-item>
      </v-carousel>
      <div class="custom-delimiters">
        <span
          v-for="(image, index) in images"
          :key="index"
          class="dot"
          :class="{ active: selectedIndex === index }"
          @click="selectedIndex = index"
        ></span>
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: ["images", "title"],
  data() {
    return {
      showThumbnailsHover: false,
      selectedIndex: 0,
      zoom: 2,
      imageStyle: {
        transform: "scale(1)",
        transformOrigin: "center center",
      },
      thumbnailTimeout: null,
      carouselCurrentHeight: 400,
    };
  },
};
</script>
<style scoped>
.custom-delimiters {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #2c2c2c;
  cursor: pointer;
}

.dot.active {
  background-color: #575757;
  width: 20px;
  border-radius: 10px;
}

.imagesList {
  border-radius: 5px;
  border: 0.5px solid #000000;
  cursor: pointer;
}

.imagesList.selected {
  border-bottom: 2px solid #7c7c7c !important;
  border: none;
}
.imgMain {
  max-width: 400px;
  max-height: 400px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.85s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.v-carousel-item .v-img {
  transition: transform 0.5s ease;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
}
.bottom-sheet-content {
  display: flex;
  flex-direction: column;
  gap: 15px;

  background: #131313;

  height: 100vh;
}
.sheetHeader {
  padding: 10px 0px;
  background: #191919;
}

.btn {
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background-color: #434343;

  color: #565656;
  font-size: 16px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.16px;
}

.sheetTitle {
  color: #636363;
  font-size: 16px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.16px;
  padding: 15px;
  height: 30px;
}

@media (max-width: 500px) {
  .Carousel {
    max-height: 400px;
  }
}
</style>
