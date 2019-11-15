
<script>
import Vue from 'vue'
import {Table, TableColumn, Pagination} from 'element-ui'


Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)

export default {
  name: 'ElDataTable',
  data() {
    return {
      filterField: [],
      rowsPerPage: [20, 50, 100, 200, 500, 1000],
      nameOfProperties: this.headers.map(h => h.name),
      items: this.data,
      selectedItems: [],
      pagination: {
        pageIndex: 1,
        pageSize: 20,
        pageCount: 5,
        small: false,
        layout: 'total, sizes, prev, pager, next, jumper',
      },
    };
  },
  watch: {
    data(val) {
      this.items = val;
    },
  },
  computed: {
    currentPage() {
      let items = this.data;
      const ridx = this.pagination.pageIndex - 1;
      const l = this.pagination.pageSize;

      const offset = (ridx * l);
      const limit = items.length - offset > l ? l : items.length - offset;
      const cp = items.slice(offset, offset + limit);
      return cp;
    },
  },
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    // actionColumn: {
    //   type: Boolean,
    //   default: false,
    // },
    checkColumn: {
      type: Boolean,
      default: false,
    },
    // treeColumn: {
    //   type: Number,
    //   default: -1,
    // },
    // writable: {
    //   type: Boolean,
    //   default: false,
    // },
    // allowDelete: {
    //   type: Boolean,
    //   default: false,
    // },
    // allowModify: {
    //   type: Boolean,
    //   default: false,
    // },
    // loading: {
    //   type: Boolean,
    //   default: false,
    // },
    // expand: {
    //   type: Boolean,
    //   default: false,
    // },
    // expandHeader: {
    //   type: Array,
    //   default: () => [],
    // },
    // search: {
    //   type: String,
    //   default: null,
    // },
    // height: {
    //   type: [Number, String],
    //   default: 'auto',
    // },
    // newToolbar: {
    //   type: Boolean,
    //   default: false,
    // },
    // selected: {
    //   type: Array,
    //   default: () => [],
    // },
  },
   methods: {
      handleSizeChange(size) {
      this.pagination.pageSize = size;
    },
    handleCurrentChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
    },
    tableRowClassName({ row }) {
      return this.selectedItems.includes(row) ? 'selected-row' : '';
    },
    handleSelectionChange(rows) {
      this.selectedItems = rows;
      this.$emit('select', rows);
    },
   },
   
  mounted() {
    this.headers.forEach((v) => {
      this.filterField.push(v.name);
    });
    // this.expandHeader.forEach((v) => {
    //   this.filterField.push(v.name);
    // });
    
  },
};
</script>

<style lang="stylus" scoped>
</style>

<template lang="pug">
    div
      el-table(
        size="small"
        ref="aosTable"
        :data="currentPage"
        stripe
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        highlight-current-row
        )
        el-table-column(
          v-if="checkColumn"
          type="selection"
          fixed
        )
        template(v-for="(header, idx) in headers")
          el-table-column(
            :label="header.label"
            :key="header.label"
            show-overflow-tooltip
            :prop="nameOfProperties[idx]"
            class-name="column sortable draggable"
            sortable="custom"
            file-icon="mdi mdi-file"
            folder-icon="mdi mdi-folder"
          )
      div(style="margin-top: 10px;text-align: right;")
        el-pagination(
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.pageIndex"
          :page-size="pagination.pageSize"
          :pager-count="pagination.pageCount"
          :page-sizes="rowsPerPage"
          :total="(items && items.length) || 0"
    )
        
          
            

</template>