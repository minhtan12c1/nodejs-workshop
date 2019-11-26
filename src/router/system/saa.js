import MainContent from '@/components/MainContent';
import TableView from '@/components/TableView';

export default {
  path: 'saa',
  name: 'System_Saa',
  component: MainContent,
  meta: {
    title: 'SAA',
  },
  children: [
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
    {
      path: 'branch',
      name: 'System_Saa_Branch',
      component: TableView,
      meta: {
        title: 'Branch',
        dataModelModuleName: 'system/saa/chinhanh',
      },
    },
  ],
};
