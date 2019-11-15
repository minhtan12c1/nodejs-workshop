<script>

import clonableProps from '@/clonable-props';
  import MyInput from '@/components/core/MyInput';

  export default {
    name: 'MyStatusSwitch',
    extends: MyInput,
    mixins: [clonableProps],
    props: {
      trueValue: {
        default: 'Enabled',
      },
      falseValue: {
        default: 'Disabled',
      },
    },
  };
</script>

<style lang="stylus">
</style>

<template lang="pug">
  v-flex
      v-layout(row style="height: 60px")
        v-switch(:true-value="trueValue" :false-value="falseValue"
          hide-details
          v-model="model"
          :readonly="readonly"
          v-bind="$attrs"
          )
        div(style="margin-top: 15px;")
          v-tooltip(top="")
            template(v-slot:activator="{ on }")
              v-btn(icon
                small
                v-on="on"
                slot="activator" )
                v-icon(style="font-size: large") mdi-information-outline
            span(v-html="dataHint")
 
</template>
