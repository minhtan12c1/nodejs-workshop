import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import vuetify from './plugins/vuetify';
import store from '@/store';
import { AuthenStatus } from '@/store/modules/authen-status';
import axios from 'axios'
import '@/validation/rule';
import routerUtils from '@/router/utils';
import '@/components/global-components';
import '@/validation/rule';

Vue.use(axios)

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
  const isNotAuthen = () => {
    return store.state.authen.authenStatus === AuthenStatus.NOT_AUTHENTICATED;
  }
  
  router.beforeEach((to, from, next) => {
    if ((to.name !== "Login") && isNotAuthen()) {
        routerUtils.routeToLogin({ from: to.fullPath });
    } else if ((to.name ===  "Login") && !isNotAuthen()) {
        routerUtils.routeToHome();
    }
    else {
      // When application initialized, the router some how could not redirect to Dashboard if user access path '/' (Home)
      // we need to redirect manually to Dashboard view, otherwise, the NotFound page will be shown.
      if (to.path === '/') {
        routerUtils.routeToDashboard();
        return;
      }
      next();
    }
  });
  


  new Vue({
    render: h => h(App),
    store,
    vuetify,
    router
  }).$mount('#app')
