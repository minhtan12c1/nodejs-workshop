<template lang="pug">
    div
      template()
        v-layout.pa-3(column)
          v-flex(v-for="(group, index) in modelGroups" :key="index")
            app-scalar-form(v-if="!group.component" 
              :key="group.title"
              :title="group.title"
              :scalar="group.scalar"
              :object-definition="group"
              ref="staticForm"
              )
          div
            v-btn( color="primary")
              | apply
</template>

<script>
 import ScalarForm from './ScalarForm.vue';

export default {
    name: 'StaticViewContent', 
    components: {
            appScalarForm: ScalarForm
        }, 
    data() {
      return {
        modelGroups: null,
        scalar: null,
      };
    },
    props: {
      dataModel: {},
    },
    methods: {
      initStaticView() {
        if (this.dataModel.customAction) {
          this.customAction = this.dataModel.customAction;
        }
        this.modelGroups = [];
        this.dataModel.groups.forEach((group) => {
          const groupModel = Object.assign({}, group);
          this.scalar = Object.assign({}, group.scalar);
          groupModel.fields = [];
          group.fields.forEach((field) => {
            groupModel.fields.push(field);
          });
          if (groupModel.hideSubmitBtn) {
            this.hideSubmitBtn = true;
          }
          if (!groupModel.disabled) {
            this.modelGroups.push(groupModel);
          }
        });
      },
    },
    created() {
      this.initStaticView();
    },
}
</script>

<style lang="stylus" scoped>
</style>