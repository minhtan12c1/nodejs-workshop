import vpaApi from '@/api/system/saa/sanpham';

const FIELD_NAMES = vpaApi.FIELD_NAMES;

const dataModel = {
  getObjectModel() {
    return {}
  },
  getDataTableModel() {
    return {
      visibleDataHeader: [
        {
          ...FIELD_NAMES.ID,
        },
        {
          ...FIELD_NAMES.TENSANPHAM,
        },
        {
          ...FIELD_NAMES.TEN_LOAISP,
        },
        {
          ...FIELD_NAMES.TEN_NSX,
        },
        {
          ...FIELD_NAMES.DONVITINH,
        },
        {
          ...FIELD_NAMES.GIABAN,
        },
        {
          ...FIELD_NAMES.IMAGE,
        },
        {
          ...FIELD_NAMES.MOTA,
        }
      ],
      deleteConfirmationHeader: [
        {
          ...FIELD_NAMES.ID,
        },
      ],
    };
  },
  getTableProfile() {
    return {
      name: 'san pham',
      api: vpaApi,
      tableToolbar: {
        deleteSelected: {
          enable: false,
        },
        add: {
          enable: false,
        },
      },
      rowAction: {
        delete: {
          enable: false,
        },
        modify: {
          enable: false,
        },
      },
    };
  },
};

export default { dataModel };
