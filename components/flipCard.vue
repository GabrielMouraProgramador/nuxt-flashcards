<template>
  <div class="flip-card" @click="flip()">
    <div class="flip-card-inner" :class="{ rotated: rotate }">
      <VCard rounded="xl" class="flip-card-front">
        <div class="w-100 pa-4">
          <p class="mb-10">
            {{ card?.frete }}
          </p>
          <v-img
            v-if="imageFrente"
            :max-width="800"
            aspect-ratio="16/9"
            cover
            :src="imageFrente"
            class="mx-auto img"
          ></v-img>
        </div>
      </VCard>
      <VCard rounded="xl" class="flip-card-back">
        <div class="w-100 pa-4">
          <p class="mb-10">
            {{ card?.tras }}
          </p>
          <v-img
            v-if="imageTras"
            :max-width="800"
            aspect-ratio="16/9"
            cover
            :src="imageTras"
            class="mx-auto img"
          ></v-img>
        </div>
      </VCard>
    </div>
  </div>
</template>

<script>
export default {
  props: ["card"],
  data() {
    return {
      rotate: false,
      imageTras: "",
      imageFrente: "",
    };
  },
  watch: {
    async card(newCard) {
      const { getUrlFile } = useStorage();

      const { deck_id, imageFrente, imageTras } = newCard;

      getUrlFile(deck_id, imageTras).then((result) => {
        this.imageTras = result ? result : "";
      });
      getUrlFile(deck_id, imageFrente).then((result) => {
        this.imageFrente = result ? result : "";
      });
    },
  },
  methods: {
    flip() {
      this.rotate = !this.rotate;
      this.$emit("next", this.card);
    },
  },
};
</script>

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
}
</style>
