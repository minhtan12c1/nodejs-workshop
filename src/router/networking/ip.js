import MainContent from '@/components/MainContent';
import StaticView from '@/components/StaticView';
import TableView from '@/components/TableView';

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
          path: 'Layer1',
          name: 'Layer1_Sa',
          component: MainContent,
          meta: {
            title: 'Layer1',
          },
          children: [
            {
              path: 'khachhang',
              name: 'Layer2_Saa_khachhang1',
              component: TableView,
              meta: {
                title: 'Khach Hang',
                dataModelModuleName: 'sytem/saa/khachhang',
              },
            },
          ],
        },
      ],
    },
  ],
};
