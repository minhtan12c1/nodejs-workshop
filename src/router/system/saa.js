import MainContent from '@/components/MainContent';
import TableView from '@/components/TableView';
import GridView from '@/components/GridView';
import GetDataModel from '@/components/core/getDataModel';

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
    {
      path: 'product',
      name: 'System_Saa_Product',
      component: TableView,
      meta: {
        title: 'product',
        dataModelModuleName: 'system/saa/sanpham',
      },
    },
    {
      path: 'product1',
      name: 'System_Saa_Product1',
      component: GetDataModel,
      meta: {
        title: 'product1',
        dataModelModuleName: 'system/saa/sanpham1',
      },
    },
    {
      path: 'employee-account',
      name: 'System_Saa_Employee-Account',
      component: GridView,
      meta: {
        title: 'Employee Account',
        dataModelModuleName: 'system/saa/nhanvien_taikhoan',
      },
    },
  ],
};
