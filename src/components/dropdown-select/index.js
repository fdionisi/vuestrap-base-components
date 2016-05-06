// import dependencies
import template from './dropdown-select.html'
import '../dropdown/dropdown-override.scss'

// export component object
export default {
  template: template,
  replace: true,
  data() {
    return {
      show: false,
      selected: false,
    }
  },
  computed: {
    btnVariant() {
      return !this.variant || this.variant === `default` ? `btn-secondary` : `btn-${this.variant}`
    },
    btnSize() {
      return !this.size || this.size === `default` ? `` : `btn-${this.size}`
    },
    dropdownToggle() {
      return this.caret ? 'dropdown-toggle' : ''
    },
    displayItem() {
      // if zero show default message
      if ((this.returnObject && this.model && !this.model.text) || (!this.returnObject && this.model && this.model.length === 0) || this.forceDefault) {
          return this.defaultText
      }

      // show selected item
      if (this.returnObject && this.model && this.model.text) {
          return this.model.text
      }

      // show text that coresponds to the model value
      if (!this.returnObject && this.model) {
        let result = this.model || ''
        this.list.forEach((item) => {
          if (item.value._id === this.model._id) {
            result = item.text
          }
        })
        return result
      }

      return ''
    },
  },
  props: {
    id: {
      type: String
    },
    model: {
      required: false
    },
    list: {
      type: Array,
      default: [],
      required: true
    },
    caret: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'left'
    },
    size: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default'
    },
    defaultText: {
      type: String,
      default: 'Plase select one'
    },
    forceDefault: {
      type: Boolean,
      default: false
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    dropup: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    toggle(e) {
      // hide an alert
      this.show = !this.show
      // Dispatch an event from the current vm that propagates all the way up to its $root
      if (this.show) {
        this.$dispatch('shown:dropdown', this.id)
        e.stopPropagation()
      } else {
        this.$dispatch('hidden::dropdown', this.id)
      }
    },
    select(item) {
      // we need to set empty model to make model watchers react to it
      if (this.returnObject) {
        this.model = item
      } else {
        this.model = item.value
      }
      this.show = false
      // Dispatch an event from the current vm that propagates all the way up to its $root
      this.$dispatch('selected::dropdown', this.id, this.model)
    }
  },
  events: {
    'hide::dropdown'() {
      this.show = false
    }
  },
  ready: function ready() {
    if (this.model) {
      const item = (this.list || []).find(
        i => i.value._id === this.model._id
      )
      item && this.select(item)
    }
  }
}
