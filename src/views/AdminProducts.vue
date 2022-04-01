<template>
  <div class="container">
    <h1 class="fs-3 py-6">商品管理</h1>
    <!-- 商品列表 -->
    <div class="card card-body border-0 shadow table-wrapper table-responsive">
      <v-loading :active="isLoading"></v-loading>
      <div class="text-end">
        <button
        type="button"
        class="btn btn-ad-primary m-4 px-3 py-2"
        @click="callUpdateModal(true)"
        >新 增</button>
      </div>
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th class="w-20 border-gray-200">圖 片</th>
            <th class="border-gray-200">名 稱</th>
            <th class="border-gray-200">分 類</th>
            <th class="border-gray-200">原 價</th>
            <th class="border-gray-200">售 價</th>
            <th class="border-gray-200">是否啟用</th>
            <th class="border-gray-200 text-center">編 輯</th>
            <th class="border-gray-200 text-center">刪 除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>
              <img
              :src="item.imageUrl"
              :alt="item.title"
              class="item-img rounded-3 m-2"
              >
            </td>
            <td>
              <span class="fw-normal">{{ item.title }}</span>
            </td>
            <td>
              <span class="fw-normal">{{ item.category }}</span>
            </td>
            <td>
              <span class="fw-normal">{{ item.origin_price }}</span>
            </td>
            <td>
              <span class="fw-bold">{{ item.price }}</span>
            </td>
            <td v-if="item.is_enabled" class="text-success">
              啟用
            </td>
            <td v-else class="text-ad-warning">
              未啟用
            </td>
            <td class="text-center">
              <button
                type="button"
                class="edit-btn border-0 bg-transparent px-3 py-2"
                @click="callUpdateModal(false, item)"
                ><vue-feather type="edit"></vue-feather>
              </button>
            </td>
            <td class="text-center">
              <button
                type="button"
                class="delete-btn border-0 bg-transparent px-3 py-2"
                @click="callDeleteModal(item)"
                ><vue-feather type="trash-2"></vue-feather>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="
          card-footer
          px-3
          border-0
          d-flex
          flex-column flex-lg-row
          align-items-center
          justify-content-between
        ">
        <!-- 分頁元件 -->
        <pagination-tool
          :pages="pagination"
          @emit-pages="getProducts"
        ></pagination-tool>
        <div class="small mt-4 mt-lg-0">
          <p class="mb-0">本頁 {{ products.length }} 筆</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 新增/編輯視窗 -->
  <update-product-modal
    ref="updateModal"
    :temp-product="tempProduct"
    :is-new="isNew"
    @update-product="updateProduct"
  ></update-product-modal>
  <!-- 刪除視窗 -->
  <delete-modal
    ref="deleteModal"
    :item="tempProduct"
    @del-item="deleteProduct"
  ></delete-modal>
</template>

<script>
import PaginationTool from '@/components/PaginationTool.vue'
import UpdateProductModal from '@/components/UpdateProductModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'

export default {
  data () {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [] // 需要定義陣列，props才不會失敗
      },
      isNew: false,
      pagination: {},
      currentPage: 1,
      isLoading: false
    }
  },

  components: {
    PaginationTool,
    UpdateProductModal,
    DeleteModal
  },

  inject: ['emitter'],
  methods: {
    getProducts (page = 1) {
      this.currentPage = page
      const getProductsApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.isLoading = true
      this.$http
        .get(getProductsApi)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((error) => {
          console.dir(error)
          this.isLoading = false
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    },
    callUpdateModal (isNew, item) {
      // 新增、編輯共用的判斷
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = { ...item }
        this.isNew = false
      }
      const productComponent = this.$refs.updateModal
      productComponent.openModal()
    },
    updateProduct (item) {
      this.tempProduct = item
      let updateApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
      this.isLoading = true
      let method = 'post'
      let status = '新增商品'
      // 編輯模式時，介接方式改成 put
      if (!this.isNew) {
        updateApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        method = 'put'
        status = '更新商品'
      }
      this.$http[method](updateApi, { data: this.tempProduct })
        .then((res) => {
          const productComponent = this.$refs.updateModal
          productComponent.hideModal()
          this.isLoading = false
          this.getProducts(this.currentPage)
          this.$httpMessageState(res, status)
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, status)// 有錯需debug
        })
    },
    callDeleteModal (item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.deleteModal
      delComponent.openModal()
    },
    deleteProduct (item) {
      const deleteApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.isLoading = true
      this.$http.delete(deleteApi, { data: this.tempProduct })
        .then((res) => {
          const delComponent = this.$refs.deleteModal
          delComponent.hideModal()
          this.isLoading = false
          this.getProducts(this.currentPage)
          this.$httpMessageState(res, '刪除產品')
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '刪除產品')
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style lang="scss">
.table > :not(:first-child) {
    border-top: 1px solid currentColor;
}
.item-img {
  height: 100px;
  width: 80%;
  object-fit: cover;
  object-position: center;
}
</style>
