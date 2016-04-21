// import dependencies
import {uniqueId} from '../../utils/helpers.js'
import template from './form-input.html'

// export component object
export default {
  template: template,
  replace: true,
  computed: {
    inputState() {
      return !this.state || this.state === `default` ? `` : `has-${this.state}`
    },
    // stateIconType() {
    //   return !this.stateIcon || this.stateIcon === `default` ? `` : `form-control-${this.state}`
    // },
    // inputSize() {
    //   return !this.size || this.size === `default` ? `` : `form-control-${this.size}`
    // },
    row() {
      return labelClass && inputClass
    },
    inputClass() {
      return {
          'form-control': true,
          [`form-control-${this.state}`]: !!this.stateIcon && this.stateIcon !== 'default',
          [`form-control-${this.size}`]: !!this.size && this.size !== 'default'
      }
    },
    isNumber() {
        return this.type === 'number'
    }
  },
  props: {
    model: {
      twoWay: true,
      required: true,
      type: String
    },
    type: {
      type: String,
      default: 'text',
      required: true
    },
    id: {
      type: String,
      default: uniqueId
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    stateIcon: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
}
