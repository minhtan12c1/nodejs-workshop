<script>
  import clonableProps from '@/clonable-props';

  export default {
    name: 'MyDialog',
    components: {
    },
    mixins: [clonableProps],
    props: {
      title: {
        type: String,
        default: 'title',
      },
    },
    computed: {
      openned: {
        get() {
          return this.value;
        },
        set(newVal) {
          this.$emit('input', newVal);
        },
      },
    },
    method: {
    },
    watch: {
      props: {
        deep: true,
        handler() {
        },
      },
    },
    mounted() {
    },
    beforeDestroy() {
    },
  };

</script>

<style lang="stylus"></style>

<template>
  <v-dialog v-model="openned" v-bind="attrs" :v-if="openned"
            scrollable
            fullscreen
            >
    <v-card class="aos-dialog elevation-0">
        <v-toolbar dark color="primary" dense>
          <v-toolbar-title >{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn class="close-btn"  dark  @click.native="openned = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="aos-dialog_content" style="marginTop: 50px">
          <slot></slot>
        </v-card-text>
        <v-toolbar dense style="bottom: 0px;" class="transparent">
          <v-layout row style="margin: 0px;" class="justify-center">
            <slot name="actions">
            </slot>
          </v-layout>
        </v-toolbar>
      </v-card>
  </v-dialog>
</template>
