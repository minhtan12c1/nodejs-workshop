
<script>

export default {
  name: 'ElDataTable',
  data() {
    return {
      filterField: [],
      rowsPerPage: [10, 20, 30, 40, 50, 100],
      nameOfProperties: this.headers.map(h => h.name),
      items: this.data,
      selectedItems: [],
      currentSearch: '',
      current_page: 1,
      limit: 10,
    };
  },
  watch: {
    data(val) {
      this.items = val;
    },
    search(search) {
      this.currentSearch = search && search.trim();
    },
  },
  computed: {
    currentPage() {
      let items = this.applySearch(this.data);
      return items;
    },
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
    checkColumn: {
      type: Boolean,
      default: false,
    },
    totalItemPage: {
      type: Number,
      default: -1,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    search: {
      type: String,
      default: null,
    },
    isGetNext: {
      type: Boolean,
      default: true,
    },
  },
   methods: {
    handleSizeChange(size) {
      this.limit = size;
      this.$emit('get-size-data', size);
    },
    handleCurrentChange(pageIndex) {
      const ridx = pageIndex - 1;
      const l = this.limit;
      const offset = (ridx * l);
      this.current_page = pageIndex;
      this.$emit('get-offset-data', offset);
    },
    tableRowClassName({ row }) {
      return this.selectedItems.includes(row) ? 'selected-row' : '';
    },
    handleSelectionChange(rows) {
      this.selectedItems = rows;
      this.$emit('select', rows);
    },
    applySearch(items) {
      const val = this.currentSearch;
      const clone = items.slice(0);
      if (val && val.length > 0) {
        const searched = clone && clone.filter((i) => {
          const temp = Object.assign({}, i);
          Object.keys(temp).forEach((key) => {
            if (!this.filterField.includes((key))) {
              delete temp[key];
            }
          });
          const vals = Object.values(temp);
          const r = vals.find((v) => {
            return v && v.toString().toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) >= 0;
          });
          return r;
        });
        if (searched && searched.length > 0) {
          this.$emit('totalItem', searched.length);
          return searched;
        }
        return [];
      }
      return items;
    },
   },
  mounted() {
    this.headers.forEach((v) => {
      this.filterField.push(v.name);
    });
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
        v-loading="loading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
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
            :label="$t(header.i18n_label)"
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
          layout="sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="current_page"
          :page-sizes="rowsPerPage"
          :page-size="limit"
          :total="totalItemPage"
          :small="true"
            )
</template>
