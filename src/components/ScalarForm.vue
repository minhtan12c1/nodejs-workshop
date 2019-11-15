

<script>

 import componentName from '@/components/component-name';


export default {
    name: 'ScalarFrorm', 
    data() {
      return {
        formData: {},
        defaultComponent: componentName.MY_TEXT_FIELD,
        conditionalFields: [],
        objectProps: {},
        objectRules: {},
        defaultProps: {},
        dependedFields: [],
        action: "modify",
      };
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      objectDefinition : {
        type: Object,
      },
    },
    
    methods: {
      // onFieldDataUpdated(fieldName) {
      //   if (this.conditionalFields.includes(fieldName)) {
      //     this.dependedFields.forEach((dependedField) => {
      //       const dependedFieldName = dependedField.name;
      //       if (fieldName === dependedField.dependOn.sourceFieldName) {
      //         const conditionalFieldValue = this.model[fieldName];
      //         let matched = false;
      //         const fieldProp = Object.assign({}, this.defaultProps[dependedFieldName]);
      //         for (let index = 0; index < dependedField.dependOn.sourceFieldConditions.length; index++) {
      //           const fieldCondition = dependedField.dependOn.sourceFieldConditions[index];
      //           if (fieldCondition.statement(conditionalFieldValue)) {
      //             if (fieldCondition.actions.hide) {
      //               fieldProp.hide = true;
      //             }
      //             if (fieldCondition.actions.disabled) {
      //               fieldProp.disabled = true;
      //             }
      //             if (fieldCondition.actions.setValue !== undefined) {
      //               this.model[dependedFieldName] = fieldCondition.actions.setValue;
      //             }
      //             if (fieldCondition.actions.setItems) {
      //               fieldProp.items = fieldCondition.actions.setItems;
      //             }
      //             if (fieldCondition.actions.setRules) {
      //               this.objectRules[dependedFieldName] = fieldCondition.actions.setRules;
      //             }
      //             matched = true;
      //             break;
      //           }
      //         }
      //         this.objectProps[dependedFieldName] = fieldProp;
      //         if (!matched) {
      //           // revert to default prop for depended field
      //           this.objectProps[dependedFieldName] = Object.assign({}, this.defaultProps[dependedFieldName]);
      //           this.objectRules[dependedFieldName] = Object.assign([], this.defaultRules[dependedFieldName]);
      //           if (this.objectDefinition && this.objectDefinition[dependedFieldName]) {
      //             this.model[dependedFieldName] = this.objectDefinition[dependedFieldName].default;
      //           }
      //         }
      //       }
      //     });
        // }
      // },
    },
    watch: {
      
    },
    mounted() {
      // if (this.objectDefinition && this.objectDefinition.fields) {
      //   this.showRequiredNote = false;
      //   this.objectDefinition.fields.forEach((field) => {
      //     this.onFieldDataUpdated(field.name);
      //   });
      // }
    }
}
</script>

<style lang="stylus" scoped>
</style>

<template lang="pug">
    v-card()
      v-expansion-panels(focusable)
          v-expansion-panel()
            v-expansion-panel-header
              | {{title}}
            v-expansion-panel-content
              div
                v-layout.ma-0(row="" wrap="")
                    v-flex(style="padding-left: 2px;!important"
                    v-for="(field, index) in this.objectDefinition.fields"
                    :key="index" xs8)
                      v-layout.ma-0(row center)
                        v-flex.pa-0(xs12)
                          component(
                            :label="field.label"
                            :is="field.component || defaultComponent"
                            :required="field.required"
                            :data-hint="field.hint"
                             :ref="field.name"
                          )
                          
              
        
</template>