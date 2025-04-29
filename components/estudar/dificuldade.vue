<script setup>
import { variables, methods } from "@/scrips/study";

// handleKey(eventKey) {
//       if (this.sheet) {
//         if (eventKey === "1") {
//           this.setCardBack();
//         }
//         if (eventKey === "2") {
//           this.$emit("nextCard", {
//             difficulty: { dificuldade: "Dificil", time: this.dificil },
//             card_id: this.card_id,
//           });
//         }
//         if (eventKey === "3") {
//           this.$emit("nextCard", {
//             difficulty: { dificuldade: "Bom", time: this.bom },
//             card_id: this.card_id,
//           });
//         }
//         if (eventKey === "4") {
//           this.$emit("nextCard", {
//             difficulty: { dificuldade: "Facil", time: this.facil },
//             card_id: this.card_id,
//           });
//         }
//       }
//     },
//     methods.setDifficulty(difficulty) {
//       this.$emit("nextCard", { difficulty, card_id: this.card_id });
//     },
//     setCardBack() {
//       this.$emit("backCard");
//       this.sheet = false;
//     },
</script>

<template>
  <v-bottom-sheet v-model="variables.difficulty.sheet">
    <v-card class="rounded-t-xl">
      <div class="d-flex justify-space-between pa-2">
        <b class="w-100 text-center">Dificuldade do card </b>
      </div>
      <VCardText class="d-flex ga-2 height">
        <VCard
          @click="methods.backCard()"
          rounded="lg"
          class="m-4 d-novo d-flex flex-column justify-center"
        >
          <p>De novo</p>
          <span>{{ variables.difficulty.agora }}</span>
        </VCard>
        <VCard
          @click="
            methods.setDifficulty({
              level: 'Dificil',
              last_time: variables.difficulty.dificil,
            })
          "
          rounded="lg"
          class="m-4 d-dificil d-flex flex-column justify-center"
        >
          <p>Dificil</p>
          <span> {{ variables.difficulty.dificil }}</span>
        </VCard>
        <VCard
          @click="
            methods.setDifficulty({ level: 'Bom', last_time: variables.difficulty.bom })
          "
          rounded="lg"
          class="m-4 d-bom d-flex flex-column justify-center"
        >
          <p>Bom</p>
          <span> {{ variables.difficulty.bom }}</span>
        </VCard>
        <VCard
          @click="
            methods.setDifficulty({
              level: 'Facil',
              last_time: variables.difficulty.facil,
            })
          "
          rounded="lg"
          class="m-4 d-facil d-flex flex-column justify-center"
        >
          <p>Facil</p>
          <span> {{ variables.difficulty.facil }}</span>
        </VCard>
      </VCardText>
    </v-card>
  </v-bottom-sheet>
</template>

<style scoped>
.card {
  background: #282725;
}
.d-novo {
  background: #351f20;
  width: 25%;
  height: 50px;
}
.d-dificil {
  background: #3f3720;
  width: 25%;
  height: 50px;
}

.d-bom {
  background: #2c361b;
  width: 25%;
  height: 50px;
}
.d-facil {
  background: #232833;
  width: 25%;
  height: 50px;
}
p {
  font-size: 12px;
  text-align: center;
}
span {
  font-size: 10px;
  text-align: center;
  width: 100%;
  line-height: 1;
}
.height {
  height: 130px;
}
</style>
