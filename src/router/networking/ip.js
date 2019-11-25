import MainContent from '@/components/MainContent';
import StaticView from '@/components/StaticView';
export default {
  path: 'ip',
  name: 'IP',
  component: MainContent,
  meta: {
    title: 'IP',
  },
  children: [
    {
      path: 'ipconfign',
      name: 'IP_Configuration',
      component: MainContent,
      meta: {
        title: 'Configuration',
      },
      children: [
        {
          path: 'global',
          name: 'IP_Configuration_Global',
          component: StaticView,
          meta: {
            title: 'Global',
            dataModelModuleName: 'networking/ip/ip/global-config',
          },
        },
        {
          path: 'global1',
          name: 'IP_Configuration_Global1',
          component: StaticView,
          meta: {
            title: 'Global1',
            dataModelModuleName: 'networking/ip/ip/global-config1',
          },
        },
      ],
    },
  ],
};
