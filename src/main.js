import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import vuetify from './plugins/vuetify';
import store from '@/store';
import axios from 'axios'
import routerUtils from '@/router/utils';
import i18n from '@/lang';
import '@/components/global-components';
import '@/validation/rule';

  store.dispatch('getLangMap');
  //store.dispatch('loadDefaultLocale');  

  let apiUrl = null;
  try {
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
  router.beforeEach((to, from, next) => {
    store.dispatch('navigatePath', { path: to.path, breadCumsRaw: to.matched });
    next();
  });
  

  const app = new Vue({
    render: h => h(App),
    store,
    vuetify,
    router,
    i18n
  }).$mount('#app')


  export default app;
