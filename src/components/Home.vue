<template>
  <div>
  <h2>{{s.fboard}}</h2>
  <form action="#">
    <p>{{s.new_game}}</p>
    <input class='btn btn-dark' type="submit" v-on:click.prevent="create_game" :value='s.create' >
    <p>{{s.join_game}}</p>
    <input type="text" v-model="game_id" :placeholder="s.game_id">
    <input class='btn btn-dark' type="submit" v-on:click.prevent="join_game" :value='s.join' ><br />
    </form>
  <h2 class="pt-3">{{s.active_games}}</h2>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      game_id: '',
      loading: true,
      s: {
        fboard: 'fBoard, a websocket engine',
        game_id: 'ID',
        new_game: 'create a new session by pressing the button below',
        join_game: 'or if you have received a session ID just fill the form',
        create: 'New Session',
        active_games: 'current active sessions',
        join: 'Join Session'
      },
      items: { tid: -1, loading: true, elements: [] }
    }
  },
  props: [
    'title',
    'token'
  ],
  mounted () {
    document.title = this.title
  },
  methods: {
    create_game: function () {
      this.$emit('fetch', 'session', { f: 'create' }, { method: 'session', f: this.storno, context: this, obj: this.items })
    },
    join_game: function () {
      this.$emit('fetch', 'session', { f: 'info', id: this.game_id }, { method: 'session', f: this.storno, context: this, obj: this.items })
      // this.$router.push('/session/?id=' + this.game_id)
    },
    storno (obj) {
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
