import Vue from 'vue';
import componentName from '@/components/component-name';
import MyTextField from '@/components/core/MyTextField';
import MyStatusSwitch from '@/components/core/MyStatusSwitch';
import MySelect from '@/components/core/MySelect';

// This module register common components that are used in many views.
// Global component registration will help to eliminate the effor to import that component
// when we need to use it for rendering


Vue.component(componentName.MY_TEXT_FIELD, MyTextField);
Vue.component(componentName.MY_STATUS_SWITCH, MyStatusSwitch);
Vue.component(componentName.MY_SELECT, MySelect);