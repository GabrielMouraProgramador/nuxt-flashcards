<template>
  <div class="d-flex flex-column justify-space-between h-100 bg-page">
    <div class="d-flex flex-column justify-center">
      <img src="/success.svg" alt="Confete" class="gif" />
      <h3 class="my-2 text pa-2">
        Incrível, você revisou todos os seus cartões de hoje!
      </h3>
      <p class="mode text">Não demore muito para voltar :)</p>
    </div>
    <div @click="$router.push('/')" class="d-flex pa-5 mb-5">
      <VBtn
        class="ma-auto mt-5"
        size="large"
        variant="tonal"
        block
        color="success"
        readonly="lg"
        >Continuar
      </VBtn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confetti: null,
    };
  },
  mounted() {
    if (process.client) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js";
      script.onload = () => {
        this.confetti = window.confetti;
      };
      document.body.appendChild(script);
      setTimeout(() => {
        this.launchConfetti();
      }, "1000");
    }
  },
  methods: {
    launchConfetti() {
      if (!this.confetti) return;

      let paramsLeft = {
        particleCount: 500,
        spread: 120,
        startVelocity: 100,
        decay: 0.9,
        scalar: 1.2,
        origin: { x: 0, y: 0.5 },
        angle: 45,
      };

      let paramsRight = {
        particleCount: 500,
        spread: 120,
        startVelocity: 100,
        decay: 0.9,
        scalar: 1.2,
        origin: { x: 1, y: 0.5 },
        angle: 135,
      };

      this.confetti(paramsLeft);
      this.confetti(paramsRight);
    },
  },
};
</script>
<script setup>
definePageMeta({
  layout: "empty",
});
</script>
<style scoped>
.gif {
  width: 250px;
  margin: 50px auto 5px auto;
}
.text {
  color: white;
  text-align: center;
  line-height: 1;
}
.bg-page {
  background: #201c1d;
  height: 100%;
}
</style>
