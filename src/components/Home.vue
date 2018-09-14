<template>
  <div>
  <h2>{{s.fboard}}</h2>
  <form action="#">
    <p>{{s.new_session}}</p>
    <input class='btn btn-dark' type="submit" v-on:click.prevent="create_session" :value='s.create' >
    <p>{{s.join_session}}</p>
    <input type="text" v-model="session_id" :placeholder="s.session_id">
    <input class='btn btn-dark' type="submit" v-on:click.prevent="join_session" :value='s.join' ><br />
    </form>
  <h2 class="pt-3">{{s.active_sessions}}</h2>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      session_id: '',
      s: {
        fboard: 'fBoard, a websocket engine',
        session_id: 'ID',
        new_session: 'create a new session by pressing the button below',
        join_session: 'or if you have received a session ID just fill the form',
        create: 'New Session',
        active_sessions: 'current active sessions',
        join: 'Join Session'
      },
      items: { tid: -1, loading: true, elements: [] }
    }
  },
  props: [
    'title',
    'token',
    'loading'
  ],
  mounted () {
    document.title = this.title
  },
  methods: {
    create_session: function () {
      this.$emit('setloading', true)
      this.$emit('fetch', { method: 'session', storno: this.storno, context: this, sync: this.items, options: { f: 'create', id: this.$router.currentRoute.query.id } })
    },
    join_session: function () {
      this.$emit('setloading', true)
      this.$emit('fetch', { method: 'session', storno: this.storno, context: this, sync: this.items, options: { f: 'join', id: this.session_id } })
      // this.$router.push('/session/?id=' + this.session_id)
    },
    storno (obj) {
      this.$emit('setloading', false)
      switch (obj.f) {
        case 'create':
          if (obj.error !== false) return
          this.$router.push('/session/?id=' + obj.id)
          break
      }
    }
  }
}
</script>

<style scoped>
</style>
