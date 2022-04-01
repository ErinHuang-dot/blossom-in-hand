<template>
<!-- banner -->
  <div class="bg-img products-banner"></div>
  <div class="container mb-5">
    <loading :active="isLoading"></loading>
    <!-- breadcrumb -->
    <nav aria-label="breadcrumb" class="py-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">挑花買花</li>
      </ol>
    </nav>
    <!-- main-header -->
    <div class="main-header d-flex justify-cotent-between py-6">
      <h2 class="me-2">挑花買花，我想看看...</h2>
      <select class="form-select form-select-lg w-25 border-0 border-bottom" aria-label=".form-select-lg example">
        <option selected>請選擇類型</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <!-- 商品列表 -->
    <div class="row row-cols-1 row-cols-md-3 g-7">
      <div class="col" v-for="item in products" :key="item.id">
        <div class="card h-100">
          <div style="height: 12.5rem; overflow: hidden;">
            <img
              :src="item.imageUrl" class="card-img-top" :alt="item.title"
              :style="{backgroundSize: cover, backgroundPosition: center,center}">
          </div>
          <div class="card-body p-4">
            <h4 class="card-title mb-3">{{ item.title }}</h4>
            <p class="card-text">{{ item.description }}</p>
          </div>
          <div class="card-footer border-top-0 bg-transparent p-4">
            <div class="btn-group btn-group-lg w-100" role="group" aria-label="Basic outlined example">
              <router-link :to="`/product/${item.id}`" class="btn btn-outline-primary flex-grow-1">
                了解更多
              </router-link>
              <button type="button" class="btn btn-outline-primary">
                <vue-feather type="shopping-cart" class="align-middle"></vue-feather>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- main-footer -->
    <div class="d-flex justify-content-center py-6">
      <!-- 分頁元件 -->
      <pagination-tool
        :pages="pagination"
        @emit-pages="getProducts"
      ></pagination-tool>
    </div>
  </div>
</template>

<script>
import PaginationTool from '@/components/PaginationTool.vue'

export default {
  data () {
    return {
      products: [],
      isLoading: false,
      pagination: {},
      currentPage: 1
    }
  },
  components: {
    PaginationTool
  },
  methods: {
    getProducts (page = 1) {
      this.currentPage = page
      const getProductsApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`
      this.isLoading = true
      this.$http
        .get(getProductsApi)
        .then(res => {
          this.isLoading = false
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch(error => {
          console.dir(error)
          this.isLoading = false
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

<style lang="scss">
.products-banner {
  height: 460px;
  background-image: url(https://images.unsplash.com/photo-1612619732485-1ae018b63c55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80);
  background-position: top;
  margin-top: -200px;
}
.btn-group > .btn {
  flex: initial;
}
</style>
