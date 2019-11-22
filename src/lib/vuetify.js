import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/lang';

Vue.use(Vuetify, { 
  lang: {
    t: (key, ...params) => {
      return i18n.t(key, params);
    },
  },
});
