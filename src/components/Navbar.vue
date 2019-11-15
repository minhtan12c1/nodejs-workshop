<template lang="pug">
    div
        v-toolbar.main-navbar(
        height="89"
        dark=""
        ref="appNavbar"
        style="padding: 0 !important;"
        )
            v-card(flat left="")
            router-link(:to="{ name: 'Home' }")
                img.logo-image(src="../assets/al-logo-white.png")
            v-layout(column="" flat)
                v-flex(xs12="")
                    v-expand-transition
                        ul(key="ul")
                            li 
                                | title
                app-mega-menu.mega-menu(v-model="menu.items")
</template>

<script>
    import MegaMenu from './MegaMenu.vue';
    import { mapGetters } from 'vuex'


    export default {
        methods: {
        
        },
        components: {
            appMegaMenu: MegaMenu,
        },
        computed: {
            ...mapGetters([
                 'menu'
            ])
        },
  }
</script>
<style  lang="stylus" scoped>
.main-navbar
  background-color: #4f6faa
.mega-menu
    padding-top: 28px;
</style>
