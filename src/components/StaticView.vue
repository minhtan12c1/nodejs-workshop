<script>
  import { mapGetters } from 'vuex';
  import StaticViewContent from './StaticViewContent.vue';
  import dynamicModuleUtils from '@/dynamic-module/utils';

export default {
    name: 'StaticView',
    data() {
      return {
        dataModel: null,
        dataModelModuleName: '',
        modelGroups: null,
      };
    },
    computed: {
          ...mapGetters(['modules']),
          ready() {
            return !!this.modules[this.$route.meta.dataModelModuleName];
          },
    },
    methods: {
      initStaticView() {
        if (this.ready) {
          this.dataModel = this.modules[this.dataModelModuleName].default.dataModel;
        }
      },
    },
    components: {
            appStaticViewContent: StaticViewContent
        },
    watch: {
      $route(value, previousValue) {
        if (value.name !== previousValue.name) {
          this.dataModelModuleName = value.meta.dataModelModuleName;
        }
      },
      ready(value) {
        if (value) {
          this.initStaticView();
          // this.refreshData();
        } else
        if (this.$route.meta.moduleLoader) {
          this.$route.meta.moduleLoader();
        } else {
          dynamicModuleUtils.loadModule(this.$route.meta.dataModelModuleName);
        }
      },
    },
    created() {
      this.dataModelModuleName = this.$route.meta.dataModelModuleName;
      if (this.$route.meta.moduleLoader) {
        this.$route.meta.moduleLoader();
      } else {
        dynamicModuleUtils.loadModule(this.$route.meta.dataModelModuleName);
      }
    },
     mounted() {
      this.initStaticView();
    },
    beforeDestroy() {
      this.dataModel = null;
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
    v-card
      v-card-title.aos-group-expand-title-primary
        p {{ ($route.meta.title)}}
        v-spacer
        v-card-actions.aos-group-actions
      app-static-view-content(v-if="ready && dataModel != null && dataModel != undefined"
      ref="staticViewContent"
      :data-model="dataModel")
</template>
