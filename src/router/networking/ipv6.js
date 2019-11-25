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
      path: 'ipv6_global',
      name: 'IPv6_Global',
      component: MainContent,
      meta: {
        title: 'Global',
      },
      children: [
        {
          path: 'product',
          name: 'IPv6_Global_product',
          component: MainContent,
          meta: {
            title: 'Product',
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
    },
  ],
};
