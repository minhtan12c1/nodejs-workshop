
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
    URL: '?',
    sendGet(queryObject, urn, callback) {
        const query = qs.stringify(queryObject);
        const promise = axios.get(urn + this.URL + query);
        if (callback) {
          promise.then((response) => {
            callback(response);
          });
        }
        return promise;
      },
    sendGetTable(queryObject, urn, callback) {

        return this.sendGet(queryObject, urn, callback);
    },
    getAll(mibInfo, start, limit,callback) {
        let paramObj = {};
        let urn = mibInfo.urn;
        paramObj = this.prepareMibParamForGetFields(mibInfo, start, limit);
        return this.sendGetTable(paramObj, urn, callback).then(response => {
            response.paramObj = paramObj;
            return Promise.resolve(response);
        });
    },
    getTotal(TABLE_INFO, callback) {
        let paramObj = {};
        let urn = TABLE_INFO.urn;
        const AC_TION = {  request: '2' };
        return this.sendGet(AC_TION, urn, callback).then(response => {
            response.paramObj = paramObj;
            return Promise.resolve(response);
        });
    },
    prepareMibParamForGetFields(mibInfo,start, limit) {
        let result = {};
        result['request']= 1;
        let count = 0;
        mibInfo.allFields.forEach((field) => {
            result[`${count}`] = field;
            count++ ;
        });

        if (mibInfo.additionalGetQuery) {
            result = Object.assign(result, mibInfo.additionalGetQuery);
        }
        result['start']= start;
        result['limit']= limit;
        return result;
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
        let mibObject = {};
        mibObject = this.convertObjectToMibParamForAdding(object, mibInfo);
        return this.sendPost(this.generatePostQueryObject(mibInfo, 'create'), mibObject, callback);
    },
    modify(object, mibInfo, callback) {
        let mibObject = {};
        mibObject = this.convertObjectToMibParamForModifying(object, mibInfo);
        return this.sendPost(this.generatePostQueryObject(mibInfo, 'modify'), mibObject, callback);
    },
    delete(object, mibInfo, callback) {
        const mibObject = this.convertObjectToMibParamForDeleting(object, mibInfo);
        return this.sendPost(this.generatePostQueryObject(mibInfo, 'delete'), mibObject, callback);
    },
    convertObjectToMibParamForAdding(object, mibInfo) {
        const mibObject = {};
        let count = 0;
        mibInfo.indexs.forEach((val) => {
          if (Array.isArray(object[val]) && object[val].length > count) {
            count = object[val].length;
          }
        });
        mibInfo.indexs.forEach((index) => {
          if ((!Array.isArray(object[index]) && count) || (Array.isArray(object[index]) && object[index].length < count)) {
            object[index] = this.formatIndexValue(object[index], count);
          } else if (Array.isArray(object[index]) && object[index].length === count) {
            let temp = '';
            for (let i = 0; i < count; i++) {
              if (i !== 0) {
                temp += `|${object[index][i]}`;
              } else {
                temp += object[index][i];
              }
            }
            object[index] = temp;
          }
        });
        const objectKeys = Object.keys(object);
        objectKeys.forEach((objectKey) => {
          const objectValue = (object[objectKey] !== null && object[objectKey] !== undefined) ? `${object[objectKey]}` : '';
          if (mibInfo.indexs.includes(objectKey)) {
             mibObject[`${objectKey}`] = `${objectValue}`;
          } else if (objectValue.length && objectValue.length > 0) {
            mibObject[`${objectKey}`] = `${objectValue}`;
          }
        });
        const AC_TION = {  request: '1' };
        const MIB_OBJECT = Object.assign(AC_TION, mibObject);
        return MIB_OBJECT;
    },
    convertObjectToMibParamForModifying(object, mibInfo) {
        const mibObject = {};
        mibInfo.indexs.forEach((index) => {
          if (object[index]) {
            mibObject[`${index}`] = `${object[index]}`;
          }
        });
        mibInfo.modifyFields.forEach((field) => {
          if (object[field] !== null && object[field] !== undefined && object[field] !== '') {
            mibObject[`${field}`] = `${object[field]}`;
          }
        });
        const AC_TION = {  request: '2' };
        return Object.assign(AC_TION, mibObject);
      },
    convertObjectToMibParamForDeleting(objects, mibInfo) {
        const objectValue = {};
        for (let i = 0; i < mibInfo.indexs.length; i++) {
            const index = mibInfo.indexs[i];
            for (let j = 0; j < objects.length; j++) {
                objectValue[`${mibInfo.indexs[i]}`] = `${objects[j][index]}`;
            }

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
