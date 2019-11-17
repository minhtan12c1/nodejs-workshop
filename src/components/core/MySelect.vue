<script>

import clonableProps from '@/clonable-props';
  import MyInput from '@/components/core/MyInput';

  export default {
    name: 'MySelect',
    extends: MyInput,
    mixins: [clonableProps],
    props: {
    },
  };
</script>

<style lang="stylus">
</style>

<template lang="pug">
  v-flex
      v-layout(row)
        v-select( solo
          :class="readonly?'read-only':''"
          v-bind="props"
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
