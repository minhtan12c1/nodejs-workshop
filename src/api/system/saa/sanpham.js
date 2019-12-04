import baseApi from '@/api/base-api';

const FIELD_NAMES = {
  ID: {
    name: 'ID',
    label: 'ID',
    index: true,
  },
  TENSANPHAM: {
    name: 'TENSANPHAM',
    label: 'Ten san pham',
    sendOnModify: true,
    hint: 'ten san pham',
  },
  TEN_LOAISP: {
    name: 'TEN_LOAISP',
    label: 'Loai',
    sendOnModify: true,
    hint: 'ten loai',
  },
  TEN_NSX: {
    name: 'TEN_NSX',
    label: 'Nha san xuat',
    sendOnModify: true,
    hint: 'nha san xuat',
  },
  DONVITINH: {
    name: 'DONVITINH',
    label: 'Don vi tinh',
    sendOnModify: true,
    hint: 'don vi tinh',
  },
  GIABAN: {
    name: 'GIABAN',
    label: 'Gia Ban',
    sendOnModify: true,
    hint: 'Gia Ban',
  },
  IMAGE: {
    name: 'IMAGE',
    label: 'IMAGE',
    sendOnModify: true,
    hint: 'image',
  },
  MOTA: {
    name: 'MOTA',
    label: 'MO TA',
    sendOnModify: true,
    hint: 'mo ta',
  },
};

const TABLE_INFO = {
  urn: 'sanpham.php',
  // additionalGetQuery: {
  //   filterObject: `${FIELD_NAMES.GIOITINH.name}|${FIELD_NAMES.TAIKHOAN_ID.name}`,
  //   filterOperation: '=&=',
  //   filterValue: '1|user2',
  // },
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
