<template>
  <div class="hello">
    <div class='d-inline-block'>
      <button class='btn btn-dark' @click='refresh' :disabled="!online">{{s.refresh}}</button>
      <br />
      User ID: {{this.id}}<br />
      Session ID: {{items.elements.id}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'session',
  data () {
    return {
      adding: false,
      sname: '',
      name: '',
      cpf: '',
      s: {
        cancel: 'cancel',
        refresh: 'refresh'
      },
      items: { tid: -1, elements: [] }
    }
  },
  props: [
    'online',
    'title',
    'id',
    'token',
    'loading'
  ],
  beforeMount () {
    this.$emit('subscribe', { method: 'session', storno: this.storno, context: this, sync: this.items, options: { f: 'subscribe', id: this.$router.currentRoute.query.id } })
  },
  beforeDestroy () {
    this.$emit('unsubscribe', { method: 'session', storno: this.storno, context: this, sync: this.items, options: { f: 'unsubscribe', id: this.$router.currentRoute.query.id } })
  },
  mounted () {
    document.title = this.session_id + ' | ' + this.title
  },
  methods: {
    refresh () {
      this.$emit('setloading', true)
      this.$emit('fetch', { method: 'session', storno: this.storno, context: this, sync: this.items, options: { f: 'info', id: this.$router.currentRoute.query.id } })
    },
    storno (obj) {
      console.log('storno')
      console.log(obj)
      switch (obj.f) {
        case 'info':
          if (obj.error !== false) {
            switch (obj.error) {
              case 500:
                break
              default:
                this.$router.push('/')
                break
            }
          } else {
            this.items.elements = obj.content.elements
          }
          this.$emit('setloading', false)
          break
      }
    }
  },
  computed: {
    session_id () {
      return this.$router.currentRoute.query.id
    },
    d () {
      return {
        title: 'session ' + this.$router.currentRoute.query.id
      }
    }
  }
}
</script>

<style scoped>
input {
  margin: 5px 0px;
  padding: 2px 5px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
</style>
