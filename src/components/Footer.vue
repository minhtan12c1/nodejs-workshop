<template lang="pug">
    v-footer.footer(app :height="31")
      v-spacer
      div © {{ new Date().getFullYear() }}
</template>

<script></script>

<style lang="stylus" scoped>
.footer
  z-index 200 // the el-table loading layer index is 200
  background-color: #4f6faa;
</style>