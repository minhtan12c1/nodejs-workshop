import vpaApi from '@/api/system/saa/chinhanh';


const FIELD_NAMES = vpaApi.FIELD_NAMES;

const dataModel = {
  getObjectModel() {
    return {
      name: 'chi nhanh',
      fields: [
        {
          ...FIELD_NAMES.TENCHINHANH,
        },
        {
          ...FIELD_NAMES.DIACHICHINHANH,
        },
        {
          ...FIELD_NAMES.NHATHUOC_ID,
        },
      ],
    };
  },
  getDataTableModel() {
    return {
      visibleDataHeader: [
          {
              ...FIELD_NAMES.TENCHINHANH,
          },
          {
              ...FIELD_NAMES.DIACHICHINHANH,
          },
          {
              ...FIELD_NAMES.NHATHUOC_ID,
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
      name: 'chi nhanh',
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
