
import axios from 'axios/index';

export default {
    sendGet(queryObject, config, callback) {
        const promise = axios.get(queryObject, config);
        if (callback) {
          promise.then((response) => {
            callback(response);
          });
        }
        return promise;
      },
    getAll(queryObject,callback) {
        const promise = this.sendGet(queryObject, null, callback);
        return promise.then((response) => {
            return Promise.resolve(response);
          });
        // jsonUtils.getJsonFromUrl(`http://localhost:8080/data/layer2/saa/configuration.json`).then((rs) => { 
        //     return  rs;
        // }).catch((e) => {
        //     e
        // });
    }
    
    
}