import MainContent from '@/components/MainContent';
import TableView from '@/components/TableView';

export default {
  path: 'ethernet',
  name: 'Ethernet',
  component: MainContent,
  meta: {
    title: 'Ethernet',
  },
  children: [
    {
      path: 'ptp',
      name: 'Ptp',
      component: MainContent,
      meta: {
        title: 'PTP',
      },
      children: [
        {
          path: 'product',
          name: 'Ethernet_Product',
          component: TableView,
          meta: {
            title: 'Product',
            dataModelModuleName: 'physical/ethernet/product',
          },
        },
        {
          path: 'type-product',
          name: 'Ethernet_Type_Product',
          component: TableView,
          meta: {
            title: 'Type Product',
            dataModelModuleName: 'physical/ethernet/type-product',
          },
        },
        {
          path: 'price',
          name: 'Ethernet_price',
          component: TableView,
          meta: {
            title: 'Price',
            dataModelModuleName: 'physical/ethernet/price',
          },
        },
      ],
    },
  ],
};
