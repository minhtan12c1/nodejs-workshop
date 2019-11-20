import baseApi from '@/api/base-api';

export default {
  login(creds) {
    return baseApi.sendPost({ urn: 'taikhoan.php'},{ request: '4', ...creds });
  },

  checkSession() {
    return baseApi.sendGet({ domain: 'getUserName' });
  },

  logout() {
    return baseApi.sendGet({ domain: 'auth' });
  },

  changePassword(creds) {
    return baseApi.sendGet({ domain: 'auth', ...creds });
  },
};
