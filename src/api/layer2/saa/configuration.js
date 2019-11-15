import baseApi from '@/api/base-api';
import vlanDataMap from '@/data-adapter/map/layer2/vpa';

const FIELD_NAMES = {
  slotPort_ifindex_0: {
    name: 'slotPort_ifindex_0',
    label: 'Port',
    excludeGet: true,
  },
  vpaVlanNumber: {
    name: 'vpaVlanNumber',
    label: 'VLAN',
    index: true,
    hint: 'A numerical value that uniquely identifies an individual VLAN. This number was assigned when the VLAN was created. (Range = 1 - 4094)',
  },
  vpaIfIndex: {
    name: 'vpaIfIndex',
    label: 'Port',
    index: true,
    default: [],
    hint: 'The chassis ID, slot and port number or link aggregation ID number for the port.',
  },
  vpaState: {
    name: 'vpaState',
    label: 'Port State',
    adapterMap: vlanDataMap.VPA_STATE,
    hint: 'The VPA port status'
  },
  vpaType: {
    name: 'vpaType',
    label: 'Type',
    adapterMap: vlanDataMap.VPA_TYPE,
    hint: ' The type of VPA'
  } 
};




export default {
  FIELD_NAMES,
  delete() {
    return "delete"
  },
  create() {
    return "create";
  },
  modify() {
    return "modify";
  },
  getAll(callback) {
    return baseApi.getAll("http://localhost:8080/data/layer2/saa/configuration.json",callback);
  },
};
