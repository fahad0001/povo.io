<template>
  <div class="radio-wrapper">
    <input
      type="radio"
      name="address"
      :id="inputId"
      :value="radioValue"
      @change="radioChange"
    >
    <label :for="inputId" class="radio"></label>
    <label :for="inputId" class="label greater-gray">
      {{ label }}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'checkbox',
    data () {
      return {
        isChecked: false
      }
    },
    props: {
      selected: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: 'Label'
      },
      inputId: {
        type: Number,
        default: 0
      },
      radioValue: {
        type: [ String, Number ],
        default: ''
      }
    },

    methods: {
      radioChange: function (event) {
        this.$emit('on-change', event)
      }
    }
  }
</script>

<style lang="scss">
  .radio-wrapper {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 17px;
    }

    input[type=radio]{
      display:none;
    }

    .label {
      margin-left: 19px;
      cursor: pointer;
    }

    .radio {
      height: 14px;
      min-width: 14px;
      background-color: transparent;
      border: 1px solid #979797;
      border-radius: 50%;
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      cursor: pointer;
      transition: $base-animation-duration;

      &::before {
        position: absolute;
        height: 4px;
        width: 4px;
        background-color: $base-background;
        display: inline-block;
        transform-origin: center;
        transform: translateX(-50%) translateY(-50%);
        border-radius: 50%;
        left: 50%;
        top: 50%;
        opacity: 0;
        transition: $base-animation-duration;
        content: '';
      }
    }

    input[type=radio]:checked + .radio {
      border: 5px solid $skyblue;

      &::before{
        opacity: 1;
      }
    }
  }
</style>
