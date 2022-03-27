<template>
  <main id="App">
    <div class="container d-flex justify-content-center align-items-center">
      <div class="wrap d-flex justify-content-center align-items-center">
        <div class="form-login">
          <h2 class="login-logo fs-3 text-center my-6">
            <span class="fw-bold">Blossom</span>
            in Hand
          </h2>
          <v-form
          v-slot="{ errors, validate }" @submit="login">
            <div class="mb-5">
              <div class="form-floating mb-3">
                <v-field
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors['email'] }"
                  name="email"
                  rules="required"
                  v-model="user.username"
                  id="floatingEmail"
                  placeholder="Email address"
                ></v-field>
                <label for="floatingEmail">Email address</label>
                <error-message name="email" class="invalid-feedback"></error-message>
              </div>
              <div class="form-floating mb-3">
                <v-field
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': errors['password'] }"
                  name="password"
                  rules="required"
                  v-model="user.password"
                  id="floatingPass"
                  placeholder="Password"
                ></v-field>
                <label for="floatingPass">Password</label>
                <error-message name="password" class="invalid-feedback"></error-message>
              </div>
              <button
                type="submit"
                class="btn btn-primary w-100 fs-5 mb-3"
                v-on:click="login,validate"
                id="btnLogin"
              >登入
              </button>
            </div>
          </v-form>
          <p class="text-muted text-center">© 2022~∞ - Blossom in Hand</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const loginApi = `${process.env.VUE_APP_API}/admin/signin`
      this.$http
        .post(loginApi, this.user)
        .then((res) => {
          // 將 token 存在 cookie
          const { token, expired } = res.data
          document.cookie = `userToken=${token}; expires=${new Date(expired)}GMT;`
          // 跳轉頁面
          alert(`${res.data.message}，即將進入商品頁面`)
          this.$router.push('/admin/products')
        })
        .catch((error) => {
          alert(`${error.response.data.message}，請重新輸入一次`)
          console.dir(error)
        })
    }
  }
}
</script>

<style lang="scss">
#App {
  height: 100vh;
  background-image: url("../assets/images/bg-image.jpg");
  background-color: #374151;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  .container {
    padding-top: 20vh;
  }

  .login-logo {
    font-family: 'Ubuntu', sans-serif;
  }
}
.wrap {
  width: 320px;
  background-color: rgba(255, 255, 255, .8);
  border-radius: .5rem;
}
</style>
