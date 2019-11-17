import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { routes } from './routes';
import vuetify from './plugins/vuetify';
import { store } from './store/index';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import '@/components/global-components';



Vue.config.productionTip = false

Vue.use(Vuex);

Vue.use(VueRouter);
const router =new VueRouter({
  routes,
  mode:'history'
});

// store.dispatch('buildMenu');

let apiUrl = null;
  try {
    // In order to change the API URL without re-run the yarn
    // Please create file "env.js" under /src directory with following content:
    // export const apiUrl = 'http://192.168.120.122'
    const myEnv = require('@/env');
    if (myEnv !== null) {
      apiUrl = myEnv.apiUrl;
    }
  } catch (error) {
    // ignore err
  }

  if (apiUrl) {
    axios.defaults.baseURL = apiUrl;
  } 


new Vue({
  render: h => h(App),
  store,
  vuetify,
  router
}).$mount('#app')
