export const formMixin = {
  methods: {
    convertToNumber (value, obj, prop) {
      obj[prop] = Number(value)
    },
    markTouched (obj, param) {
      let _obj = this.$v[obj]
      if (typeof param === 'object') {
        _obj = _obj.$each
        param.forEach(_pam => {
          _obj = _obj[_pam]
        })
      } else {
        _obj = _obj[param]
      }
      _obj.$touch()
    },
    checkError (obj, param) {
      if (typeof param === 'object') {
        let _obj = this.$v[obj].$each
        param.forEach(_pam => {
          _obj = _obj[_pam]
        })
        return _obj.$dirty && _obj.$invalid
      }
      return this.$v[obj][param].$dirty && this.$v[obj][param].$invalid
    },
    isFormValid (obj) {
      return !this.$v.$invalid
    }
  }
}

