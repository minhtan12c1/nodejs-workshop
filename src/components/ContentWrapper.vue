<template lang="pug">
    div
        app-siderbar
        v-content
            v-container.no-padding-top(fluid)
                v-slide-y-transition(mode="out-in")
                    v-layout(column)
                        v-layout(row)
                            v-breadcrumbs(:items="breadCums" style=" margin-left:20px;")
                                v-icon(slot="divider") mdi-chevron-right
                                template(slot="item" slot-scope="props" )
                                    v-breadcrumbs-item(ripple :to="props.item" exact )
                                            v-icon(v-if="props.item.meta.icon" ) {{ props.item.meta.icon }}  
                                            | {{ props.item.meta.title }}
                router-view(:key="$route.fullPath")
</template>

<script>
    import Siderbar from './Siderbar.vue';
      import { mapGetters } from 'vuex';

    export default {
        methods: {
        
        },
        components: {
            appSiderbar: Siderbar
        },
        computed: {
            ...mapGetters([
                'breadCums'
            ]),
        }
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