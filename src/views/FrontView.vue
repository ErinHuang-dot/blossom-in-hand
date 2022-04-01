<template>
  <div class="sticky-footer">
    <front-navbar></front-navbar>
    <router-view></router-view>
    <front-footer></front-footer>
  </div>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import FrontFooter from '@/components/FrontFooter.vue'

export default {
  components: {
    FrontNavbar,
    FrontFooter
  }
}
</script>

<style lang="scss">
.sticky-footer {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
