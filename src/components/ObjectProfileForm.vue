<script>
   import componentName from '@/components/component-name';

export default {
    name: 'objectProfileForm', 
      data() {
        return {
          defaultComponent: componentName.AOS_TEXT_FIELD,
          objectProps: {},
          objectRules: {},
          defaultProps: {},
        };
    },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      multipleColumn: {
        type: Boolean,
        default: false,
      },
    }, 
    methods: {
    
    },
    // watch: {
    //   selectView(val) {
    //     if (val) {
    //       this.initializeObject();
    //       if (!this.isModify) {
    //         this.baseInitializeObject();
    //         this.model = Object.assign({}, this.default);
    //       }
    //     }
    //   },
    //   model() {
        
    //   },
    // },
    mounted() {
      this.objectProps = this.objectDefinition;
    }
}
</script>

<style lang="stylus" scoped>
  .object-profile-form
      .form-layout
        margin1: 0 -40px !important
        .field-container
          padding: 0 !important
          .layout
            .flex:first-child.xs12
              width: auto
</style>

<template lang="pug">
  div
    v-layout.ma-0(row="" wrap="")
        v-flex(style="padding-left: 2px;!important"
        v-for="(field, index) in this.objectDefinition.fields"
        :key="index")
          v-layout.ma-0(row center)
            v-flex.pa-0(xs12)
              | {{field.label}}
    //- v-container.pt-0.pb-0(fluid="" grid-list-sm="")
    //-   .required-note.mb-1(align="right" v-if="showRequiredNote")
    //-     span.error--text
    //-       | (*)&nbsp
    //-     span
    //-       | required_field
    //-   v-layout.ma-0(row="" wrap="" :class="['form-layout', multipleColumn ? 'multiple-column' : '']")
    //-     v-flex(style="padding-left: 2px;!important"
    //-     :class="['xs12 field-container', multipleColumn ? 'md4' : '']"
    //-     v-for="(field, index) in objectDefinition.fields"
    //-     :key="index")
    //-       v-layout.ma-0(row center)
    //-         v-flex.pa-0(xs12)
    //-           component(:key="field.name"
    //-           :class="[field.required ? 'required-field': '']"
    //-           v-if="(!field.hidden && !objectProps[field.name].hide)\
    //-           && !(field.hideOnAdd && action === 'add')\
    //-           && !(field.hideOnModify && action === 'modify')"
    //-           :is="field.component || defaultComponent"
    //-           :label="field.label"
    //-           :data-vv-name="field.name"
    //-           :data-vv-as="field.label"
    //-           :readonly="(checkReadOnly && field.readOnly) || disabled" v-bind="objectProps[field.name] || {}"
              
    //-           suffix
    //-           :required="field.required"
    //-           )
</template>