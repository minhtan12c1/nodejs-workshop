import nhanvienApi from '@/api/system/saa/nhanvien';
import taikhoanApi from '@/api/system/saa/taikhoan';
import componentName from '@/components/component-name';
import chinhanhApi from '@/api/system/saa/chinhanh';
import commonRule from '@/validation/rule-name/common';

const FIELD_NAMES_1 = nhanvienApi.FIELD_NAMES;
const FIELD_NAMES_2 = taikhoanApi.FIELD_NAMES;

const dataModel = {
    grid: [
        {
            title: 'nhan vien',
            component: componentName.TABLE_VIEW_CONTENT,
            componentProps: {
                dataModel: {
                    getObjectModel() {
                        return {
                            name: 'nhan vien',
                            fields: [
                                {
                                    ...FIELD_NAMES_1.TAIKHOAN_ID,
                                    validationRules: commonRule.REQUIRED,
                                    component: componentName.MY_DYNAMIC_SELECT,
                                    componentProps: {
                                        dataSource: {
                                            api: taikhoanApi.getAll,
                                            index: 'TENTAIKHOAN',
                                            displayFormat: data => data.TENTAIKHOAN,
                                        },
                                        staticItems: [{
                                            text: 'NONE',
                                            value: 'NONE',
                                        }],
                                        dataModelModuleName: 'system/saa/taikhoan',
                                    },
                                },
                                {
                                    ...FIELD_NAMES_1.HO,
                                },
                                {
                                    ...FIELD_NAMES_1.TEN,
                                },
                                {
                                    ...FIELD_NAMES_1.SODT,
                                    validationRules: [commonRule.MIN_STRING_LENGTH, commonRule.ONLY_NUMBERS],
                                },
                                {
                                    ...FIELD_NAMES_1.GIOITINH,
                                    component: componentName.MY_SELECT,
                                },
                                {
                                    ...FIELD_NAMES_1.CHINHANH_ID,
                                    validationRules: commonRule.REQUIRED,
                                    component: componentName.MY_DYNAMIC_SELECT,
                                    componentProps: {
                                        dataSource: {
                                            api: chinhanhApi.getAll,
                                            index: 'ID',
                                            displayFormat: data => data.TENCHINHANH,
                                        },
                                        staticItems: [{
                                            text: 'NONE',
                                            value: 'NONE',
                                        }],
                                        dataModelModuleName: 'system/saa/chinhanh',
                                    },
                                },
                                {
                                    ...FIELD_NAMES_1.DIACHI,
                                },
                            ],
                        };
                    },
                    getDataTableModel() {
                        return {
                            visibleDataHeader: [
                                {
                                    ...FIELD_NAMES_1.ID,
                                },
                                {
                                    ...FIELD_NAMES_1.HO,
                                },
                                {
                                    ...FIELD_NAMES_1.TEN,
                                },
                                {
                                    ...FIELD_NAMES_1.DIACHI,
                                },
                                {
                                    ...FIELD_NAMES_1.SODT,
                                },
                                {
                                    ...FIELD_NAMES_1.GIOITINH,
                                },
                            ],
                        };
                    },
                    getTableProfile() {
                        return {
                            name: 'nhan vien',
                            api: nhanvienApi,
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
                },
            },
        },
        {
            title: 'tai khoan',
            component: componentName.TABLE_VIEW_CONTENT,
            componentProps: {
                dataModel: {
                    getObjectModel() {
                        return {
                            fields: [],
                        };
                    },
                    getDataTableModel() {
                        return {
                            visibleDataHeader: [
                                {
                                    ...FIELD_NAMES_2.TENTAIKHOAN,
                                },
                                {
                                    ...FIELD_NAMES_2.LOAI_TAIKHOAN,
                                },
                            ],
                        };
                    },
                    getTableProfile() {
                        return {
                            name: 'tai khoan',
                            api: taikhoanApi,
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
                },
            },
        },
    ],

};

export default { dataModel };
