import Vue from 'vue';

import {
    Pagination,
    Table,
    TableColumn,
    Tooltip,
    Loading,
    Select,
    Option,
    DatePicker,
    TimePicker,
    Input,
} from 'element-ui';
import i18n from '@/lang';

import ElementLocale from 'element-ui/lib/locale';

Vue.use(Pagination);
Vue.use(Tooltip);
Vue.use(TableColumn);
Vue.use(Table);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Loading.directive);
Vue.use(Input);

Vue.prototype.$loading = Loading.service;

ElementLocale.i18n((key, value) => i18n.t(key, value));
