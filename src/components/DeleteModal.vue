<template>
  <div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header bg-ad-primary text-white">
          <h5 class="modal-title" id="deleteModalLabel">刪 除 {{ item.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <p>是否刪除 <span class="text-danger">{{ item.title }}</span>？（刪除後將無法恢復）</p>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-outline-ad-secondary" data-bs-dismiss="modal">取 消</button>
          <button type="button" class="btn btn-danger" @click="$emit('del-item')">確 認 刪 除</button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: {
    item: {}
  },
  data () {
    return {
      modal: ''
    }
  },
  mixins: [modalMixin],
  inject: ['emitter'],
  emits: ['del-item']
}
</script>
