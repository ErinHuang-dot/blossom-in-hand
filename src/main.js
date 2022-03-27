import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $httpMessageState from '@/methods/pushMessageState' // 自定義檔案
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueFeather from 'vue-feather'

// 表單驗證
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')

const app = createApp(App)

// 一般 Global 不建議掛太多方法，替代方式可以使用 provide
app.config.globalProperties.$httpMessageState = $httpMessageState

app.use(router)
app.use(VueAxios, axios)
app.component('vForm', Form)
app.component('vField', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('vLoading', Loading)
app.component(VueFeather.name, VueFeather)

app.mount('#app')
