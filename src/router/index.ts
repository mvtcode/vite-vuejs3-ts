import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from '../views/dashboard/Index.vue';
import NotFound from '../views/404.vue';
import Forbidden from '../views/403.vue';
import Login from '../views/auth/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: Forbidden,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Giả lập kiểm tra quyền truy cập
const hasAccess = () => {
  // Thực tế, bạn sẽ kiểm tra quyền truy cập dựa trên logic của ứng dụng
  return true;
};

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !hasAccess()) {
    next({ name: 'Forbidden' });
  } else {
    next();
  }
});

export default router;
