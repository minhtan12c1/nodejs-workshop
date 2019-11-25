import physicalRoute from '@/router/physical';
import systemRoute from '@/router/system';
import networkingRoute from '@/router/networking';

const menuData = {
  built: false,
  path: '/',
  meta: {
    title: 'Home',
  },
  children: [
    physicalRoute,
    networkingRoute,
    systemRoute,
  ],
};

const state = {
    menu: {},
    menuReady: false,
    menuBuildingInProgress: false,
    breadCums: [],
    waitingPath: null,
    currentMenu: {},
    upperMenu: {},
};


// getters
const getters = {
  menu: states => states.menu,
  menuReady: states => states.menuReady,
  menuBuildingInProgress: states => states.menuBuildingInProgress,
  breadCums: states => states.breadCums,
  waitingPath: states => states.waitingPath,
  currentMenu: states => states.currentMenu,
  upperMenu: states => states.upperMenu,
};


const getMenuByPath = (path, menu) => {
  const realPath = removeTailSlashInPath(path);
  const stack = [];
  stack.push(menu);
  while (stack.length > 0) {
    const menuItem = stack.pop();
    if (menuItem.path === realPath) {
      return menuItem;
    } else if (Array.isArray(menuItem.items) && menuItem.items.length > 0) {
      menuItem.items.forEach((subMenuItem) => {
        if (subMenuItem.path === realPath || isParentPath(realPath, subMenuItem.path)) {
          stack.push(subMenuItem);
        }
      });
    }
  }
  return null;
};

const removeTailSlashInPath = (path) => {
  let realPath = path;
  while (realPath.charAt(realPath.length - 1) === '/') {
    realPath = realPath.slice(0, realPath.length - 1);
  }
  return realPath;
};

const isParentPath = function isParentPath(path, parentPath) {
  return parentPath === '/' || (parentPath && parentPath.length < path.length
    && path.slice(0, parentPath.length) === parentPath
    && path.charAt(parentPath.length) === '/');
};

const getUpperMenu = (current, big) => {
  if (current && current.parentId && big) {
    const papa = getMenuByPath(getParentPath(current.path), big);
    if (isCorrectUpper(papa)) {
      return papa;
    }
  }

  return null;
};

const getParentPath = (path) => {
  const realPath = removeTailSlashInPath(path);
  const lastSlashIndex = realPath.lastIndexOf('/');
  if (lastSlashIndex === 0) {
    return '/';
  }
  return realPath.slice(0, realPath.lastIndexOf('/'));
};

const setMenuProp = (key, val, menu) => {
  if (menu) {
    menu[key] = val;

    if (menu.items) {
      for (let i = 0; i < menu.items.length; i++) {
        setMenuProp(key, val, menu.items[i]);
      }
    }
  }
};

const isCorrectUpper = (papa) => {
  return papa && papa.path && papa.path.lastIndexOf('/') > 0;
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
      const i18n_label = menuItem.meta.i18n_title;
      const active = menuItem.active;
      const path = menuItem.path;
      if (id >= 0) {
        if (items[parentId]) {
          const item = {
            id,
            parentId,
            label,
            i18n_label,
            path,
            active,
          };
          if (!items[item.parentId].items) {
            items[parentId].items = [];
          }
          items[parentId].items.unshift(item);
          items[id] = item;
        } else {
          items[id] = { id, parentId, label,i18n_label, path, active };
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
  },
  goToUpperMenu() {
    const newCurrentMenu = state.upperMenu;
    const newUpperMenu = getUpperMenu(state.upperMenu, state.menu);
    state.currentMenu = newCurrentMenu;
    state.upperMenu = newUpperMenu;
  },

  exploreMenu(_, { targetMenu }) {
    state.upperMenu = state.currentMenu;
    state.currentMenu = targetMenu;
  },

  navigatePath(_, { path, breadCumsRaw }) {
    if (!state.menuReady) {
      state.waitingPath = { path, breadCumsRaw };
      return;
    }
    state.waitingPath = null;

    setMenuProp('active', false, state.menu);
    const menuItem = getMenuByPath(path, state.menu);
    if (menuItem === null) {
      return;
    }

    if (Array.isArray(menuItem.items) && menuItem.items.length > 0) {
      state.currentMenu = menuItem;
    } else if (menuItem && menuItem.parentId > 0) {
      menuItem.active = true;
      const m = getUpperMenu(menuItem, state.menu);
      state.currentMenu = (m && m.parentId !== 0) ? m : menuItem;
    }

    state.upperMenu = getUpperMenu(state.currentMenu, state.menu);

    if (breadCumsRaw && breadCumsRaw.length > 0) {
      state.breadCums = Object.assign([], breadCumsRaw);
    } else {
      state.breadCums = null;
    }
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
