import { createApp } from 'vue'
import { createPinia } from 'pinia'

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue'
import router from './router/index.js'

import 'element-plus/dist/index.css';
import './assets/css/icon.css';
import api from "@/api";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(api)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount('#app')