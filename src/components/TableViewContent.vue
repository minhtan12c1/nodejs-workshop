

<script>
  // import dataTypeUtils from '@/data-adapter/map/utils';
  import ElDataTable from './ElDataTable.vue';
  import ObjectProfileForm from './ObjectProfileForm.vue';
  // import MyDialog from './core/MyDialog.vue';
  import modelUtils from '@/model/model-utils';


export default {
    name: 'TableViewContent',
    data() {
      return {
        dataTableModel: {},
        tableProfile: {},
        objectDefinition: {},
        initialized: false,
        selectView: '',
        viewSelect: [],
        allowDelete: false,
        allowModify: false,
        checkColumn: true,
        extendedMode: false,
        selected: [],
        tableHeader: [],
        loading: false,
        getOption: '',
        items: [],
        originalItems: [],
        objectDialogTitle: '',
        isModifyAction: false,
        objectDialogOpenned: false,
        checkReadOnly: false,
        object: {},
        objectDialogSubmitCallback: null,
        orgObject: {},
        enableSearch: false,
        searchItem: '',
        totalItems: 0,
        search: '',

      };
    },
    components: {
            appElDataTable: ElDataTable,
            appObjectProfileForm: ObjectProfileForm
        },
    props: {
      dataModel: {},
      title: { default: null },
    },
    methods: {
      initTableView() {
        if (this.initialized) {
          return;
        }
        //------------------> view
        // if (this.dataModel.view) {
        //   this.selectView = this.selectView ? this.selectView : this.dataModel.default;
        //   this.viewSelect = dataTypeUtils.getUiDataList(this.dataModel.view);
        //   this.dataTableModel = this.dataModel.models[this.selectView].getDataTableModel();
        //   this.tableProfile = this.dataModel.models[this.selectView].getTableProfile();
        //   this.objectDefinition = this.dataModel.models[this.selectView].getObjectModel();
        // } else {
          this.dataTableModel = this.dataModel.getDataTableModel();
          this.tableProfile = this.dataModel.getTableProfile();
          this.objectDefinition = this.dataModel.getObjectModel();
        // }
        this.buildTableHeader();
        this.retrieveData();



        this.allowDelete = this.tableProfile.tableToolbar && this.tableProfile.tableToolbar.deleteSelected.enable;
        this.allowModify = this.tableProfile.rowAction.modify.enable;
        if (this.allowDelete || this.allowModify) {
          this.checkColumn = true;
        }
        /*
        // ----------------->customTableAction
        if (this.tableProfile.tableToolbar && this.tableProfile.tableToolbar.customTableAction) {
          this.tableProfile.tableToolbar.customTableAction.forEach((action) => {
            if (action.selectedRows) {
              this.checkColumn = true;
            }
          });
        }
        // -------------------->customRowAction
        if (this.tableProfile.tableToolbar && this.tableProfile.tableToolbar.customRowAction) {
          this.checkColumn = true;
          this.tableProfile.tableToolbar.customRowAction.forEach((action) => {
            action.disable = false;
          });
        }
        // ---------------------->fileAction
        // We might need array of tree-columnable table profile
        if (this.tableProfile.tableToolbar && this.tableProfile.tableToolbar.fileAction) {
          this.treeColumn = 0; // name column
          this.checkColumn = true;
        }
        */
      },
      retrieveData() {
        this.loading = true;
        this.tableProfile.api.getAll(null).then((response) => {
              if (response.data) {
                this.items = [];
                this.originalItems = [];
                let data = response.data;
                for (let i = 0; i < data.length; i++) {
                  let item = modelUtils.transformTableDataToUI(this.dataTableModel, data[i]);
                  if (Array.isArray(item)) {
                    item.forEach((val) => {
                      this.items.push(Object.assign({ index: val.index }, val));
                    });
                  } else if (item) {
                    this.items.push(Object.assign({ index: data[i].index }, item));
                  }
                  // Identifine each row of table
                  // index contain unique value in table
                }
                this.originalItems = this.items.slice(0);
              }
            this.loading = false;
          }).catch(() => {});
      },
      openAddObjectDialog() {
        this.object = {};
        this.isModifyAction = false;
        this.objectDialogTitle = this.tableProfile.name;
        this.objectDialogOpenned = true;
        this.checkReadOnly = false;
        this.objectDialogSubmitCallback = this.addObject;
        if (this.$refs.objectForm) {
          this.$refs.objectForm.clear();
        }
      },
      openModifyObjectDialog() {
        const obj = this.selected[0];
        this.isModifyAction = true;
        this.object = Object.assign({}, obj);
        this.orgObject = Object.assign({}, obj);
        this.objectDialogTitle = this.tableProfile.name;
        this.objectDialogOpenned = true;
        this.checkReadOnly = true;
        this.objectDialogSubmitCallback = this.modifyObject;
      },
      deleteSelected() {
        this.deleteRows(this.selected);
      },
      deleteRows(rows) {
          this.object = {};
          this.isModifyAction = false;
          this.objectDialogTitle = this.tableProfile.name;
          this.objectDialogOpenned = false;
          this.checkReadOnly = false;
          this.objectDialogSubmitCallback = this.removeObject(rows);
      },
        removeObject(data) {
            const deletedObjects = [];
            data.forEach((value) => {
                deletedObjects.push(value);
            });
            setTimeout(() => {
                this.tableProfile.api.delete(deletedObjects).then((response) => {
                    // this.parseResponseStatus({ response, action: `Add ${this.tableProfile.name}` });
                    if (response.statusText === 'OK') {
                        this.objectDialogOpenned = false;
                        this.refresh();
                    }

                });
            }, 300);
        },

      refresh() {
        this.selected = [];
        this.customActionModel = {};
        this.currentDirectory = null;
        this.retrieveData();
      },
      selectRows(rows) {
        this.selected = rows;
      },
      buildTableHeader() {
        const tableHeader = [];
        this.dataTableModel.visibleDataHeader.forEach((header) => {
          tableHeader.push(header);
        });
        if (this.extendedMode && this.dataTableModel.expandDataHeader) {
          this.dataTableModel.expandDataHeader.forEach((header) => {
            tableHeader.push(header);
          });
        }
        this.tableHeader = tableHeader;
      },
      onObjectDialogSubmit() {
         if (this.objectDialogSubmitCallback) {
            this.objectDialogSubmitCallback();
         }
      },
      addObject() {
            this.$refs.objectForm.validate().then((result) => {
                if (result) {
            //         this.enableGlobalLoading();
                    setTimeout(() => {
                        this.tableProfile.api.create(
                            modelUtils.transformUiObjectToApi(this.object, this.objectDefinition),
                        ).then((response) => {
                            // this.parseResponseStatus({ response, action: `Add ${this.tableProfile.name}` });
                            if (response.statusText === 'OK') {
                                // user may want to add another object
                                // this.objectDialogOpenned = false;
                                // this.refresh();

                                // if (this.tableProfile.tableToolbar.add.postAddHandler) {
                                //     this.tableProfile.tableToolbar.add.postAddHandler();
                                // }
                                this.objectDialogOpenned = false;
                            }

                        });
                    }, 300);
                }
            });
        },
        modifyObject() {
            // this.$refs.objectForm.validate().then((result) => {
            //     if (result) {
            //         this.enableGlobalLoading();
            setTimeout(() => {
                    this.tableProfile.api.modify(
                        modelUtils.transformUiObjectToApi(this.object, this.objectDefinition),
                    ).then((response) => {
                        // this.parseResponseStatus({ response, action: `Modify ${this.tableProfile.name}` });
                        if (response.statusText === 'OK') {
                            this.objectDialogOpenned = false;
                        }
                        // this.disableGlobalLoading();
                    });
            //     }
            }, 300);
        },
        toggleSearchBox() {
          this.enableSearch = !this.enableSearch;
          if (!this.enableSearch) {
            this.searchItem = '';
            this.totalItems = 0;
            this.search = '';
          } else {
            setTimeout(() => { this.$refs.searchBox.focus(); }, 100);
          }
        },
    },
    watch: {
      objectDialogOpenned(value) {
          if (!value) {
            this.object = {};
            this.refresh();
          }
        },
        searchItem(value) {
          this.totalItems = 0;
          this.search = value;
        },
    },
    created() {
      this.initTableView();
    },
    mounted() {
      this.initTableView();
    },
}
</script>

<style lang="stylus" scoped>
.aos-group-expand-title-primary
    background-color: #4f6faa
    
</style>

<template lang="pug">
    v-card(class="data-content" style="border: #ffffff solid 4px;")
        v-dialog(v-model='objectDialogOpenned', persistent='', max-width='600px')
            template( v-slot:activator='{ on }' )
                v-layout( row class="flex" justify-end xs12 wrap style="min-height: 40px !important; margin-top: 22px;")
                    v-spacer
                    v-btn( v-if="tableProfile.tableToolbar.add.enable" v-on="on" :disabled="loading" small  slot="activator" color="primary" @click="openAddObjectDialog")
                        v-icon mdi-plus
                    div(style="min-width: 8px;")
                    v-btn( v-if="allowModify" v-on="on" :disabled="loading" small slot="activator" color="primary" @click="openModifyObjectDialog")
                        v-icon mdi-pencil
                    div(style="min-width: 8px;")
                    v-btn( v-if="allowDelete" :disabled="loading" small slot="activator" color="primary" @click="deleteSelected")
                        v-icon mdi-delete
                    div(style="min-width: 8px;")
                    v-btn(  small slot="activator" :disabled="loading" color="primary" @click="refresh")
                        v-icon mdi-refresh
            v-card
                v-card-title
                    span {{ objectDialogTitle}}
                v-card-text
                    component( v-if="tableProfile.customObjectForm && objectDialogOpenned"
                        :is="tableProfile.customObjectForm"
                        :key="tableProfile.customObjectForm"
                        :object-definition="objectDefinition"
                        v-model="object"
                        :action="isModifyAction ? 'modify' : 'add'"
                        :check-read-only="checkReadOnly"
                        ref="objectForm")
                    app-object-profile-form(v-else-if="objectDialogOpenned"
                        :object-definition="objectDefinition"
                        v-model="object"
                        :select-view="selectView && objectDialogOpenned"
                        :isModify="isModifyAction"
                        :action="isModifyAction ? 'modify' : 'add'"
                        ref="objectForm"
                        :check-read-only="checkReadOnly")
                v-card-actions
                    v-spacer
                    v-btn(color='blue darken-1', text='', @click.native.prevent="onObjectDialogSubmit") {{ $t('common.save') }}
                    v-btn(color='blue darken-1', text='', @click.native.prevent="objectDialogOpenned=false") {{ $t('common.close') }}
        v-layout( row wrap)
          v-flex(style=" padding-left: 14px; padding-right: 14px;" )
            v-text-field(
              prepend-icon="mdi-magnify"
                    :placeholder="$t('common.search')"
                    ref="searchBox"
                    small
                    class="small search-box"
                    outline
                    @keydown.native.escape="toggleSearchBox"
                    v-model="searchItem"
                    clearable
                    single-line
                    hide-details        
              )    
        app-el-data-table(
            :loading="loading"
            :headers="tableHeader"
            class="elevation-0 limited-height-table"
            @select="selectRows"
            :check-column="checkColumn"
            :data="items"
            :search="search"
        )
</template>