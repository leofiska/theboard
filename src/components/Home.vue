<template>
  <div>
  <p>{{s.first_message}}</p>
  <form action="#">
    <input type="text" v-model="game_id" :placeholder="s.game_id">
    <input class='btn btn-dark' type="submit" v-on:click.prevent="join_game" :value='s.join' ><br />
    <input class='btn btn-dark' type="submit" v-on:click.prevent="create_game" :value='s.create' >
    </form>
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
        game_id: 'Game ID',
        first_message: 'Welcome, please choose an option:',
        create: 'New Game',
        join: 'Join Game'
      },
      items: []
    }
  },
  props: [
    'title',
    'token'
  ],
  methods: {
    create_game: function () {
      console.log('create')
    },
    join_game: function () {
      this.$router.push('/game/?id=' + this.game_id)
    }
  }
}
</script>

<style scoped>
</style>
