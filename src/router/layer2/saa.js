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
      path: 'taikhoan',
      name: 'Layer2_Saa_Tai_Khoan',
      component: TableView,
      meta: {
        title: 'Tai khoan',
        dataModelModuleName: 'layer2/saa/taikhoan',
      },
    },
    {
      path: 'khachhang',
      name: 'Layer2_Saa_khachhang',
      component: TableView,
      meta: {
        title: 'Khach Hang',
        dataModelModuleName: 'layer2/saa/khachhang',
      },
    },
  ],
};
