<template>
  <div
    class="modal fade" id="orderModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-ad-primary text-white">
          <h5 class="modal-title" id="orderModalLabel">訂單內容</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- modal-start -->
            <div class="col-md-4">
              <h3>購買者資訊</h3>
              <table class="table align-middle">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th>姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- modal-end -->
            <div class="col-md-8">
              <h3>購買資訊</h3>
              <table class="table align-middle">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th>訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_date">
                        {{ $filters.date(tempOrder.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <span
                        v-if="tempOrder.is_paid"
                        class="text-success"
                      ><strong>已付款</strong></span>
                      <span
                        v-else
                        class="text-muted"
                      >尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ $filters.currency(tempOrder.total) }}</td>
                  </tr>
                </tbody>
              </table>
              <h3>購買品項</h3>
              <table class="table align-middle">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <th>{{ item.product.title }}</th>
                    <td>{{ item.product.num }} / {{ item.product.unit }}</td>
                    <td class="text-end">
                      {{ $filters.currency(item.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input" type="checkbox" role="switch"
                    id="paidSwitch"
                    value=""
                    v-model="tempOrder.is_paid">
                  <label class="form-check-label" for="paidSwitch">
                    <span v-if="tempOrder.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">取 消</button>
          <button type="button" class="btn btn-ad-primary" @click="$emit('update-paid', tempOrder)">修改付款狀態</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: {
    order: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      modal: '',
      tempOrder: {}
    }
  },
  mixins: [modalMixin],
  inject: ['emitter'],
  emits: ['update-paid'],
  watch: {
    order () {
      this.tempOrder = this.order
    }
  }
}
</script>
