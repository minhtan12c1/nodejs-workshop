
import axios from 'axios/index';
import qs from 'qs';

export default {

    sendPost(queryObject, mibObjectParam, callback) {
        const postParms = qs.stringify(mibObjectParam);
        const promise = axios.post( queryObject.urn, postParms);
        if (callback) {
            promise.then((response) => {
                callback(response);
            });
        }
        return promise;
    },
    sendGet(queryObject, config, callback) {
        axios.defaults.baseURL;
        const promise = axios.get(queryObject, config);
        if (callback) {
          promise.then((response) => {
            callback(response);
          });
        }
        return promise;
      },
    getAll(queryObject,callback) {
        const promise = this.sendGet(queryObject.urn, null, callback);
        return promise.then((response) => {
            return Promise.resolve(response);
          });
    },
    create(object, supportRange, mibInfo, callback) {
        const indexs = [];
        mibInfo.indexs.forEach((value) => {
            if (value instanceof String) {
                indexs.push(value);
            } else {
                indexs.push(value.name);
            }
        });
        const AC_TION = {  request: '1' };
        const MIB_OBJECT = Object.assign(AC_TION, object);
        return this.sendPost(this.generatePostQueryObject(mibInfo, 'create'), MIB_OBJECT, callback);
    },
    modify(object, mibInfo, callback) {
        const AC_TION = {  request: '2' };
        const MIB_OBJECT = Object.assign(AC_TION, object);
        return this.sendPost(this.generatePostQueryObject(mibInfo, 'modify'), MIB_OBJECT, callback);
    },
    delete(object, mibInfo, callback) {

        const mibObject = this.convertObjectToMibParamForDeleting(object, mibInfo);
        return this.sendPost(mibObject, mibObject, callback);
    },
    convertObjectToMibParamForDeleting(objects, mibInfo) {
        const objectValue = {};
        let count = 0;
        for (let i = 0; i < mibInfo.indexs.length; i++) {
            const index = mibInfo.indexs[i];
            let indexParam = `${mibInfo.indexs[i]}:`;
            for (let j = 0; j < objects.length; j++) {
                indexParam = `${indexParam}${objects[j][index]}`;
            }
            objectValue[`${count}`] = indexParam;
            count++;
        }
        const AC_TION = {  request: '3' };
        return Object.assign(AC_TION, objectValue);
    },
    generatePostQueryObject(mibInfo, action) {
        let tableName = mibInfo.urn;
        let delim = '';
        if (action === 'create') {
            if (mibInfo.postRequestOrder) {
                tableName = '';
                const tables = Object.keys(mibInfo.postRequestOrder);
                tables.forEach((table) => {
                    tableName += delim + mibInfo.postRequestOrder[table].urn;
                    delim = '|';
                });
            }
        } else if (action === 'modify') {
            if (mibInfo.modifyUrn) {
                tableName = mibInfo.modifyUrn;
            }
        } else if (action === 'delete') {
            if (mibInfo.deleteRequest) {
                tableName = '';
                mibInfo.deleteRequest.forEach((table) => {
                    tableName += delim + table.urn;
                    delim = '|';
                });
            }
        }
        const retVal = {
            urn: tableName,
        };
        return retVal;
    },
    buildMibInfoFromFieldNames(fieldNames) {
        const mibInfo = {
            fieldNames,
            modifyFields: [],
            deleteFields: [],
            indexs: [],
            allFields: [],
        };
        const keys = Object.keys(fieldNames);
        keys.forEach((key) => {
            const field = fieldNames[key];
            // if (window.capabilityUtils.isCapableVariable(field)) {
            if (field.sendOnModify) {
                mibInfo.modifyFields.push(key);
            }
            if (field.sendOnDelete) {
                mibInfo.deleteFields.push(key);
            }
            if (field.index) {
                mibInfo.indexs.push(key);
            }
            if (!field.excludeGet) {
                mibInfo.allFields.push(key);
            }
            // }
        });
        return mibInfo;
    },
    
    
}