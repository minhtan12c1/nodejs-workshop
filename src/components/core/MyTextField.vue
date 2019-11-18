<script>

import clonableProps from '@/clonable-props';
  import MyInput from '@/components/core/MyInput';

  export default {
    name: 'MyTextField',
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
        v-text-field(solo
          v-model="model"
          v-bind="props" ref="inputField"
          @blur="$emit('blur', $event)"
          @change="$emit('change', $event)"
          outline
          messages
          )
        div(style="margin-top: 12px; margin-right: 22px;")
          v-tooltip(top="")
            template(v-slot:activator="{ on }")
              v-btn(icon
                small
                v-on="on"
                slot="activator" )
                v-icon(style="font-size: large") mdi-information-outline
            span(v-html="dataHint")
 
</template>
