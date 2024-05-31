import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './router/store.js'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


const app = createApp(App)
app
.use(router)
.use(store)
.component('QuillEditor', QuillEditor)
.mount('#app')


