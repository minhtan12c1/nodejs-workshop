
<script>

export default {
  name: 'ElDataCard',
  data() {
    return {
        filterField: [],
        currentSearch: '',
        selectedItems: [],
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
        v-container.pl-0.pr-0(grid-list-lg="grid-list-lg")
            v-layout(row="row" wrap="wrap")
                v-flex(v-for="(data,idx) in currentPage" :key="idx" xs12="xs12" sm6="sm6" md4="md4" lg3="lg3")
                    el-card( shadow="hover" )
                        el-image(
                        style="width: 100px; height: 100px"
                        fit="fit" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" )
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
                           el-button(type="text" class="button") add
                           el-button(type="text" class="button" ) View
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
