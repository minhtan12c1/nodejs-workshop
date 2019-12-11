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

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>

<template>
  <div class="container-fluid justify-center text-xs-center">
    <v-content>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <v-layout row="row" xs3="" justify-center wrap="wrap">
          <div class="red--text darken-4">
            <h1>
              {{ $t('common.dashboard') }}
            </h1>
            <br>

          </div>
      </v-layout>

    </v-content>
  </div>
</template>
