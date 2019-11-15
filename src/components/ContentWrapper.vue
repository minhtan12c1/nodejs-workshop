<template lang="pug">
    div
        app-siderbar
        v-content
            v-container.no-padding-top(fluid)
                v-slide-y-transition(mode="out-in")
                    v-layout(column)
                        v-layout(row)
                router-view(:key="$route.fullPath")
</template>

<script>
    import Siderbar from './Siderbar.vue';


    export default {
        methods: {
        
        },
        components: {
            appSiderbar: Siderbar
        },
    }
</script>

<style lang="stylus" scoped>
.no-padding-top
  padding-top: 50px;
  margin-left: 10px;
.v-content
    min-height 500px
    z-index 2 !important
</style>