import MainContent from '@/components/MainContent';
import TableView from '@/components/TableView';

export default {
  path: 'ipv6',
  name: 'IPv6',
  component: MainContent,
  meta: {
    title: 'IPv6',
  },
  children: [
      {
          path: 'producer',
          name: 'IPv6_Global_producer',
          component: MainContent,
          meta: {
              title: 'producer',
          },
          children: [
              {
                  path: 'producer-content',
                  name: 'IPv6_Global_producer_content',
                  component: TableView,
                  meta: {
                      title: 'Content',
                      dataModelModuleName: 'sytem/saa/producer-content',
                  },
              },
          ],
    },
  ],
};
