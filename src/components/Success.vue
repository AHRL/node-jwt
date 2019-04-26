<template>
  <div class="container">
    <el-button @click="request">request</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    request () {
      this.$axios.post('/request', {
        token: this.$store.state.token
      }).then((res) => {
        console.log('request', res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>

</style>
