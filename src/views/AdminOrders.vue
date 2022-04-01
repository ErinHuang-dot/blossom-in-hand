<template>
  <div class="container">
    <h1 class="fs-3 py-6">訂單管理</h1>
    <!-- 訂單列表 -->
    <div class="card card-body border-0 shadow table-wrapper table-responsive">
      <v-loading :active="isLoading"></v-loading>
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th class="border-gray-200">購買時間</th>
            <th class="border-gray-200">姓 名</th>
            <th class="border-gray-200">Email</th>
            <th class="border-gray-200">購買品項</th>
            <th class="border-gray-200">應付金額</th>
            <th class="border-gray-200">是否付款</th>
            <th class="border-gray-200 text-center">編 輯</th>
            <th class="border-gray-200 text-center">刪 除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{ item.create_at }}</td>
            <td>{{ item.user.name }}</td>
            <td>{{ item.user.email }}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for="product in item.products" :key="product.id">
                  〔{{ product.product.title }} 〕
                  數量：{{ product.product.num }} {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-end">
              <span class="fw-bold me-4">{{ item.total }}</span>
            </td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input" type="checkbox" role="switch"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)">
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid" class="text-success">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td class="text-center">
              <button
                type="button"
                class="edit-btn border-0 bg-transparent px-3 py-2"
                @click="callOrderModal(item)"
                ><vue-feather type="edit"></vue-feather>
              </button>
            </td>
            <td class="text-center">
              <button
                type="button"
                class="delete-btn border-0 bg-transparent px-3 py-2"
                @click="callDeleteOrderModal(item)"
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
        "
      >
        <!-- 分頁元件 -->
        <pagination-tool
          :pages="pagination"
          @emit-pages="getOrders"
        ></pagination-tool>
        <div class="fw-normal small mt-4 mt-lg-0">
          <p>本頁 {{ orders.length }} 筆</p>
        </div>
      </div>
    </div>
    <!-- 編輯視窗 -->
    <update-order-modal
      ref="orderModal"
      :order="tempOrder"
      @update-paid="updatePaid"
    ></update-order-modal>
    <!-- 刪除視窗 -->
    <delete-modal
      ref="deleteModal"
      :item="tempOrder"
      @del-item="deleteOrder"
    ></delete-modal>
  </div>
</template>

<script>
import PaginationTool from '@/components/PaginationTool.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import UpdateOrderModal from '@/components/UpdateOrderModal.vue'

export default {
  data () {
    return {
      orders: {},
      tempOrder: {},
      pagination: {},
      currentPage: 1,
      isLoading: false
    }
  },
  components: {
    PaginationTool,
    DeleteModal,
    UpdateOrderModal
  },
  methods: {
    getOrders (currentPage = 1) {
      this.currentPage = currentPage
      const getOrdersApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`
      this.isLoading = true
      this.$http
        .get(getOrdersApi)
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          console.dir(error)
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    },
    callDeleteOrderModal (item) {
      this.tempOrder = { ...item }
      const delComponent = this.$refs.deleteModal
      delComponent.openModal()
    },
    deleteOrder () {
      const delOrderApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.isLoading = true
      this.$http
        .delete(delOrderApi)
        .then((res) => {
          const delComponent = this.$refs.deleteModal
          delComponent.hideModal()
          this.isLoading = false
          this.getOrders(this.currentPage)
          this.$httpMessageState(res, '刪除訂單')
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    },
    callOrderModal (item) {
      this.tempOrder = { ...item }
      const orderComponent = this.$refs.orderModal
      orderComponent.openModal()
    },
    updatePaid (item) {
      this.isLoading = true
      const paid = {
        is_paid: item.is_paid
      }
      const updateOrderApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      this.$http
        .put(updateOrderApi, { data: paid })
        .then((res) => {
          this.isLoading = false
          const orderComponent = this.$refs.orderModal
          orderComponent.hideModal()
          this.getOrders(this.currentPage)
          // this.$httpMessageState(res, '更新付款狀態')
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
