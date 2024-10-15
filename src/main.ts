import { createApp } from 'vue';
import '~/scss/index.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';
const app = createApp(App);
app.use(ElementPlus, { size: 'small', zIndex: 3000 });
app.use(router);
app.mount('#app');
