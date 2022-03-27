<template>
  <div class="container">
    <h1 class="fs-3 py-6">優惠券管理</h1>
    <!-- 優惠券列表 -->
    <div class="card card-body border-0 shadow table-wrapper table-responsive">
      <v-loading :active="isLoading"></v-loading>
      <div class="text-end">
        <button
        type="button"
        class="btn btn-ad-primary m-4 px-3 py-2"
        @click="callCouponModal(true)"
        >新 增</button>
      </div>
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th class="border-gray-200">名 稱</th>
            <th class="border-gray-200">折扣碼</th>
            <th class="border-gray-200">折扣百分比</th>
            <th class="border-gray-200">到期日</th>
            <th class="border-gray-200">是否啟用</th>
            <th class="border-gray-200 text-center">編 輯</th>
            <th class="border-gray-200 text-center">刪 除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in coupons" :key="key">
            <td>{{ item.title }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.percent }}</td>
            <td>{{ item.due_date }}</td>
            <td
              class="text-success"
              v-if="item.is_enabled === 1">
              啟用
            </td>
            <td v-else class="text-muted">
              未啟用
            </td>
            <td class="text-center">
              <button
                type="button"
                class="edit-btn border-0 bg-transparent px-3 py-2"
                @click="callCouponModal(false, item)"
                ><vue-feather type="edit"></vue-feather>
              </button>
            </td>
            <td class="text-center">
              <button
                type="button"
                class="delete-btn border-0 bg-transparent px-3 py-2"
                @click="callDeleteCouponModal(item)"
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
          @emit-pages="getCoupons"
        ></pagination-tool>
        <div class="small mt-4 mt-lg-0">
          <p class="mb-0">本頁 {{ coupons.length }} 筆</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 新增/編輯視窗 -->
  <update-coupon-modal
    ref="couponModal"
    :coupon="tempCoupon"
    :is-new="isNew"
    @update-coupon="updateCoupon"
  ></update-coupon-modal>
  <!-- 刪除視窗 -->
  <delete-modal
    ref="deleteModal"
    :item="tempCoupon"
    @del-item="deleteCoupon"
  ></delete-modal>
</template>

<script>
import PaginationTool from '@/components/PaginationTool.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import UpdateCouponModal from '@/components/UpdateCouponModal.vue'

export default {
  props: {
    config: Object
  },
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false,
      isLoading: false,
      pagination: {}
    }
  },
  components: {
    PaginationTool,
    DeleteModal,
    UpdateCouponModal
  },
  methods: {
    getCoupons (page = 1) {
      this.isLoading = true
      const getCouponsApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http
        .get(getCouponsApi)
        .then((res) => {
          this.coupons = res.data.coupons
          this.isLoading = false
          this.pagination = res.data.pagination
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    },
    callDeleteCouponModal (item) {
      this.tempCoupon = { ...item }
      const delComponent = this.$refs.deleteModal
      delComponent.openModal()
    },
    deleteCoupon () {
      const delCouponApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.isLoading = true
      this.$http
        .delete(delCouponApi)
        .then((res) => {
          const delComponent = this.$refs.deleteModal
          delComponent.hideModal()
          this.isLoading = false
          this.getCoupons()
          // this.$httpMessageState(res, '刪除優惠券')有錯需debug
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    },
    callCouponModal (isNew, item) {
      this.isNew = isNew
      // 新增、編輯共用的判斷
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      const couponComponent = this.$refs.couponModal
      couponComponent.openModal()
    },
    updateCoupon (tempCoupon) {
      this.isLoading = true
      let updateCouponApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`
      let method = 'post'
      let data = tempCoupon
      // 編輯模式時，介接方式改成 put
      if (!this.isNew) {
        updateCouponApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        method = 'put'
        data = this.tempCoupon
      }

      this.$http[method](updateCouponApi, { data })
        .then((res) => {
          this.isLoading = false
          const couponComponent = this.$refs.couponModal
          couponComponent.hideModal()
          this.getCoupons()
          // this.$httpMessageState(res, '新增優惠券') 有錯需debug
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
