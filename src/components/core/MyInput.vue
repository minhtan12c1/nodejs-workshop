<script>
  import clonableProps from '@/clonable-props';

  export default {
      mixins: [clonableProps],
    // This component is a select box that can retrieve data throught RestAPI
    // and use that data for it's select options
    name: 'MyInput',
    data() {
      return {
      };
    },
    props: {
      required: {
        type: Boolean,
        default: false,
      },
      value: {
        event: 'input',
      },
      label: {
        default: '',
      },
      dataHint: {
        default: '',
      },
      showHint: {
        type: Boolean,
        default: false,
      },
      showLabel: {
        type: Boolean,
        default: true,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      model: {
        get() {
          if (this.props.multiple && !(this.value instanceof Array)) {
            return [this.value];
          }
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        },
      },
      hasError() {
        return (!!this.$attrs.errorMessages && this.$attrs.errorMessages.length > 0)
          || (!!this.$attrs['error-messages'] && this.$attrs['error-messages'].length > 0);
      },
      containerClasses() {
        const classes = [];
        if (this.hasError) {
          classes.push('has-error');
        } else {
          classes.push('no-error');
        }
        if (this.readonly) {
          classes.push('read-only');
        }
        return classes;
      },
      hasHint() {
        return this.dataHint != null && this.dataHint != undefined && this.dataHint.length > 0;
      },
    },
    methods: {
      focus() {
        this.$refs.inputField.focus();
      },
    },
    watch: {
      value(val) {
        this.model = val;
      },
    },
  };
</script>

