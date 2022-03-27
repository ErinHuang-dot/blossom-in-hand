<template>
  <admin-navbar></admin-navbar>
  <!-- Login status -->
  <div class="login-status text-dark text-end pt-2">
    <div class="container">
      <div class="d-flex justify-content-end align-items-center">
        <p class="mb-0">登 出
          <button
            type="button" class="btn btn-link text-dark"
            @click="logout"
            ><vue-feather type="log-out" class="ms-2"></vue-feather>
          </button>
        </p>
      </div>
    </div>
  </div>
  <div class="admin-main">
    <router-view></router-view>
  </div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'

export default {
  data () {
    return {
      status: false
    }
  },
  components: {
    AdminNavbar
  },
  methods: {
    logout () {
      const logoutApi = `${process.env.VUE_APP_API}/logout`
      this.$http
        .post(logoutApi)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/login')
          }
          // this.$httpMessageState(res, '登出')
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    }
  },
  created () {
    // eslint-disable-next-line
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    // eslint-disable-next-line
    this.$http.defaults.headers.common['Authorization'] = token
    const checkLoginApi = `${process.env.VUE_APP_API}/api/user/check`
    this.$http
      .post(checkLoginApi)
      .then((res) => {
        this.status = true
        // this.$httpMessageState(res, '登入')
      })
      .catch((error) => {
        console.dir(error.response)
        // this.$httpMessageState(error.response, '錯誤訊息')
        // this.$router.push('/login')
      })
  }
}
</script>

<style lang="scss">
.login-status {
  margin-left: 200px;
  background-color: #f2f4f6;
}

.admin-main {
  margin-left: 200px;
  height: 100vh;
}
</style>
