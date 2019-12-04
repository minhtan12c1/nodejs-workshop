<script>
    import { mapActions, mapGetters } from 'vuex';
    import dynamicModuleUtils from '@/dynamic-module/utils';


    export default {
        name: 'GetDataModel',
        components: {
        },
        data() {
            return {
                grid: [],
                initialized: false,
                dataModelModuleName: '',
                dataModel: null,
            };
        },
        computed: {
            ...mapGetters(['modules']),
            ready() {
                return !!this.modules[this.$route.meta.dataModelModuleName];
            },
        },
        methods: {
            ...mapActions([
                'parseResponseStatus',
                'enableGlobalLoading',
                'disableGlobalLoading',
            ]),
            initGridView() {
                if (!this.ready || this.initialized) {
                    return;
                }
                this.dataModelModuleName = this.$route.meta.dataModelModuleName;
                const modelModule = this.modules[this.dataModelModuleName].default;
                this.dataModel = modelModule.dataModel;
                this.grid = this.dataModel.grid;
                this.initialized = true;
            },
        },
        watch: {
            $route(value, previousValue) {
                if (value.name !== previousValue.name) {
                    value.meta.moduleLoader();
                    this.initTableView();
                }
            },
            ready(value) {
                if (value) {
                    this.initGridView();
                } else
                if (this.$route.meta.moduleLoader) {
                    this.$route.meta.moduleLoader();
                } else {
                    dynamicModuleUtils.loadModule(this.$route.meta.dataModelModuleName);
                }
            },
        },
        created() {
            if (this.$route.meta.moduleLoader) {
                this.$route.meta.moduleLoader();
            } else {
                dynamicModuleUtils.loadModule(this.$route.meta.dataModelModuleName);
            }

            this.initGridView();
        },
        mounted() {
            this.initGridView();
        },
        beforeDestroy() {
            this.dataModel = null;
            dynamicModuleUtils.removeModule(this.dataModelModuleName);
        },
    };
</script>

<style scoped lang="stylus">
    .my-group-expand-title-primary
        background-color: #4f6faa
        padding: 8px 1px 0 9px
    .subheading
        color: aliceblue
</style>

<template lang="pug">
    v-layout
        v-flex(lg12 md12 xs12 sm12 xl12)
            v-card
                v-card-title.my-group-expand-title-primary
                    p.subheading {{ $t($route.meta.i18n_title) }}
                    v-spacer
                v-layout(column pt-3 pl-3 pr-3)
                    v-flex(v-for="gridItem in grid"
                    :class="gridItem.layout"
                    :key="gridItem.title")
                        .pb-3
                            component(:is="gridItem.component"
                            :title="$t(gridItem.i18n_title)"
                            v-bind="gridItem.componentProps"
                            )

</template>

