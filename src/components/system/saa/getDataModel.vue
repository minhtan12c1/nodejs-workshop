<script>
    import { mapGetters } from 'vuex';
    import TableViewContent from './TableViewContent.vue';
    import dynamicModuleUtils from '@/dynamic-module/utils';

    export default {
        name: 'TableView',
        data() {
            return {
                dataModel: null,
                dataModelModuleName: '',
                modelGroups: null,
                initialized: false,
                modelModule: null,
                view: '',
            };
        },
        computed: {
            ...mapGetters(['modules']),
            ready() {
                return !!this.modules[this.$route.meta.dataModelModuleName];
            },
        },
        methods: {
            initTableView() {
                if (!this.ready || this.initialized) {
                    return;
                    // this.dataModel = this.modules[this.dataModelModuleName].default.dataModel;
                }
                this.dataModelModuleName = this.$route.meta.dataModelModuleName;
                this.modelModule = this.modules[this.dataModelModuleName].default;
                if (this.modelModule.dataModel.view) {
                    this.view = this.modelModule.dataModel.default;
                    this.dataModel = this.modelModule.dataModel.models[this.view];
                } else {
                    this.dataModel = this.modelModule.dataModel;
                }
                this.initialized = true;
            },
        },
        components: {
            appTableViewContent: TableViewContent
        },
        watch: {
            $route(value, previousValue) {
                if (value.name !== previousValue.name) {
                    this.initTableView();
                }
            },
            ready(value) {
                if (value) {
                    this.initTableView();
                    // this.refreshData();
                } else
                if (this.$route.meta.moduleLoader) {
                    this.$route.meta.moduleLoader();
                } else if (this.$route.meta.dataModelModuleName) {
                    dynamicModuleUtils.loadModule(this.$route.meta.dataModelModuleName);
                }
            },
        },
        created() {
            this.dataModelModuleName = this.$route.meta.dataModelModuleName;
            if (this.$route.meta.moduleLoader) {
                this.$route.meta.moduleLoader();
            } else if (this.$route.meta.dataModelModuleName) {
                dynamicModuleUtils.loadModule(this.$route.meta.dataModelModuleName);
            }
            this.initTableView();
        },
        mounted() {
            this.initTableView();
        },
        beforeDestroy() {
            this.dataModel = null;
            this.modelModule = null;
            dynamicModuleUtils.removeModule(this.dataModelModuleName);
        },

    }
</script>

<style lang="stylus" scoped>
    .aos-group-actions
        padding: 0 !important
    .aos-group-expand-title-primary
        padding: 6px 8px !important
        background-color: #4f6faa
        > p
            height: 36px
            padding:8px
            margin: 0
            color: white
    .label-field
        color black
        vertical-align: middle
        padding: 3px 0 4px
</style>

<template lang="pug">
    v-layout
        v-flex(lg12 md12 xs12)
            app-table-view-content(v-if="ready"
            ref="tableViewContent"
            :title="$route.meta.title"
            :data-model="this.modelModule.dataModel")
</template>
