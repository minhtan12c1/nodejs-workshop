

<script>

 import componentName from '@/components/component-name';
 import dataTypeUtils from '@/data-adapter/map/utils';
 import validationUtils from '@/validation/utils';


export default {
    name: 'ObjectProfileForm',
    data() {
      return {
        validationUtils,
        formData: {},
        defaultComponent: componentName.MY_TEXT_FIELD,
        conditionalFields: [],
        objectProps: {},
        objectRules: {},
        defaultProps: {},
        dependedFields: [],
        default: {},

      };
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        objectDefinition: {
            type: Object,
        },
        checkReadOnly: {
            type: Boolean,
            default: false,
        },
        isModify: {
            type: Boolean,
            default: false,
        },
        value: {
            type: Object,
            default: () => {},
        },
        action: {
            type: String,
            default: 'add',
            validator: data => data === 'add' || data === 'modify',
        },
        selectView: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
    methods: {
        initializeObject() {
            const objectProps = {};
            const defaultProps = {};
            // this.objectRules = {};
            // this.defaultRules = {};
            this.objectDefinition.fields.forEach((field) => {
                if (field.validationRules) {
                    this.objectRules[field.name] = field.validationRules;
                }
                // if (field.validationRules && field.validationRules.includes(commonRule.REQUIRED) && field.component !== componentName.AOS_STATUS_SWITCH) {
                //     field.required = true;
                // }
                if (field.hint) {
                    this.objectDefinition.information = true;
                }
                objectProps[field.name] = Object.assign({}, field.componentProps || {});
                defaultProps[field.name] = Object.assign({}, field.componentProps || {});
                if ((field.component === componentName.MY_SELECT) &&
                    !objectProps[field.name].items && field.adapterMap) {
                    const fieldItems = dataTypeUtils.getUiDataList(field.adapterMap);
                    objectProps[field.name].items = fieldItems;
                    defaultProps[field.name].items = Object.assign([], fieldItems);
                }
                if (field.dependOn) {
                    const dependedField = {};
                    dependedField.name = field.name;
                    dependedField.dependOn = field.dependOn;
                    this.conditionalFields.push(field.dependOn.sourceFieldName);
                    this.dependedFields.push(dependedField);
                }
            });
            this.objectProps = objectProps;
            this.defaultProps = defaultProps;
            // this.defaultRules = Object.assign({}, this.objectRules);
            if (this.objectDefinition.fields[0]) this.objectProps[this.objectDefinition.fields[0].name].hide = false;
      },
      onFieldDataUpdated(fieldName) {
        if (this.conditionalFields.includes(fieldName)) {
          this.dependedFields.forEach((dependedField) => {
            const dependedFieldName = dependedField.name;
            if (fieldName === dependedField.dependOn.sourceFieldName) {
              const conditionalFieldValue = this.model[fieldName];
              let matched = false;
              const fieldProp = Object.assign({}, this.defaultProps[dependedFieldName]);
              for (let index = 0; index < dependedField.dependOn.sourceFieldConditions.length; index++) {
                const fieldCondition = dependedField.dependOn.sourceFieldConditions[index];
                if (fieldCondition.statement(conditionalFieldValue)) {
                  if (fieldCondition.actions.hide) {
                    fieldProp.hide = true;
                  }
                  if (fieldCondition.actions.disabled) {
                    fieldProp.disabled = true;
                  }
                  if (fieldCondition.actions.setValue !== undefined) {
                    this.model[dependedFieldName] = fieldCondition.actions.setValue;
                  }
                  if (fieldCondition.actions.setItems) {
                    fieldProp.items = fieldCondition.actions.setItems;
                  }
                  if (fieldCondition.actions.setRules) {
                    this.objectRules[dependedFieldName] = fieldCondition.actions.setRules;
                  }
                  matched = true;
                  break;
                }
              }
              this.objectProps[dependedFieldName] = fieldProp;
              if (!matched) {
                // revert to default prop for depended field
                this.objectProps[dependedFieldName] = Object.assign({}, this.defaultProps[dependedFieldName]);
                this.objectRules[dependedFieldName] = Object.assign([], this.defaultRules[dependedFieldName]);
                if (this.objectDefinition && this.objectDefinition[dependedFieldName]) {
                  this.model[dependedFieldName] = this.objectDefinition[dependedFieldName].default;
                }
              }
            }
          });
        }
      },
      validate() {
        return this.$validator.validate();
      },
      baseInitializeObject() {
        if (this.objectDefinition) {
            const model = {};
            this.objectDefinition.fields.forEach((field) => {
            model[field.name] = field.default;
            });
            this.default = Object.assign({}, model);
        }
      },
    },
    watch: {
        selectView(val) {
            if (val) {
                setTimeout(() => {
                  this.$validator.reset();
                }, 1000);
                this.initializeObject();
                if (!this.isModify) {
                    this.baseInitializeObject();
                    this.model = Object.assign({}, this.default);
                }
            }
        },
        model() {
            if (this.objectDefinition && this.objectDefinition.fields) {
                this.objectDefinition.fields.forEach((field) => {
                    this.onFieldDataUpdated(field.name);
                });
            }
        },
    },
    mounted() {
      setTimeout(() => {
        this.$validator.reset();
      }, 1000);
      if (this.objectDefinition && this.objectDefinition.fields) {
        this.objectDefinition.fields.forEach((field) => {
          this.onFieldDataUpdated(field.name);
        });
      }
    },
    created() {
        this.baseInitializeObject();
        this.initializeObject();
        if (!this.value || Object.keys(this.value).length === 0) {
            this.model = Object.assign({}, this.default);
        }
    },
}
</script>

<style lang="stylus" scoped>
</style>

<template lang="pug">
    div
        v-container
            v-layout.ma-0(row="" wrap="")
                v-flex(v-for="(field, index) in objectDefinition.fields" :key="index")
                    v-layout
                      v-layout.ma-0(row center)
                        v-flex.pa-0(xs12)
                          component(
                            :label="field.label"
                            v-model="model[field.name]"
                            :is="field.component || defaultComponent"
                            :required="field.required"
                            v-bind="objectProps[field.name] || {}"
                            :data-hint="field.hint"
                            :ref="field.name"
                            v-validate="validationUtils.mergeRules(objectRules[field.name])"
                            :error-messages="veeErrors.collect(field.name)"
                            :data-vv-name="field.name"
                            :data-vv-as="field.i18n_label"
                            :readonly="checkReadOnly && field.readOnly"
                          )
                          
              
        
</template>