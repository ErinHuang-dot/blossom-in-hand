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
        <h3 class="fw-bold mb-4 pt-3">填寫聯絡資訊</h3>
      </div>
    </div>
    <div class="row flex-row-reverse justify-content-center pb-7 mb-6">
      <!-- 訂單內容 -->
      <div class="col-md-4">
        <div class="border border-ad-secondary p-4 mb-4">
          <div class="d-flex">
            <img
              src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
              alt=""
              class="me-2"
              style="width: 48px; height: 48px; object-fit: cover">
            <div class="w-100">
              <div class="d-flex justify-content-between">
                <p class="mb-0 fw-bold">Lorem ipsum</p>
                <p class="mb-0">NT$12,000</p>
              </div>
              <p class="mb-0 fw-bold">x1</p>
            </div>
          </div>
          <div class="d-flex mt-2">
            <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" alt="" class="me-2" style="width: 48px; height: 48px; object-fit: cover">
            <div class="w-100">
              <div class="d-flex justify-content-between">
                <p class="mb-0 fw-bold">Lorem ipsum</p>
                <p class="mb-0">NT$12,000</p>
              </div>
              <p class="mb-0 fw-bold">x1</p>
            </div>
          </div>
          <table class="table mt-4 border-top border-bottom text-muted">
            <tbody>
              <tr>
                <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">小計</th>
                <td class="text-end border-0 px-0 pt-4">NT$24,000</td>
              </tr>
              <tr>
                <th scope="row" class="border-0"></th>
                <td class="text-end border-0 px-0 py-4">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="請輸入優惠券代碼" aria-label="Recipient's username" aria-describedby="button-addon2">
                    <button class="btn btn-outline-light" type="button" id="button-addon2">套用</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-between mt-4">
            <p class="mb-0 h4 fw-bold">總計</p>
            <p class="mb-0 h4 fw-bold">NT$24,000</p>
          </div>
        </div>
      </div>
      <!-- 訂購者連絡資訊 -->
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
            <label for="message" class="form-label">購買者留言</label>
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
              to="/checkout/confirm"
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
          this.$router.push('/checkout/confirm')
        })
        .catch((error) => {
          console.log(error.response.data.message)
        })
    }
  }
}
</script>
