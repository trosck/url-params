import URLParams from 'url-params'

let url
try {
  url = new URLParams(window.location.href)
} catch(e) {}

export default {
  mounted() {
    /**
     * Updating url parameters after called component 'mounted',
     * because he can change watching values
     */
    this.$nextTick(() => {
      try {
        (this && this.urlMixinConfig || []).forEach(name => {
          url.set(name, this[name])
        })
      } catch(e) {
        console.error(e)
      }
    })
  },
  created() {
    try {
      if (!url) return

      /**
       * Setting listeners on values
       */
      (this && this.urlMixinConfig || []).forEach(param => {
        this.$watch(param, val => {
          /**
           * Delete parameter from url if value empty,
           * else add/update
           */
          if (
            val === undefined ||
            val === null ||
            val === ''
          ) {
            url.delete(param)
          } else {
            url.set(param, val) 
          }
        })
      })

      /**
       * Let's write the parameters to data from the url
       */
      url
        .getAllParams()
        .forEach(([name, value]) => {
          /**
           * Checks that the value is not in props and is in the config
           */
          if (
            (this.urlMixinConfig || []).includes(name),
            this.$props && 
            !(name in this.$props)
          ) {
            this[name] = value
          }
        })
    } catch(e) {
      console.error(e)
    }
  }
}
