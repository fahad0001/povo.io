<template>
  <div class="shipping__form">
    <input type="text"
           class="blueline-input"
           :class="{'invalid': checkError('formValue', 'fullname')}"
           placeholder="Full name"
           v-model="formValue.fullname"
           @blur="markTouched('formValue', 'fullname')"
    >

    <input type="text"
           class="blueline-input"
           :class="{'invalid': checkError('formValue', 'lineFirst')}"
           placeholder="Address line 1"
           v-model="formValue.lineFirst"
           @blur="markTouched('formValue', 'lineFirst')"
    >
    <input type="text"
           class="blueline-input"
           :class="{'invalid': checkError('formValue', 'lineSecond')}"
           placeholder="Address line 2"
           v-model="formValue.lineSecond"
           @blur="markTouched('formValue', 'lineSecond')"
    >

    <div class="inputs-group_inline">
      <input type="text"
       class="blueline-input"
       :class="{'invalid': checkError('formValue', 'city')}"
       placeholder="City"
       v-model="formValue.city"
       @blur="markTouched('formValue', 'city')"
      >

      <input type="text"
       class="blueline-input"
       :class="{'invalid': checkError('formValue', 'state')}"
       placeholder="State/Province/Region"
       v-model="formValue.state"
       @blur="markTouched('formValue', 'state')"
      >
      <input type="text"
       class="blueline-input"
       :class="{'invalid': checkError('formValue', 'zip')}"
       placeholder="ZIP/Postal Code"
       v-model="formValue.zip"
       @blur="markTouched('formValue', 'zip')"
      >
    </div>

    <input type="text"
     class="blueline-input"
     :class="{'invalid': checkError('formValue', 'country')}"
     placeholder="Country"
     v-model="formValue.country"
     @blur="markTouched('formValue', 'country')"
    >
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { formMixin } from '../mixins/formMixin'

export default {
  name: 'CartShippingForm',

  mixins: [
    formMixin
  ],

  data () {
    return {
      formValue: {
        fullname: '',
        lineFirst: '',
        lineSecond: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      }
    }
  },

  validations: {
    formValue: {
      fullname: { required },
      lineFirst: { required },
      lineSecond: {},
      city: { required },
      state: { required },
      zip: { required },
      country: { required }
    }
  },

  watch: {
    formValue: {
      handler: function (newVal) {
        this.$emit('formChange', this.formValue, this.isFormValid(this.$v))
      },
      deep: true
    }
  },

  methods: {
    submit (event) {
      event.preventDefault()
      this.$emit('submitForm', this.formValue, this.isFormValid(this.$v))
    }
  }
}
</script>
<style lang="scss" scoped>
  .shipping {
    &__form {
      input {
        margin-bottom: 15px;
      }

      .inputs-group_inline {
        flex-direction: column;

        @media #{$mobile-screen-lg-min} {
          flex-direction: row;
        }

        input {
          @media #{$mobile-screen-lg-max} {
            margin-right: 0;
            margin-bottom: 15px;
            max-width: initial;
          }
        }
      }
    }

    &__city {
      max-width: 337px;
    }

    &__state {
      max-width: 297px;
    }

    &__code {
      max-width: 208px;
    }
  }
</style>
