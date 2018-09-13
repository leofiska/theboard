<template>
  <div class="hello">
    <div class='d-inline-block'>
      <h2>{{d.title}}</h2>
      <button class='btn btn-dark' @click='refresh'>{{s.refresh}}</button><br />
      <Loading :loading="this.items.loading"></Loading>
    </div>
  </div>
</template>

<script>
import Loading from './Loading.vue'

export default {
  name: 'session',
  components: {Loading},
  data () {
    return {
      adding: false,
      loading: false,
      sname: '',
      name: '',
      cpf: '',
      s: {
        cancel: 'cancel',
        refresh: 'refresh'
      },
      items: { tid: -1, loading: true, elements: [] }
    }
  },
  props: [ 'title' ],
  beforeMount () {
    this.$emit('subscribe', 'session', { f: 'subscribe', id: this.$router.currentRoute.query.id }, { method: 'session', f: this.storno, context: this, obj: this.items })
  },
  beforeDestroy () {
    this.$emit('unsubscribe', 'session', { f: 'unsubscribe', id: this.$router.currentRoute.query.id }, { method: 'session', f: this.storno, context: this, obj: this.items })
  },
  mounted () {
    document.title = this.session_id + ' | ' + this.title
  },
  methods: {
    refresh () {
      this.items.loading = true
      this.$emit('fetch', 'session', { f: 'info' }, { method: 'session', f: this.storno, context: this, obj: this.items })
    },
    storno (obj) {
      console.log('storno')
      console.log(obj)
      switch (obj.f) {
        case 'info':
          this.items.loading = false
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
