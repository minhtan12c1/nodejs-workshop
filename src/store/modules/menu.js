import Vue from 'vue'
import Vuex from 'vuex'
import layer2Route from '@/router/layer2/index.js';
import networkingRoute from '@/router/networking/index.js';

Vue.use(Vuex)

const menuData = {
  built: false,
  path: '/',
  meta: {
    title: 'Home',
  },
  children: [
    layer2Route,
    networkingRoute,
  ],
};

const state = {
    menu: {},
    menuReady: false,
    menuBuildingInProgress: false,
};

// getters
const getters = {
  menu: states => states.menu,
  menuReady: states => states.menuReady,
  menuBuildingInProgress: states => states.menuBuildingInProgress,
};

// actions
const actions = {
  buildMenu({ commit }) {
    if (state.menuBuildingInProgress) {
      return Promise.resolve(state.menu);
    }
    state.menuBuildingInProgress = true;
    menuData.id = 0;
    const stack = [];
    menuData.parentId = -1;
    stack.push(menuData);
    let menu = {};
    const items = [];
    let currentId = 1;
    while (stack.length > 0) {
      const menuItem = stack.pop();
      const parentId = menuItem.parentId;
      const id = menuItem.id;
      const label = menuItem.meta.title;
      const active = menuItem.active;
      const path = menuItem.path;
      if (id >= 0) {
        if (items[parentId]) {
          const item = {
            id,
            parentId,
            label,
            path,
            active,
          };
          if (!items[item.parentId].items) {
            items[parentId].items = [];
          }
          items[parentId].items.unshift(item);
          items[id] = item;
        } else {
          items[id] = { id, parentId, label, path, active };
          menu = items[id];
        }
      }
      if (menuItem.children && menuItem.children.length) {
        for (let i = 0; i < menuItem.children.length; i++) {
          const subMenuItem = menuItem.children[i];
          subMenuItem.id = currentId;
          subMenuItem.parentId = menuItem.id;
          subMenuItem.active = false;
          if (!subMenuItem.computedPath) {
            subMenuItem.path = `${subMenuItem.parentId === 0 ? '' : path}/${menuItem.children[i].path}`;
            subMenuItem.computedPath = true;
          }
          currentId++;
          stack.push(subMenuItem);
        }
      }
    }
    commit('SET_MENU', menu);
    state.menuReady = true;
    state.menuBuildingInProgress = false;
    return Promise.resolve(state.menu);
  }
};

const mutations = {
  SET_MENU(states, menu) {
    states.menu = Object.assign({}, menu);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
