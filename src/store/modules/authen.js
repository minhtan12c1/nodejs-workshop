import authApi from '@/api/authen-api';
import { AuthenStatus } from './authen-status';
import routerUtils from '@/router/utils';


const state = {
  authenStatus: AuthenStatus.UNKNOWN,
  username: '',
  loggingOut: false,
};

// getters
const getters = {
  authenStatus: states => states.authenStatus,
  username: states => states.username,

};

const actions = {
  login(_, { creds }) {
    state.loginError = false;
    return authApi.login(creds).then((response) => {
      if (response.statusText === "OK" && response.data.LOAI_TAIKHOAN === 'admin' || response.data.LOAI_TAIKHOAN === 'user') {
        localStorage.setItem('LOAI_TAIKHOAN', response.data.LOAI_TAIKHOAN);
        this.user = creds.username;
        state.authenStatus = AuthenStatus.AUTHENTICATED;
        state.username = creds.username;
        return Promise.resolve(state.authenStatus);
      } else {
        state.authenStatus = AuthenStatus.NOT_AUTHENTICATED;
        return Promise.reject(new Error(response.error));
      }
    });
  },

  logout() {
      localStorage.setItem('LOAI_TAIKHOAN', "");
      routerUtils.routeToHome();
    // if (state.loggingOut || state.authenStatus === AuthenStatus.NOT_AUTHENTICATED) {
    //   return;
    // }
    // state.loggingOut = true;
    // authApi.logout().then((response) => {
    //   if (response.success) {
    //     state.loggingOut = false;
    //     commit("CLEAR_AUTHEN_STATUS");
    //   }
    // }).catch(() => {
    //   /* eslint no-param-reassign: ["error", { "props": false }] */});
  },
  checkSession() {
    return authApi.login().then((response) => {
      if (!response.data) {
        state.authenStatus = AuthenStatus.NOT_AUTHENTICATED;
        return Promise.reject(new Error('Not Authenticated'));
      } else {
        state.authenStatus = AuthenStatus.AUTHENTICATED;
        state.username = response.data;
        return Promise.resolve(state.authenStatus);
      }
    }).catch((error) => {
      state.authenStatus = AuthenStatus.NOT_AUTHENTICATED;
      state.username = null;
      return Promise.reject(error);
    });
  },
};



const mutations = {
  CLEAR_AUTHEN_STATUS(states) {
    states.authenStatus = AuthenStatus.NOT_AUTHENTICATED;
    states.username = '';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
