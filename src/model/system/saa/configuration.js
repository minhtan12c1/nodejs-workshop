import vpaApi from '@/api/system/saa/configuration';
import componentName from '@/components/component-name';


const FIELD_NAMES = vpaApi.FIELD_NAMES;

const dataModel = {
  getObjectModel() {
    return {
      name: 'By Vlan',
      fields: [
        {
          ...FIELD_NAMES.vpaVlanNumber,
        },
        {
          ...FIELD_NAMES.vpaIfIndex,
          readOnly: true,
        },
        {
          ...FIELD_NAMES.vpaType,
          component: componentName.AOS_SELECT,
        },
      ],
    };
  },
  getDataTableModel() {
    return {
      visibleDataHeader: [
        {
          ...FIELD_NAMES.vpaVlanNumber,
        },
        {
          ...FIELD_NAMES.slotPort_ifindex_0,
        },
        {
          ...FIELD_NAMES.vpaState,
        },
        {
          ...FIELD_NAMES.vpaType,
        },
      ],
      expandDataHeader: [],
      deleteConfirmationHeader: [
        {
          ...FIELD_NAMES.vpaVlanNumber,
        },
        {
          ...FIELD_NAMES.slotPort_ifindex_0,
        },
      ],
    };
  },
  getTableProfile() {
    return {
      name: 'By Vlan',
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
          enable: false,
        },
      },
    };
  },
};

export default { dataModel };
