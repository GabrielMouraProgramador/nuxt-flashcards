<template>
  <v-app hei>
    <AppBar />
    <VMain>
      <slot />
    </VMain>
    <NavBar />
  </v-app>
</template>
<style>
.bg {
  background: black !important;
}
</style>
