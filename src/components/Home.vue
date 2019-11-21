<template>
    <div>
        <app-navbar></app-navbar>
        <div class="container-fluid" id="container-wrapper">
          <!--<content-wrapper></content-wrapper>-->
          <router-view></router-view>
        </div>
        <app-footer style="background-color: #4f6faa;"></app-footer>
    </div>
</template>

<script>
    import Footer from './Footer.vue';
    import Navbar from './Navbar.vue';
    // import ContentWrapper from './ContentWrapper.vue';
    import { mapActions } from 'vuex';

    export default {
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
    }
</script>

<style>

</style>