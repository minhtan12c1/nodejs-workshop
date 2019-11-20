
import Vue from 'vue';
import Login from '@/components/Login.vue';
import Router from 'vue-router';
import VueRouter from 'vue-router';
import layer2Route from '@/router/layer2';
import networkingRoute from '@/router/networking';
import Home from '@/components/Home.vue';
import NotFound from '@/components/NotFound';

Vue.use(VueRouter);
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
      redirect: { name: 'Dashboard' },
      component: Home,
      meta: {
        title: 'Home',
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: NotFound,
          meta: {
            title: 'Dashboard',
          },
        },
          layer2Route,
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
  ]
}

// const router =new VueRouter({
//   mode:'history'
// });

export default new Router({
  routes: rootRoute.children,
});