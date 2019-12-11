

<script>


    import {mapGetters, mapActions } from 'vuex';
    import routerUtils from '@/router/utils';

    export default {

        methods: {
            ...mapActions([
                'decrementItemQuantity',
                'incrementItemQuantity',
            ]),
            GoToProduct(){
                routerUtils.routeToProduct();
            }
        },
        components: {
        },
        computed: {
        ...mapGetters([
            'items',
             ]),
        },
        watch: {

        }
    }
</script>

<style>

</style>

<template lang="pug">
    div()
        v-container.pl-0.pr-0(grid-list-lg="grid-list-lg")
            v-layout(v-if="items.length > 0" )
                v-layout(row="row" xs3="" justify-center wrap="wrap")
                    v-flex(v-for="(data,idx) in items" :key="idx" xs12="xs12" sm6="sm6" md4="md4" lg3="lg3")
                        el-card( shadow="hover" )
                                img(src="../assets/none.png")
                                div(style="height: 115px")
                                    v-card-text
                                        span ID: {{data.id}}
                                        br
                                        span SO LUONG: {{data.quantity}}
                                    el-button( :disabled="data.quantity <= 1" @click="decrementItemQuantity(data.id)") -
                                    el-button(@click="incrementItemQuantity(data.id)") +
            v-layout(xs12="" justify-center  wrap v-else )
                div
                    h2 NULL
                    el-button(@click="GoToProduct") continue
        v-spacer(v-if="items.length > 0")
            v-layout(row="row" xs3="" justify-center wrap="wrap")
                v-flex(xs12="xs12" sm6="sm6" md4="md4" lg3="lg3")
                    | xjdsgfjf
</template>
