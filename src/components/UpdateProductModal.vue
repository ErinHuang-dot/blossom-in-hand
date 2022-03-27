<template>
  <div class="modal fade" id="updateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true"
  ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-ad-primary text-white">
          <h5 class="modal-title" id="updateModalLabel">
            <span v-if="isNew">新增商品</span>
            <span v-else>編輯商品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- modal-start -->
            <div class="col-4">
              <div class="mb-3">
                <label for="imgUrl" class="form-label">圖片連結</label>
                <input type="text" class="form-control mb-2" name="img-url" id="imgUrl" placeholder="請輸入圖片連結"
                v-model="childProduct.imageUrl">
              </div>
              <div class="mb-5">
                <label for="customFile" class="form-label">或 圖片上傳
                    <vue-feather type="loader" animation="spin" animation-speed="slow"
                      v-if="status.fileUploading"
                    ></vue-feather>
                </label>
                <input
                  type="file" class="form-control mb-2"
                  id="customFile"
                  ref="fileInput"
                  @change="uploadFile">
              </div>
              <img :src="childProduct.imageUrl" class="img-fluid">
              <div>
                <!-- 多圖新增 -->
                <h3 class="mb-3">多圖新增</h3>
                <!-- 先判斷 childProduct.imagesUrl 是否為陣列資料-->
                <div v-if="Array.isArray(childProduct.imagesUrl)">
                  <div v-for="(img, key) in childProduct.imagesUrl" :key="key">
                    <input type="text" class="form-control mb-2" name="img-url" id="imgUrl" placeholder="請輸入圖片連結"
                    v-model="childProduct.imagesUrl[key]">
                    <img :src="childProduct.imagesUrl[key]" class="img-fluid mb-2">
                  </div>
                  <!-- 新增按鈕的進階判斷：1.陣列為空陣列 2.陣列最後一筆資料有內容 -->
                  <button type="button" class="btn btn-primary btn-sm w-100 mb-2"
                  v-if="!childProduct.imagesUrl.length || childProduct.imagesUrl[childProduct.imagesUrl.length - 1]" @click="updateProduct.imagesUrl.push('')">新增圖片</button>
                  <button type="button" class="btn btn-outline-danger btn-sm w-100"
                  v-else @click="updateProduct.imagesUrl.pop()">刪除最後一筆圖片</button>
                </div>
              </div>
            </div>
            <!-- modal-end -->
            <div class="col-8">
              <!-- modal-end-top -->
              <div class="pb-4 border-bottom mb-3">
                <div class="mb-3">
                  <label for="productTitle" class="form-label">標題</label>
                  <input type="text" class="form-control mb-2" name="product-title"
                  id="productTitle" placeholder="請輸入標題" v-model="childProduct.title" autocomplete="on">
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label for="productCategory" class="form-label">分類</label>
                      <input type="text" class="form-control mb-2" name="product-category"
                      id="productCategory" placeholder="請輸入分類" v-model="childProduct.category" autocomplete="on">
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label for="productUnit" class="form-label">單位</label>
                      <input type="text" class="form-control mb-2" name="product-unit"
                      id="productUnit" placeholder="請輸入單位" v-model="childProduct.unit" autocomplete="on">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label for="productPrice" class="form-label">原價</label>
                      <input type="text" class="form-control mb-2" name="product-price"
                      id="productPrice" placeholder="請輸入原價" v-model.number="childProduct.origin_price" autocomplete="on">
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label for="productSalePrice" class="form-label">售價</label>
                      <input type="text" class="form-control mb-2" name="product-sale-price"
                      id="productSalePrice" placeholder="請輸入售價"
                      v-model.number="childProduct.price" autocomplete="on">
                    </div>
                  </div>
                </div>
              </div>
              <!-- modal-end-bottom -->
              <div class="pb-4">
                <div class="mb-3">
                  <label for="productDescription" class="form-label">產品描述</label>
                  <textarea class="form-control mb-2" id="productDescription" rows="2" placeholder="請輸入產品描述"
                  v-model="childProduct.description"></textarea>
                </div>
                <div class="mb-3">
                  <label for="productDetail" class="form-label">說明內容</label>
                  <textarea class="form-control mb-2" id="productDetail" rows="2" placeholder="請輸入說明內容"
                  v-model="childProduct.content"></textarea>
                </div>
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" value="" id="is_enabled"
                  v-model="childProduct.is_enabled"
                    :true-value="1" :false-value="0">
                  <label for="is_enabled" class="form-check-label">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">取 消</button>
          <button type="button" class="btn btn-ad-primary" @click="$emit('update-product', childProduct)">確 認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  // 單向數據流特性，props傳入時指定一個新變數
  props: {
    tempProduct: {
      type: Object,
      default () {
        return {}
      }
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      modal: '',
      childProduct: {},
      status: {}
    }
  },
  mixins: [modalMixin],
  inject: ['emitter'],
  emits: ['update-product'],
  watch: {
    tempProduct () {
      this.childProduct = this.tempProduct // 只有watch時沒有顯示資料
      if (!this.childProduct.imagesUrl) {
        this.childProduct.imagesUrl = []
      }
      if (!this.childProduct.imageUrl) {
        this.childProduct.imageUrl = ''
      }
    }
  },

  methods: {
    uploadFile () {
      const uploadedFile = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const uploadApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload/`
      this.status.fileUploading = true
      this.$http.post(uploadApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          this.status.fileUploading = false
          if (res.data.success) {
            this.childProduct.imageUrl = res.data.imageUrl
            this.$refs.fileInput.value = ''
            this.emitter.emit('push-message', {
              style: 'success',
              title: '圖片上傳結果',
              content: res.data.message
            })
          } else {
            this.$refs.fileInput.value = ''
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '圖片上傳結果',
              content: res.data.message
            })
          }
        })
        .catch((error) => {
          this.status.fileUploading = false
          this.$httpMessageState(error.response, '圖片失敗')
        })
    }
  }
}
</script>
