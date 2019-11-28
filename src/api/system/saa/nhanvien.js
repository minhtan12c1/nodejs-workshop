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
    sendOnModify: true,
    hint: 'tai khoan id',
  },
  HO: {
    name: 'HO',
    label: 'HO',
    sendOnModify: true,
    hint: 'ho va ten',
  },
  TEN: {
    name: 'TEN',
    label: 'TEN',
    sendOnModify: true,
    hint: ' ho ten',
  },
  DIACHI: {
    name: 'DIACHI',
    label: 'DIACHI',
    default: 'city',
    sendOnModify: true,
    hint: 'dia chi',
  },
  SODT: {
    name: 'SODT',
    label: 'SODT',
    sendOnModify: true,
    hint: 'so dien thoai',
  } ,
  GIOITINH: {
    name: 'GIOITINH',
    label: 'GIOITINH',
    adapterMap: vlanDataMap.GIOITINH,
    default: vlanDataMap.GIOITINH.NAM.text,
    sendOnModify: true,
    hint: 'gioi tinh',
  } ,
  CHINHANH_ID: {
    name: 'CHINHANH_ID',
    label: 'CHINHAN ID',
    sendOnModify: true,
    hint: 'chinhanh',
  } ,
};

const TABLE_INFO = {  urn: 'nhanvien.php' };

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
