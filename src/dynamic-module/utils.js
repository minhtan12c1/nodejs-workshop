
import { store } from '@/store';


export default {
    isModuleLoaded(name) {
        if (!store) {
          return false;
        }
        const m = store.state.dynamicModule.modules[name];
        return m !== null && m !== undefined;
    },
    storeModule(module, name) {
      store.dispatch('storeModule', { module, name });
    },
    loadModule(path) {
        if (!this.isModuleLoaded(path)) {
          import(/* webpackChunkName: "model/[request]" */`@/model/${path}`).then((module) => {
            this.storeModule(module, path);
          });
        }
    },
    removeModule(name) {
        store.dispatch('removeModules', { name });
    }
  };