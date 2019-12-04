import baseApi from '@/api/base-api';

const FIELD_NAMES = {
  ID: {
    name: 'ID',
    label: 'ID chi nhanh',
    index: true,
  },
  TENCHINHANH: {
    name: 'TENCHINHANH',
    label: 'Ten chi nhanh',
    hint: 'Ten chi nhanh',
  },
  DIACHICHINHANH: {
    name: 'DIACHICHINHANH',
    label: 'dia chi chi nhanh',
    sendOnModify: true,
    hint: 'dia chi chi nhanh',
  },
  NHATHUOC_ID: {
    name: 'NHATHUOC_ID',
    label: 'Nha thuoc ID',
    sendOnModify: true,
    hint: 'nhà thuốc id',
  },

};

const TABLE_INFO = {  urn: 'chinhanh.php' };

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
  getTotal(callback) {
     return baseApi.getTotal(TABLE_INFO,callback);
  },
};
