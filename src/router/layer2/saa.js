import MainContent from '@/components/MainContent';
import TableView from '@/components/TableView';
import StaticView from '@/components/StaticView';

export default {
  path: 'saa',
  name: 'Layer2_Saa',
  component: MainContent,
  meta: {
    title: 'SAA',
  },
  children: [
    {
      path: 'global',
      name: 'Layer2_Saa_Global',
      component: StaticView,
      meta: {
        title: 'Global',
        dataModelModuleName: 'layer2/saa/global',
      },
    },
    {
      path: 'configuration',
      name: 'Layer2_Saa_Configuration',
      component: TableView,
      meta: {
        title: 'Configuration',
        dataModelModuleName: 'layer2/saa/configuration',
      },
    },
  ],
};
