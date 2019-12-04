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
    Row,
    Col,
    Card,
    Button,
    Image,
    Popover
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
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Button);
Vue.use(Image);
Vue.use(Popover);

Vue.prototype.$loading = Loading.service;

ElementLocale.i18n((key, value) => i18n.t(key, value));
