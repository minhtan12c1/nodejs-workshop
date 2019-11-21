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
                            v-menu(bottom  offset-y)
                                template(v-slot:activator="{ on }")
                                    v-btn.small-icon(color="#4f6faa" dark="" v-on="on")
                                        v-icon.mr-2 mdi-account  
                                v-list
                                    v-list-item(@click="logout")
                                        v-icon.mr-2 mdi-logout
                                        v-list-item-title
                                            | logout
                            v-menu(bottom  offset-y)
                                template(v-slot:activator="{ on }")
                                    v-btn.small-icon(color="#4f6faa" dark="" v-on="on")
                                        v-icon.mr-2 mdi-earth
                                v-list
                                     v-list-item(v-for="language in languages" :key="language.locale" @click="setLang(language.locale)")
                                        v-icon.mr-2
                                        v-list-item-title 
                                            | {{ language.lang }}  
                            
                app-mega-menu.mega-menu(v-model="menu.items")
</template>

<script>
    import MegaMenu from './MegaMenu.vue';
    import { mapGetters, mapActions } from 'vuex'


    export default {
        methods: {
            ...mapActions([
            'logout',
            'setLang',
        ]),
        },
        components: {
            appMegaMenu: MegaMenu,
        },
        computed: {
            ...mapGetters([
                 'menu',
                 'languages'
            ])
        },
  }
</script>
<style  lang="stylus" scoped>
.main-navbar
  background-color: #4f6faa
.mega-menu
    padding-top: 28px;
.v-btn.small-icon
  .v-icon
    font-size: 16px !important
</style>
