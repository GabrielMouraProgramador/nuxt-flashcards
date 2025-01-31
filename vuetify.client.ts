import '@/scss/style.scss'; 
import 'vuetify/styles'
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import defaults from './vuetify/defaults'
import { themes } from'./vuetify/theme'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    defaults,
    theme: {
      defaultTheme: 'light',
      themes,
    },
  });
  nuxtApp.vueApp.use(vuetify);
  nuxtApp.vueApp.use(VueApexCharts);
  nuxtApp.vueApp.use(VueTablerIcons);
});