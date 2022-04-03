<template>
  <div class="container">
    <!-- 商品主圖 -->
    <div class="row align-items-center py-6 py-md-7">
      <div class="col-md-7">
        <div class="overflow-hidden rounded-3">
          <img
          :src="product.imageUrl"
          :alt="product.title"
          class="product-img w-100">
        </div>
      </div>
      <div class="col-md-5">
        <!-- breadcrumb -->
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb py-2">
            <li class="breadcrumb-item">
              <router-link to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/products">挑花買花</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
          </ol>
        </nav>
        <!-- 商品標題 -->
        <h2 class="fw-bold my-4">{{ product.title }}</h2>
        <div class="fs-5 text-end">
          <p v-if="product.origin_price === product.price">
            $ {{ product.origin_price }}
          </p>
          <p v-else>
            <del class="text-muted">$ {{ product.origin_price }} </del>
            <span class="ms-2">$ {{ product.price }} </span>
          </p>
        </div>
        <div class="row align-items-center">
          <div class="col-6">
            <div class="input-group my-3 bg-lighter rounded align-items-center">
              <div class="input-group-prepend">
                <button
                  @click="prodcutQty--"
                  class="btn btn-outline-accent border-0 py-2" type="button" id="button-addon1">
                  <vue-feather type="minus" class="align-middle"></vue-feather>
                </button>
              </div>
              <input
                v-model="prodcutQty"
                type="number"
                class="form-control border-0 text-center my-auto shadow-none bg-lighter"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                min="1">
              <div class="input-group-append">
                <button
                  @click="prodcutQty++"
                  class="btn btn-outline-accent border-0 py-2" type="button" id="button-addon2">
                  <vue-feather type="plus" class="align-middle"></vue-feather>
                </button>
              </div>
            </div>
          </div>
          <div class="col-6">
            <button
              type="button"
              class="text-nowrap btn btn-accent w-100 py-2"
              @click="addToCart(product.id)"
            >加入購物車</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-md-4">
        <p class="py-5 border-top border-bottom">{{ product.description }}</p>
      </div>
      <div class="col-md-3">
        <p class="mt-4 text-ad-primary">{{ product.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      prodcutQty: 1
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then(res => {
          this.product = res.data.product
        })
    },
    addToCart (id) {
      const data = {
        product_id: id,
        qty: this.prodcutQty
      }
      this.isLoadingItem = id // 觸發時也存取id
      const addToCartApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .post(addToCartApi, { data }) // 需帶入商品資料
        .then((res) => {
          alert(res.data.message)
          this.isLoadingItem = '' // 觸發後清空id
          console.log(res.data)
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<style lang="scss">
.product-img {
  object-fit: cover;
  object-position: center;
}
</style>
