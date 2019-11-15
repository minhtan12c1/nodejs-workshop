export default {
    convertApiData(fields, data) {
        if (!fields || (Array.isArray(fields) && !fields.length)) {
          return data
        }
        const result = Object.assign({}, data);
        fields.forEach((field) => {
          if (field.adapter && field.adapter.toUiData) {
            result[field.name] = field.adapter.toUiData(result[field.name], result);
          }
          if (field.adapterMap) {
            result[field.name] = this.convertApiDataToUiData(field.adapterMap, result[field.name]);
          }
        })
        return result;
      },

    transformTableDataToUI(dataTableModel, data) {
        let result = data;
    
        result = this.convertApiData(dataTableModel.visibleDataHeader, result);
        result = this.convertApiData(dataTableModel.expandDataHeader, result);
    
        return result;
      },
      convertApiDataToUiData(adapterMap, data) {
        let result;
        const valuePairs = Object.values(adapterMap);
        const convertSingleData = function convertSingleData(singleData) {
          for (let i = 0; i < valuePairs.length; i++) {
            if (`${singleData}` === `${valuePairs[i].value}`) {
              return valuePairs[i].text;
            }
          }
          return singleData;
        };
        if (data !== null && data !== undefined) {
          if (data instanceof Array) {
            result = [];
            data.forEach((singleData) => {
              result.push(convertSingleData(singleData));
            });
          } else {
            result = convertSingleData(data);
          }
        }
    
        return result;
      },
}
