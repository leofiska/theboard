<template>
  <div class="hello">
    <div class='d-inline-block'>
      {{s.sessionid}}: {{items.elements.id}}<br />
      {{s.creatorid}}: {{this.items.elements.creator}}<br />
      <div v-if="!this.items.elements.started">
        <div v-if="this.id === this.items.elements.creator">
          define attributes
        </div>
        <div v-else>
          {{s.waitingstart}}
        </div>
      </div>
    </div>
    <div class="mt-4">
      <button v-if="!this.items.elements.started && this.id === this.items.elements.creator" class='btn btn-dark' type='button' @click='start' :disabled="!online">{{s.start}}</button>
      <button class='btn btn-dark' @click='refresh' :disabled="!online">{{s.refresh}}</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'session',
  data () {
    return {
      s: {
        cancel: 'cancel',
        refresh: 'refresh',
        start: 'start',
        creatorid: 'Creator ID',
        sessionid: 'Session ID',
        waitingstart: 'waiting for session to start'
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
    start () {
      this.$emit('setloading', true)
      this.$emit('fetch', { method: 'session', storno: this.storno, context: this, sync: this.items, options: { f: 'start', id: this.$router.currentRoute.query.id } })
    },
    storno (obj) {
      console.log('storno')
      console.log(JSON.stringify(obj))
      switch (obj.f) {
        case 'info':
          if (obj.error !== false) {
            switch (obj.error) {
              default:
              case 500:
                break
              case 404:
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
