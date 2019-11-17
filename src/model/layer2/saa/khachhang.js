import vpaApi from '@/api/layer2/saa/khachhang';
import componentName from '@/components/component-name';


const FIELD_NAMES = vpaApi.FIELD_NAMES;

const dataModel = {
  getObjectModel() {
    return {
      name: 'khach hang',
      fields: [
        {
          ...FIELD_NAMES.ID,
          readOnly: true,
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
          ...FIELD_NAMES.EMAIL,
        },
        {
          ...FIELD_NAMES.GIOITINH,
          component: componentName.MY_SELECT,
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
          ...FIELD_NAMES.EMAIL,
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
      name: 'khach hang',
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
