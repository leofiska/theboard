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
  name: 'game',
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
    this.$emit('subscribe', 'game', { f: 'subscribe' }, { method: 'game', f: this.storno, context: this, obj: this.items })
  },
  beforeDestroy () {
    this.$emit('unsubscribe', 'game', { f: 'unsubscribe' }, { method: 'game', f: this.storno, context: this, obj: this.items })
  },
  mounted () {
    document.title = this.game_id + ' | ' + this.title
  },
  methods: {
    refresh () {
      this.items.loading = true
      this.$emit('fetch', 'game', { f: 'list' }, { method: 'game', f: this.storno, context: this, obj: this.items })
    },
    storno (obj) {
      if (obj.content !== undefined && obj.content.items !== undefined) {
        this.items.elements = obj.content.items
        this.items.loading = false
      }
      if (obj.add !== undefined && obj.add) {
        this.loading = false
        this.hide_add()
      }
    }
  },
  computed: {
    game_id () {
      return this.$router.currentRoute.query.id
    },
    d () {
      return {
        title: 'Game ' + this.$router.currentRoute.query.id
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
