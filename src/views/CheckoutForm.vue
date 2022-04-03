<template>
  <div class="container">
    <!-- progress-bar -->
    <div class="row justify-content-center">
      <div class="col-md-10 py-6">
        <ul class="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-center w-100 mt-md-0 mt-4">
          <li class="me-md-7 me-3 position-relative custom-step-line">
            <vue-feather type="check-circle" class="align-middle me-2"></vue-feather>
            <span class="text-nowrap">填寫資料</span>
          </li>
          <li class="me-md-7 me-3 position-relative custom-step-line">
            <vue-feather type="circle" class="align-middle me-2 text-muted"></vue-feather>
            <span class="text-nowrap text-muted">建立訂單</span>
          </li>
          <li>
            <vue-feather type="circle" class="align-middle me-2 text-muted"></vue-feather>
            <span class="text-nowrap text-muted">確認付款</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <h3 class="fw-bold mb-4 pt-3">填寫資料</h3>
      </div>
    </div>
    <div class="row flex-row-reverse justify-content-center pb-7 mb-6">
      <!-- 訂單內容 -->
      <div class="col-md-4">
        <div class="border border-ad-secondary p-4 mb-4">
          <div
            v-for="item in cartData.carts"
            :key="item.id"
            class="d-flex mb-2">
            <img
              :src="item.product.imageUrl"
              :alt="item.product.title"
              class="rounded-1 me-2"
              style="width: 48px; height: 48px; object-fit: cover">
            <div class="w-100">
              <div class="d-flex justify-content-between">
                <p class="mb-0 fw-bold">{{ item.product.title }}</p>
                <p class="mb-0">$ {{ item.total }}</p>
              </div>
              <p class="mb-0 fw-bold">x {{ item.qty }}</p>
            </div>
          </div>
          <table class="table mt-4 border-top border-bottom text-muted">
            <tbody>
              <tr>
                <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">小計</th>
                <td class="text-end border-0 px-0 pt-4">$ {{ cartData.total }}</td>
              </tr>
              <tr>
                <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">優惠券代碼</th>
                <td
                  v-if="cartData.final_total === cartData.total"
                  class="text-end border-0 px-0 pt-0 pb-4">未使用</td>
                <td
                  v-else
                  class="text-end text-ad-warning border-0 px-0 pt-0 pb-4"
                >{{ cartData.carts[0].coupon.code }}</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-between mt-4">
            <p class="mb-0 h4 fw-bold">總計</p>
            <p
              v-if="cartData.final_total === cartData.total"
              class="mb-0 h4 fw-bold">$ {{ cartData.total }}</p>
            <p v-else class="mb-0 h4 fw-bold">$ {{ Math.round(cartData.final_total)}}</p>
          </div>
        </div>
      </div>
      <!-- 填寫資料 -->
      <div class="col-md-6">
        <vForm
          action="/" method="POST"
          v-slot="{ errors, validate }" @submit="onSubmit">
          <div class="mb-3">
            <label for="email" class="form-label">
              <span class="text-ad-warning">*</span>Email
            </label>
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
            <label for="name" class="form-label">
              <span class="text-ad-warning">*</span>收件人姓名
            </label>
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
            <label for="tel" class="form-label">
              <span class="text-ad-warning">*</span>收件人電話
            </label>
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
            <label for="address" class="form-label">
              <span class="text-ad-warning">*</span>收件人地址
            </label>
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
          <div class="mt-4 mb-3">
            <label for="message" class="form-label">其他留言</label>
            <textarea
              class="form-control" id="message" name="message" rows="5"
              v-model="orderData.message"></textarea>
          </div>
          <div class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
            <router-link to="/cart" class="text-dark mt-md-0 mt-3">
              <vue-feather type="chevron-left" class="align-middle"></vue-feather>回到購物車
            </router-link>
            <button
              class="btn btn-accent btn-lg px-6"
              type="submit"
              @click="validate"
            >建立訂單</button>
          </div>
        </vform>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cartData: {},
      orderData: {
        user: {},
        message: '',
        orderId: ''
      }
    }
  },
  methods: {
    getCartData () {
      const getCartApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .get(getCartApi)
        .then((res) => {
          this.cartData = res.data.data
        })
        .catch((error) => {
          console.log(error.data.data.message)
        })
    },
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
          this.orderData.orderId = res.data.orderId
          this.$router.push({ path: `/checkout/confirm/${this.orderData.orderId}` }) // 轉址不成功
          console.log(this.orderData.orderId)
        })
        .catch((error) => {
          console.log(error.response.data.message)
        })
    }
  },
  mounted () {
    this.getCartData()
  }
}
</script>
