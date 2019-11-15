const state = {
    modules: {
    },
  };
  
  // getters
  const getters = {
    modules: states => states.modules,
  };
  
  const actions = {
    storeModule({ commit }, { module, name }) {
      const tmpModule = state.modules;
      tmpModule[name] = module;
      commit('updateModules', tmpModule);
    },
    removeModules({ commit }, { name }) {
      commit('removeModules', name);
    },
  };
  
  const mutations = {
    updateModules(states, modules) {
      states.modules = Object.assign({}, modules);
    },
    removeModules(states, name) {
      if (states.modules[name]) {
        delete states.modules[name];
      }
    },
  };
  
  export default {
    state,
    getters,
    actions,
    mutations,
  };
  