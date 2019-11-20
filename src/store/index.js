import Vue from 'vue'
import vuex from 'vuex'
import menu from './modules/menu';
import lang from './modules/lang';
import authen from './modules/authen';
import dynamicModule from './modules/dynamic-module';

Vue.use(vuex)

export default new vuex.Store({
  state: {
    snackBar: {
      display: false, content: '', color: '', multiLine: false, timeout: 6000,
    },
    globalLoading: false,
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
    },
  });