const ComponentName = {
    MY_TEXT_FIELD: 'my-text-field',
    AOS_TEXT_AREA: 'v-textarea',
    AOS_SCALAR_FORM: 'scalar-form',
    MY_SELECT: 'v-select',
    AOS_CHECKBOX: 'v-checkbox',
    AOS_SWITCH: 'v-switch',
    MY_STATUS_SWITCH: 'v-status-switch',
    MY_DYNAMIC_SELECT: 'my-dynamic-select',
    TABLE_VIEW_CONTENT: 'table-view-content',
    CUSTOM_VIEW_CONTENT: 'custom-view-content1',
  };

  const AosComponent = {};
  Object.keys(ComponentName).forEach((key) => {
    AosComponent[key] = {
      component: ComponentName[key],
    };
  });

  export default ComponentName;
  export { AosComponent };
