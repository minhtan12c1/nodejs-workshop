<script>
  export default {
    name: 'ExpansionGroup',
  };

</script>

<style lang="stylus">

</style>


<template lang="pug">
  v-expansion-panel.expansion-group(flat )
    v-expansion-panel-content
      div()
        v-layout(align-center justify-center)
          h3 {{title}}
          v-spacer
          slot(name="actions")
      div()
        v-layout(row wrap)
          v-flex()
            slot
</template>
