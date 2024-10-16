import { createApp } from 'vue';
import '~/scss/index.scss'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import App from './App.vue';

const pinia = createPinia()

const app = createApp(App);
app.use(ElementPlus, { size: 'small', zIndex: 3000 });
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router);
app.use(pinia)

app.mount('#app');
