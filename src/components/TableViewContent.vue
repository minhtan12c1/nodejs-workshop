

<script>
  // import dataTypeUtils from '@/data-adapter/map/utils';
  import ElDataTable from './ElDataTable.vue';
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
        
      };
    },
    components: {
            appElDataTable: ElDataTable
        },
    props: {
      dataModel: {},
      title: { default: null },
    },
    methods: {
      initStaticView() {
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
        this.tableProfile.api.getAll(null).then((rs) => {
              if (rs.data.response.success && rs.data.response.data) {
                this.items = [];
                this.originalItems = [];
                let data = rs.data.response.data;
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
        // this.object = {};
        // this.isModifyAction = false;
        // this.objectDialogTitle = this.$t('common.add_thing', [this.$t(this.tableProfile.i18n_name)]);
        // this.objectDialogOpenned = true;
        // this.checkReadOnly = false;
        // this.objectDialogSubmitCallback = this.addObject;
        // if (this.$refs.objectForm) {
        //   this.$refs.objectForm.clear();
        // }
      },
      openModifyObjectDialog() {
        // const obj = this.selected[0];
        // this.isModifyAction = true;
        // this.object = Object.assign({}, obj);
        // this.orgObject = Object.assign({}, obj);
        // this.objectDialogTitle = this.$t('common.modify_thing', [this.$t(this.tableProfile.i18n_name)]);
        // this.objectDialogOpenned = true;
        // this.checkReadOnly = true;
        // this.objectDialogSubmitCallback = this.modifyObject;
      },
      deleteSelected() {
        // this.deleteRows(this.selected);
      },
      // deleteRows(data) {
      //   // let confirmDialogData = data;
      //   // if (!data) {
      //   //   confirmDialogData = {
      //   //     data: rows,
      //   //     callback: this.onConfirmDelete,
      //   //     header: this.dataTableModel.deleteConfirmationHeader,
      //   //     title: this.$t('common.delete_thing_confirm', [this.$t(this.tableProfile.i18n_name)]),
      //   //     component: componentName.AOS_DATA_TABLE,
      //   //   };
      //   // }
      //   // eventBus.$emit('openConfirmDialog', confirmDialogData);
      // },
      refresh() {
        // this.selected = [];
        // this.customActionModel = {};
        // this.currentDirectory = null;
        // this.retrieveData();
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
    },
    created() {
      this.initStaticView();
    },
}
</script>

<style lang="stylus" scoped>
.aos-group-expand-title-primary
    background-color: #4f6faa
    
</style>

<template lang="pug">
    div
      v-card-title(class="table-toolbar" v-if="tableProfile.tableToolbar")
        v-layout(column) 
          div( v-if="title.trim().length > 0" style="margin: -20px; margin-bottom: 8px !important; padding: 8px; padding-left: 16px !important; max-height: 40px; border-bottom: #e0e0e0e0 solid 1px !important;" )
            v-layout(row)
              h3 {{ title }}
          v-layout
            v-flex()
              v-layout( row class="flex" justify-end xs12 wrap )
                v-spacer
                v-tooltip( bottom v-if="tableProfile.tableToolbar.add.enable" )
                  template(v-slot:activator="{ on }")
                    v-btn( v-on="on" small slot="activator" color="primary" @click="openAddObjectDialog")
                      v-icon mdi-plus
                  <span> Add </span>
                v-tooltip( bottom v-if="allowModify" )
                  template(v-slot:activator="{ on }")
                    v-btn( v-on="on" small slot="activator" color="primary" @click="openModifyObjectDialog")
                      v-icon mdi-pencil
                  <span> Modify </span>
                v-tooltip( bottom v-if="allowDelete" )
                  template(v-slot:activator="{ on }")
                    v-btn( v-on="on" small slot="activator" color="primary" @click="deleteSelected")
                      v-icon mdi-delete
                  <span> Delete </span>
                v-tooltip( bottom v-if="this.dataTableModel.expandDataHeader && this.dataTableModel.expandDataHeader.length" )
                  template(v-slot:activator="{ on }")
                    v-btn( v-on="on" small slot="activator" color="primary" @click="extendedMode = !extendedMode")
                      v-icon mdi-mdi-arrow-expand-horizontal
                  <span> Extend </span>
                v-tooltip( bottom v-if="this.dataTableModel.expandDataHeader && this.dataTableModel.expandDataHeader.length" )
                  template(v-slot:activator="{ on }")
                    v-btn( v-on="on" small slot="activator" color="primary" @click="refresh")
                      v-icon mdi-refresh
                  <span> Refresh </span>
      app-el-data-table(
        :headers="tableHeader"
        class="elevation-0 limited-height-table"
        @select="selectRows"
        :check-column="checkColumn"
        :data="items"
      )
</template>