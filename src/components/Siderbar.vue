<script>
  import { mapGetters } from 'vuex';
export default {
    name: 'sidebar',
    data() {
      return {
        drawer: false,
        clipped: true,
        marginTop: '89px',
        maxHeight: 'calc(100% - 89px)',
      };
    },
    mounted() {
      if (window.innerWidth <= 1200) {
        this.drawer = false;
      } else {
        this.drawer = true;
      }
    },
    computed: {
      ...mapGetters([
        'menu',
      ]),
    }
}
</script>

<style lang="stylus" scoped>
.v-navigation-drawer
  &.side-bar
    background-color: #4f6faa;
    overflow: visible
    #sidebar-toggle
      background-color: #415c8d;
      position: absolute
      left: 221px
      z-index: 999 !important
      margin: 0px
      height: 48px
      padding: 0px
      max-width: 20px !important
      min-width: 20px !important
</style>
<template lang="pug">
    div(style="color: red;" )
        v-navigation-drawer.side-bar(
            persistent
            clipped
            v-model="drawer"
            width="220"
            disable-route-watcher
            enable-resize-watcher
            app
            :style="{marginTop: marginTop, maxHeight: maxHeight}"
            dark
            mobile-break-point="1024"
        )
            v-btn#sidebar-toggle.side-bar(@click.stop="drawer = !drawer" )
                v-icon(v-if="drawer") mdi-chevron-left
                v-icon(v-else) mdi-chevron-right
            v-toolbar(flat height="48" style="background-color: #415c8d;")
                template
                    v-btn(
                    small
                    icon
                    :key="1"
                    style="margin-left: -20px"
                    )
                    v-icon  mdi-chevron-left
                v-toolbar-title(:key="3" style="margin-left: 0 !important; text-transform: uppercase; width: 100%; font-size: 14px; font-weight: 500") home
    
</template>
