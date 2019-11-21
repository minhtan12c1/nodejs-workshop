import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import vuetify from './plugins/vuetify';
import store from '@/store';
// import { AuthenStatus } from '@/store/modules/authen-status';
import axios from 'axios'
import '@/validation/rule';
import routerUtils from '@/router/utils';
import '@/components/global-components';

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
  Vue.config.productionTip = false;
  // const isNotAuthen = () => {
  //   const x = store.state.authen.authenStatus
  //   return x !== AuthenStatus.NOT_AUTHENTICATED;
  // }
  
  if ((localStorage.getItem('LOAI_TAIKHOAN') === '')) {
    routerUtils.routeToHome();
  } 
  else {
    routerUtils.routeToDashboard();
  }
  


  new Vue({
    render: h => h(App),
    store,
    vuetify,
    router
  }).$mount('#app')
