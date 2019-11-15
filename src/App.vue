<template>
    <v-app>
    <div>
        <router-view></router-view>
    </div> 
  </v-app>
</template>

<script>

import { store } from '@/store';

export default {
  name: 'app',
        mounted(){
          store.dispatch('buildMenu');   
        }
}
</script>

<style>
</style>
