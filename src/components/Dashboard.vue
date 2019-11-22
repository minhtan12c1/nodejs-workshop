<script>
export default {
  name: 'Dashboard',
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  
};
</script>

<style></style>

<template>
  <div class="container-fluid justify-center text-xs-center">
    <v-content>
      <div class="red--text darken-4" style="padding-top: 100px;">
        <h1>
          {{ $t('common.dashboard') }}
        </h1>
        <br>
        <h4>
          {{ $t('common.dashboard') }}
        </h4>
      </div>
    </v-content>
  </div>
</template>
