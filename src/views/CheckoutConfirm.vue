<template>
  <div class="container">
    <v-loading :active="isLoading"></v-loading>
    <!-- progress-bar -->
    <div class="row justify-content-center">
      <div class="col-md-10 py-6">
        <ul class="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-center w-100 mt-md-0 mt-4">
          <li class="me-md-7 me-3 position-relative custom-step-line">
            <vue-feather type="check-circle" class="align-middle me-2"></vue-feather>
            <span class="text-nowrap">填寫資料</span>
          </li>
          <li class="me-md-7 me-3 position-relative custom-step-line">
            <vue-feather type="check-circle" class="align-middle me-2"></vue-feather>
            <span class="text-nowrap">建立訂單</span>
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
        <h3 class="fw-bold mb-4 py-3">建立訂單</h3>
      </div>
    </div>
    <div class="row justify-content-center pb-7 mb-6">
      <!-- 填寫資訊 -->
      <div class="col-md-6">
        <ul class="ps-0">
          <li class="border border-top-0 border-start-0 border-end-0 border-bottom mb-3">
            <span class="d-inline-block text-muted fs-6 mb-2">Email</span>
            <p>{{ orderData.user.email}}</p>
          </li>
          <li class="border border-top-0 border-start-0 border-end-0 border-bottom mb-3">
            <span class="d-inline-block text-muted fs-6 mb-2">姓名</span>
            <p>{{ orderData.user.name}}</p>
          </li>
          <li class="border border-top-0 border-start-0 border-end-0 border-bottom mb-3">
            <span class="d-inline-block text-muted fs-6 mb-2">地址</span>
            <p>{{ orderData.user.address}}</p>
          </li>
          <li class="border border-top-0 border-start-0 border-end-0 border-bottom mb-3">
            <span class="d-inline-block text-muted fs-6 mb-2">電話</span>
            <p>{{ orderData.user.tel}}</p>
          </li>
          <li class="border border-top-0 border-start-0 border-end-0 border-bottom mb-3">
            <span class="d-inline-block text-muted fs-6 mb-2">其他留言</span>
            <p v-if="orderData.user.message">{{ orderData.user.message}}</p>
            <p v-else>無</p>
          </li>
        </ul>
        <div class="text-end mt-4">
          <button
            class="btn btn-accent btn-lg px-6"
            type="button"
            @click="payOrder()"
          >確認付款</button>
        </div>
      </div>
      <!-- 訂單金額表 -->
      <div class="col-md-4">
        <div class="border border-ad-secondary p-4 mb-4">
          <div
            v-for="item in orderData.products"
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
                <td class="text-end border-0 px-0 pt-4">$ {{ orderData.total }}</td>
              </tr>
              <tr>
                <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">優惠券代碼</th>
                <td
                  v-if="orderData.total"
                  class="text-end border-0 px-0 pt-0 pb-4">未使用</td>
                <td
                  v-else
                  class="text-end text-ad-warning border-0 px-0 pt-0 pb-4"
                >{{ orderData.products }}</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-between mt-4">
            <p class="mb-0 h4 fw-bold">總計</p>
            <p class="mb-0 h4 fw-bold">$ {{ Math.round(orderData.total)}}</p>
          </div>
        </div>
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
      },
      isLoading: false
    }
  },
  methods: {
    getOrderData () {
      const { id } = this.$route.params
      const getOrderApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`
      this.$http
        .get(getOrderApi)
        .then((res) => {
          this.orderData = res.data.order
        })
        .catch((error) => {
          console.log(error.data.message)
        })
    },
    payOrder () {
      const { id } = this.$route.params
      this.isLoading = true
      const payApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${id}`
      this.$http
        .post(payApi)
        .then((res) => {
          this.isLoading = false
          this.orderData = res.data.order
          alert('res.data.message')
          this.$router.push('/checkout/success')
        })
        .catch((error) => {
          console.dir(error.data.message)
        })
    }
  },
  mounted () {
    this.getOrderData()
  }
}
</script>
