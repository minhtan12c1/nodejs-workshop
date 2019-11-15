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
      path: 'configuration',
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
      ],
    },
  ],
};
