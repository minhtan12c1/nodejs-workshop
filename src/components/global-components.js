import Vue from 'vue';
import componentName from '@/components/component-name';
import MyTextField from '@/components/core/MyTextField';
import MyStatusSwitch from '@/components/core/MyStatusSwitch';
import MySelect from '@/components/core/MySelect';
import MyDynamicSelect from '@/components/core/MyDynamicSelect';
import TableViewContent from '@/components/TableViewContent';
import CustomViewContent from '@/components/CustomViewContent';

// This module register common components that are used in many views.
// Global component registration will help to eliminate the effor to import that component
// when we need to use it for rendering


Vue.component(componentName.MY_TEXT_FIELD, MyTextField);
Vue.component(componentName.MY_STATUS_SWITCH, MyStatusSwitch);
Vue.component(componentName.MY_SELECT, MySelect);
Vue.component(componentName.MY_DYNAMIC_SELECT, MyDynamicSelect);
Vue.component(componentName.TABLE_VIEW_CONTENT, TableViewContent);
Vue.component(componentName.CUSTOM_VIEW_CONTENT, CustomViewContent);
