<script>
  import { mapGetters, mapActions } from 'vuex';
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
    methods: {
      ...mapActions([
        'navigatePath',
        'goToUpperMenu',
        'exploreMenu',
      ]),
      updateMenuWhenBack() {
        // this.navigatePath({ path: this.currentMenu.path });
        this.goToUpperMenu();
      },
      updateMenuOrGo(item) {
        if (item.items) {
          this.exploreMenu({ targetMenu: item });
        } else {
          this.$router.push(item.path);
        }
      },
    },
    computed: {
      ...mapGetters([
        'menu',
        'currentMenu',
        'upperMenu',
      ]),
      hasUpperMenu() {
        return this.upperMenu;
      },
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
                template(v-if="hasUpperMenu")
                    v-btn(
                      v-if="hasUpperMenu"
                      small
                      icon
                      :key="1"
                      @click.prevent="updateMenuWhenBack"
                      style="margin-left: -20px"
                    )
                      v-icon  mdi-chevron-left
                v-toolbar-title(:key="3" style="margin-left: 0 !important; text-transform: uppercase; width: 100%; font-size: 14px; font-weight: 500") {{ $t(currentMenu.i18n_label) || $t('common.home') }}
            v-list(v-if="currentMenu")
              template(v-for="menuItem in currentMenu.items")
                v-scroll-x-transition(mode="out-in")
                  v-list-item(
                    :key="menuItem.id"
                    v-model="menuItem.active"
                    ripple
                    replace
                    @click="updateMenuOrGo(menuItem)"
                  )
                    v-list-item-content
                      v-list-item-title()
                        template  {{ $t(menuItem.i18n_label) }}
                    v-list-item-action(v-if="menuItem.items && menuItem.items.length>=0")
                      v-icon mdi-menu-right

</template>
