import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu';
import dynamicModule from './modules/dynamic-module';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    modules: {
      menu,
      dynamicModule,
    },
  });