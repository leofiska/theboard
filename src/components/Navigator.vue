<template>
  <b-navbar toggleable="md" type="light" variant="light" :sticky="true">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand to="/">{{title}}</b-navbar-brand>
  </b-navbar>
</template>

<script>

export default {
  name: 'navigator',
  data () {
    return {
      items: {
        tid: -1,
        loading: true,
        elements: [
          {
            name: 'Home',
            path: '/home',
            meta: {
              alwaysVisible: true,
              requireAuth: false,
              guestOnly: false
            }
          }
        ]
      }
    }
  },
  props: [
    'token',
    'online',
    'title'
  ],
  created: function () {
  },
  methods: {
    logout: function () {
      this.$emit('logout')
    }
  }
}
</script>
