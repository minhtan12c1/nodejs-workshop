<script>
export default {
  name: 'NotFound',
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
          404 Error
        </h1>
        <br>
        <h4>
          Page Not Found
        </h4>
        <h4 v-if="$route.query.toPath">
          #{{ $route.query.toPath }}
        </h4>
      </div>
    </v-content>
  </div>
</template>
