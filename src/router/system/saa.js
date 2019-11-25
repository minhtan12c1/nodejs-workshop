import MainContent from '@/components/MainContent';
import TableView from '@/components/TableView';
import StaticView from '@/components/StaticView';

export default {
  path: 'saa',
  name: 'System_Saa',
  component: MainContent,
  meta: {
    title: 'SAA',
  },
  children: [
    {
      path: 'global',
      name: 'System_Saa_Global',
      component: StaticView,
      meta: {
        title: 'Global',
        dataModelModuleName: 'system/saa/global',
      },
    },
    {
      path: 'account',
      name: 'System_Saa_account',
      component: TableView,
      meta: {
        title: 'Account',
        dataModelModuleName: 'system/saa/taikhoan',
      },
    },
    {
      path: 'customer',
      name: 'System_Saa_customer',
      component: TableView,
      meta: {
        title: 'Customer',
        dataModelModuleName: 'system/saa/khachhang',
      },
    },
    {
      path: 'employee',
      name: 'System_Saa_employee',
      component: TableView,
      meta: {
        title: 'Employee',
        dataModelModuleName: 'system/saa/nhanvien',
      },
    },
  ],
};
