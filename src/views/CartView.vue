<template>
  <div class="container">
    <v-loading :active="isLoading"></v-loading>
    <div class="mt-3 mb-7">
      <h3 class="py-3">購物車</h3>
      <div v-if="cartData.total" class="row">
        <!-- 購物車列表 -->
        <div class="col-md-8">
          <button
            type="button" class="btn btn-outline-ad-secondary float-end mb-3"
            @click="deleteCartData(cartData.carts.id)">清空購物車</button>
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="border-0 ps-0" style="width: 80px;">購買品項</th>
                <th scope="col" class="border-0"></th>
                <th scope="col" class="border-0">數 量</th>
                <th scope="col" class="border-0 text-end">金 額</th>
                <th scope="col" class="border-0 text-center">移 除</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in cartData.carts"
                :key="item.id"
                class="border-bottom border-top border-ad-secondary">
                <th scope="row" class="border-0 px-0 font-weight-normal py-4">
                  <img
                    :src="item.product.imageUrl"
                    :alt="item.product.title"
                    class="rounded-2"
                    style="width: 72px; height: 72px; object-fit: cover;">
                </th>
                <td class="border-0 align-middle">
                  <p class="mb-0 fw-bold ms-2 d-inline-block">{{ item.product.title }}</p>
                </td>
                <td class="border-0 align-middle" style="max-width: 160px;">
                  <div class="input-group pe-5">
                    <div class="input-group-prepend">
                      <button
                        @click="item.qty--"
                        class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1">
                        <vue-feather type="minus" class="align-middle"></vue-feather>
                      </button>
                    </div>
                    <input
                      type="number"
                      min="1"
                      v-model="item.qty"
                      @change="updateCartItem(item)"
                      class="hide-arrows form-control border-0 text-center my-auto shadow-none"
                      aria-describedby="button-addon1"
                      >
                    <div class="input-group-append">
                      <button
                        @click="item.qty++"
                        class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2">
                        <vue-feather type="plus" class="align-middle"></vue-feather>
                      </button>
                    </div>
                  </div>
                </td>
                <td class="border-0 align-middle text-end">
                  <p class="mb-0 ms-auto">$ {{ item.total }}</p>
                </td>
                <td class="border-0 align-middle text-center">
                  <button
                    type="button" class="btn"
                    @click="removeCartItem(item.id)"
                  ><vue-feather type="x" class="align-middle"></vue-feather>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 輸入優惠券 -->
          <div class="input-group w-50 mb-3">
            <input
              v-model="cartData.couponCode"
              type="text"
              class="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 border-ad-secondary shadow-none"
              placeholder="請輸入優惠券代碼" aria-label="Recipient's username" aria-describedby="button-addon2">
            <div class="input-group-append">
              <button
                @click="applyCoupon()"
                class="btn btn-outline-primary border-bottom border-top-0 border-start-0 border-end-0 border-ad-secondary rounded-0"
                type="button" id="button-addon2">
                <vue-feather type="send" class="align-middle me-2"></vue-feather>
              </button>
            </div>
          </div>
        </div>
        <!-- 訂單金額表 -->
        <div class="col-md-4">
          <div class="border border-ad-secondary rounded-2 p-4 mb-4">
            <h4 class="fw-bold mb-4">訂單金額</h4>
            <table class="table text-muted border-bottom border-ad-secondary">
              <tbody>
                <tr>
                  <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">小 計</th>
                  <td class="text-end border-0 px-0 pt-4">$ {{ cartData.total }}</td>
                </tr>
                <tr>
                  <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">優惠券代碼</th>
                  <td
                    v-if="cartData.couponCode"
                    class="text-end text-ad-warning border-0 px-0 pt-0 pb-4"
                  >{{ cartData.couponCode }}</td>
                  <td v-else class="text-end border-0 px-0 pt-0 pb-4">未使用</td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between mt-4">
              <p class="mb-0 h4 fw-bold">總 計</p>
              <p v-if="cartData.couponCode" class="mb-0 h4 fw-bold">$ {{ Math.round(cartData.final_total) }}</p>
              <p v-else class="mb-0 h4 fw-bold">$ {{ cartData.total }}</p>
            </div>
            <router-link
              to="/checkout"
              class="btn btn-accent w-100 mt-4"
            >進入結帳</router-link>
          </div>
        </div>
      </div>
      <!-- 購物車沒有東西時 -->
      <div v-else class="row">
        <div class="col-md-8">
          <p class="border border-primary rounded-2 p-4">還沒有挑到喜歡的商品嗎？</p>
          <router-link to="/products">
            <vue-feather type="chevron-left"></vue-feather>
            繼續挑花買花
          </router-link>
        </div>
        <div class="col-md-4">
          <img
            class="w-100 rounded-2"
            style="min-height: 300px; object-fit: cover; object-position: center;"
            src="https://images.unsplash.com/photo-1492409678553-da87ed48ffee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      cartData: {
        couponCode: ''
      },
      productQty: 1,
      productId: '',
      isLoadingItem: '', // 用是否正在載入，來改變按鈕的點擊狀態
      isLoading: false
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
    removeCartItem (id) {
      this.isLoadingItem = id
      const removeApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http
        .delete(removeApi)
        .then((res) => {
          this.isLoading = false
          alert(res.data.message)
          this.getCartData()
          this.isLoadingItem = ''
        })
        .catch((error) => {
          window.alert(error.data.message)
        })
    },
    deleteCartData (id) {
      this.isLoadingItem = id
      alert('您確定要移除購物車內所有商品嗎？')
      this.isLoading = true
      const deletCartApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
      this.$http
        .delete(deletCartApi)
        .then((res) => {
          this.isLoading = false
          alert(res.data.message)
          console.log(res)
          this.getCartData()
          this.isLoadingItem = ''
        })
        .catch((error) => {
          window.alert(error.response.data.message)
        })
    },
    updateCartItem (item) {
      this.productQty = item.qty
      const data = {
        product_id: item.id,
        qty: this.productQty
      }
      this.isLoadingItem = item.id
      const updateCartApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.$http
        .put(updateCartApi, { data })
        .then((res) => {
          console.log(res.data)
          alert(res.data.message)
          this.getCartData()
          this.isLoadingItem = ''
        })
        .catch((error) => {
          window.alert(error.response.data.message)
        })
    },
    applyCoupon () {
      const data = {
        code: this.cartData.couponCode
      }
      this.isLoading = true
      const couponApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`
      this.$http
        .post(couponApi, { data })
        .then((res) => {
          this.isLoading = false
          alert(res.data.message)
          this.cartData.final_total = res.data.data.final_total
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
  },
  mounted () {
    this.getCartData()
  }
}
</script>

<style lang="scss">
.table > :not(:first-child) {
  border-top-width: 1px;
}
</style>
