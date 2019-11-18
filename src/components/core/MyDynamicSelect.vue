<script>
  import { mapGetters } from 'vuex';
  import clonableProps from '@/clonable-props';
  import MyInput from '@/components/core/MyInput';
  import dynamicModuleUtils from '@/dynamic-module/utils';
  import ObjectProfileForm from '@/components/ObjectProfileForm.vue';
  import modelUtils from '@/model/model-utils';

  export default {
    name: 'MyDynamicSelect',
    components: {
            appObjectProfileForm: ObjectProfileForm
        },
    extends: MyInput,
    mixins: [clonableProps],
    data() {
      return {
        items: [],
        itemValue: 'text',
        loading: true,
        relevantObjectDialog: false,
        relevantObjectModel: null,
        relevantTableProfile: null,
        relevantObjectData: {},
      };
    },
    props: {
      dataSource: {
        type: Object,
        default: undefined,
        required: true,
      },
      staticItems: {
        type: Array,
        default: () => [],
        required: false,
      },
      dataModelModuleName: {
        type: String,
        default: '',
      },
    },
    computed: {
      ...mapGetters([
        'modules',
      ]),
        ready() {
          return !this.addRelevantEnabled
              || !!this.modules[this.dataModelModuleName];
          },
        model: {
          get() {
            if (this.props.multiple && !(this.value instanceof Array)) {
              return [this.value];
            }
            return this.value;
          },
          set(value) {
            this.$emit('input', value);
          },
        },
        hasError() {
          return (!!this.$attrs.errorMessages && this.$attrs.errorMessages.length > 0)
            || (!!this.$attrs['error-messages'] && this.$attrs['error-messages'].length > 0);
        },
        addRelevantEnabled() {
          return this.dataModelModuleName != null
            && this.dataModelModuleName != undefined
            && this.dataModelModuleName.trim().length > 0;
        },
        addRelevantReady() {
          return !!this.relevantTableProfile && !!this.relevantObjectModel;
        },
    },
    methods: {
      loadItemsFromDataSource() {
        this.loading = true;
        if (typeof this.dataSource.api !== 'undefined') {
          this.dataSource.api().then((response) => {
            let data = [];
            if (!Array.isArray(response)) {
              data = Object.keys(response.data).map(i => response.data[i]);
            } else if (response.data) {
              data = response.data;
            } else {
              data = response || [];
            }
            if (this.dataSource.formatData) {
              data = this.dataSource.formatData(data);
            }
            data.forEach((item) => {
              if (this.dataSource.displayFormat) {
                item.text = this.dataSource.displayFormat(item);
                item.value = item[this.dataSource.index];
              }
            });
            const items = [...this.staticItems, ...data];
            this.items = items;
            this.model = this.value;
            this.loading = false;
          });
        }
      },
      initComponent() {
        if (this.ready && this.addRelevantEnabled) {
          this.relevantObjectModel = this.modules[this.dataModelModuleName].default.dataModel.getObjectModel();
          this.relevantTableProfile = this.modules[this.dataModelModuleName].default.dataModel.getTableProfile();
        }
      },
      addObject() {
        setTimeout(() => {
                        this.relevantTableProfile.api.create(
                            modelUtils.transformUiObjectToApi(this.relevantObjectData, this.relevantObjectModel),
                        ).then((response) => {
                            // this.parseResponseStatus({ response, action: `Add ${this.tableProfile.name}` });
                            if (response.statusText === 'OK') {
                                // user may want to add another object
                                // this.objectDialogOpenned = false;
                                // this.refresh();

                                // if (this.tableProfile.tableToolbar.add.postAddHandler) {
                                //     this.tableProfile.tableToolbar.add.postAddHandler();
                                // }
                                this.relevantObjectDialog = false;
                            }

                        });
                    }, 300);
                },
    },
    watch: {
      ready(val) {
        if (val && this.addRelevantEnabled) {
          this.initComponent();
        }
      },
      dataSource() {
        this.loadItemsFromDataSource();
      },
      value(val) {
        this.model = val;
      },
      relevantObjectDialog(val) {
        if (!val) {
          this.loadItemsFromDataSource();
        }
      },
    },
    mounted() {
      this.loadItemsFromDataSource();
      if (this.addRelevantEnabled) {
        dynamicModuleUtils.loadModule(this.dataModelModuleName);
      }
      this.initComponent();
    },
    beforeDestroy() {
      if (this.addRelevantEnabled) {
        dynamicModuleUtils.removeModule(this.dataModelModuleName);
      }
    }
  };
</script>

<style lang="stylus">
</style>

<template lang="pug">
  v-layout(row wrap)
    div(v-if="addRelevantEnabled && ready && addRelevantReady")
      v-dialog(v-model='relevantObjectDialog' v-if="!relevantTableProfile.customObjectDialog"
            action-align="left",
            max-width='600px'
            )
            v-card
                v-card-title
                    span {{ relevantTableProfile.name}}
                v-card-text
                    component( v-if="relevantTableProfile.customObjectForm"
                        :is="relevantTableProfile.customObjectForm"
                        :key="relevantTableProfile.customObjectForm"
                        :object-definition="relevantObjectModel"
                        v-model="relevantObjectData"
                        ref="objectForm")
                    app-object-profile-form(v-else
                        :object-definition="relevantObjectModel"
                        v-model="relevantObjectData"
                        ref="objectForm"
                        action="add"
                        )
                v-card-actions
                    v-spacer
                    v-btn(color='blue darken-1', text='', @click.native.prevent="addObject") Save
                    v-btn(color='blue darken-1', text='', @click.native.prevent="relevantObjectDialog=false") Close
    v-flex(style="margin-left: 10px;")
        v-layout(row)
          v-select( solo
            :items="items"
            :class="readonly?'read-only':''"
            v-bind="props"
            item-text="text" item-value="value"
            v-model="model" outline
            )
          div(style="padding-right: 38px; margin-top: 12px;")
            v-tooltip(top="")
              template(v-slot:activator="{ on }")
                v-btn(icon
                  small
                  v-on="on"
                  slot="activator" )
                  v-icon(style="font-size: large") mdi-information-outline
              span(v-html="dataHint")
            v-tooltip(top="" v-if="addRelevantEnabled && !readonly")
              template(v-slot:activator="{ on }")
                v-btn(icon
                  small
                  @click="relevantObjectDialog = true"
                  :disabled="!addRelevantEnabled || !ready"
                  v-on="on"
                  slot="activator" )
                  v-icon(style="font-size: large") mdi-plus
              span add
 
</template>
