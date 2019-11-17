import baseApi from '@/api/base-api';
import vlanDataMap from '@/data-adapter/map/layer2/vpa';

const FIELD_NAMES = {
  ID: {
    name: 'ID',
    label: 'ID',
    index: true,
  },
  TAIKHOAN_ID: {
    name: 'TAIKHOAN_ID',
    label: 'TAIKHOAN ID',
    hint: '(Range = 1 - 4094)',
  },
  HO: {
    name: 'HO',
    label: 'HO',
    index: true,
    hint: 'port.',
  },
  TEN: {
    name: 'TEN',
    label: 'TEN',
    hint: 'The VPA port status'
  },
  DIACHI: {
    name: 'DIACHI',
    label: 'DIACHI',
    default: 'city',
    hint: ' The type of VPA'
  },
  EMAIL: {
    name: 'EMAIL',
    label: 'EMAIL',
    default: 'abc@gmail',
    hint: ' The type of VPA'
  } ,
  GIOITINH: {
    name: 'GIOITINH',
    label: 'GIOITINH',
    adapterMap: vlanDataMap.GIOITINH,
    default: vlanDataMap.GIOITINH.NAM.text,
    hint: ' The type of VPA'
  } ,
};

const TABLE_INFO = {  urn: 'khachhang.php' };

const MIB_INFO = Object.assign(TABLE_INFO, baseApi.buildMibInfoFromFieldNames(FIELD_NAMES));


export default {
  FIELD_NAMES,
  delete(values, callback) {
    return baseApi.delete(values, MIB_INFO, callback);
  },
  create(values, callback) {
    return baseApi.create(values, true, MIB_INFO, callback);
  },
  modify(value, callback) {
    return baseApi.modify(value, MIB_INFO, callback);
  },
  getAll(callback) {
    return baseApi.getAll(MIB_INFO,callback);
  },
};
