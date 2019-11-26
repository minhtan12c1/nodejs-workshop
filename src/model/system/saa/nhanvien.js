import vpaApi from '@/api/system/saa/nhanvien';
import taikhoanApi from '@/api/system/saa/taikhoan';
import componentName from '@/components/component-name';
import commonRule from '@/validation/rule-name/common';


const FIELD_NAMES = vpaApi.FIELD_NAMES;

const dataModel = {
  getObjectModel() {
    return {
      name: 'nhan vien',
      fields: [
        {
          ...FIELD_NAMES.TAIKHOAN_ID,
          component: componentName.MY_DYNAMIC_SELECT,
          componentProps: {
            dataSource: {
              api: taikhoanApi.getAll,
              index: 'TENTAIKHOAN',
              displayFormat: data => data.TENTAIKHOAN,
            },
            staticItems: [{
              text: 'NONE',
              value: 'NONE',
            }],
            dataModelModuleName: 'system/saa/taikhoan',
          },
        },
        {
          ...FIELD_NAMES.HO,
        },
        {
          ...FIELD_NAMES.TEN,
          validationRules: [commonRule.REQUIRED, commonRule.MIN_STRING_LENGTH],
        },
        {
          ...FIELD_NAMES.SODT,
        },
        {
          ...FIELD_NAMES.GIOITINH,
          component: componentName.MY_SELECT,
          readOnly: true,
        },
        {
          ...FIELD_NAMES.CHINHAN_ID,
        },
      ],
    };
  },
  getDataTableModel() {
    return {
      visibleDataHeader: [
        {
          ...FIELD_NAMES.ID,
        },
        {
          ...FIELD_NAMES.TAIKHOAN_ID,
        },
        {
          ...FIELD_NAMES.HO,
        },
        {
          ...FIELD_NAMES.TEN,
        },
        {
          ...FIELD_NAMES.DIACHI,
        },
        {
          ...FIELD_NAMES.SODT,
        },
        {
          ...FIELD_NAMES.GIOITINH,
        },
      ],
      expandDataHeader: [],
      deleteConfirmationHeader: [
        {
          ...FIELD_NAMES.ID,
        },
        {
          ...FIELD_NAMES.TAIKHOAN_ID,
        },
      ],
    };
  },
  getTableProfile() {
    return {
      name: 'nhan vien',
      api: vpaApi,
      tableToolbar: {
        deleteSelected: {
          enable: true,
        },
        add: {
          enable: true,
        },
      },
      rowAction: {
        delete: {
          enable: true,
        },
        modify: {
          enable: true,
        },
      },
    };
  },
};

export default { dataModel };
