<template>
  <div
    class="modal fade" id="couponModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="couponModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-ad-primary text-white">
          <h5 class="modal-title" id="couponModalLabel">
            <span v-if="isNew">新增優惠券</span>
            <span v-else>編輯優惠券</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="couponTitle" class="form-label">名稱</label>
            <input
              type="text" class="form-control mb-2" name="coupon-title"
              id="couponTitle" placeholder="請輸入名稱" v-model="tempCoupon.title" autocomplete="on">
          </div>
          <div class="mb-3">
            <label for="couponCode" class="form-label">折扣碼</label>
            <input
              type="text" class="form-control mb-2" name="coupon-code"
              id="couponCode" placeholder="請輸入折扣碼" v-model="tempCoupon.code" autocomplete="on">
          </div>
          <div class="mb-3">
            <label for="couponPercent" class="form-label">折扣百分比</label>
            <input
              type="number" class="form-control mb-2" name="coupon-percent"
              id="couponPercent" placeholder="請輸入折扣百分比" v-model="tempCoupon.percent" autocomplete="on"
              min="0">
          </div>
          <div class="mb-4">
            <label for="couponDue" class="form-label">到期日</label>
            <input
              type="date" class="form-control mb-2"
              id="couponDue" v-model="due_date" autocomplete="on">
          </div>
          <div class="form-check mb-3">
            <input
              type="checkbox" class="form-check-input" value="" id="is_enabled"
              v-model="tempCoupon.is_enabled"
              :true-value="1" :false-value="0">
            <label for="is_enabled" class="form-check-label">是否啟用</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">取 消</button>
          <button
            type="button" class="btn btn-ad-primary"
            @click="$emit('update-coupon', tempCoupon)">
            <span v-if="isNew">新增優惠券</span>
            <span v-else>更新優惠券</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: {
    coupon: {
      type: Object,
      default () { return {} }
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tempCoupon: {},
      due_date: ''
    }
  },
  mixins: [modalMixin],
  inject: ['emitter'],
  emits: ['update-coupon'],
  watch: {
    coupon () {
      this.tempCoupon = this.coupon
      // 轉換時間格式，JS 時間計算單位為毫秒，所以要 *1000
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
        .toISOString().split('T')
      // eslint-disable-next-line
      [this.due_date] = dateAndTime
    },
    due_date () {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  }
}
</script>
