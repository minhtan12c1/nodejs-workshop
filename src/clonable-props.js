
export default {
    data() {
      return {
      };
    },
    props: {
    },
    computed: {
      props() {
        const props = this.cloneObjectProps(this._props);
        const attrs = this.cloneObjectProps(this.$attrs);
        return Object.assign(props, attrs);
      },
      attrs() {
        return this.cloneObjectProps(this.$attrs);
      },
    },
    methods: {
      cloneObjectProps(obj) {
        const result = {};
        Object.keys(obj).forEach((key) => {
          if (key !== 'value') {
            result[key] = (obj[key]);
          }
        });
        return result;
      },
    },
  };
  