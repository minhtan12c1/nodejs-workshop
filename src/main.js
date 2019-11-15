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

new Vue({
  render: h => h(App),
  store,
  vuetify,
  router
}).$mount('#app')
