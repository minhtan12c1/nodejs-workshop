import baseApi from '@/api/base-api';
import vlanDataMap from '@/data-adapter/map/layer2/vpa';

const FIELD_NAMES = {
  TENTAIKHOAN: {
    name: 'TENTAIKHOAN',
    label: 'ID',
    index: true,
  },
  LOAI_TAIKHOAN: {
    name: 'LOAI_TAIKHOAN',
    label: 'TAIKHOAN ID',
    hint: '(Range = 1 - 4094)',
    sendOnModify: true,
    adapterMap: vlanDataMap.LOAITAIKHOAN,
    default: vlanDataMap.LOAITAIKHOAN.USER.text,
  },
  
};

const TABLE_INFO = {  urn: 'taikhoan.php' };

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
