<template>
  <div>
    <v-api ref='api' :token="token" @settoken="token = $event" :stoken="stoken" @setstoken="stoken = $event" :online="online" @setOnline="online = $event" />
    <Navigator :token="token" @settoken="token = $event" :stoken="stoken" @setstoken="stoken = $event" :online="online" :title="title" />
    <div id="app">
      <router-view @fetch="fetch" @subscribe="subscribe" @unsubscribe="unsubscribe" :title="title" :online="online" :token="token" :stoken="stoken" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navigator from '@/components/Navigator'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  data () {
    return {
      token: localStorage.getItem('token'),
      stoken: sessionStorage.getItem('stoken'),
      online: false,
      title: 'fBoard'
    }
  },
  mounted () {
    document.title = this.title
  },
  components: {
    Navigator,
    Footer
  },
  methods: {
    fetch (request) {
      this.$refs.api.fetch(request)
    },
    subscribe (request) {
      this.$refs.api.subscribe(request)
    },
    unsubscribe (request) {
      this.$refs.api.unsubscribe(request)
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  min-height: 100vh;
}
</style>
