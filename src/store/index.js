import Vue from 'vue'
import vuex from 'vuex'
import menu from './modules/menu';
import lang from './modules/lang';
import authen from './modules/authen';
import init from './modules/initial';
import cart from './modules/cart';
import responseStatus from './modules/responseStatus';
import dynamicModule from './modules/dynamic-module';

Vue.use(vuex)

export default new vuex.Store({
  state: {
  },
    getters: {
    },
    mutations: {
    },
    modules: {
      menu,
      dynamicModule,
      lang,
      authen,
      init,
      responseStatus,
      cart,
    },
  });
