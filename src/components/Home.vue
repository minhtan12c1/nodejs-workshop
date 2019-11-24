

<script>
    import Footer from './Footer.vue';
    import Navbar from './Navbar.vue';
    // import ContentWrapper from './ContentWrapper.vue';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        data() {
            return {
                dialog: false,
                };
        },
        methods: {
            ...mapActions([
                'buildMenu',
                'checkSession',
            ]),

        },
        components: {
            appFooter: Footer,
            appNavbar: Navbar,
            // appContentWrapper: ContentWrapper,
        },
        computed: {
        ...mapGetters([
            'snackBar',
            'globalLoading',
             ]),
        },
        watch: {
            snackBar(value) {
                this.dialog = value.display;
            },    
        }
    }
</script>

<style>

</style>

<template>
    <div>
        <v-snackbar id="global-status-bar"
                top v-bind="snackBar"
                v-model="snackBar.display"
                fixed>
            <div id="global-status-bar_message">
             {{ snackBar.content }}
            </div>
      <v-btn id="global-status-bar_close-btn" icon small dark @click.native="snackBar.display = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
        <app-navbar></app-navbar>
        <div class="container-fluid" id="container-wrapper">
          <!--<content-wrapper></content-wrapper>-->
          <router-view></router-view>
        </div>
        <app-footer style="background-color: #4f6faa;"></app-footer>
    </div>
</template>