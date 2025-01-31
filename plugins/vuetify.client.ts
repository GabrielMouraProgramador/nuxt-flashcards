import '@/scss/style.scss'; 
import 'vuetify/styles'
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import defaults from './vuetify/defaults'
import { themes } from'./vuetify/theme'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    defaults,
    theme: {
      defaultTheme: 'dark',
      themes,
    },
  });
  nuxtApp.vueApp.use(vuetify);

});