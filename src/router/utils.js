import router from '@/router';

export default {
  changeRouteByName(name, query) {
    router.push({ name, query });
  },
  routeToDashboard() {
    this.changeRouteByName('Dashboard');
  },
  routeToHome() {
    this.changeRouteByName('Home');
  },
  routeToCartItems() {
    this.changeRouteByName('CartItems');
  },
  routeToProduct() {
    this.changeRouteByName('System_Saa_Product1');
  },
  routeToLogin() {
    this.changeRouteByName("Login");
  },
  // routeToPageNotFound(query) {
  //   this.changeRouteByName(PageNotFound, query);
  // },
//   routeToNotPrivilege(query) {
//     this.changeRouteByName(routerName.NO_PRIVILEGE, query);
//   },
//   routeToNotSupport(query) {
//     this.changeRouteByName(routerName.NOT_SUPPORT, query);
//   },
};
