import Vue from 'vue';
import Login from '@/components/Login.vue';
import Router from 'vue-router';
import physicalRoute from '@/router/physical';
import systemRoute from '@/router/system';
import networkingRoute from '@/router/networking';
import Home from '@/components/Home.vue';
import NotFound from '@/components/NotFound';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

const rootRoute = {
  children: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/',
      name: 'Home',
      redirect: { name: 'Login' },
      component: Home,
      meta: {
        icon: 'mdi-home',
        title: 'Home',
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            title: 'Dashboard',
          },
        },
        physicalRoute,
        systemRoute,
        networkingRoute,
        {
          path: '/\\S+/',
          name: 'NotFound',
          component: NotFound,
          meta: {
            title: 'Page Not Found',
          },
        },
      ],
    },
  ],
};
export default new Router({
  routes: rootRoute.children,
});
