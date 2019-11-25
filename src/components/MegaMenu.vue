<template lang="pug">
    v-flex(style="padding-top: 13px;")
      v-menu(offset-y="" 
           :close-on-content-click="false"
            right
            :nudge-width="100"
            light
            bottom 
            transition="slide-y-transition"
            v-for="(menuItem, index) in value" :key="index")
            template(v-slot:activator="{ on }")
              v-btn(color="#4f6faa" dark="" v-on="on")
               | {{menuItem.label}}
            v-list(style="padding-left: 25px;")
              v-layout(row shrink)
                v-flex(v-for="(item, index) in menuItem.items" :key="index" )
                  a(style="color: blue;" @click="onMenuItemClick(item.path)") {{ $t(item.i18n_label) }}
                  v-flex(row)
                    v-list-item(v-for="subMenu in item.items" :key="subMenu.id" @click="onMenuItemClick(subMenu)")
                      v-list-item-title {{ $t( subMenu.i18n_label)}}
                   
          
</template>

<script>
export default {
    props: {
      value: {
        type: Array,
        default: () => [],
        required: true,
      },
    },
    watch: {
      menuItem: {
        deep: true,
      },
    },
    methods: {
      onMenuItemClick(menuItem) {
        this.$router.push(menuItem);
        this.$emit('menuItemClick', menuItem);
      },
    },
  }
</script>

<style lang="stylus" scoped>
</style>