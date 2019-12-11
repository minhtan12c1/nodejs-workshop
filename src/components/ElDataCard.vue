
<script>
    import { mapActions } from 'vuex'
    export default {
  name: 'ElDataCard',
  data() {
    return {
        rowsPerPage: [10, 20, 30, 40, 50, 100],
        nameOfProperties: this.headers.map(h => h.name),
        filterField: [],
        items: this.data,
        currentSearch: '',
        selectedItems: [],
        current_page: 1,
        limit: 10,
        dialogVisible: false,
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
       ...mapActions([
           'addProductToCart',
       ]),
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
       handleSelectionChange(rows) {
           this.dialogVisible = true;
           this.selectedItems = rows;
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
        el-dialog(
            title="Content"
            :visible.sync="dialogVisible"
            width="30%"
            )
                span TEN SAN PHAM: {{selectedItems.TENSANPHAM}}
                br
                span GIA BAN: {{selectedItems.GIABAN}}
                br
                span Mo Ta: {{selectedItems.MOTA}}
                br
                span( slot="footer" class="dialog-footer")

                el-button( type="primary" @click="dialogVisible = false") Cancel
        v-container.pl-0.pr-0(grid-list-lg="grid-list-lg")
            v-layout(row="row" wrap="wrap")
                v-flex(v-for="(data,idx) in currentPage" :key="idx" xs12="xs12" sm6="sm6" md4="md4" lg3="lg3")
                    el-card( shadow="hover" )
                        img(src="../assets/none.png")
                        div(style="height: 135px")
                            v-card-text
                                span TEN SAN PHAM: {{data.TENSANPHAM}}
                                br
                                span GIA BAN: {{data.GIABAN}}
                                br
                                el-popover(
                                    placement="top-start"
                                    width="200"
                                    trigger="hover"
                                    :content="data.MOTA")
                                    el-button( circle size="mini" slot="reference") ...
                        div(class="bottom clearfix")
                           el-button( @click="addProductToCart(data)" type="text" class="button") add
                           el-button(type="text"
                           @click="handleSelectionChange(data)"
                           class="button" ) View
        v-layout(justify-center)
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
