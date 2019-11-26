import MainContent from '@/components/MainContent';
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
          path: 'product',
          name: 'IPv6_Global_product',
          component: MainContent,
          meta: {
              title: 'product',
          },
          children: [
              {
                  path: 'product-content',
                  name: 'IPv6_Global_product_content',
                  component: TableView,
                  meta: {
                      title: 'Content',
                      dataModelModuleName: 'sytem/saa/product-content',
                  },
              },
          ],
    },
  ],
};
