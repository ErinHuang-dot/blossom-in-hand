<template>
  <router-view/>
  <ToastMessages></ToastMessages>
</template>

<script>
import emitter from '@/methods/mitt'
import ToastMessages from '@/components/ToastMessages.vue'

export default {
  provide () {
    return {
      emitter
    }
  },
  components: {
    ToastMessages
  },
  data () {
    return {
      status: false
    }
  }
}

</script>

<style lang="scss">
@import "./assets/stylesheets/all.scss";

.bg-img {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
