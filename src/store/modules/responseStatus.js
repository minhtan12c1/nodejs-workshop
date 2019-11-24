import i18n from '@/lang';

const state = {
    snackBar: {
        display: false, content: '', color: '', multiLine: false, timeout: 6000,
      },
      globalLoading: false,
  };
  
  // getters
  const getters = {
    snackBar: states => states.snackBar,
    globalLoading: states => states.globalLoading,
  };
  
  const actions = {
    parseResponseStatus(_, { response, action, objectName, handleSuccess, handleError }) {
        const actualObjectName = (objectName && objectName.trim().length > 0) ? ` ${objectName}` : '';
        const actuallMessage = action && action.trim().length > 0 ? `${action}${actualObjectName}` : '';
        state.snackBar.multiLine = false;
        if ((response.data === "true" || response.status === 200) && handleSuccess !== false) {
          if (actuallMessage && actuallMessage.trim().length > 0) {
            state.snackBar.content = `${actuallMessage} successfully!`;
          } else {
            state.snackBar.content = response.statusText;
          }
          state.snackBar.color = 'success';
          state.snackBar.display = true;
        } else if (response.status !== 200 && handleError !== false) {
          if (actuallMessage && actuallMessage.trim().length > 0) {
            const msg = response.statusText
            // Object.keys(response.statusText).length > 0 ? Object.keys(response.statusText).reduce((rs, itm) => {
            //   return `${rs} ${itm}: ${response.statusText[itm]};`;
            // }, '') : response.statusText;
            state.snackBar.content = `${actuallMessage} failed. ${msg.replace(/\\/g, "")}`;
          } else {
            state.snackBar.content = response.statusText;
          }
          if (response.statusText instanceof Array && response.statusText.length > 1 || Object.keys(response.statusText).length > 0) {
            state.snackBar.multiLine = true;
          }
          state.snackBar.color = 'error';
          state.snackBar.display = true;
        }
      },
      parseLocaleResponseStatus(_, { response, action, objectName, handleSuccess, handleError }) {
        const actualObjectName = (objectName && objectName.trim().length > 0) ? ` ${objectName}` : '';
        const actuallMessage = action && action.trim().length > 0 ? `${action}${actualObjectName}` : '';
        state.snackBar.multiLine = false;
        if (response.status === 200 && handleSuccess !== false) {
          if (actuallMessage && actuallMessage.trim().length > 0) {
            state.snackBar.content = i18n.t(`${action}.success`, [objectName]);
          } else {
            state.snackBar.content = response.error;
          }
          state.snackBar.color = 'success';
          state.snackBar.display = true;
        } else if (response.status !== 200 && handleError !== false) {
          if (actuallMessage && actuallMessage.trim().length > 0) {
            const error = i18n.t(`${action}.fail`, [objectName]);
            state.snackBar.content = `${error} \n.${response.error}`;
          } else {
            state.snackBar.content = response.error;
          }
          if (response.error instanceof Array && response.error.length > 1) {
            state.snackBar.multiLine = true;
          }
          state.snackBar.color = 'error';
          state.snackBar.display = true;
        }
      },
      setFailedStatus(_, { message, action }) {
        if (state.snackBar.display) {
          state.snackBar.content += `\n${action} failed. ${message}`;
        } else {
          state.snackBar.content = `${action} failed. ${message}`;
        }
        state.snackBar.color = 'error';
        state.snackBar.display = true;
      },
      setSuccessStatus(_, { action }) {
        state.snackBar.content = `${action} successfully.`;
        state.snackBar.color = 'success';
        state.snackBar.display = true;
      },
      enableGlobalLoading() {
        state.globalLoading = true;
        setTimeout(() => {
          state.globalLoading = false;
        }, 30000);
      },
      disableGlobalLoading() {
        state.globalLoading = false;
      },
  }
  
  const mutations = {
  };
  
  export default {
    state,
    getters,
    actions,
    mutations,
  };
  