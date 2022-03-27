<template>
  <div class="container">
    <button class="btn btn-primary">按我</button>
    <h1>測試頁面<i data-feather="edit"></i></h1>
    <vForm action="/" method="POST"
      v-slot="{ errors, validate }" @submit="onSubmit">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <vField
          id="email"
          name="Email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['Email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="orderData.user.email"
        ></vField>
        <error-message name="Email" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <vField
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名" rules="required"
          v-model="orderData.user.name"
        ></vField>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <vField
          id="tel"
          name="電話"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話，例：02-12345678、(02)12345678、0912345678"
          rules="required"
          v-model="orderData.user.tel"
        ></vField>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <vField
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址" rules="required"
          v-model="orderData.user.address"
        ></vField>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea class="form-control" id="message" name="message" rows="5"
        v-model="orderData.message"></textarea>
      </div>
      <button
        class="btn btn-danger btn-sm float-end mb-5"
        type="submit"
        @click="validate"
        >送出訂單</button>
    </vForm>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderData: {
        user: {},
        message: ''
      }
    }
  },
  methods: {
    isPhone (value) {
      // eslint-disable-next-line
      const phoneNumber = /(^[0-9]{2,4}\-[0-9]{5,8}$)|(^\([0-9]{2,4}\)[0-9]{5,8}$)|^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    onSubmit () {
      const data = this.orderData
      const orderApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
      this.$http
        .post(orderApi, { data })
        .then((res) => {
          alert(res.data.message)
        })
        .catch((error) => {
          console.log(error.response.data.message)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
