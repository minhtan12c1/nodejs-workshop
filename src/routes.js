
import layer2Route from './router/layer2';
import networkingRoute from './router/networking';
import Home from './components/Home.vue';

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: 'Home',
        },
        children: [
          layer2Route,
          networkingRoute,
        ],
      },
]
