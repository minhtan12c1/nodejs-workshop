import vpaApi from '@/api/system/saa/taikhoan';
import componentName from '@/components/component-name';


const FIELD_NAMES = vpaApi.FIELD_NAMES;

const dataModel = {
  getObjectModel() {
    return {
      name: 'Tai khoan',
      fields: [
        {
          ...FIELD_NAMES.TENTAIKHOAN,
        },
        {
          ...FIELD_NAMES.LOAI_TAIKHOAN,
          component: componentName.MY_SELECT,
        },
      ],
    };
  },
  getDataTableModel() {
    return {
      visibleDataHeader: [
        {
          ...FIELD_NAMES.TENTAIKHOAN,
        },
        {
          ...FIELD_NAMES.LOAI_TAIKHOAN,
        },
      ],
      expandDataHeader: [],
      deleteConfirmationHeader: [
        {
          ...FIELD_NAMES.TAIKHOAN_ID,
        },
      ],
    };
  },
  getTableProfile() {
    return {
      name: 'Tai khoan',
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
