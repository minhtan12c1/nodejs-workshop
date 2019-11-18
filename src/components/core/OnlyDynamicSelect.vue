<script>
  import clonableProps from '@/clonable-props';
  import MyInput from '@/components/core/MyInput';

  export default {
    name: 'MyDynamicSelect',
    extends: MyInput,
    mixins: [clonableProps],
    data() {
      return {
        items: [],
        itemValue: 'text',
        loading: false,
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
    },
    computed: {
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
    },
    mounted() {
      this.loadItemsFromDataSource();
    }
  };
</script>

<style lang="stylus">
</style>

<template lang="pug">
  v-flex
      v-layout(row)
        v-select( solo
          :items="items"
          :class="readonly?'read-only':''"
          v-bind="props"
          :loading="loading"
          item-text="text" item-value="value"
          v-model="model" outline
          )
        div(style="margin-top: 12px;")
          v-tooltip(top="")
            template(v-slot:activator="{ on }")
              v-btn(icon
                small
                v-on="on"
                slot="activator" )
                v-icon(style="font-size: large") mdi-information-outline
            span(v-html="dataHint")
 
</template>
