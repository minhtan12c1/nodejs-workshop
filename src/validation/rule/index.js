import Vue from 'vue';
import VeeValidate from 'patched-vee-validate';
import './common';

const veeConfig = {
    errorBagName: 'veeErrors',
    aria: true,
    classNames: {},
    classes: false,
    delay: 0,
    dictionary: null,
    i18nRootKey: 'validations',
    events: 'input|blur',
    fieldsBagName: 'fields',
    inject: true,
    locale: 'en',
    strict: true,
    validity: false,
  };

  Vue.use(VeeValidate, veeConfig);