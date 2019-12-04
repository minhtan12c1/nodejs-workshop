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
    label: 'SO DT',
    sendOnModify: true,
    hint: 'so dien thoai',
  },
  EMAIL: {
    name: 'EMAIL',
    label: 'EMAIL',
    default: 'abc@gmail',
    sendOnModify: true,
    hint: 'hint email',
  },
  GIOITINH: {
    name: 'GIOITINH',
    label: 'GIOITINH',
    adapterMap: vlanDataMap.GIOITINH,
    sendOnModify: true,
    default: vlanDataMap.GIOITINH.NAM.text,
    hint: 'gioi tinh',
  } ,
};

const TABLE_INFO = {
  urn: 'khachhang.php',
  additionalGetQuery: {
    filterObject: `${FIELD_NAMES.GIOITINH.name}|${FIELD_NAMES.TAIKHOAN_ID.name}`,
    filterOperation: '=&=',
    filterValue: '1|user2',
  },
};

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
  getAll(callback,start, limit) {
    return baseApi.getAll(MIB_INFO,start, limit,callback);
  },
  getTotal(callback) {
    return baseApi.getTotal(TABLE_INFO,callback);
  },
};
